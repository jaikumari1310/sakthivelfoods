import { CategoryHero } from "@/components/CategoryHero";
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
  
	  <CategoryHero
		title="Baking Essentials"
		description="Everything you need for perfect baking — flour, sugar, cocoa, and more."
		backgroundImage="/category-baking.png"
	  />


      <section className="container py-8 md:py-12">
        <ProductGrid products={bakingEssentialsProducts} category="baking-essentials" />
      </section>
    </Layout>
  );
};

export default BakingEssentials;
