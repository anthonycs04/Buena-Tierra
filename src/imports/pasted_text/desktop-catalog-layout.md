Look at the attached reference screenshot carefully. 
This is the CORRECT desktop layout for Buena Tierra's public catalog. 
Redesign the desktop version to match this layout exactly, and fix 
the cart functionality for desktop.

---

DESKTOP CATALOG LAYOUT — match the screenshot:

LEFT SIDEBAR (fixed, ~220px wide, white background, subtle right border):
  - Title: "Categorías" — bold, dark, 16px
  - Category list as vertical links (not chips):
    Active: green checkmark icon left + bold green text
    Inactive: plain gray text, no icon
    On hover: text turns green
  - Categories (in order):
    Todo ✓ (active by default)
    Destacados
    Spirulina
    🎉 Promo
    Menestras
    Endulzante
    Harinas/Polvos
    Hojuelas
    Semillas
    Aceites comestibles
    Snacks
    Chocolate para comer
    Café
    Huevos
    Frutas
    Hortalizas
    Miel y derivados
    Delivery
    Sin gluten
    Hierbas
    Arroz
    Quinua
    Otros
  - Sidebar scrolls independently if categories overflow

MAIN CONTENT AREA (right of sidebar, full remaining width):
  - Active category shown as large green heading: "Todo" (matches screenshot)
  - Product list in VERTICAL CARD format, full width cards:
    
    Each product card (horizontal layout inside card):
    ┌─────────────────────────────────────────────────────────┐
    │  [Product image ~320px wide, left]  │  Product info     │
    │                                     │  ★ Product name   │
    │   [12% OFF badge top-left]          │  Category label   │
    │   [+ green button bottom-right]     │  Price (green)    │
    │                                     │  Original price   │
    │                                     │  (strikethrough)  │
    │                                     │  Short description│
    └─────────────────────────────────────────────────────────┘
    
    Card details:
    - White background, subtle border or shadow, 12px radius
    - Image: left side, ~320px wide, full card height, object-fit: cover
    - 12% OFF badge: red/coral pill top-left corner of image, white bold text
    - "+" button: large green circle (~52px), white plus icon, 
      positioned bottom-right corner of image, slightly overlapping card body
    - ★ icon: amber/yellow star before product name for featured products
    - Product name: bold, dark, 18-20px
    - Category label: small gray text below name (e.g. "Hojuelas")
    - Price: large green bold text "11,90 PEN"
    - Original price if discounted: gray strikethrough "13,50 PEN" below
    - Description: gray text, 2-3 lines max, 14px

TOP BAR (above product list, same row as category heading):
  - Left: active category title "Todo" in large green bold text
  - Right: Cart button/summary (see cart section below)

---

DESKTOP CART — FIX FUNCTIONALITY:

PROBLEM TO FIX: The cart must NOT be just a small icon in the corner.

CORRECT DESKTOP CART BEHAVIOR:

Option A — Floating Cart Summary Bar (RECOMMENDED):
  Position: fixed, top-right of the main content area (not sidebar)
  Always visible when items are in cart
  Appearance:
    White card with green left border (4px)
    Shadow: 0 4px 16px rgba(0,0,0,0.12)
    Content: 🛒 icon + "Ver carrito" + item count badge + total S/ 00.00
    Green "Ver carrito" button that opens the cart panel
  Size: ~280px wide, 56px tall
  
Option B — Fixed Right Cart Panel (slides in):
  When user adds first product → right panel slides in (320px wide)
  Panel stays visible while browsing
  Shows full cart contents with quantities and subtotal
  "Continuar pedido" CTA at bottom of panel
  Main content area shrinks to accommodate panel (or overlaps with overlay)

DESKTOP CART PANEL CONTENT (when open):
  Header: "Tu carrito" + item count
  Product rows:
    - Thumbnail 48x48px
    - Product name (truncated 1 line)
    - Quantity controls: [-] [n] [+]
    - Price
    - Delete (×) icon
  Divider
  Subtotal: "Subtotal" label + green bold amount
  CTA Button: "Continuar pedido →" full width, green, 48px height
  Empty state: illustration + "Tu carrito está vacío" message

ADD TO CART INTERACTION (desktop):
  When "+" is clicked:
    1. Button briefly animates (scale pulse)
    2. Cart panel/bar updates with new item count + new total
    3. If first item: cart panel slides in OR bar appears with animation
    4. Small toast notification top-right: "✓ Producto agregado"

---

QUANTITY CONTROLS IN DESKTOP CART:
  When a product is already in cart, the "+" button on the product card 
  should transform into: [ - ] [ 2 ] [ + ] inline controls
  This replaces the single "+" button so user can adjust quantity 
  directly from the catalog without opening the cart

---

SCREENS TO UPDATE/DELIVER:

1. Desktop Catalog — full layout matching screenshot reference
   (sidebar categories + vertical product cards + fixed cart)

2. Desktop Catalog — cart panel open state
   (same layout but with right cart panel visible and populated)

3. Desktop Catalog — product with quantity controls 
   (showing [-][n][+] on a card that's already in cart)

4. Mobile Catalog — keep existing mobile layout with 
   horizontal compact cards and sticky bottom cart bar 
   (no changes needed to mobile)

---

KEEP EVERYTHING ELSE FROM THE PRD:
- All category names and order
- All checkout flow (Steps 1, 2, 3)
- Admin panel screens
- Component library
- Prototype flows

Only update: desktop catalog layout and desktop cart behavior 
to match the reference screenshot provided.