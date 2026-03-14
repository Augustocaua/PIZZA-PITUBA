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

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Destaques");
  const [cart, setCart] = useState<{ id: number; price: number }[]>([]);

  const addToCart = (id: number, price: number) => {
    setCart((prev) => [...prev, { id, price }]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <HeroSection />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Featured Section */}
      <section className="mt-8">
        <div className="container">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-5">
            As mais pedidas
          </h2>
        </div>
        <div className="pl-4 md:pl-0 md:container">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pr-4 snap-x snap-mandatory">
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
      <section className="mt-10">
        <div className="container">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-4">
            Pizzas Clássicas
          </h2>
          <div>
            {classicItems.map((item) => (
              <MenuListItem
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

      <FloatingCart itemCount={cart.length} total={formattedTotal} />
    </div>
  );
};

export default Index;
