import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Check, X } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

interface ProductInput {
  productName: string;
  quantity: string;
  price: string;
  unit: 'kg' | 'unidad';
  skipped: boolean;
}

export function FarmerUpload() {
  const navigate = useNavigate();
  const { activePeriod, presetProducts, uploadFarmerProducts, farmerProducts } =
    useFreshProduce();
  const [farmerId, setFarmerId] = useState('');
  const [productInputs, setProductInputs] = useState<Record<string, ProductInput>>({});
  const [customProducts, setCustomProducts] = useState<ProductInput[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedId = sessionStorage.getItem('farmerId');
    if (!storedId) {
      navigate('/agricultor');
      return;
    }
    setFarmerId(storedId);

    // Initialize preset products
    const initial: Record<string, ProductInput> = {};
    presetProducts.forEach((p) => {
      initial[p.name] = {
        productName: p.name,
        quantity: '',
        price: '',
        unit: p.unit,
        skipped: false,
      };
    });

    // Load existing products if editing
    if (activePeriod) {
      const existing = farmerProducts.filter(
        (fp) => fp.farmerId === storedId && fp.periodId === activePeriod.id
      );
      existing.forEach((fp) => {
        if (initial[fp.productName]) {
          initial[fp.productName] = {
            productName: fp.productName,
            quantity: String(fp.quantity),
            price: String(fp.farmerPrice),
            unit: fp.unit,
            skipped: false,
          };
        }
      });
    }

    setProductInputs(initial);
  }, [navigate, presetProducts, farmerProducts, activePeriod, farmerId]);

  const handleInputChange = (
    productName: string,
    field: 'quantity' | 'price',
    value: string
  ) => {
    setProductInputs((prev) => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        [field]: value,
      },
    }));
  };

  const handleSkip = (productName: string) => {
    setProductInputs((prev) => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        skipped: !prev[productName].skipped,
        quantity: '',
        price: '',
      },
    }));
  };

  const addCustomProduct = () => {
    setCustomProducts((prev) => [
      ...prev,
      {
        productName: '',
        quantity: '',
        price: '',
        unit: 'kg',
        skipped: false,
      },
    ]);
  };

  const updateCustomProduct = (
    index: number,
    field: keyof ProductInput,
    value: string
  ) => {
    setCustomProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const removeCustomProduct = (index: number) => {
    setCustomProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!activePeriod) return;

    const productsToUpload = [];

    // Collect preset products
    Object.values(productInputs).forEach((input) => {
      if (!input.skipped && input.quantity && input.price) {
        productsToUpload.push({
          farmerId,
          periodId: activePeriod.id,
          productName: input.productName,
          quantity: parseFloat(input.quantity),
          unit: input.unit,
          farmerPrice: parseFloat(input.price),
        });
      }
    });

    // Collect custom products
    customProducts.forEach((input) => {
      if (input.productName && input.quantity && input.price) {
        productsToUpload.push({
          farmerId,
          periodId: activePeriod.id,
          productName: input.productName,
          quantity: parseFloat(input.quantity),
          unit: input.unit,
          farmerPrice: parseFloat(input.price),
        });
      }
    });

    if (productsToUpload.length === 0) {
      alert('Agrega al menos un producto antes de guardar');
      return;
    }

    uploadFarmerProducts(productsToUpload);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-bounce-in">
          <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-[#388E3C]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-4">
            ¡Listo! Guardamos tus productos.
          </h1>
          <p className="text-xl text-[#757575] mb-8">
            Buena Tierra ya puede ver lo que tienes disponible.
          </p>
          <button
            onClick={() => navigate('/agricultor/home')}
            className="w-full h-16 bg-[#2E7D32] text-white rounded-xl font-bold text-xl hover:bg-[#1B5E20] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const getPresetIcon = (name: string) => {
    const product = presetProducts.find((p) => p.name === name);
    return product?.icon || '🌿';
  };

  const filledCount = Object.values(productInputs).filter(
    (p) => !p.skipped && p.quantity && p.price
  ).length + customProducts.filter((p) => p.productName && p.quantity && p.price).length;

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/agricultor/home')}
              className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#1C1C1C]">Mis productos</h1>
              <p className="text-sm text-[#757575]">
                {filledCount} {filledCount === 1 ? 'producto agregado' : 'productos agregados'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Instructions */}
        <div className="bg-[#E8F5E9] border border-[#2E7D32] rounded-xl p-5 mb-6 animate-fade-in">
          <h2 className="text-lg font-bold text-[#1B5E20] mb-2">
            Agrega lo que tienes disponible esta semana
          </h2>
          <p className="text-base text-[#757575]">
            Llena la cantidad y el precio para cada producto que tengas
          </p>
        </div>

        {/* Preset Products */}
        <div className="space-y-3 mb-6">
          {Object.entries(productInputs).map(([name, input], index) => (
            <div
              key={name}
              className={`bg-white rounded-2xl p-5 shadow-sm transition-all animate-fade-in ${
                !input.skipped && input.quantity && input.price
                  ? 'border-l-4 border-[#2E7D32]'
                  : ''
              } ${input.skipped ? 'opacity-50' : ''}`}
              style={{
                animationDelay: `${Math.min(index * 0.03, 0.2)}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{getPresetIcon(name)}</span>
                <h3 className="text-xl font-bold text-[#1C1C1C]">{name}</h3>
              </div>

              {!input.skipped ? (
                <>
                  <p className="text-base text-[#757575] mb-4">
                    ¿Cuántos {input.unit} tienes?
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#757575] mb-2">
                        Cantidad
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          inputMode="decimal"
                          step="0.5"
                          value={input.quantity}
                          onChange={(e) =>
                            handleInputChange(name, 'quantity', e.target.value)
                          }
                          placeholder="0"
                          className="flex-1 h-14 px-4 text-xl bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                          style={{ fontSize: '20px' }}
                        />
                        <span className="text-lg font-medium text-[#757575] min-w-[60px]">
                          {input.unit}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#757575] mb-2">
                        Precio por {input.unit}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-medium text-[#757575]">S/</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          value={input.price}
                          onChange={(e) =>
                            handleInputChange(name, 'price', e.target.value)
                          }
                          placeholder="0.00"
                          className="flex-1 h-14 px-4 text-xl bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                          style={{ fontSize: '20px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSkip(name)}
                    className="w-full h-12 border border-[#E8E8E0] text-[#757575] rounded-xl text-base font-medium hover:bg-[#F2F2EC] transition-colors"
                  >
                    No tengo esta semana
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSkip(name)}
                  className="w-full h-12 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-base font-medium hover:bg-[#F1F8E9] transition-colors"
                >
                  Sí tengo, agregar
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Custom Products */}
        {customProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm mb-3 border border-[#2E7D32]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1C1C1C]">Producto personalizado</h3>
              <button
                onClick={() => removeCustomProduct(index)}
                className="p-2 text-[#D32F2F] hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  ¿Qué producto es?
                </label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) =>
                    updateCustomProduct(index, 'productName', e.target.value)
                  }
                  placeholder="Ej: Ají amarillo"
                  className="w-full h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#757575] mb-2">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    value={product.quantity}
                    onChange={(e) =>
                      updateCustomProduct(index, 'quantity', e.target.value)
                    }
                    placeholder="0"
                    className="w-full h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#757575] mb-2">
                    Unidad
                  </label>
                  <select
                    value={product.unit}
                    onChange={(e) =>
                      updateCustomProduct(index, 'unit', e.target.value)
                    }
                    className="w-full h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="kg">kg</option>
                    <option value="unidad">unidad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Precio por {product.unit}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-[#757575]">S/</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={product.price}
                    onChange={(e) =>
                      updateCustomProduct(index, 'price', e.target.value)
                    }
                    placeholder="0.00"
                    className="flex-1 h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Custom Product Button */}
        <button
          onClick={addCustomProduct}
          className="w-full h-14 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl text-lg font-medium hover:bg-[#F1F8E9] transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          ¿Tienes otro producto?
        </button>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E8E8E0] p-4 z-10">
        <button
          onClick={handleSave}
          className="w-full h-16 bg-[#2E7D32] text-white rounded-xl font-bold text-xl hover:bg-[#1B5E20] transition-colors flex items-center justify-center gap-2"
        >
          <span>💾</span>
          Guardar mis productos
        </button>
      </div>
    </div>
  );
}
