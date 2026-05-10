import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAdmin } from '../../contexts/AdminContext';

const paymentMethods = [
  { id: 'yape', label: 'Yape', icon: '💜', description: 'Enviaremos número de Yape al confirmar' },
  { id: 'plin', label: 'Plin', icon: '💙', description: 'Enviaremos número de Plin al confirmar' },
  { id: 'transfer', label: 'Transferencia bancaria', icon: '🏦', description: '' },
  { id: 'contraentrega', label: 'Pago contra entrega', icon: '🚪', description: '' },
  { id: 'tienda', label: 'Pago en tienda', icon: '🏪', description: '' },
];

export function CheckoutStep3() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { createOrder } = useAdmin();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [comments, setComments] = useState('');

  const checkoutData = JSON.parse(
    sessionStorage.getItem('checkoutData') || '{}'
  );

  const handleConfirm = () => {
    if (!selectedPayment) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Create the order
    const newOrder = createOrder({
      customerName: checkoutData.name,
      customerPhone: checkoutData.phone,
      deliveryType: checkoutData.deliveryType,
      deliveryAddress: checkoutData.deliveryType === 'delivery'
        ? `${checkoutData.address}${checkoutData.reference ? ` (${checkoutData.reference})` : ''}`
        : undefined,
      paymentMethod: paymentMethods.find((p) => p.id === selectedPayment)?.label || '',
      items: items.map((item) => ({
        product: item,
        quantity: item.quantity,
      })),
      total,
      comments,
      vendor: 'Sistema Web',
    });

    // Clear session data
    sessionStorage.removeItem('checkoutData');

    // Navigate to confirmation page with order ID
    navigate(`/checkout/confirmation?orderId=${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24 smooth-scroll">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/checkout/step2')}
            className="p-2 hover:bg-[#F2F2EC] rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[#1C1C1C]" />
          </button>
          <h1 className="text-lg font-bold text-[#1C1C1C]">Pago</h1>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="bg-white px-4 py-6 border-b border-[#E8E8E0]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#388E3C] text-white flex items-center justify-center text-sm font-medium mb-1">
              ✓
            </div>
            <span className="text-xs text-[#388E3C] font-medium">Carrito</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#2E7D32] mx-2 -mt-5" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#388E3C] text-white flex items-center justify-center text-sm font-medium mb-1">
              ✓
            </div>
            <span className="text-xs text-[#388E3C] font-medium">Datos</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#2E7D32] mx-2 -mt-5" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-medium mb-1">
              3
            </div>
            <span className="text-xs text-[#2E7D32] font-medium">Pago</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Payment Method Selector */}
        <div>
          <h2 className="text-sm font-medium text-[#757575] mb-3">
            Método de pago
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method, index) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left animate-fade-in ${
                  selectedPayment === method.id
                    ? 'border-[#2E7D32] bg-[#F1F8E9] shadow-md'
                    : 'border-[#E8E8E0] bg-white hover:border-[#2E7D32]/30 hover:shadow-sm'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1C1C1C]">
                        {method.label}
                      </span>
                      {selectedPayment === method.id && (
                        <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    {method.description && (
                      <p className="text-xs text-[#757575] mt-1">
                        {method.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-[#757575] mb-2">
            Comentarios adicionales (opcional)
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent resize-none"
            placeholder="Ej: Por favor llamar antes de llegar"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-[#F1F8E9] rounded-xl p-4 space-y-2">
          <h3 className="font-medium text-[#1C1C1C] mb-3">Resumen del pedido</h3>
          <div className="flex justify-between text-sm">
            <span className="text-[#757575]">Productos</span>
            <span className="text-[#1C1C1C] font-medium">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#757575]">Subtotal</span>
            <span className="text-[#2E7D32] font-semibold">
              S/ {total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#757575]">Entrega</span>
            <span className="text-[#1C1C1C] font-medium">
              {checkoutData.deliveryType === 'delivery' ? 'Delivery' : 'Recojo en tienda'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#757575]">Pago</span>
            <span className="text-[#1C1C1C] font-medium">
              {paymentMethods.find((p) => p.id === selectedPayment)?.label || 'No seleccionado'}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E0] p-4 z-10">
        <button
          onClick={handleConfirm}
          disabled={!selectedPayment}
          className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-[#757575] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
