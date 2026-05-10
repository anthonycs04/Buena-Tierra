import { Outlet } from 'react-router';
import { CartProvider } from '../contexts/CartContext';
import { AdminProvider } from '../contexts/AdminContext';
import { FreshProduceProvider } from '../contexts/FreshProduceContext';

export function PublicLayout() {
  return (
    <AdminProvider>
      <FreshProduceProvider>
        <CartProvider>
          <div className="min-h-screen">
            <Outlet />
          </div>
        </CartProvider>
      </FreshProduceProvider>
    </AdminProvider>
  );
}
