import heroPizza from "@/assets/hero-pizza.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
      <img
        src={heroPizza}
        alt="Pizza artesanal no forno a lenha"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="hero-gradient-overlay absolute inset-0" />
      <div className="absolute bottom-6 left-5 right-5">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-primary-foreground leading-tight">
          Forno Rio<br />Vermelho
        </h1>
        <div className="mt-3 inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="text-sm font-medium text-foreground">Aberto agora</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
