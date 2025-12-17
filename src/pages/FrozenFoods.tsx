import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { frozenFoodsProducts, siteContent } from "@/data/siteContent";

const FrozenFoods = () => {
  const category = siteContent.categories.find(c => c.id === "frozen-foods");

  return (
    <Layout>
      {/* SEO */}
      <title>{`Frozen Foods - ${siteContent.siteName}`}</title>
      <meta name="description" content={category?.description} />

      <PageHeader
        title="Frozen Foods"
        description="Discover our range of frozen vegetables, ready-to-cook meals, ice cream, and more. Convenience without compromising on quality."
      />

      <section className="container py-8 md:py-12">
        <ProductGrid products={frozenFoodsProducts} />
      </section>
    </Layout>
  );
};

export default FrozenFoods;
