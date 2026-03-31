import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import FeaturedCard from "@/components/FeaturedCard";
import MenuListItem from "@/components/MenuListItem";
import FloatingCart from "@/components/FloatingCart";

import pizzaSertaneja from "@/assets/pizza-sertaneja.jpg";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import pizzaQuattro from "@/assets/pizza-quattro.jpg";
import pizzaProsciutto from "@/assets/pizza-prosciutto.jpg";

const featuredItems = [
  {
    id: 1,
    image: pizzaSertaneja,
    title: "Sertaneja Especial",
    description: "Carne de sol desfiada, queijo coalho, cebola roxa caramelizada e coentro fresco.",
    price: "R$ 78,90",
    priceNum: 78.9,
  },
  {
    id: 2,
    image: pizzaProsciutto,
    title: "Figo com Prosciutto",
    description: "Prosciutto di Parma, figos frescos, rúcula selvagem e redução de balsâmico.",
    price: "R$ 89,90",
    priceNum: 89.9,
  },
  {
    id: 3,
    image: pizzaQuattro,
    title: "Quattro Formaggi",
    description: "Gorgonzola, parmesão, mozzarella de búfala, provolone e fio de mel trufado.",
    price: "R$ 84,90",
    priceNum: 84.9,
  },
];

const classicItems = [
  {
    id: 4,
    image: pizzaMargherita,
    title: "Margherita",
    description: "Molho San Marzano, mozzarella de búfala e manjericão fresco.",
    price: "R$ 59,90",
    priceNum: 59.9,
  },
  {
    id: 5,
    image: pizzaPepperoni,
    title: "Pepperoni",
    description: "Pepperoni artesanal, mozzarella e orégano siciliano.",
    price: "R$ 64,90",
    priceNum: 64.9,
  },
  {
    id: 6,
    image: pizzaSertaneja,
    title: "Calabresa Artesanal",
    description: "Linguiça calabresa defumada, cebola em rodelas e azeitonas pretas.",
    price: "R$ 54,90",
    priceNum: 54.9,
  },
  {
    id: 7,
    image: pizzaQuattro,
    title: "Napolitana",
    description: "Tomate, mozzarella, anchovas, alcaparras e orégano.",
    price: "R$ 62,90",
    priceNum: 62.9,
  },
];

const cocaImage = "/foto refri/coca cola.jpeg";
const guaranaImage = "/foto refri/guarana.jpeg";
const spriteImage = "/foto refri/sprite.jpeg";

const softDrinks1L = [
  {
    id: 8,
    image: cocaImage,
    title: "Coca-Cola Clássica (Garrafa de Vidro - 1L)",
    description: "A clássica e estupidamente gelada na garrafa de vidro.",
    price: "R$ 16,00",
    priceNum: 16,
  },
  {
    id: 9,
    image: guaranaImage,
    title: "Guaraná Antarctica (Garrafa de Vidro - 1L)",
    description: "O sabor original do Brasil, servido trincando.",
    price: "R$ 14,00",
    priceNum: 14,
  },
  {
    id: 10,
    image: spriteImage,
    title: "Sprite (Lata 350ml)",
    description: "Refrigerante Sprite bem gelado.",
    price: "R$ 7,00",
    priceNum: 7,
  },
];

const useHorizontalDragScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = containerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const deltaX = e.clientX - startXRef.current;
    el.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = containerRef.current;

    isPointerDownRef.current = false;
    setIsDragging(false);

    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    if (el.scrollWidth <= el.clientWidth) return;

    el.scrollLeft += e.deltaY;
    e.preventDefault();
  };

  return {
    containerRef,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onWheel,
  };
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Destaques");
  const [cart, setCart] = useState<{ id: number; price: number }[]>([]);
  const featuredSectionRef = useRef<HTMLElement | null>(null);
  const classicSectionRef = useRef<HTMLElement | null>(null);
  const drinksSectionRef = useRef<HTMLElement | null>(null);
  const featuredScroller = useHorizontalDragScroll();

  const addToCart = (id: number, price: number) => {
    setCart((prev) => [...prev, { id, price }]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  const scrollToSection = (section: HTMLElement | null) => {
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === "Destaques" || category === "Especiais") {
      scrollToSection(featuredSectionRef.current);
      return;
    }

    if (category === "Pizzas Clássicas") {
      scrollToSection(classicSectionRef.current);
      return;
    }

    if (category === "Bebidas") {
      scrollToSection(drinksSectionRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <HeroSection />

      {/* Featured Section */}
      <section ref={featuredSectionRef} className="mt-8">
        <div className="container">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-5">
            As mais pedidas
          </h2>
        </div>
        <div className="pl-4 md:pl-0 md:container">
          <div
            ref={featuredScroller.containerRef}
            className={`flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 pr-4 snap-x snap-mandatory select-none ${
              featuredScroller.isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={featuredScroller.onPointerDown}
            onPointerMove={featuredScroller.onPointerMove}
            onPointerUp={featuredScroller.onPointerUp}
            onPointerCancel={featuredScroller.onPointerCancel}
            onWheel={featuredScroller.onWheel}
          >
            {featuredItems.map((item) => (
              <FeaturedCard
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                onAdd={() => addToCart(item.id, item.priceNum)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Classic Pizzas */}
      <section ref={classicSectionRef} className="mt-10">
        <div className="container">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">
            Pizzas Clássicas
          </h2>
          <div className="flex flex-col gap-4">
            {classicItems.map((item) => (
              <MenuListItem
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                onAdd={() => addToCart(item.id, item.priceNum)}
                className="clay-card border-b-0 p-4 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      <section ref={drinksSectionRef} className="mt-10">
        <div className="container">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">Bebidas</h2>

          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/90 mb-3">
            Refrigerantes
          </h3>

          <div className="flex flex-col gap-4">
            {softDrinks1L.map((item) => (
              <MenuListItem
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                onAdd={() => addToCart(item.id, item.priceNum)}
                className="clay-card border-b-0 p-4 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      <FloatingCart itemCount={cart.length} total={formattedTotal} />
    </div>
  );
};

export default Index;
