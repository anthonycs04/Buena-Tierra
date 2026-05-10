import { createBrowserRouter } from 'react-router';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { FarmerLayout } from './layouts/FarmerLayout';
import { Catalog } from './pages/public/Catalog';
import { CheckoutStep1 } from './pages/public/CheckoutStep1';
import { CheckoutStep2 } from './pages/public/CheckoutStep2';
import { CheckoutStep3 } from './pages/public/CheckoutStep3';
import { CheckoutConfirmation } from './pages/public/CheckoutConfirmation';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { Orders } from './pages/admin/Orders';
import { Customers } from './pages/admin/Customers';
import { Metrics } from './pages/admin/Metrics';
import { Vendors } from './pages/admin/Vendors';
import { FreshProduce } from './pages/admin/FreshProduce';
import { FreshProduceStock } from './pages/admin/FreshProduceStock';
import { FarmerLogin } from './pages/farmer/FarmerLogin';
import { FarmerHome } from './pages/farmer/FarmerHome';
import { FarmerUpload } from './pages/farmer/FarmerUpload';
import { FarmerOrderSummary } from './pages/farmer/FarmerOrderSummary';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Catalog },
      { path: 'checkout/step1', Component: CheckoutStep1 },
      { path: 'checkout/step2', Component: CheckoutStep2 },
      { path: 'checkout/step3', Component: CheckoutStep3 },
      { path: 'checkout/confirmation', Component: CheckoutConfirmation },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'products', Component: Products },
      { path: 'fresh-produce', Component: FreshProduce },
      { path: 'fresh-produce/stock', Component: FreshProduceStock },
      { path: 'orders', Component: Orders },
      { path: 'customers', Component: Customers },
      { path: 'metrics', Component: Metrics },
      { path: 'vendors', Component: Vendors },
    ],
  },
  {
    path: '/agricultor',
    Component: FarmerLayout,
    children: [
      { index: true, Component: FarmerLogin },
      { path: 'home', Component: FarmerHome },
      { path: 'upload', Component: FarmerUpload },
      { path: 'order-summary', Component: FarmerOrderSummary },
    ],
  },
]);
