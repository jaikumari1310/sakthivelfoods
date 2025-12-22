import { CategoryHero } from "@/components/CategoryHero";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { readyToFryVegProducts, siteContent } from "@/data/siteContent";

const ReadyToFryVeg = () => {
  const category = siteContent.categories.find(c => c.id === "ready-to-fry-veg");

  return (
    <Layout>
      {/* SEO */}
      <title>{`Ready to Fry Veg - ${siteContent.siteName}`}</title>
      <meta name="description" content={category?.description} />

	  <CategoryHero
		title="Ready to Fry Frozen Products - Veg"
		description="Delicious and convenient vegetarian snacks, ready in minutes."
		backgroundImage="/category-ready-to-fry-veg.png"
	  />


      <section className="container py-8 md:py-12">
        <ProductGrid products={readyToFryVegProducts} category="ready-to-fry-veg" />
      </section>
    </Layout>
  );
};

export default ReadyToFryVeg;
