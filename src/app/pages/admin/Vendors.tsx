import { Search, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';

const roleConfig = {
  admin: { label: 'Administrador', color: '#1B5E20', bg: '#E8F5E9' },
  vendedor: { label: 'Vendedor', color: '#2196F3', bg: '#E3F2FD' },
  pedidos: { label: 'Encargado de pedidos', color: '#00897B', bg: '#E0F2F1' },
  inventario: { label: 'Encargado de inventario', color: '#F9A825', bg: '#FFF9E6' },
};

export function Vendors() {
  const { vendors } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1
          className="text-2xl font-bold text-[#1C1C1C]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Vendedores
        </h1>
        <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#1B5E20] transition-colors">
          + Crear vendedor
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
        <input
          type="text"
          placeholder="Buscar vendedores..."
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
                Nombre
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Email
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Rol
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Pedidos
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Ventas
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-b border-[#E8E8E0] hover:bg-[#FAFAF7] cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1C1C1C]">
                        {vendor.name}
                      </p>
                      <p className="text-xs text-[#757575]">{vendor.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[#757575]">{vendor.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      color: roleConfig[vendor.role].color,
                      backgroundColor: roleConfig[vendor.role].bg,
                    }}
                  >
                    {roleConfig[vendor.role].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#1C1C1C]">
                  {vendor.ordersCount}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-[#2E7D32]">
                  S/ {vendor.revenue.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      vendor.active
                        ? 'bg-green-50 text-[#388E3C]'
                        : 'bg-red-50 text-[#D32F2F]'
                    }`}
                  >
                    {vendor.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredVendors.map((vendor, index) => (
          <div
            key={vendor.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.3)}s`
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <UserCircle className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#1C1C1C]">{vendor.name}</h3>
                <p className="text-xs text-[#757575]">{vendor.email}</p>
                <span
                  className="inline-block text-xs px-2 py-1 rounded-full font-medium mt-1"
                  style={{
                    color: roleConfig[vendor.role].color,
                    backgroundColor: roleConfig[vendor.role].bg,
                  }}
                >
                  {roleConfig[vendor.role].label}
                </span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  vendor.active
                    ? 'bg-green-50 text-[#388E3C]'
                    : 'bg-red-50 text-[#D32F2F]'
                }`}
              >
                {vendor.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E8E8E0]">
              <div>
                <p className="text-xs text-[#757575] mb-1">Pedidos</p>
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  {vendor.ordersCount}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#757575] mb-1">Ventas</p>
                <p className="text-sm font-semibold text-[#2E7D32]">
                  S/ {vendor.revenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
