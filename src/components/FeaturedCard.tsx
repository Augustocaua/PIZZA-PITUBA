import { useState } from "react";
import { Plus } from "lucide-react";

interface FeaturedCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  onAdd: () => void;
}

const FeaturedCard = ({ image, title, description, price, onAdd }: FeaturedCardProps) => {
  const [tapped, setTapped] = useState(false);

  const handleAdd = () => {
    setTapped(true);
    onAdd();
    setTimeout(() => setTapped(false), 200);
  };

  return (
    <div className="clay-card overflow-hidden flex-shrink-0 w-[280px] md:w-[300px] snap-start">
      <div className="h-[200px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">{price}</span>
          <button
            onClick={handleAdd}
            className={`gradient-cta w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground transition-all duration-150 hover:shadow-lg active:scale-90 ${
              tapped ? "animate-tap" : ""
            }`}
            aria-label={`Adicionar ${title}`}
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
