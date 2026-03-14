import { ShoppingBag } from "lucide-react";

interface FloatingCartProps {
  itemCount: number;
  total: string;
}

const FloatingCart = ({ itemCount, total }: FloatingCartProps) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container">
        <button className="w-full gradient-cta rounded-2xl px-5 py-4 flex items-center justify-between text-primary-foreground cart-bar-shadow transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} />
            <span className="font-semibold text-base">
              Ver Pedido ({itemCount} {itemCount === 1 ? "item" : "itens"})
            </span>
          </div>
          <span className="font-bold text-lg">{total}</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingCart;
