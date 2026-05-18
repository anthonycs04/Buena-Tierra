import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ShoppingCart, Plus, Check, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAdmin } from '../../contexts/AdminContext';
import { CartSheet } from '../../components/CartSheet';
import { DesktopCartPanel } from '../../components/DesktopCartPanel';
import { ProductImage } from '../../components/ProductImage';

const catalogBanner = '/banner/20260517_232520.jpg.jpeg';

const categories = [
  'Todo',
  'Destacados',
  'Hortalizas',
  'Hierbas',
  'Menestras',
  'Endulzante',
  'Miel y derivados',
  'Sin gluten',
  'Otros',
];

export function Catalog() {
  const navigate = useNavigate();
  const { products } = useAdmin();
  const { addToCart, itemCount, total, items, updateQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todo' ||
      (selectedCategory === 'Destacados' && product.featured) ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const getItemInCart = (productId: string) => {
    return items.find((item) => item.id === productId);
  };

  const handleIncrement = (productId: string) => {
    const item = getItemInCart(productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const item = getItemInCart(productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <>
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden min-h-screen pb-20">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#E8E8E0] shadow-sm z-40">
          <div className="relative h-24 overflow-hidden">
            <img
              src={catalogBanner}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/5" />
            <div className="relative flex h-full items-center justify-between px-4">
            <h1
              className="text-3xl font-bold text-white drop-shadow-md"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Buena Tierra
            </h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 text-[#2E7D32]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F9A825] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>
            </div>
          </div>

        {/* Search Bar */}
          <div className="bg-white px-4 py-3 border-b border-[#E8E8E0]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-[#F2F2EC] border-none rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>
          </div>

        {/* Category Chips */}
          <div className="bg-white border-b border-[#E8E8E0]">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 px-4 py-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-transparent border border-[#E8E8E0] text-[#757575] hover:border-[#2E7D32]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          </div>
        </header>

        {/* Product List - Mobile Horizontal Cards */}
        <div className="pt-[14.75rem] px-4 space-y-2 pb-4">
          {filteredProducts.map((product, index) => {
            const cartItem = getItemInCart(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden flex gap-3 p-3 relative hover:shadow-md transition-shadow animate-fade-in"
                style={{
                  animationDelay: `${Math.min(index * 0.03, 0.2)}s`
                }}
              >
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <ProductImage
                    product={product}
                    className="w-[72px] h-[72px] rounded-lg"
                  />

                  {/* Badges */}
                  {product.promo && (
                    <span className="absolute top-1 left-1 bg-[#F9A825] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      PROMO
                    </span>
                  )}
                  {product.featured && !product.promo && (
                    <span className="absolute top-1 left-1 bg-[#1B5E20] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      ★ TOP
                    </span>
                  )}

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center text-white shadow-md transition-colors"
                    aria-label="Add to cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[#1C1C1C] line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-[15px] font-semibold text-[#2E7D32]">
                      S/ {product.promoPrice || product.price}
                    </p>
                    {product.promo && (
                      <p className="text-xs text-[#757575] line-through">
                        S/ {product.price}
                      </p>
                    )}
                  </div>
                  {product.stock === 0 && (
                    <p className="text-xs text-[#D32F2F] mt-1">Agotado</p>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <p className="text-xs text-[#F9A825] mt-1">
                      Solo quedan {product.stock}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#757575]">No se encontraron productos</p>
            </div>
          )}
        </div>

        {/* Sticky Cart Bar */}
        {itemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-0 left-0 right-0 bg-[#2E7D32] text-white h-14 flex items-center justify-between px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.10)] z-50"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Ver carrito</span>
            </div>
            <div className="font-medium">
              {itemCount} {itemCount === 1 ? 'producto' : 'productos'} · S/{' '}
              {total.toFixed(2)}
            </div>
          </button>
        )}

        {/* Cart Sheet */}
        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            navigate('/checkout/step1');
          }}
        />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex min-h-screen bg-[#FAFAF7] pt-[128px]">
        <header className="fixed top-0 left-0 right-0 h-[128px] bg-white shadow-sm z-40 overflow-hidden">
          <img
            src={catalogBanner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10" />
          <div className="relative flex h-full items-center justify-between px-8">
            <h1
              className="text-5xl font-bold text-white drop-shadow-lg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Buena Tierra
            </h1>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-white/95 border border-white/70 rounded-xl text-sm shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>
        </header>

        {/* Left Sidebar - Categories */}
        <aside className="w-[220px] bg-white border-r border-[#E8E8E0] fixed top-[128px] h-[calc(100vh-128px)] overflow-y-auto smooth-scroll scrollbar-thin">
          <div className="p-6 animate-fade-in">
            <h2 className="text-base font-bold text-[#1C1C1C] mb-4">
              Categorías
            </h2>

            <nav className="space-y-1">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'text-[#2E7D32] font-bold'
                        : 'text-[#757575] hover:text-[#2E7D32]'
                    }`}
                  >
                    {isActive && <Check className="w-4 h-4 text-[#2E7D32]" />}
                    <span className={!isActive ? 'ml-6' : ''}>
                      {category}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className={`flex-1 ml-[220px] transition-all duration-300 ${
            itemCount > 0 ? 'mr-[340px]' : 'mr-0'
          }`}
        >
          <div className="max-w-5xl mx-auto p-8">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <h1
                className="text-4xl font-bold text-[#2E7D32]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {selectedCategory}
              </h1>
            </div>

            {/* Product List - Desktop Vertical Cards */}
            <div className="space-y-4 smooth-scroll">
              {filteredProducts.map((product, index) => {
                const cartItem = getItemInCart(product.id);
                const discount = product.promo
                  ? Math.round(
                      ((product.price - (product.promoPrice || product.price)) /
                        product.price) *
                        100
                    )
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden flex hover:shadow-md transition-shadow duration-300"
                    style={{
                      animation: 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      animationDelay: `${Math.min(index * 0.05, 0.3)}s`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative w-[320px] h-[200px] flex-shrink-0">
                      <ProductImage
                        product={product}
                        className="w-full h-full"
                      />

                      {/* Discount Badge */}
                      {product.promo && discount > 0 && (
                        <div className="absolute top-3 left-3 bg-[#FF5252] text-white px-3 py-1 rounded-full font-bold text-sm">
                          {discount}% OFF
                        </div>
                      )}

                      {/* Add/Quantity Controls */}
                      {!cartItem ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="absolute -bottom-6 -right-6 w-[52px] h-[52px] bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      ) : (
                        <div className="absolute -bottom-6 -right-6 flex items-center gap-2 bg-white rounded-full shadow-lg p-1">
                          <button
                            onClick={() => handleDecrement(product.id)}
                            className="w-10 h-10 bg-[#F2F2EC] hover:bg-[#E8E8E0] rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4 text-[#2E7D32]" />
                          </button>
                          <span className="w-8 text-center font-semibold text-[#1C1C1C]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(product.id)}
                            className="w-10 h-10 bg-[#2E7D32] hover:bg-[#1B5E20] rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-bold text-[#1C1C1C] mb-1 flex items-center gap-2">
                        {product.featured && (
                          <span className="text-[#F9A825]">★</span>
                        )}
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#757575] mb-4">
                        {product.category}
                      </p>

                      <div className="mb-3">
                        <p className="text-3xl font-bold text-[#2E7D32]">
                          {(product.promoPrice || product.price).toFixed(2)} PEN
                        </p>
                        {product.promo && (
                          <p className="text-lg text-[#757575] line-through">
                            {product.price.toFixed(2)} PEN
                          </p>
                        )}
                      </div>

                      <p className="text-sm text-[#757575] leading-relaxed line-clamp-2">
                        {product.description ||
                          'Producto natural y orgánico de alta calidad. Perfecto para una alimentación saludable y balanceada.'}
                      </p>

                      {product.stock === 0 && (
                        <p className="text-sm text-[#D32F2F] mt-3 font-medium">
                          Agotado
                        </p>
                      )}
                      {product.stock > 0 && product.stock < 5 && (
                        <p className="text-sm text-[#F9A825] mt-3 font-medium">
                          Solo quedan {product.stock} unidades
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#757575] text-lg">
                    No se encontraron productos
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Desktop Cart Panel */}
        <DesktopCartPanel
          onCheckout={() => navigate('/checkout/step1')}
        />
      </div>
    </>
  );
}
