import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ProductImage } from './ProductImage';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSheet({ isOpen, onClose, onCheckout }: CartSheetProps) {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[75vh] flex flex-col lg:hidden animate-slide-up">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-8 h-1 bg-[#E0E0E0] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#E8E8E0]">
          <h2
            className="text-xl font-bold text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tu carrito
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F2F2EC] rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#757575]" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 smooth-scroll">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 pb-3 border-b border-[#E8E8E0] last:border-0"
            >
              {/* Thumbnail */}
              <ProductImage
                product={item}
                className="w-12 h-12 rounded-lg flex-shrink-0"
                showIndicator={false}
              />

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-medium text-[#1C1C1C] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#2E7D32] font-medium mt-0.5">
                  S/ {(item.promoPrice || item.price).toFixed(2)} c/u
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2 bg-[#F2F2EC] rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-[#D32F2F] hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  S/{' '}
                  {((item.promoPrice || item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#757575]">Tu carrito está vacío</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E8E0] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#757575] font-medium">Subtotal</span>
              <span className="text-lg font-bold text-[#2E7D32]">
                S/ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium transition-colors"
            >
              Continuar pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}
