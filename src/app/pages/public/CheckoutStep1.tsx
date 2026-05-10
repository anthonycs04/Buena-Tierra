import { useNavigate } from 'react-router';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export function CheckoutStep1() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24 smooth-scroll">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-[#F2F2EC] rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[#1C1C1C]" />
          </button>
          <h1 className="text-lg font-bold text-[#1C1C1C]">Tu pedido</h1>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="bg-white px-4 py-6 border-b border-[#E8E8E0]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-medium mb-1">
              1
            </div>
            <span className="text-xs text-[#2E7D32] font-medium">Carrito</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#E8E8E0] mx-2 -mt-5" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#E8E8E0] text-[#757575] flex items-center justify-center text-sm font-medium mb-1">
              2
            </div>
            <span className="text-xs text-[#757575]">Datos</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#E8E8E0] mx-2 -mt-5" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#E8E8E0] text-[#757575] flex items-center justify-center text-sm font-medium mb-1">
              3
            </div>
            <span className="text-xs text-[#757575]">Pago</span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 py-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow-sm flex gap-3 animate-fade-in"
            style={{
              animationDelay: `${index * 0.05}s`
            }}
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#A5D6A7] to-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌿</span>
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#1C1C1C] line-clamp-2 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-[#2E7D32] font-medium">
                S/ {(item.promoPrice || item.price).toFixed(2)} c/u
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 bg-[#F2F2EC] rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#2E7D32] hover:bg-[#E8E8E0] rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#D32F2F] hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1C1C1C]">
                S/ {((item.promoPrice || item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="bg-[#F1F8E9] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#757575] text-sm">Subtotal</span>
            <span className="text-[#2E7D32] font-semibold">
              S/ {total.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#757575] text-sm">Productos</span>
            <span className="text-[#1C1C1C] text-sm font-medium">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E0] p-4 z-10">
        <button
          onClick={() => navigate('/checkout/step2')}
          className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          Continuar con mis datos →
        </button>
      </div>
    </div>
  );
}
