import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './CartContext';

export type OrderStatus = 'nuevo' | 'confirmado' | 'preparacion' | 'listo' | 'delivery' | 'completado' | 'cancelado';

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'recojo' | 'delivery';
  deliveryAddress?: string;
  paymentMethod: string;
  status: OrderStatus;
  items: { product: Product; quantity: number }[];
  total: number;
  comments?: string;
  date: Date;
  vendor?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: Date;
  preferredDelivery: 'recojo' | 'delivery';
  preferredPayment: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'vendedor' | 'pedidos' | 'inventario';
  ordersCount: number;
  revenue: number;
  active: boolean;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  vendors: Vendor[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  createOrder: (order: Omit<Order, 'id' | 'code' | 'date' | 'status'>) => Order;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Spirulina Orgánica en Polvo 250g', price: 35.00, image: '', category: 'Spirulina', stock: 20, featured: true },
  { id: '2', name: 'Quinua Roja Premium 500g', price: 18.50, image: '', category: 'Quinua', stock: 45, promo: true, promoPrice: 15.00 },
  { id: '3', name: 'Miel de Abeja Pura Orgánica 350g', price: 28.00, image: '', category: 'Miel y derivados', stock: 12 },
  { id: '4', name: 'Aceite de Coco Virgen Extra 500ml', price: 42.00, image: '', category: 'Aceites comestibles', stock: 8 },
  { id: '5', name: 'Semillas de Chía Orgánica 400g', price: 22.00, image: '', category: 'Semillas', stock: 30 },
  { id: '6', name: 'Harina de Almendras Sin Gluten 300g', price: 38.00, image: '', category: 'Harinas/Polvos', stock: 15, featured: true },
  { id: '7', name: 'Chocolate Orgánico 70% Cacao 100g', price: 16.00, image: '', category: 'Chocolate para comer', stock: 25, promo: true, promoPrice: 14.00 },
  { id: '8', name: 'Café Orgánico Premium Molido 250g', price: 32.00, image: '', category: 'Café', stock: 18 },
  { id: '9', name: 'Hojuelas de Avena Integral 500g', price: 12.50, image: '', category: 'Hojuelas', stock: 40, promo: true, promoPrice: 11.00 },
  { id: '10', name: 'Lentejas Orgánicas 500g', price: 14.00, image: '', category: 'Menestras', stock: 35 },
  { id: '11', name: 'Stevia Natural en Polvo 100g', price: 24.00, image: '', category: 'Endulzante', stock: 22 },
  { id: '12', name: 'Mix de Frutos Secos Premium 300g', price: 28.50, image: '', category: 'Snacks', stock: 18, featured: true },
  { id: '13', name: 'Huevos Orgánicos de Campo x12', price: 18.00, image: '', category: 'Huevos', stock: 25 },
  { id: '14', name: 'Aceite de Oliva Extra Virgen 500ml', price: 48.00, image: '', category: 'Aceites comestibles', stock: 12, promo: true, promoPrice: 42.00 },
  { id: '15', name: 'Arroz Integral Orgánico 1kg', price: 16.00, image: '', category: 'Arroz', stock: 50 },
  { id: '16', name: 'Quinua Blanca Premium 500g', price: 17.00, image: '', category: 'Quinua', stock: 38 },
  { id: '17', name: 'Miel de Manuka Premium 250g', price: 65.00, image: '', category: 'Miel y derivados', stock: 8, featured: true },
  { id: '18', name: 'Almendras Naturales 250g', price: 26.00, image: '', category: 'Snacks', stock: 20 },
  { id: '19', name: 'Hierba Luisa Orgánica 50g', price: 12.00, image: '', category: 'Hierbas', stock: 15 },
  { id: '20', name: 'Palta Orgánica x Kg', price: 22.00, image: '', category: 'Frutas', stock: 10 },
];

const mockOrders: Order[] = [
  {
    id: '1',
    code: 'BT-001',
    customerName: 'Ana García',
    customerPhone: '+51 987 654 321',
    deliveryType: 'delivery',
    deliveryAddress: 'Av. Benavides 1234, Miraflores',
    paymentMethod: 'Yape',
    status: 'nuevo',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[4], quantity: 1 },
    ],
    total: 92.00,
    date: new Date(),
    vendor: 'María López',
  },
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ana García',
    phone: '+51 987 654 321',
    totalOrders: 12,
    totalSpent: 480.00,
    lastPurchase: new Date(),
    preferredDelivery: 'delivery',
    preferredPayment: 'Yape',
  },
];

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'María López',
    email: 'maria@buenatierra.pe',
    phone: '+51 999 888 777',
    role: 'vendedor',
    ordersCount: 45,
    revenue: 2340.00,
    active: true,
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [vendors] = useState<Vendor[]>(mockVendors);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status } : o))
    );
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'code' | 'date' | 'status'>) => {
    const newOrderNumber = orders.length + 1;
    const orderCode = `BT-${String(newOrderNumber).padStart(3, '0')}`;

    const newOrder: Order = {
      ...orderData,
      id: String(Date.now()),
      code: orderCode,
      date: new Date(),
      status: 'nuevo',
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        customers,
        vendors,
        updateProduct,
        updateOrderStatus,
        addProduct,
        createOrder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
