import { Search, User } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';

export function Customers() {
  const { customers } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <h1
        className="text-2xl font-bold text-[#1C1C1C] mb-6 animate-fade-in"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Clientes
      </h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
        <table className="w-full">
          <thead className="bg-[#F2F2EC] border-b border-[#E8E8E0]">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Cliente
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Teléfono
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Pedidos
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Total gastado
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Última compra
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-[#E8E8E0] hover:bg-[#FAFAF7] cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-[#1C1C1C]">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[#757575]">{customer.phone}</td>
                <td className="px-4 py-3 text-sm font-medium text-[#1C1C1C]">
                  {customer.totalOrders}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-[#2E7D32]">
                  S/ {customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-[#757575]">
                  {customer.lastPurchase.toLocaleDateString('es-PE')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredCustomers.map((customer, index) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.3)}s`
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#1C1C1C]">{customer.name}</h3>
                <p className="text-xs text-[#757575]">{customer.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E8E8E0]">
              <div>
                <p className="text-xs text-[#757575] mb-1">Pedidos</p>
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  {customer.totalOrders}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#757575] mb-1">Gastado</p>
                <p className="text-sm font-semibold text-[#2E7D32]">
                  S/ {customer.totalSpent.toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#757575] mb-1">Última compra</p>
                <p className="text-xs font-medium text-[#1C1C1C]">
                  {customer.lastPurchase.toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
