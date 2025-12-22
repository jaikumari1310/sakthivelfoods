import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// A simple password to protect the admin page.
// In a real application, you would use a proper authentication system.
const ADMIN_PASSWORD = "password";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // This is a simplified CSV to JSON conversion.
      // It assumes a header row and comma-separated values.
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      const result = lines.slice(1).map(line => {
        const obj: { [key: string]: any } = {};
        const currentline = line.split(",");
        headers.forEach((header, i) => {
          let value: any = currentline[i];
          // Attempt to convert to number if it looks like a number
          if (!isNaN(value) && value.trim() !== '') {
            value = Number(value);
          } else if (value === 'true' || value === 'false') {
             value = value === 'true';
          }
          obj[header.trim()] = value;
        });
        return obj;
      });

      // This is a simplified example. In a real app, you would have separate
      // sections for each product category.
      const finalJson = {
        frozenFoodsProducts: result,
        bakingEssentialsProducts: [],
        dairyProducts: []
      }

      setJsonOutput(JSON.stringify(finalJson, null, 2));
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin}>Login</Button>
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Admin - Inventory Management" />
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Upload Product CSV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept=".csv" onChange={handleFileUpload} />
            <p className="text-sm text-muted-foreground">
              Upload a CSV file with product data. The first row should be the headers (e.g., id, name, description, price, unit, inStock, image).
            </p>
            {jsonOutput && (
              <Textarea
                readOnly
                rows={20}
                className="w-full p-2 font-mono text-sm bg-muted"
                value={jsonOutput}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
