import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function CheckoutStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryType: 'recojo' as 'recojo' | 'delivery',
    address: '',
    reference: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in session or context
    sessionStorage.setItem('checkoutData', JSON.stringify(formData));
    navigate('/checkout/step3');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24 smooth-scroll">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/checkout/step1')}
            className="p-2 hover:bg-[#F2F2EC] rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[#1C1C1C]" />
          </button>
          <h1 className="text-lg font-bold text-[#1C1C1C]">Tus datos</h1>
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
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-sm font-medium mb-1">
              2
            </div>
            <span className="text-xs text-[#2E7D32] font-medium">Datos</span>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-[#757575] mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            placeholder="Ingresa tu nombre"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-[#757575] mb-2">
            Número de celular
          </label>
          <div className="flex gap-2">
            <div className="w-16 h-12 bg-white border border-[#E8E8E0] rounded-xl flex items-center justify-center text-sm">
              🇵🇪 +51
            </div>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="flex-1 h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
              placeholder="987 654 321"
            />
          </div>
        </div>

        {/* Delivery Type Toggle */}
        <div>
          <label className="block text-xs font-medium text-[#757575] mb-2">
            Tipo de entrega
          </label>
          <div className="flex gap-2 p-1 bg-[#F2F2EC] rounded-xl">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, deliveryType: 'recojo' })
              }
              className={`flex-1 h-10 rounded-lg font-medium text-sm transition-all ${
                formData.deliveryType === 'recojo'
                  ? 'bg-white text-[#2E7D32] shadow-sm'
                  : 'text-[#757575]'
              }`}
            >
              Recojo en tienda
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, deliveryType: 'delivery' })
              }
              className={`flex-1 h-10 rounded-lg font-medium text-sm transition-all ${
                formData.deliveryType === 'delivery'
                  ? 'bg-white text-[#2E7D32] shadow-sm'
                  : 'text-[#757575]'
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Address (shown only for delivery) */}
        {formData.deliveryType === 'delivery' && (
          <div className="space-y-4 animate-slide-down">
            <div>
              <label className="block text-xs font-medium text-[#757575] mb-2">
                Dirección de entrega
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent resize-none"
                placeholder="Av. Ejemplo 123, Distrito"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#757575] mb-2">
                Referencia (opcional)
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
                className="w-full h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                placeholder="Ej: frente al parque"
              />
            </div>
          </div>
        )}
      </form>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E0] p-4 z-10">
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          Continuar con el pago →
        </button>
      </div>
    </div>
  );
}
