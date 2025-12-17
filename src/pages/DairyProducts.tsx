import { CategoryHero } from "@/components/CategoryHero";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { dairyProducts, siteContent } from "@/data/siteContent";

const DairyProducts = () => {
  const category = siteContent.categories.find(c => c.id === "dairy-products");

  return (
    <Layout>
      {/* SEO */}
      <title>{`Dairy Products - ${siteContent.siteName}`}</title>
      <meta name="description" content={category?.description} />

      <PageHeader
        title="Dairy Products"
        description="Fresh dairy products delivered daily. Milk, cheese, butter, yogurt, and more from trusted suppliers."
      />

      <section className="container py-8 md:py-12">
        <ProductGrid products={dairyProducts} category="dairy-products" />
      </section>
    </Layout>
  );
};

export default DairyProducts;
