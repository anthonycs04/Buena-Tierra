import { Outlet, Link, useLocation } from 'react-router';
import { AdminProvider } from '../contexts/AdminContext';
import { CartProvider } from '../contexts/CartContext';
import { FreshProduceProvider } from '../contexts/FreshProduceContext';
import {
  LayoutDashboard,
  Package,
  Leaf,
  ShoppingCart,
  Users,
  BarChart3,
  UserCircle,
  Settings,
} from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Productos', icon: Package },
    { path: '/admin/fresh-produce', label: 'Hortalizas y Frutas', icon: Leaf },
    { path: '/admin/orders', label: 'Pedidos', icon: ShoppingCart },
    { path: '/admin/customers', label: 'Clientes', icon: Users },
    { path: '/admin/metrics', label: 'Métricas', icon: BarChart3 },
    { path: '/admin/vendors', label: 'Vendedores', icon: UserCircle },
  ];

  return (
    <AdminProvider>
      <FreshProduceProvider>
        <CartProvider>
          <div className="flex min-h-screen bg-[#FAFAF7]">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#E8E8E0] fixed h-full smooth-scroll scrollbar-thin">
            <div className="p-6 border-b border-[#E8E8E0]">
              <h1 className="text-2xl text-[#2E7D32]" style={{ fontFamily: 'var(--font-display)' }}>
                Buena Tierra
              </h1>
              <p className="text-sm text-[#757575]">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#F1F8E9] text-[#1B5E20] border-l-4 border-[#2E7D32]'
                        : 'text-[#757575] hover:bg-[#F2F2EC]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#E8E8E0]">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-[#757575]">admin@buenatierra.pe</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-60">
            <Outlet />
          </main>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E0] z-50">
            <nav className="flex justify-around items-center h-16">
              {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center flex-1 h-full ${
                      isActive ? 'text-[#2E7D32]' : 'text-[#757575]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        </CartProvider>
      </FreshProduceProvider>
    </AdminProvider>
  );
}
