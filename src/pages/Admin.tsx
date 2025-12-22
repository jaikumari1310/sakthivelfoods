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
      const lines = text.split("\n").filter(line => line.trim() !== '');
      if (lines.length < 2) {
        setJsonOutput("CSV must have a header row and at least one data row.");
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim());
      const products = lines.slice(1).map(line => {
        const obj: { [key: string]: any } = {};
        const currentline = line.split(",");
        headers.forEach((header, i) => {
          let value: any = currentline[i] ? currentline[i].trim() : '';
          if (['id', 'price', 'originalPrice'].includes(header) && value) {
            value = Number(value);
          } else if (header === 'inStock') {
            value = value.toLowerCase() === 'true';
          } else if (header === 'originalPrice' && !value) {
            value = null;
          }
          obj[header] = value;
        });
        return obj;
      });

      const finalJson: { [key: string]: any[] } = {
        frozenFoodsProducts: [],
        bakingEssentialsProducts: [],
        dairyProducts: [],
      };

      products.forEach(product => {
        if (!product.category) return;
        const { category, ...productData } = product;

        switch (product.category) {
          case 'frozen-foods':
            finalJson.frozenFoodsProducts.push(productData);
            break;
          case 'baking-essentials':
            finalJson.bakingEssentialsProducts.push(productData);
            break;
          case 'dairy-products':
            finalJson.dairyProducts.push(productData);
            break;
          default:
            // You might want to handle products with unknown categories
            break;
        }
      });

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
              Upload a CSV file with product data. The first row should be the headers (e.g., id, name, description, price, originalPrice, unit, inStock, image, category).
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
