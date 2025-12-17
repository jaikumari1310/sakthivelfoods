import { Layout } from "@/components/layout/Layout";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { siteContent } from "@/data/siteContent";

const Index = () => {
  const { categories, siteName, tagline } = siteContent;

  return (
    <Layout>
      {/* SEO */}
      <title>{`${siteName} - ${tagline}`}</title>
      <meta name="description" content={siteContent.description} />

      {/* Hero */}
      <HeroBanner />

      {/* Categories Section */}
      <section className="container py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our carefully curated selection of quality products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard
                name={category.name}
                description={category.description}
                image={category.image}
                href={category.href}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted">
        <div className="container py-12 md:py-16 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Visit Our Store Today
          </h2>
          <p className="text-muted-foreground mb-2">
            {siteContent.contact.address}
          </p>
          <p className="text-sm text-muted-foreground">
            {siteContent.contact.hours}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
