import { TrendingUp, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export function Dashboard() {
  const { products, orders, customers } = useAdmin();

  const todaySales = orders
    .filter((o) => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(
    (o) => o.status === 'nuevo' || o.status === 'confirmado'
  ).length;

  const completedToday = orders.filter((o) => o.status === 'completado').length;

  const lowStockProducts = products.filter((p) => p.stock < 5).length;

  const topProducts = products
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <h1
        className="text-2xl font-bold text-[#1C1C1C] mb-6 animate-fade-in"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        <div
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Ventas de hoy</span>
          </div>
          <p className="text-2xl font-bold text-[#2E7D32]">
            S/ {todaySales.toFixed(2)}
          </p>
          <p className="text-xs text-[#388E3C] mt-1">+12% vs ayer</p>
        </div>

        <div
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <AlertCircle className="w-4 h-4" />
            <span>Pedidos pendientes</span>
          </div>
          <p className="text-2xl font-bold text-[#F9A825]">{pendingOrders}</p>
          <p className="text-xs text-[#757575] mt-1">Requieren atención</p>
        </div>

        <div
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <CheckCircle className="w-4 h-4" />
            <span>Completados hoy</span>
          </div>
          <p className="text-2xl font-bold text-[#388E3C]">{completedToday}</p>
          <p className="text-xs text-[#757575] mt-1">De {orders.length} totales</p>
        </div>

        <div
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <Package className="w-4 h-4" />
            <span>Bajo stock</span>
          </div>
          <p className="text-2xl font-bold text-[#D32F2F]">{lowStockProducts}</p>
          <p className="text-xs text-[#2E7D32] mt-1 cursor-pointer hover:underline">
            Ver lista →
          </p>
        </div>
      </div>

      {/* Two Column Layout for Desktop */}
      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        {/* Top Products */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Productos más vendidos
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3 pb-3 border-b border-[#E8E8E0] last:border-0"
              >
                <span className="text-lg font-bold text-[#757575] w-6">
                  {index + 1}
                </span>
                <div className="w-10 h-10 bg-gradient-to-br from-[#A5D6A7] to-[#2E7D32] rounded-lg flex items-center justify-center">
                  <span>🌿</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1C1C1C] truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-[#757575]">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#2E7D32]">
                    S/ {product.price}
                  </p>
                  <p className="text-xs text-[#757575]">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Categorías destacadas
          </h2>
          <div className="space-y-3">
            {['Spirulina', 'Quinua', 'Miel', 'Aceites', 'Chocolate'].map(
              (cat, index) => (
                <div
                  key={cat}
                  className="flex items-center justify-between pb-3 border-b border-[#E8E8E0] last:border-0"
                >
                  <span className="text-sm font-medium text-[#1C1C1C]">{cat}</span>
                  <span className="text-sm text-[#757575]">
                    {products.filter((p) => p.category === cat).length} productos
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <div className="bg-white rounded-xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Clientes frecuentes
          </h2>
          <div className="space-y-3">
            {customers.slice(0, 3).map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between pb-3 border-b border-[#E8E8E0] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#1C1C1C]">
                    {customer.name}
                  </p>
                  <p className="text-xs text-[#757575]">
                    {customer.totalOrders} pedidos
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#2E7D32]">
                    S/ {customer.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Performance */}
        <div className="bg-white rounded-xl p-5 shadow-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Rendimiento por vendedor
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E0]">
              <div>
                <p className="text-sm font-medium text-[#1C1C1C]">María López</p>
                <p className="text-xs text-[#757575]">45 pedidos</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#2E7D32]">
                  S/ 2,340.00
                </p>
                <p className="text-xs text-[#757575]">S/ 52.00 promedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
