import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { bakingEssentialsProducts, siteContent } from "@/data/siteContent";

const BakingEssentials = () => {
  const category = siteContent.categories.find(c => c.id === "baking-essentials");

  return (
    <Layout>
      {/* SEO */}
      <title>{`Baking Essentials - ${siteContent.siteName}`}</title>
      <meta name="description" content={category?.description} />

      <PageHeader
        title="Baking Essentials"
        description="Everything you need for your baking adventures. From flour and sugar to baking powder and vanilla extract."
      />

      <section className="container py-8 md:py-12">
        <ProductGrid products={bakingEssentialsProducts} />
      </section>
    </Layout>
  );
};

export default BakingEssentials;
