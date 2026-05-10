import { useState } from 'react';
import { TrendingUp, Package, Users } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export function Metrics() {
  const { products, orders, customers } = useAdmin();
  const [period, setPeriod] = useState<'hoy' | 'semana' | 'mes'>('hoy');

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.total, 0);

  const avgTicket = totalRevenue / Math.max(orders.length, 1);

  const topProduct = products.reduce(
    (top, p) => (p.stock > top.stock ? p : top),
    products[0]
  );

  const newCustomers = customers.length;

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <h1
        className="text-2xl font-bold text-[#1C1C1C] mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Métricas y Reportes
      </h1>

      {/* Period Filter */}
      <div className="flex gap-2 p-1 bg-[#F2F2EC] rounded-xl mb-6 max-w-md">
        {['hoy', 'semana', 'mes'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as typeof period)}
            className={`flex-1 h-9 rounded-lg font-medium text-sm transition-all ${
              period === p
                ? 'bg-white text-[#2E7D32] shadow-sm'
                : 'text-[#757575] hover:text-[#1C1C1C]'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Ticket promedio</span>
          </div>
          <p className="text-2xl font-bold text-[#2E7D32]">
            S/ {avgTicket.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <Package className="w-4 h-4" />
            <span>Producto top</span>
          </div>
          <p className="text-sm font-bold text-[#1C1C1C] line-clamp-2">
            {topProduct?.name || 'N/A'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <Users className="w-4 h-4" />
            <span>Clientes nuevos</span>
          </div>
          <p className="text-2xl font-bold text-[#2E7D32]">{newCustomers}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#757575] text-xs mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Total ventas</span>
          </div>
          <p className="text-2xl font-bold text-[#2E7D32]">
            S/ {totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Ventas diarias
          </h2>
          <div className="h-64 bg-gradient-to-t from-[#F1F8E9] to-transparent rounded-lg flex items-end justify-center p-4">
            <p className="text-[#757575] text-sm">
              Gráfico de líneas de ventas diarias
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
            Pedidos por estado
          </h2>
          <div className="h-64 bg-gradient-to-br from-[#F1F8E9] to-transparent rounded-lg flex items-center justify-center">
            <p className="text-[#757575] text-sm">Gráfico de barras por estado</p>
          </div>
        </div>
      </div>

      {/* Low Stock Products */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">
          Productos con bajo stock
        </h2>
        <div className="space-y-2">
          {products
            .filter((p) => p.stock < 5)
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-2 border-b border-[#E8E8E0] last:border-0"
              >
                <span className="text-sm font-medium text-[#1C1C1C]">
                  {product.name}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#D32F2F] font-medium">
                    Stock: {product.stock}
                  </span>
                  <span className="text-xs px-2 py-1 bg-red-50 text-[#D32F2F] rounded-full">
                    Bajo stock
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
