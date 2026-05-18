import { useState } from 'react';
import { Search, Plus, MoreVertical } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { Product } from '../../contexts/CartContext';
import { ProductImage } from '../../components/ProductImage';

export function Products() {
  const { products, updateProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [editedProducts, setEditedProducts] = useState<Record<string, Partial<Product>>>({});

  const categories = ['hortalizas', 'hierbas', 'menestras', 'endulzante', 'miel y derivados', 'sin gluten', 'frutas', 'pan', 'aceites', 'fideos', 'snacks', 'untables'];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingChangesCount = Object.keys(editedProducts).length;

  const handleEdit = (productId: string, field: string, value: any) => {
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSaveAll = () => {
    Object.entries(editedProducts).forEach(([id, changes]) => {
      updateProduct(id, changes);
    });
    setEditedProducts({});
  };

  const handleDiscard = () => {
    setEditedProducts({});
  };

  const getDisplayValue = (product: Product, field: keyof Product) => {
    if (editedProducts[product.id]?.[field] !== undefined) {
      return editedProducts[product.id][field];
    }
    return product[field];
  };

  const isEdited = (productId: string, field: keyof Product) => {
    return editedProducts[productId]?.[field] !== undefined;
  };

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-2xl font-bold text-[#1C1C1C]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Productos
          </h1>
          <p className="text-sm text-[#757575]">{products.length} productos</p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 lg:flex-none px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg font-medium hover:bg-[#F1F8E9] transition-colors">
            + Nuevo producto
          </button>
          {pendingChangesCount > 0 && (
            <button
              onClick={handleSaveAll}
              className="flex-1 lg:flex-none px-4 py-2 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#1B5E20] transition-colors"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
        <div className="overflow-x-auto smooth-scroll">
          <table className="w-full">
            <thead className="bg-[#F2F2EC] border-b border-[#E8E8E0]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Imagen
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Producto
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Categoría
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Precio
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#E8E8E0] hover:bg-[#FAFAF7]"
                >
                  <td className="px-4 py-3">
                    <ProductImage
                      product={product}
                      className="w-10 h-10 rounded-lg"
                      showIndicator={false}
                    />
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${
                      isEdited(product.id, 'name')
                        ? 'bg-[#F1F8E9] border-b-2 border-[#2E7D32]'
                        : ''
                    }`}
                  >
                    <input
                      type="text"
                      value={getDisplayValue(product, 'name') as string}
                      onChange={(e) => handleEdit(product.id, 'name', e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isEdited(product.id, 'category')
                        ? 'bg-[#F1F8E9] border-b-2 border-[#2E7D32]'
                        : ''
                    }`}
                  >
                    <select
                      value={getDisplayValue(product, 'category') as string}
                      onChange={(e) => handleEdit(product.id, 'category', e.target.value)}
                      className="text-xs px-2 py-1 bg-[#E8E8E0] rounded-full border-none focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${
                      isEdited(product.id, 'price')
                        ? 'bg-[#F1F8E9] border-b-2 border-[#2E7D32]'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>S/</span>
                      <input
                        type="number"
                        step="0.01"
                        value={getDisplayValue(product, 'price') as number}
                        onChange={(e) =>
                          handleEdit(product.id, 'price', parseFloat(e.target.value))
                        }
                        className="w-20 bg-transparent border-none focus:outline-none"
                      />
                    </div>
                  </td>
                  <td
                    className={`px-4 py-3 ${
                      isEdited(product.id, 'stock')
                        ? 'bg-[#F1F8E9] border-b-2 border-[#2E7D32]'
                        : (product.stock as number) === 0
                        ? 'bg-red-50'
                        : (product.stock as number) < 5
                        ? 'bg-amber-50'
                        : ''
                    }`}
                  >
                    <input
                      type="number"
                      value={getDisplayValue(product, 'stock') as number}
                      onChange={(e) =>
                        handleEdit(product.id, 'stock', parseInt(e.target.value))
                      }
                      className="w-16 text-sm bg-transparent border-none focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#E8E8E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-[#757575]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredProducts.map((product, index) => {
          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl p-4 shadow-sm transition-all duration-300 ${
                editedProducts[product.id] ? 'ring-2 ring-[#2E7D32] shadow-lg' : ''
              }`}
              style={{
                animation: 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                animationDelay: `${Math.min(index * 0.03, 0.2)}s`,
                animationFillMode: 'backwards'
              }}
            >
              <div className="flex gap-3 mb-4">
                <ProductImage
                  product={product}
                  className="w-14 h-14 rounded-lg flex-shrink-0"
                  showIndicator={false}
                />
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={getDisplayValue(product, 'name') as string}
                    onChange={(e) => handleEdit(product.id, 'name', e.target.value)}
                    className={`w-full text-sm font-medium text-[#1C1C1C] bg-transparent border-none focus:outline-none mb-1 ${
                      isEdited(product.id, 'name')
                        ? 'bg-[#F1F8E9] px-2 py-1 rounded'
                        : ''
                    }`}
                  />
                  {product.featured && (
                    <span className="inline-block text-[10px] px-2 py-0.5 bg-[#1B5E20] text-white rounded-full mt-1">
                      ★ Destacado
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#757575]">Stock</label>
                  <input
                    type="number"
                    value={getDisplayValue(product, 'stock') as number}
                    onChange={(e) =>
                      handleEdit(product.id, 'stock', parseInt(e.target.value))
                    }
                    className={`w-20 px-2 py-1 text-sm text-right font-medium border border-[#E8E8E0] rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${
                      isEdited(product.id, 'stock')
                        ? 'bg-[#F1F8E9] border-[#2E7D32]'
                        : 'bg-white'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#757575]">Precio</label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">S/</span>
                    <input
                      type="number"
                      step="0.01"
                      value={getDisplayValue(product, 'price') as number}
                      onChange={(e) =>
                        handleEdit(product.id, 'price', parseFloat(e.target.value))
                      }
                      className={`w-20 px-2 py-1 text-sm text-right font-medium border border-[#E8E8E0] rounded focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${
                        isEdited(product.id, 'price')
                          ? 'bg-[#F1F8E9] border-[#2E7D32]'
                          : 'bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#757575]">Categoría</label>
                  <select
                    value={getDisplayValue(product, 'category') as string}
                    onChange={(e) => handleEdit(product.id, 'category', e.target.value)}
                    className={`px-3 py-1 text-xs rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${
                      isEdited(product.id, 'category')
                        ? 'bg-[#F1F8E9] text-[#2E7D32] font-medium'
                        : 'bg-[#E8E8E0] text-[#757575]'
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#757575]">Estado</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#E8E8E0] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Save Bar */}
      {pendingChangesCount > 0 && (
        <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 lg:left-60 bg-[#2E7D32] text-white px-4 py-3 shadow-lg z-40">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="text-sm font-medium">
              Tienes {pendingChangesCount} cambios sin guardar
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 border border-white/30 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Descartar
              </button>
              <button
                onClick={handleSaveAll}
                className="px-4 py-2 bg-white text-[#2E7D32] rounded-lg text-sm font-medium hover:bg-[#F2F2EC] transition-colors"
              >
                Guardar cambios →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
