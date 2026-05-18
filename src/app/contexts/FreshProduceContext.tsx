import { createContext, useContext, useState, ReactNode } from 'react';

export type PeriodStatus = 'activo' | 'cerrado' | 'proximo';
export type ProduceUnit = 'kg' | 'unidad' | 'gr' | 'atado';

export interface Period {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: PeriodStatus;
  createdAt: Date;
}

export interface Farmer {
  id: string;
  name: string;
  dni: string;
  phone?: string;
  email?: string;
  active: boolean;
  createdAt: Date;
}

export interface PresetProduct {
  id: string;
  name: string;
  category: 'hortaliza' | 'fruta';
  unit: ProduceUnit;
  icon: string;
}

export interface FarmerProduct {
  id: string;
  farmerId: string;
  periodId: string;
  productName: string;
  quantity: number;
  unit: ProduceUnit;
  farmerPrice: number;
  customerPrice?: number; // Set by admin
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerOrderSummary {
  farmerId: string;
  periodId: string;
  products: {
    productName: string;
    totalOrdered: number;
    unit: string;
  }[];
  confirmedReady: boolean;
  confirmedAt?: Date;
}

export interface CustomerOrder {
  id: string;
  periodId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  products: {
    productName: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
}

interface FreshProduceContextType {
  periods: Period[];
  farmers: Farmer[];
  presetProducts: PresetProduct[];
  farmerProducts: FarmerProduct[];
  farmerOrderSummaries: FarmerOrderSummary[];
  customerOrders: CustomerOrder[];

  // Period management
  activePeriod: Period | null;
  createPeriod: (period: Omit<Period, 'id' | 'createdAt'>) => Period;
  closePeriod: (periodId: string) => void;

  // Farmer management
  registerFarmer: (farmer: Omit<Farmer, 'id' | 'createdAt'>) => Farmer;
  authenticateFarmer: (dni: string) => Farmer | null;

  // Product management
  addPresetProduct: (product: Omit<PresetProduct, 'id'>) => void;
  uploadFarmerProducts: (products: Omit<FarmerProduct, 'id' | 'createdAt' | 'updatedAt'>[]) => void;
  updateCustomerPrice: (productId: string, price: number) => void;

  // Order management
  getConsolidatedStock: (periodId: string) => any[];
  getFarmerOrderSummary: (farmerId: string, periodId: string) => FarmerOrderSummary | null;
  markFarmerReady: (farmerId: string, periodId: string) => void;
}

const FreshProduceContext = createContext<FreshProduceContextType | undefined>(undefined);

// Mock data
const mockPresetProducts: PresetProduct[] = [
  { id: '1', name: 'Acelga agroecológica', category: 'hortaliza', unit: 'atado', icon: '🥬' },
  { id: '2', name: 'Apio agroecológico', category: 'hortaliza', unit: 'atado', icon: '🥬' },
  { id: '3', name: 'Cilantro agroecológico', category: 'hortaliza', unit: 'atado', icon: '🌿' },
  { id: '4', name: 'Espinaca agroecológica', category: 'hortaliza', unit: 'atado', icon: '🥬' },
  { id: '5', name: 'Lechuga carola agroecológica', category: 'hortaliza', unit: 'unidad', icon: '🥬' },
  { id: '6', name: 'Perejil agroecológico', category: 'hortaliza', unit: 'atado', icon: '🌿' },
  { id: '7', name: 'Tomate agroecológica', category: 'hortaliza', unit: 'kg', icon: '🍅' },
];

const mockFarmers: Farmer[] = [
  { id: '1', name: 'Juan Mamani', dni: '12345678', phone: '+51 987 654 321', active: true, createdAt: new Date() },
  { id: '2', name: 'Rosa Quispe', dni: '23456789', phone: '+51 988 765 432', active: true, createdAt: new Date() },
  { id: '3', name: 'Carlos Flores', dni: '34567890', phone: '+51 989 876 543', active: true, createdAt: new Date() },
];

const mockPeriods: Period[] = [
  {
    id: '1',
    name: 'Semana del 12 al 18 de mayo',
    startDate: new Date('2026-05-12'),
    endDate: new Date('2026-05-18'),
    status: 'activo',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Semana del 5 al 11 de mayo',
    startDate: new Date('2026-05-05'),
    endDate: new Date('2026-05-11'),
    status: 'cerrado',
    createdAt: new Date(),
  },
];

const mockFarmerProducts: FarmerProduct[] = [
  // Period 1 (Active) products
  {
    id: '1',
    farmerId: '1',
    periodId: '1',
    productName: 'Acelga agroecológica',
    quantity: 20,
    unit: 'atado',
    farmerPrice: 2.90,
    customerPrice: 2.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    farmerId: '2',
    periodId: '1',
    productName: 'Apio agroecológico',
    quantity: 18,
    unit: 'atado',
    farmerPrice: 2.90,
    customerPrice: 2.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    farmerId: '3',
    periodId: '1',
    productName: 'Cilantro agroecológico',
    quantity: 25,
    unit: 'atado',
    farmerPrice: 2.30,
    customerPrice: 2.30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    farmerId: '1',
    periodId: '1',
    productName: 'Espinaca agroecológica',
    quantity: 16,
    unit: 'atado',
    farmerPrice: 4.20,
    customerPrice: 4.20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    farmerId: '2',
    periodId: '1',
    productName: 'Lechuga carola agroecológica',
    quantity: 24,
    unit: 'unidad',
    farmerPrice: 2.90,
    customerPrice: 2.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Period 2 (Closed) products - for testing order summary
  {
    id: '6',
    farmerId: '1',
    periodId: '2',
    productName: 'Acelga agroecológica',
    quantity: 12,
    unit: 'atado',
    farmerPrice: 2.90,
    customerPrice: 2.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    farmerId: '1',
    periodId: '2',
    productName: 'Lechuga carola agroecológica',
    quantity: 18,
    unit: 'unidad',
    farmerPrice: 2.90,
    customerPrice: 2.90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    farmerId: '1',
    periodId: '2',
    productName: 'Tomate agroecológica',
    quantity: 10,
    unit: 'kg',
    farmerPrice: 5.00,
    customerPrice: 5.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function FreshProduceProvider({ children }: { children: ReactNode }) {
  const [periods, setPeriods] = useState<Period[]>(mockPeriods);
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [presetProducts, setPresetProducts] = useState<PresetProduct[]>(mockPresetProducts);
  const [farmerProducts, setFarmerProducts] = useState<FarmerProduct[]>(mockFarmerProducts);
  const [farmerOrderSummaries, setFarmerOrderSummaries] = useState<FarmerOrderSummary[]>([]);
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);

  const activePeriod = periods.find((p) => p.status === 'activo') || null;

  const createPeriod = (periodData: Omit<Period, 'id' | 'createdAt'>) => {
    const newPeriod: Period = {
      ...periodData,
      id: String(Date.now()),
      createdAt: new Date(),
    };
    setPeriods((prev) => [...prev, newPeriod]);
    return newPeriod;
  };

  const closePeriod = (periodId: string) => {
    setPeriods((prev) =>
      prev.map((p) => (p.id === periodId ? { ...p, status: 'cerrado' as PeriodStatus } : p))
    );
  };

  const registerFarmer = (farmerData: Omit<Farmer, 'id' | 'createdAt'>) => {
    const newFarmer: Farmer = {
      ...farmerData,
      id: String(Date.now()),
      createdAt: new Date(),
    };
    setFarmers((prev) => [...prev, newFarmer]);
    return newFarmer;
  };

  const authenticateFarmer = (dni: string) => {
    return farmers.find((f) => f.dni === dni && f.active) || null;
  };

  const addPresetProduct = (product: Omit<PresetProduct, 'id'>) => {
    const newProduct: PresetProduct = {
      ...product,
      id: String(Date.now()),
    };
    setPresetProducts((prev) => [...prev, newProduct]);
  };

  const uploadFarmerProducts = (products: Omit<FarmerProduct, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const now = new Date();
    const newProducts = products.map((p) => ({
      ...p,
      id: String(Date.now() + Math.random()),
      createdAt: now,
      updatedAt: now,
    }));
    setFarmerProducts((prev) => [...prev, ...newProducts]);
  };

  const updateCustomerPrice = (productId: string, price: number) => {
    setFarmerProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, customerPrice: price, updatedAt: new Date() } : p))
    );
  };

