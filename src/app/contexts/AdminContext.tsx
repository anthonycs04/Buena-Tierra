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
  {
    id: '1',
    name: 'Acelga agroecológica',
    price: 2.90,
    image: '/images/ACELGA AGROECOLÓGICA- fondo blanco.jpg',
    images: [
      '/images/ACELGA AGROECOLÓGICA- fondo blanco.jpg',
      '/images/ACELGA AGROECOLÓGICA- en campo.jpg',
    ],
    category: 'hortalizas',
    unit: 'atado',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Eudosia Otoya, agricultora agroecológica de La Yarada Los Palos`,
    stock: 35,
    featured: true,
  },
  {
    id: '2',
    name: 'Apio agroecológico',
    price: 2.90,
    image: '/images/APIO AGROECOLÓGICO- fondo blanco.jpg',
    images: [
      '/images/APIO AGROECOLÓGICO- fondo blanco.jpg',
      '/images/APIO AGROECOLÓGICO-campo.jpg',
    ],
    category: 'hortalizas',
    unit: 'atado',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Julia Mamani Cárdenas, agricultora agroecológica de Calana`,
    stock: 28,
  },
  {
    id: '3',
    name: 'Cilantro agroecológico',
    price: 2.30,
    image: '/images/CILANTRO AGROECOLÓGICO- fondo blanco.jpg',
    images: [
      '/images/CILANTRO AGROECOLÓGICO- fondo blanco.jpg',
      '/images/CILANTRO AGROECOLÓGICO- campo.jpg',
    ],
    category: 'hierbas',
    unit: 'atado',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Eudosia Otoya, agricultora agroecológica de La Yarada Los Palos`,
    stock: 45,
  },
  {
    id: '4',
    name: 'Espinaca agroecológica',
    price: 4.20,
    image: '/images/ESPINACA-ORGANICA-TUMERCADO.jpg',
    images: [
      '/images/ESPINACA-ORGANICA-TUMERCADO.jpg',
      '/images/ESPINACA AGROECOLÓGICA-campo.png',
    ],
    category: 'hortalizas',
    unit: 'atado',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Proveedor: Eudosia Otoya, agricultora agroecológica de La Yarada Los Palos`,
    stock: 30,
    featured: true,
  },
  {
    id: '5',
    name: 'Frejol negro orgánico, Campo Verde Ayacucho, 500 gr',
    price: 9.90,
    image: '/images/FREJOL NEGRO ORGÁNICO.png',
    category: 'menestras',
    unit: '500 gr',
    description: `Es un alimento energético y una de las mejores fuentes de proteína vegetal.
Excelente fuente de energía y fibra, tienen un bajo índice glucémico, con grandes propiedades desintoxicantes.

Origen: Ayacucho
Producido por: Cooperativa Agraria Frutos del Ande`,
    stock: 20,
  },
  {
    id: '6',
    name: 'Lechuga carola agroecológica',
    price: 2.90,
    image: '/images/LECHUGA AGROECOLÓGICA- fondo blanco.png',
    images: [
      '/images/LECHUGA AGROECOLÓGICA- fondo blanco.png',
      '/images/LECHUGA CAROLA AGROECOLÓGICA - en campo.jpg',
    ],
    category: 'hortalizas',
    unit: 'unidad',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Julia Mamani Cárdenas, agricultora agroecológica de Calana`,
    stock: 32,
  },
  {
    id: '7',
    name: 'Miel de abeja virgen, Monteflor, 1 kg',
    price: 35.00,
    image: '/images/MIEL DE ABEJA VIRGEN.png',
    category: 'miel y derivados',
    unit: '1 kg',
    description: `100 % miel de abeja virgen de Sama y Tarata, con floración silvestre de los árboles de chañal, molle, chilca, frutales y trébol.
La cristalización y dosificación de una miel virgen es un proceso natural frente a los cambios de temperatura y peso del tiempo.
Origen: Tacna
Producido por: Monteflor
Apicultor profesional: Ing. Jorge Segura Dávila`,
    stock: 12,
    featured: true,
  },
  {
    id: '8',
    name: 'Panela orgánica, Norandino, 500 gr',
    price: 7.50,
    image: '/images/PANELA ORGÁNICA.jpg',
    category: 'endulzante',
    unit: '500 gr',
    description: `Es un endulzante natural obtenido solo de la evaporación de agua de los jugos de caña y la cristalización de la sacarosa, el mismo que contiene minerales y vitaminas.
Origen: Piura
Producido por: Cooperativa Agraria Norandino`,
    stock: 24,
  },
  {
    id: '9',
    name: 'Perejil agroecológico',
    price: 2.30,
    image: '/images/PEREJIL AGROECOLÓGICO- fondo blanco.jpg',
    images: [
      '/images/PEREJIL AGROECOLÓGICO- fondo blanco.jpg',
      '/images/PEREJIL AGROECOLÓGICO- campo.jfif',
    ],
    category: 'hierbas',
    unit: 'atado',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Carmen Mamani de Laquita, agricultora agroecológica de La Yarada Los Palos`,
    stock: 40,
  },
  {
    id: '10',
    name: 'Tomate agroecológica',
    price: 5.00,
    image: '/images/TOMATE AGROECOLÓGICO - fondo blanco.jpg',
    images: [
      '/images/TOMATE AGROECOLÓGICO - fondo blanco.jpg',
      '/images/TOMATE AGROECOLÓGICO- campo.jpg',
    ],
    category: 'hortalizas',
    unit: 'kilo',
    description: `Libre de agroquímicos y fertilizantes sintéticos.
Recíbelo fresco y recién cosechado todos los sábados y domingos haciendo tu pedido por anticipado.
Producido por: Carmen Mamani de Laquita, agricultora agroecológica de La Yarada Los Palos`,
    stock: 18,
  },
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
    total: 15.70,
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
