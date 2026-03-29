import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuListItemProps {
  image: string;
  title: string;
  description: string;
  price: string;
  onAdd: () => void;
  className?: string;
}

const MenuListItem = ({ image, title, description, price, onAdd, className }: MenuListItemProps) => {
  const [tapped, setTapped] = useState(false);

  const handleAdd = () => {
    setTapped(true);
    onAdd();
    setTimeout(() => setTapped(false), 200);
  };

  return (
    <div className={cn("flex items-center gap-4 py-4 border-b border-border/50 last:border-b-0", className)}>
      <img
        src={image}
        alt=""
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        {!!description.trim() && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{description}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-base font-bold text-foreground">{price}</span>
        <button
          onClick={handleAdd}
          className={`gradient-cta w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground transition-all duration-150 hover:shadow-lg active:scale-90 ${
            tapped ? "animate-tap" : ""
          }`}
          aria-label={`Adicionar ${title}`}
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default MenuListItem;