  const getConsolidatedStock = (periodId: string) => {
    const periodProducts = farmerProducts.filter((p) => p.periodId === periodId);

    const consolidated: Record<string, any> = {};

    periodProducts.forEach((p) => {
      if (!consolidated[p.productName]) {
        consolidated[p.productName] = {
          productName: p.productName,
          unit: p.unit,
          totalStock: 0,
          customerPrice: p.customerPrice || 0,
          farmers: [],
          ordersReceived: 0,
        };
      }

      consolidated[p.productName].totalStock += p.quantity;
      consolidated[p.productName].farmers.push({
        farmerId: p.farmerId,
        farmerName: farmers.find((f) => f.id === p.farmerId)?.name || 'Desconocido',
        quantity: p.quantity,
        farmerPrice: p.farmerPrice,
      });
    });

    return Object.values(consolidated);
  };

  const getFarmerOrderSummary = (farmerId: string, periodId: string) => {
    return farmerOrderSummaries.find(
      (s) => s.farmerId === farmerId && s.periodId === periodId
    ) || null;
  };

  const markFarmerReady = (farmerId: string, periodId: string) => {
    setFarmerOrderSummaries((prev) => {
      const existing = prev.find((s) => s.farmerId === farmerId && s.periodId === periodId);
      if (existing) {
        return prev.map((s) =>
          s.farmerId === farmerId && s.periodId === periodId
            ? { ...s, confirmedReady: true, confirmedAt: new Date() }
            : s
        );
      }
      return prev;
    });
  };

  return (
    <FreshProduceContext.Provider
      value={{
        periods,
        farmers,
        presetProducts,
        farmerProducts,
        farmerOrderSummaries,
        customerOrders,
        activePeriod,
        createPeriod,
        closePeriod,
        registerFarmer,
        authenticateFarmer,
        addPresetProduct,
        uploadFarmerProducts,
        updateCustomerPrice,
        getConsolidatedStock,
        getFarmerOrderSummary,
        markFarmerReady,
      }}
    >
      {children}
    </FreshProduceContext.Provider>
  );
}

export function useFreshProduce() {
  const context = useContext(FreshProduceContext);
  if (!context) {
    throw new Error('useFreshProduce must be used within FreshProduceProvider');
  }
  return context;
}
