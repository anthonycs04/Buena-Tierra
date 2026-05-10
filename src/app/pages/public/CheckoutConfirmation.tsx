import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle, Download, Home } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useCart } from '../../contexts/CartContext';

export function CheckoutConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useAdmin();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<any>(null);
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      // Clear cart only once using ref
      if (!hasCleared.current) {
        clearCart();
        hasCleared.current = true;
      }
    } else {
      navigate('/');
    }
  }, [orderId, orders, navigate]);

  if (!order) {
    return null;
  }

  const generateWhatsAppMessage = () => {
    const itemsList = order.items
      .map(
        (item: any) =>
          `- ${item.product.name} x${item.quantity} — S/ ${(
            (item.product.promoPrice || item.product.price) * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const deliveryInfo =
      order.deliveryType === 'delivery'
        ? `Delivery a: ${order.deliveryAddress}`
        : 'Recojo en tienda';

    const message = `🌿 *Pedido Confirmado - Buena Tierra*

📦 Código: ${order.code}
👤 Cliente: ${order.customerName}
📱 Celular: ${order.customerPhone}
📍 Entrega: ${deliveryInfo}

🛒 *Productos:*
${itemsList}

💰 *Total: S/ ${order.total.toFixed(2)}*
💳 Pago: ${order.paymentMethod}${
      order.comments ? `\n📝 Nota: ${order.comments}` : ''
    }

Estado: Nuevo pedido registrado`;

    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    const whatsappNumber = '51999888777';
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleDownloadPDF = () => {
    // Aquí se implementaría la generación del PDF
    alert('Función de descarga de PDF en desarrollo');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24 smooth-scroll">
      {/* Success Header */}
      <div className="bg-white border-b border-[#E8E8E0] px-4 py-8 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <CheckCircle className="w-12 h-12 text-[#388E3C]" />
          </div>
          <h1
            className="text-2xl font-bold text-[#1C1C1C] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¡Pedido Confirmado!
          </h1>
          <p className="text-[#757575]">
            Tu pedido ha sido registrado exitosamente
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Order Number Card */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#2E7D32] animate-fade-in-scale"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="text-center">
            <p className="text-sm text-[#757575] mb-1">Número de Pedido</p>
            <p
              className="text-4xl font-bold text-[#2E7D32]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {order.code}
            </p>
            <p className="text-xs text-[#757575] mt-2">
              {order.date.toLocaleDateString('es-PE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div
          className="bg-white rounded-xl p-5 shadow-sm animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-sm font-bold text-[#1C1C1C] mb-3">
            Información del Cliente
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#757575]">Nombre:</span>
              <span className="font-medium text-[#1C1C1C]">
                {order.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#757575]">Teléfono:</span>
              <span className="font-medium text-[#1C1C1C]">
                {order.customerPhone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#757575]">Tipo de entrega:</span>
              <span className="font-medium text-[#1C1C1C]">
                {order.deliveryType === 'delivery' ? 'Delivery' : 'Recojo en tienda'}
              </span>
            </div>
            {order.deliveryType === 'delivery' && (
              <div className="pt-2 border-t border-[#E8E8E0]">
                <span className="text-[#757575] text-xs">Dirección:</span>
                <p className="font-medium text-[#1C1C1C] mt-1">
                  {order.deliveryAddress}
                </p>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-[#E8E8E0]">
              <span className="text-[#757575]">Método de pago:</span>
              <span className="font-medium text-[#1C1C1C]">
                {order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div
          className="bg-white rounded-xl p-5 shadow-sm animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-sm font-bold text-[#1C1C1C] mb-3">
            Detalle del Pedido
          </h2>
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-[#E8E8E0] last:border-0"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A5D6A7] to-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🌿</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1C1C1C]">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[#757575]">
                      S/ {(item.product.promoPrice || item.product.price).toFixed(2)}{' '}
                      × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#2E7D32]">
                  S/{' '}
                  {(
                    (item.product.promoPrice || item.product.price) * item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-[#E8E8E0]">
            <span className="text-base font-bold text-[#1C1C1C]">Total</span>
            <span className="text-2xl font-bold text-[#2E7D32]">
              S/ {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Order Status */}
        <div
          className="bg-[#FFF9E6] rounded-xl p-5 border border-[#F9A825] animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#F9A825] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-lg">📋</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#1C1C1C] mb-1">
                Estado: Nuevo Pedido
              </h3>
              <p className="text-xs text-[#757575]">
                Tu pedido está siendo procesado. Nos pondremos en contacto contigo
                pronto para confirmar los detalles.
              </p>
            </div>
          </div>
        </div>

        {order.comments && (
          <div
            className="bg-white rounded-xl p-5 shadow-sm animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="text-sm font-bold text-[#1C1C1C] mb-2">
              Comentarios Adicionales
            </h2>
            <p className="text-sm text-[#757575]">{order.comments}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E0] p-4 space-y-2 z-10 animate-slide-up">
        <button
          onClick={handleWhatsApp}
          className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">📱</span>
          Enviar pedido por WhatsApp
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadPDF}
            className="h-11 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl font-medium hover:bg-[#F1F8E9] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
          <button
            onClick={() => navigate('/')}
            className="h-11 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
