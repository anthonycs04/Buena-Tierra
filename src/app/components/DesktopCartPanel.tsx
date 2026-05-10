import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface DesktopCartPanelProps {
  onCheckout: () => void;
}

export function DesktopCartPanel({ onCheckout }: DesktopCartPanelProps) {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 w-[340px] h-full bg-white border-l border-[#E8E8E0] shadow-xl z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-[#E8E8E0]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-[#1C1C1C]">Tu carrito</h2>
          <div className="w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">{itemCount}</span>
          </div>
        </div>
        <p className="text-sm text-[#757575]">
          {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 smooth-scroll scrollbar-thin">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 pb-4 border-b border-[#E8E8E0] last:border-0"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#A5D6A7] to-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌿</span>
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#1C1C1C] line-clamp-2 mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-[#2E7D32] font-semibold mb-2">
                S/ {(item.promoPrice || item.price).toFixed(2)} c/u
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#F2F2EC] rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-[#D32F2F] hover:bg-red-50 rounded transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm font-bold text-[#1C1C1C]">
                S/ {((item.promoPrice || item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E8E8E0] p-6 space-y-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium text-[#757575]">Subtotal</span>
          <span className="text-2xl font-bold text-[#2E7D32]">
            S/ {total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          Continuar pedido →
        </button>
      </div>
    </aside>
  );
}
