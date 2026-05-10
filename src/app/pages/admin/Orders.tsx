import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAdmin, OrderStatus } from '../../contexts/AdminContext';

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  nuevo: { label: 'Nuevo', color: '#F9A825', bg: '#FFF9E6' },
  confirmado: { label: 'Confirmado', color: '#2196F3', bg: '#E3F2FD' },
  preparacion: { label: 'En preparación', color: '#9C27B0', bg: '#F3E5F5' },
  listo: { label: 'Listo', color: '#00897B', bg: '#E0F2F1' },
  delivery: { label: 'En delivery', color: '#FF9800', bg: '#FFF3E0' },
  completado: { label: 'Completado', color: '#388E3C', bg: '#E8F5E9' },
  cancelado: { label: 'Cancelado', color: '#D32F2F', bg: '#FFEBEE' },
};

export function Orders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (o) =>
      o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrderData = orders.find((o) => o.id === selectedOrder);

  const generateWhatsAppMessage = (order: typeof selectedOrderData) => {
    if (!order) return '';

    const itemsList = order.items
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} — S/ ${(
            (item.product.promoPrice || item.product.price) * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const message = `🌿 *Actualización de pedido - Buena Tierra*

📦 Pedido: ${order.code}
👤 Cliente: ${order.customerName}
📍 Estado: ${statusConfig[order.status].label}

🛒 *Productos:*
${itemsList}

💰 Total: S/ ${order.total.toFixed(2)}`;

    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    if (!selectedOrderData) return;
    const phone = selectedOrderData.customerPhone.replace(/\D/g, '');
    const message = generateWhatsAppMessage(selectedOrderData);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pedidos
          </h1>
          <p className="text-sm text-[#757575]">{orders.length} pedidos totales</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
        <input
          type="text"
          placeholder="Buscar por código o cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 animate-fade-in">
        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-y-auto max-h-[calc(100vh-250px)] smooth-scroll">
            <table className="w-full">
              <thead className="bg-[#F2F2EC] border-b border-[#E8E8E0] sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                    Código
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                    Cliente
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`border-b border-[#E8E8E0] cursor-pointer transition-colors ${
                      selectedOrder === order.id ? 'bg-[#F1F8E9]' : 'hover:bg-[#FAFAF7]'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[#1C1C1C]">
                      {order.code}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#757575]">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2E7D32]">
                      S/ {order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          color: statusConfig[order.status].color,
                          backgroundColor: statusConfig[order.status].bg,
                        }}
                      >
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selectedOrderData && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1C] mb-1">
                  {selectedOrderData.code}
                </h2>
                <p className="text-sm text-[#757575]">
                  {selectedOrderData.date.toLocaleDateString('es-PE')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#757575]" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="bg-[#FAFAF7] rounded-xl p-4 mb-4">
              <h3 className="text-xs font-medium text-[#757575] mb-2">Cliente</h3>
              <p className="text-sm font-medium text-[#1C1C1C]">
                {selectedOrderData.customerName}
              </p>
              <p className="text-sm text-[#757575]">{selectedOrderData.customerPhone}</p>
              <p className="text-sm text-[#757575] mt-2">
                <span className="font-medium">Entrega:</span>{' '}
                {selectedOrderData.deliveryType === 'delivery'
                  ? selectedOrderData.deliveryAddress
                  : 'Recojo en tienda'}
              </p>
              <p className="text-sm text-[#757575]">
                <span className="font-medium">Pago:</span> {selectedOrderData.paymentMethod}
              </p>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-[#757575] mb-3">Productos</h3>
              <div className="space-y-2">
                {selectedOrderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[#E8E8E0] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1C1C1C]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#757575]">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#2E7D32]">
                      S/{' '}
                      {((item.product.promoPrice || item.product.price) * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-[#E8E8E0]">
                <span className="font-medium text-[#1C1C1C]">Total</span>
                <span className="text-lg font-bold text-[#2E7D32]">
                  S/ {selectedOrderData.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Status Update */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#757575] mb-2">
                Actualizar estado
              </label>
              <select
                value={selectedOrderData.status}
                onChange={(e) =>
                  updateOrderStatus(selectedOrderData.id, e.target.value as OrderStatus)
                }
                className="w-full h-10 px-3 bg-white border border-[#E8E8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
              >
                {Object.entries(statusConfig).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="w-full h-11 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">📱</span>
              Enviar actualización por WhatsApp
            </button>
          </div>
        )}

        {!selectedOrderData && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
            <p className="text-[#757575]">Selecciona un pedido para ver los detalles</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order.id)}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-[#1C1C1C]">{order.code}</p>
                <p className="text-xs text-[#757575]">{order.customerName}</p>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
                style={{
                  color: statusConfig[order.status].color,
                  backgroundColor: statusConfig[order.status].bg,
                }}
              >
                {statusConfig[order.status].label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#757575]">
                {order.date.toLocaleDateString('es-PE')}
              </span>
              <span className="text-sm font-semibold text-[#2E7D32]">
                S/ {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Order Detail Sheet */}
      {selectedOrder && selectedOrderData && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-50"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto p-4 pb-8">
            {/* Same content as desktop detail panel */}
            <div className="flex justify-center pt-2 pb-4">
              <div className="w-8 h-1 bg-[#E0E0E0] rounded-full" />
            </div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1C] mb-1">
                  {selectedOrderData.code}
                </h2>
                <p className="text-sm text-[#757575]">
                  {selectedOrderData.date.toLocaleDateString('es-PE')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#757575]" />
              </button>
            </div>

            <div className="bg-[#FAFAF7] rounded-xl p-4 mb-4">
              <h3 className="text-xs font-medium text-[#757575] mb-2">Cliente</h3>
              <p className="text-sm font-medium text-[#1C1C1C]">
                {selectedOrderData.customerName}
              </p>
              <p className="text-sm text-[#757575]">{selectedOrderData.customerPhone}</p>
              <p className="text-sm text-[#757575] mt-2">
                <span className="font-medium">Entrega:</span>{' '}
                {selectedOrderData.deliveryType === 'delivery'
                  ? selectedOrderData.deliveryAddress
                  : 'Recojo en tienda'}
              </p>
              <p className="text-sm text-[#757575]">
                <span className="font-medium">Pago:</span> {selectedOrderData.paymentMethod}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-medium text-[#757575] mb-3">Productos</h3>
              <div className="space-y-2">
                {selectedOrderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[#E8E8E0] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1C1C1C]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#757575]">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#2E7D32]">
                      S/{' '}
                      {((item.product.promoPrice || item.product.price) * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-[#E8E8E0]">
                <span className="font-medium text-[#1C1C1C]">Total</span>
                <span className="text-lg font-bold text-[#2E7D32]">
                  S/ {selectedOrderData.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-[#757575] mb-2">
                Actualizar estado
              </label>
              <select
                value={selectedOrderData.status}
                onChange={(e) =>
                  updateOrderStatus(selectedOrderData.id, e.target.value as OrderStatus)
                }
                className="w-full h-10 px-3 bg-white border border-[#E8E8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-sm"
              >
                {Object.entries(statusConfig).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full h-11 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">📱</span>
              Enviar actualización por WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
