import { ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface FloatingCartProps {
  itemCount: number;
  total: string;
  orderLines: { title: string; qty: number; unitPrice: number }[];
  whatsappMessage: string;
}

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const FloatingCart = ({ itemCount, total, orderLines, whatsappMessage }: FloatingCartProps) => {
  if (itemCount === 0) return null;

  const whatsappUrl = `https://wa.me/5571982875822?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full gradient-cta rounded-2xl px-5 py-4 flex items-center justify-between text-primary-foreground cart-bar-shadow transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} />
                <span className="font-semibold text-base">
                  Ver Pedido ({itemCount} {itemCount === 1 ? "item" : "itens"})
                </span>
              </div>
              <span className="font-bold text-lg">{total}</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto pb-24">
            <SheetHeader>
              <SheetTitle>Seu pedido</SheetTitle>
            </SheetHeader>

            <div className="mt-5 space-y-3">
              {orderLines.map((line) => (
                <div key={`${line.title}-${line.unitPrice}`} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground truncate">{line.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {line.qty} × {money.format(line.unitPrice)}
                    </div>
                  </div>
                  <div className="font-bold text-foreground whitespace-nowrap">{money.format(line.qty * line.unitPrice)}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold text-muted-foreground">Total</span>
              <span className="text-lg font-extrabold text-foreground">{total}</span>
            </div>

            <div className="mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full gradient-cta rounded-2xl px-5 py-4 flex items-center justify-center text-primary-foreground font-bold text-base cart-bar-shadow transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Pedir no WhatsApp
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FloatingCart;
