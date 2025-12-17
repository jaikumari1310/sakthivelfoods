interface CategoryHeroProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export function CategoryHero({
  title,
  description,
  backgroundImage,
}: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative container py-14 md:py-20">
        <div className="max-w-3xl text-white space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">
            {title}
          </h1>
          <p className="text-lg text-white/90">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
