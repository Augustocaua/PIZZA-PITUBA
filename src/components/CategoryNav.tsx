import { useState } from "react";

const categories = ["Destaques", "Pizzas Clássicas", "Especiais", "Bebidas"];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`whitespace-nowrap text-sm font-semibold pb-1 transition-all duration-200 border-b-2 ${
                activeCategory === cat
                  ? "text-foreground border-accent"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
