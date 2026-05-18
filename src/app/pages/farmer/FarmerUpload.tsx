import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Check, X, Search } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

type Unit = 'kg' | 'unidad' | 'gr' | 'atado';

interface ProductInput {
  id: string;
  productName: string;
  quantity: string;
  price: string;
  unit: Unit;
  comment: string;
  imageUrl: string;
  skipped: boolean;
}

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="100%" height="100%" fill="#E8F5E9"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="28" fill="#2E7D32">
        Producto fresco
      </text>
    </svg>
  `);

const PHOTO_PRODUCTS: Array<
  Pick<ProductInput, 'id' | 'productName' | 'quantity' | 'price' | 'unit' | 'imageUrl'>
> = [
  {
    id: 'acelga-agroecologica',
    quantity: '1',
    price: '2.90',
    unit: 'atado',
    productName: 'Acelga agroecológica',
    imageUrl: '/images/ACELGA AGROECOLÓGICA- fondo blanco.jpg',
  },
  {
    id: 'apio-agroecologico',
    quantity: '1',
    price: '2.90',
    unit: 'atado',
    productName: 'Apio agroecológico',
    imageUrl: '/images/APIO AGROECOLÓGICO- fondo blanco.jpg',
  },
  {
    id: 'cilantro-agroecologico',
    quantity: '1',
    price: '2.30',
    unit: 'atado',
    productName: 'Cilantro agroecológico',
    imageUrl: '/images/CILANTRO AGROECOLÓGICO- fondo blanco.jpg',
  },
  {
    id: 'espinaca-agroecologica',
    quantity: '1',
    price: '4.20',
    unit: 'atado',
    productName: 'Espinaca agroecológica',
    imageUrl: '/images/ESPINACA-ORGANICA-TUMERCADO.jpg',
  },
  {
    id: 'lechuga-carola-agroecologica',
    quantity: '1',
    price: '2.90',
    unit: 'unidad',
    productName: 'Lechuga carola agroecológica',
    imageUrl: '/images/LECHUGA AGROECOLÓGICA- fondo blanco.png',
  },
  {
    id: 'perejil-agroecologico',
    quantity: '1',
    price: '2.30',
    unit: 'atado',
    productName: 'Perejil agroecológico',
    imageUrl: '/images/PEREJIL AGROECOLÓGICO- fondo blanco.jpg',
  },
  {
    id: 'tomate-agroecologica',
    quantity: '1',
    price: '5.00',
    unit: 'kg',
    productName: 'Tomate agroecológica',
    imageUrl: '/images/TOMATE AGROECOLÓGICO - fondo blanco.jpg',
  },
];
export function FarmerUpload() {
  const navigate = useNavigate();
  const { activePeriod, uploadFarmerProducts, farmerProducts } = useFreshProduce();

  const [farmerId, setFarmerId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [productInputs, setProductInputs] = useState<ProductInput[]>([]);
  const [customProducts, setCustomProducts] = useState<ProductInput[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedId = sessionStorage.getItem('farmerId');

    if (!storedId) {
      navigate('/agricultor');
      return;
    }

    setFarmerId(storedId);

    const existing = activePeriod
      ? farmerProducts.filter(
          (fp) => fp.farmerId === storedId && fp.periodId === activePeriod.id
        )
      : [];

    const initialProducts = PHOTO_PRODUCTS.map((product) => {
      const savedProduct = existing.find(
        (fp) =>
          fp.productName === product.productName &&
          String((fp as any).unit) === product.unit
      );

      return {
        ...product,
        quantity: savedProduct ? String(savedProduct.quantity) : product.quantity,
        price: savedProduct ? savedProduct.farmerPrice.toFixed(2) : product.price,
        comment: savedProduct ? String((savedProduct as any).comment || '') : '',
        skipped: false,
      };
    });

    setProductInputs(initialProducts);
  }, [navigate, farmerProducts, activePeriod]);

  const handleInputChange = (
    id: string,
    field: 'quantity' | 'price' | 'comment',
    value: string
  ) => {
    setProductInputs((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleSkip = (id: string) => {
    setProductInputs((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              skipped: !product.skipped,
            }
          : product
      )
    );
  };

  const addCustomProduct = () => {
    setCustomProducts((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        productName: '',
        quantity: '',
        price: '',
        unit: 'kg',
        comment: '',
        imageUrl: PLACEHOLDER_IMAGE,
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
      prev.map((product, i) =>
        i === index
          ? {
              ...product,
              [field]: field === 'unit' ? (value as Unit) : value,
            }
          : product
      )
    );
  };

  const removeCustomProduct = (index: number) => {
    setCustomProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!activePeriod) return;

    const productsToUpload: any[] = [];

    productInputs.forEach((input) => {
      if (!input.skipped && input.quantity && input.price) {
        productsToUpload.push({
          farmerId,
          periodId: activePeriod.id,
          productName: input.productName,
          quantity: parseFloat(input.quantity),
          unit: input.unit,
          farmerPrice: parseFloat(input.price),
          comment: input.comment.trim(),
          imageUrl: input.imageUrl,
        });
      }
    });

    customProducts.forEach((input) => {
      if (input.productName && input.quantity && input.price) {
        productsToUpload.push({
          farmerId,
          periodId: activePeriod.id,
          productName: input.productName,
          quantity: parseFloat(input.quantity),
          unit: input.unit,
          farmerPrice: parseFloat(input.price),
          comment: input.comment.trim(),
          imageUrl: input.imageUrl,
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

  const filteredProducts = productInputs.filter((product) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return true;

    return (
      product.productName.toLowerCase().includes(term) ||
      product.unit.toLowerCase().includes(term)
    );
  });

  const filledCount =
    productInputs.filter((p) => !p.skipped && p.quantity && p.price).length +
    customProducts.filter((p) => p.productName && p.quantity && p.price).length;

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

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4 sticky top-0 z-20">
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
              {filledCount}{' '}
              {filledCount === 1 ? 'producto agregado' : 'productos agregados'}
            </p>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-[#E8F5E9] border border-[#2E7D32] rounded-xl p-5 mb-4 animate-fade-in">
          <h2 className="text-lg font-bold text-[#1B5E20] mb-2">
            Agrega lo que tienes disponible esta semana
          </h2>
          <p className="text-base text-[#757575]">
            La lista ya viene con las cantidades y unidades de referencia.
            Solo coloca precio y algún comentario si es necesario.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E8E0] p-3 mb-5 sticky top-[73px] z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#757575]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full h-11 bg-transparent text-base text-[#1C1C1C] placeholder:text-[#9E9E9E] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {filteredProducts.map((input, index) => (
            <div
              key={input.id}
              className={`bg-white rounded-2xl p-4 shadow-sm transition-all animate-fade-in ${
                !input.skipped && input.quantity && input.price
                  ? 'border-l-4 border-[#2E7D32]'
                  : 'border border-[#EFEFE8]'
              } ${input.skipped ? 'opacity-50' : ''}`}
              style={{
                animationDelay: `${Math.min(index * 0.03, 0.2)}s`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
  <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-[#E8F5E9]">
    <img
      src={input.imageUrl}
      alt={input.productName}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = PLACEHOLDER_IMAGE;
      }}
      className="w-full h-full object-cover"
    />
  </div>

  <div className="flex-1 min-w-0">
    <h3 className="text-xl font-bold text-[#1C1C1C] leading-tight">
      {input.productName}
    </h3>

    <p className="text-sm text-[#757575] mt-1">
      Presentación: {input.quantity} {input.unit}
    </p>

    <span className="inline-flex mt-2 px-3 py-1 bg-[#F1F8E9] text-[#2E7D32] rounded-full text-sm font-bold">
      {input.quantity} {input.unit}
    </span>
  </div>
</div>

              {!input.skipped ? (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#757575] mb-2">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.5"
                        value={input.quantity}
                        onChange={(e) =>
                          handleInputChange(input.id, 'quantity', e.target.value)
                        }
                        placeholder="0"
                        className="w-full h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#757575] mb-2">
                        Unidad
                      </label>
                      <div className="h-14 px-4 flex items-center bg-[#F7F7F2] border-2 border-[#E8E8E0] rounded-xl text-lg font-medium text-[#757575]">
                        {input.unit}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#757575] mb-2">
                      Precio para esta presentación
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-[#757575]">S/</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        value={input.price}
                        onChange={(e) =>
                          handleInputChange(input.id, 'price', e.target.value)
                        }
                        placeholder="0.00"
                        className="flex-1 h-14 px-4 text-lg bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#757575] mb-2">
                      Comentario
                    </label>
                    <textarea
                      value={input.comment}
                      onChange={(e) =>
                        handleInputChange(input.id, 'comment', e.target.value)
                      }
                      placeholder="Ej: cosechado hoy, hojas pequeñas, disponible desde mañana..."
                      rows={3}
                      className="w-full px-4 py-3 text-base bg-white border-2 border-[#E8E8E0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={() => handleSkip(input.id)}
                    className="w-full h-12 border border-[#E8E8E0] text-[#757575] rounded-xl text-base font-medium hover:bg-[#F2F2EC] transition-colors"
                  >
                    No tengo esta semana
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSkip(input.id)}
                  className="w-full h-12 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-base font-medium hover:bg-[#F1F8E9] transition-colors"
                >
                  Sí tengo, agregar
                </button>
              )}
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl p-6 text-center border border-[#E8E8E0]">
              <p className="text-[#757575] text-base">
                No encontramos productos con ese nombre.
              </p>
            </div>
          )}
        </div>

        {customProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 shadow-sm mb-3 border border-[#2E7D32]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1C1C1C]">
                Producto personalizado
              </h3>

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
                    <option value="gr">gr</option>
                    <option value="atado">atado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Precio
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

              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Comentario
                </label>
                <textarea
                  value={product.comment}
                  onChange={(e) =>
                    updateCustomProduct(index, 'comment', e.target.value)
                  }
                  placeholder="Ej: cosechado hoy, disponible mañana..."
                  rows={3}
                  className="w-full px-4 py-3 text-base bg-white border-2 border-[#E8E8E0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCustomProduct}
          className="w-full h-14 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl text-lg font-medium hover:bg-[#F1F8E9] transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          ¿Tienes otro producto?
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E8E8E0] p-4 z-20">
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
