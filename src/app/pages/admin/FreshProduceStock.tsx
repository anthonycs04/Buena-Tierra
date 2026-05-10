import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

export function FreshProduceStock() {
  const { activePeriod, getConsolidatedStock, farmers } = useFreshProduce();
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  if (!activePeriod) {
    return (
      <div className="p-4 lg:p-6 pb-20 lg:pb-6">
        <div className="bg-[#FFF9E6] border border-[#F9A825] rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-[#F9A825] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-2">
            No hay período activo
          </h2>
          <p className="text-[#757575]">
            Crea un período nuevo para ver el stock consolidado
          </p>
        </div>
      </div>
    );
  }

  const consolidatedStock = getConsolidatedStock(activePeriod.id);

  const toggleExpand = (productName: string) => {
    setExpandedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productName)) {
        newSet.delete(productName);
      } else {
        newSet.add(productName);
      }
      return newSet;
    });
  };

  const getStockStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return 'critical';
    if (percentage < 30) return 'low';
    return 'good';
  };

  const farmerColors = ['#2E7D32', '#2196F3', '#9C27B0', '#FF9800', '#00897B'];

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#1C1C1C] mb-2 animate-fade-in"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Stock consolidado
        </h1>
        <p className="text-[#757575]">{activePeriod.name}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium">
          Todos los productos
        </button>
        <button className="px-4 py-2 border border-[#E8E8E0] text-[#757575] rounded-lg text-sm font-medium hover:border-[#2E7D32]">
          Con stock bajo
        </button>
        <button className="px-4 py-2 border border-[#E8E8E0] text-[#757575] rounded-lg text-sm font-medium hover:border-[#2E7D32]">
          Agotados
        </button>
        <input
          type="text"
          placeholder="Buscar producto..."
          className="ml-auto px-4 py-2 border border-[#E8E8E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] min-w-[200px]"
        />
      </div>

      {/* Stock List */}
      <div className="space-y-3">
        {consolidatedStock.map((item, index) => {
          const isExpanded = expandedProducts.has(item.productName);
          const available = item.totalStock - item.ordersReceived;
          const status = getStockStatus(available, item.totalStock);

          return (
            <div
              key={item.productName}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${Math.min(index * 0.05, 0.3)}s`,
              }}
            >
              {/* Collapsed View */}
              <div
                onClick={() => toggleExpand(item.productName)}
                className="p-5 cursor-pointer hover:bg-[#FAFAF7] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1C1C1C]">
                        {item.productName}
                      </h3>
                      {available === 0 && (
                        <span className="px-3 py-1 bg-red-50 text-[#D32F2F] rounded-full text-xs font-bold">
                          Agotado
                        </span>
                      )}
                      {status === 'low' && available > 0 && (
                        <span className="px-3 py-1 bg-amber-50 text-[#F9A825] rounded-full text-xs font-bold">
                          Stock bajo
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#757575]">
                      <span>
                        Total: <strong className="text-[#1C1C1C]">{item.totalStock} {item.unit}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Pedidos: <strong className="text-[#F9A825]">{item.ordersReceived} {item.unit}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Disponible: <strong className="text-[#2E7D32]">{available} {item.unit}</strong>
                      </span>
                      <span>•</span>
                      <span>{item.farmers.length} agricultores</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#757575]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#757575]" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-[#F2F2EC] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#2E7D32] transition-all"
                    style={{
                      width: `${(available / item.totalStock) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute left-0 top-0 h-full bg-[#F9A825] transition-all"
                    style={{
                      left: `${(available / item.totalStock) * 100}%`,
                      width: `${(item.ordersReceived / item.totalStock) * 100}%`,
                    }}
                  />
                </div>

                {/* Price Info */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-[#757575]">
                    Precio cliente: <strong className="text-[#2E7D32]">S/ {item.customerPrice.toFixed(2)}</strong> por {item.unit}
                  </span>
                </div>
              </div>

              {/* Expanded View - Farmer Breakdown */}
              {isExpanded && (
                <div className="border-t border-[#E8E8E0] bg-[#FAFAF7] p-5 animate-slide-down">
                  <h4 className="text-sm font-bold text-[#1C1C1C] mb-3">
                    Desglose por agricultor:
                  </h4>
                  <div className="space-y-2">
                    {item.farmers.map((farmer: any, farmerIndex: number) => (
                      <div
                        key={farmer.farmerId}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: farmerColors[farmerIndex % farmerColors.length],
                            }}
                          />
                          <span className="text-sm font-medium text-[#1C1C1C]">
                            {farmer.farmerName}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-[#757575]">
                            {farmer.quantity} {item.unit}
                          </span>
                          <span className="text-sm text-[#757575]">
                            Precio agricultor: <strong>S/ {farmer.farmerPrice.toFixed(2)}</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin Price Control */}
                  <div className="mt-4 pt-4 border-t border-[#E8E8E0]">
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-[#757575]">
                        Precio final cliente:
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={item.customerPrice}
                        className="w-32 px-3 py-2 border border-[#E8E8E0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                      />
                      <span className="text-sm text-[#757575]">por {item.unit}</span>
                      <button className="ml-auto px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1B5E20] transition-colors">
                        Actualizar precio
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {consolidatedStock.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
              Aún no hay productos subidos
            </h3>
            <p className="text-[#757575]">
              Los agricultores podrán subir sus productos durante este período
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
