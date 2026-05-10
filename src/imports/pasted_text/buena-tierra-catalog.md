Design and prototype a complete mobile-first e-commerce platform called "Buena Tierra" 
— a healthy, organic, and natural products store. The platform has two main surfaces: 
a PUBLIC CATALOG (customer-facing) and an ADMIN PANEL (internal ERP). 
Build all screens fully responsive, prioritizing the mobile (375px) experience first, 
then adapting to desktop (1440px).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 GLOBAL VISUAL IDENTITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BRAND: Buena Tierra — healthy, organic, natural products store.

TONE: Clean, natural, modern, commercial (not institutional). 
Feels like a fast, trustworthy farmer's market — not a clinic or a blog.

COLOR PALETTE:
- Primary Green: #2E7D32 (main CTA buttons, active states, cart bar)
- Light Green: #A5D6A7 (chips, tags, highlights)
- Dark Green: #1B5E20 (headers, contrasts, active nav)
- Background: #FAFAF7 (off-white/cream — main page bg)
- Card Background: #FFFFFF
- Promo Accent: #F9A825 (yellow/amber — badges, discount labels)
- Text Primary: #1C1C1C
- Text Secondary: #757575
- Border/Divider: #E8E8E0
- Success: #388E3C
- Error: #D32F2F

TYPOGRAPHY:
- Display / Brand: "Playfair Display" or "Lora" — used for logo treatment, 
  hero text, category headers
- UI / Body: "DM Sans" — used for product names, labels, form fields, 
  prices, descriptions
- Monospace for prices/codes: "DM Mono" (optional, for invoice-style moments)

CORNER RADIUS: 12px for cards, 8px for buttons, 20px for chips/tags, 
  50% for icon buttons

SPACING SYSTEM: 4px base grid. Common values: 8, 12, 16, 20, 24, 32, 48px

SHADOW: Soft card shadow — box-shadow: 0 2px 8px rgba(0,0,0,0.06)
ELEVATION for cart/bottom bar: box-shadow: 0 -4px 20px rgba(0,0,0,0.10)

ICONS: Use rounded/filled style icons (Material Symbols Rounded or Phosphor Icons).
  Never mix icon styles.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SURFACE 1 — PUBLIC CATALOG (Customer-facing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design all 6 screens below. Each screen must exist in both 
MOBILE (375 x 812px) and DESKTOP (1440 x 900px) variants.

────────────────────────────────────────
SCREEN 1 — MAIN CATALOG / HOME
────────────────────────────────────────

MOBILE LAYOUT:

TOP HEADER (fixed, 56px height):
  - Left: Buena Tierra logo (green wordmark or leaf icon + text)
  - Right: Cart icon button with badge showing item count
  - Background: #FFFFFF with subtle bottom border

SEARCH BAR (below header, 48px height):
  - Full width with 16px horizontal padding
  - Placeholder: "Buscar productos..."
  - Rounded corners 24px, light gray background #F2F2EC
  - Search icon left-aligned inside bar

CATEGORY CHIPS (horizontal scrollable row, no scrollbar visible):
  - Height: 36px per chip
  - Chips: "Todo · Destacados · Spirulina · Promo · Menestras · 
    Endulzante · Harinas/Polvos · Hojuelas · Semillas · Aceites · 
    Snacks · Chocolate · Café · Huevos · Frutas · Hortalizas · 
    Miel · Delivery · Sin Gluten · Hierbas · Arroz · Quinua · Otros"
  - Active chip: filled green (#2E7D32), white text, 20px radius
  - Inactive chip: outlined, #E8E8E0 border, #757575 text
  - 8px gap between chips, 16px left padding start

PRODUCT LIST (main content area):
  - Show products in HORIZONTAL CARD FORMAT (Kyte/Kysite-style)
  - Each card: full width minus 32px margin, height: ~88px
  - Card structure (left to right):
    LEFT: Product image — 72x72px, 8px radius, object-fit: cover
    RIGHT CONTENT: 
      - Product name — DM Sans Medium 14px, #1C1C1C, max 2 lines
      - Price — DM Sans SemiBold 15px, #2E7D32
    OVERLAY on image: "+" button — 28px circle, green fill #2E7D32, 
      white "+" icon, positioned bottom-right corner of image (8px offset)
  - Card background: white, 12px radius, subtle shadow
  - 8px gap between cards
  - 4-5 products visible per screen without scrolling

  SPECIAL STATES within product cards:
    - "Promo" badge: small amber pill #F9A825 top-left of image, 
      white text "PROMO", 10px font
    - "Destacado" badge: small dark-green pill, white text "★ TOP"
    - Out of stock: image at 50% opacity, "+" button disabled, 
      "Agotado" label in red

STICKY BOTTOM CART BAR (appears when cart has items):
  - Position: fixed bottom 0, full width, height: 56px
  - Background: #2E7D32
  - Left: 🛒 icon + "Ver carrito"
  - Center/Right: "4 productos · S/ 86.50"
  - Text: white, DM Sans Medium 14px
  - Subtle upward shadow elevation
  - Smooth slide-up animation when first item is added

DESKTOP LAYOUT (1440px):
  - Fixed left sidebar for categories (240px wide)
  - Search bar in top header (centered, max 600px)
  - Products in 3-column grid layout
  - Each product card: vertical format (image top, name, price, add button)
  - Cart as fixed right panel (320px) that slides in when items are added
  - OR floating cart button top-right showing count + total

────────────────────────────────────────
SCREEN 2 — CART BOTTOM SHEET (Mobile)
────────────────────────────────────────

TRIGGER: User taps the sticky bottom cart bar.

BEHAVIOR: Bottom sheet slides up over the catalog. 
  Background dims to rgba(0,0,0,0.4). Sheet height: ~75% of screen.

SHEET STRUCTURE:
  - Drag handle bar at top (32px wide, 4px tall, #E0E0E0, centered)
  - Title: "Tu carrito" — Playfair Display 20px, bold
  - Close icon (X) top-right
  
  PRODUCT LIST inside sheet:
    Each item row:
    - Thumbnail: 48x48px, 8px radius
    - Product name: 13px, 2 lines max
    - Price per unit: 12px green
    - QUANTITY CONTROLS: [-] [2] [+] inline, with 32px tap targets
    - Delete icon (trash) right side, #D32F2F
    - Subtle divider between rows

  FOOTER of sheet:
    - Subtotal label + amount (right-aligned, green, bold)
    - "Continuar pedido" CTA button — full width, 48px height, 
      primary green #2E7D32, white text, 12px radius

────────────────────────────────────────
SCREEN 3 — CHECKOUT STEP 1: REVIEW ORDER
────────────────────────────────────────

Full screen (not sheet). Header: "Tu pedido" with back arrow.

STEP INDICATOR at top:
  - 3 steps shown as: [1 Carrito] → [2 Datos] → [3 Pago]
  - Active step: filled green circle + label
  - Inactive: gray outlined circle
  - Connected by thin line

CONTENT: Same product list as cart with edit capability.
  Editable quantities, deletable items.
  Subtotal summary at bottom.
  CTA: "Continuar con mis datos →"

────────────────────────────────────────
SCREEN 4 — CHECKOUT STEP 2: CUSTOMER DATA
────────────────────────────────────────

FORM FIELDS (clean, spacious, 48px input height):
  - Nombre completo (text input)
  - Número de celular (tel input, with 🇵🇪 flag prefix)
  - Tipo de entrega (segmented toggle: "Recojo en tienda" | "Delivery")
    When "Delivery" selected → show address field with slide-down animation:
      - Dirección de entrega (textarea, 3 rows)
      - Referencia (optional, placeholder: "Ej: frente al parque")

INPUT STYLE:
  - 1px border #E8E8E0, focus: 2px border #2E7D32
  - Label above input, 12px DM Sans Medium, #757575
  - 12px border radius

CTA: "Continuar con el pago →" — full width, primary green

────────────────────────────────────────
SCREEN 5 — CHECKOUT STEP 3: PAYMENT + CONFIRM
────────────────────────────────────────

PAYMENT METHOD SELECTOR:
  - Show 5 options as selectable cards (not radio buttons):
    Each card: icon + label + optional description
    Options:
      💜 Yape — "Enviaremos número de Yape al confirmar"
      💙 Plin — "Enviaremos número de Plin al confirmar"  
      🏦 Transferencia bancaria
      🚪 Pago contra entrega
      🏪 Pago en tienda
    
    Selected card: green border 2px, light green bg tint, 
      green checkmark icon top-right

COMMENTS FIELD:
  - Optional textarea: "Comentarios adicionales (opcional)"
  - Max 3 rows, light styling

ORDER SUMMARY BOX (above CTA):
  - Subtle green-tinted box (#F1F8E9)
  - Shows: products count, subtotal, delivery type, payment method
  - 12px radius, 16px padding

CONFIRM BUTTON:
  - Full width, 52px height, primary green
  - Icon: WhatsApp logo (white) + "Confirmar por WhatsApp"
  - On tap: generates WhatsApp deep link with pre-filled message

WHATSAPP MESSAGE FORMAT (for reference, shown as preview in UI):
  ---
  🌿 *Nuevo pedido - Buena Tierra*
  
  👤 Cliente: [Nombre]
  📱 Celular: [Número]
  📦 Entrega: [Recojo / Delivery a: dirección]
  
  🛒 *Productos:*
  - [Producto] x[cantidad] — S/ [precio]
  - ...
  
  💰 *Subtotal: S/ [total]*
  💳 Pago: [método]
  📝 Nota: [comentario]
  ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️ SURFACE 2 — ADMIN PANEL (Internal ERP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design all 7 admin screens below. 
Mobile (375px) and Desktop (1440px) variants required for each.

ADMIN VISUAL TONE: Professional, clean, data-focused. 
Same green brand but with more white space, 
denser information layouts, data tables, charts.

ADMIN NAVIGATION:
  MOBILE: Bottom tab bar with 5 main icons 
    (Dashboard · Productos · Pedidos · Clientes · Más)
    "Más" opens a secondary menu for Métricas, Vendedores, Configuración

  DESKTOP: Fixed left sidebar (240px)
    - Brand logo at top
    - Nav items with icons + labels:
      📊 Dashboard
      📦 Productos
      🏷️ Categorías
      📋 Pedidos
      👥 Clientes
      📈 Métricas
      👤 Vendedores
      ⚙️ Configuración
    - Active item: green bg tint, dark green text + left border indicator
    - Avatar/name + logout at bottom

────────────────────────────────────────
ADMIN SCREEN 1 — DASHBOARD
────────────────────────────────────────

DESKTOP LAYOUT — grid of metric cards:

ROW 1 — 4 KPI Cards (equal width):
  Each card: white bg, 16px radius, 24px padding, subtle shadow
  Card 1: "Ventas de hoy" — large green number S/ 1,240.00, 
           trend arrow +12% vs ayer
  Card 2: "Pedidos pendientes" — amber number 8, 
           "Requieren atención" subtitle
  Card 3: "Pedidos completados hoy" — green number 23
  Card 4: "Productos con bajo stock" — red/amber number 5, 
           "Ver lista" link

ROW 2 — 2 larger panels:
  LEFT (60%): "Productos más vendidos" — horizontal bar chart or 
              ranked list with product image, name, units sold, revenue
  RIGHT (40%): "Categorías con mayor movimiento" — donut chart or 
               simple ranked list

ROW 3 — 2 panels:
  LEFT (50%): "Clientes frecuentes" — top 5 customers, 
              name, purchases count, total spent
  RIGHT (50%): "Rendimiento por vendedor" — table with 
               name, orders, revenue, avg ticket

MOBILE LAYOUT:
  Vertical stack of same cards. 
  KPI cards as 2-column grid (2x2). 
  Charts replaced by simplified ranked lists for mobile.

────────────────────────────────────────
ADMIN SCREEN 2 — PRODUCT MANAGEMENT (KEY SCREEN)
────────────────────────────────────────

This is the most critical admin screen. Design with great care.

DESKTOP — INLINE EDITABLE TABLE:

TOOLBAR above table:
  - Left: "Productos" title + count badge "124 productos"
  - Search input (filtering)
  - Filters: Category dropdown, Status dropdown, Stock filter
  - Sorting: "Ordenar por" dropdown
  - Right: "+ Nuevo producto" button (outlined green)
  - "Guardar cambios" button (filled green) — appears when edits are pending, 
    with a counter "3 cambios pendientes"

TABLE STRUCTURE:
  Columns: [Imagen] [Producto] [Categoría] [Precio] [Stock] [Estado] [Acciones]

  Each row is INLINE EDITABLE:
  
  - Imagen: 40x40px thumbnail, click to replace
  - Producto: plain text normally, click to edit (becomes text input inline)
  - Categoría: shown as chip/badge, click to open dropdown select
  - Precio: "S/ 35.00" — click to edit (becomes number input with S/ prefix)
  - Stock: number — click to edit (becomes number input with +/- steppers)
    Low stock (<5): amber background highlight on cell
    Out of stock (0): red background highlight
  - Estado: toggle switch (Activo / Inactivo) — no click-to-edit needed
  - Acciones: three-dot menu → Ver detalle, Duplicar, Eliminar

  EDITED CELLS appearance: light green background tint #F1F8E9, 
    green bottom border 2px — signals unsaved change

  BOTTOM STICKY BAR (appears when edits pending):
    "Tienes 3 cambios sin guardar" [Descartar] [Guardar cambios →]
    This bar is fixed to bottom of table view, always visible.

MOBILE — EDITABLE PRODUCT CARDS:

  Each product shown as a card:
  ┌──────────────────────────────────┐
  │ [img 56px] Spirulina Orgánica    │
  │            ★ Destacado           │
  │                                  │
  │ Stock    [  20  ] ←editable      │
  │ Precio   [ S/ 35.00 ] ←editable  │
  │ Categoría [ Spirulina ▾ ]        │
  │ Estado   [ ● Activo ] toggle     │
  └──────────────────────────────────┘

  Cards are in single column. 
  "Guardar todos los cambios" sticky button at bottom.
  Search bar and filter chips at top for navigation.

PRODUCT DETAIL / CREATE VIEW (secondary screen):
  Form layout, single column on mobile, 2-column on desktop:
  - Nombre del producto
  - Descripción (textarea)
  - Imagen (drag & drop upload zone OR file picker)
  - Categoría (select)
  - Precio (number + currency)
  - Stock (number)
  - Estado (toggle)
  - ¿Producto destacado? (toggle)
  - ¿En promoción? (toggle → reveals: Precio promo, % descuento)
  - Etiquetas (tag input)
  
  VARIANTS SECTION (collapsible):
  "+ Agregar variante" button
  Each variant: Nombre, Precio, Stock, Estado
  Example variants: 
    [250g — S/ 18.00 — Stock: 12 — Activo]
    [500g — S/ 32.00 — Stock: 8 — Activo]
    [1kg  — S/ 58.00 — Stock: 3 — Activo ⚠ bajo stock]

────────────────────────────────────────
ADMIN SCREEN 3 — ORDER MANAGEMENT
────────────────────────────────────────

DESKTOP:
  LEFT: Orders table with columns:
    [#Código] [Cliente] [Total] [Pago] [Entrega] [Estado] [Fecha] [Vendedor]
  
  STATUS COLUMN — color-coded badges:
    🟡 Nuevo       — amber
    🔵 Confirmado  — blue  
    🟣 En preparación — purple
    🟢 Listo       — teal
    🚚 En delivery — orange
    ✅ Completado  — green
    ❌ Cancelado   — red

  RIGHT: Click on order row → Order detail panel slides in from right (360px)
    Shows all order info + status update dropdown + WhatsApp button

MOBILE:
  Cards for each order. 
  Each card shows: code, customer name, total, status badge, date.
  Tap card → full screen order detail view.
  Status update as a segmented control or bottom sheet selector.

────────────────────────────────────────
ADMIN SCREEN 4 — CUSTOMER MANAGEMENT
────────────────────────────────────────

Table / Card list of customers:
  - Name, Phone, Total Orders, Total Spent, Last Purchase Date
  - Click/tap → Customer profile view:
    Header: name, phone, member since date
    Stats row: total orders, total spent, avg ticket
    Order history list (most recent first)
    Frequently ordered products
    Preferred delivery: recojo/delivery
    Preferred payment method

────────────────────────────────────────
ADMIN SCREEN 5 — METRICS & REPORTS
────────────────────────────────────────

TIME FILTER: tabs or segmented control — [Hoy] [Semana] [Mes] [Personalizado]

CHARTS SECTION:
  - Line chart: Ventas diarias / semanales / mensuales (S/ revenue)
  - Bar chart: Pedidos por estado
  - Donut chart: Ventas por categoría
  - Bar chart: Top 10 productos más vendidos

SUMMARY STATS CARDS:
  - Ticket promedio
  - Producto más vendido
  - Categoría más activa
  - Clientes nuevos en el período

TABLE below charts:
  - Productos con menor rotación (riesgo de stock muerto)
  - Productos sin stock (urgente reposición)

────────────────────────────────────────
ADMIN SCREEN 6 — VENDOR MANAGEMENT
────────────────────────────────────────

Table: Nombre, Rol, Pedidos atendidos, Ventas generadas, Estado, Acciones

ROL BADGES:
  Administrador — dark green
  Vendedor — blue
  Encargado de pedidos — teal
  Encargado de inventario — amber

+ Crear vendedor: form with Nombre, Email, Celular, Rol, Estado toggle.

Vendor detail: performance stats, orders list, revenue chart over time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 COMPONENT LIBRARY TO DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design the following reusable components as a component page:

PUBLIC COMPONENTS:
  - Product card (mobile horizontal) — default, promo, out-of-stock states
  - Product card (desktop vertical)
  - Category chip — active, inactive states
  - Cart sticky bottom bar — empty (hidden), with items, full
  - Cart item row (inside sheet)
  - Step indicator (3-step checkout)
  - Payment method card — unselected, selected states
  - Form input — default, focused, error states
  - Delivery toggle (Recojo / Delivery)
  - WhatsApp confirm button

ADMIN COMPONENTS:
  - KPI metric card
  - Editable table row — default, editing, saved, error states
  - Mobile admin product card — default, editing state
  - Order status badge (all 7 states)
  - Status update dropdown/selector
  - Vendor role badge (all 4 types)
  - Admin nav sidebar item — default, active, hover states
  - Admin bottom tab bar
  - Pending changes sticky bar (save/discard)
  - Filter chip (admin)
  - Toggle switch (Activo/Inactivo)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 PROTOTYPE FLOWS TO CONNECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Connect the following interactive flows in Figma prototype mode:

FLOW 1 — CUSTOMER PURCHASE JOURNEY:
  Home/Catalog → [tap + on product] → Cart bar appears/updates → 
  [tap cart bar] → Cart bottom sheet opens → 
  [tap Continuar pedido] → Checkout Step 1 → 
  [tap Continuar con mis datos] → Checkout Step 2 → 
  [fill form, select Delivery] → address field slides in → 
  [tap Continuar con el pago] → Checkout Step 3 → 
  [select Yape] → card highlights → 
  [tap Confirmar por WhatsApp] → success confirmation screen

FLOW 2 — ADMIN BULK EDIT PRODUCTS:
  Admin Dashboard → Products nav → Product table loads → 
  [tap price cell] → cell becomes editable input → 
  [change value] → cell gets green edit indicator → 
  [edit more rows] → pending bar appears "3 cambios pendientes" → 
  [tap Guardar cambios] → success toast notification

FLOW 3 — ADMIN ORDER STATUS UPDATE:
  Orders list → [tap order row] → Order detail panel opens → 
  [tap status dropdown] → status options appear → 
  [select "En preparación"] → badge updates → 
  [tap WhatsApp button] → WhatsApp message opens (link)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DESIGN SPECIFICATIONS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRAMES TO DELIVER:
  Public — Mobile: 5 screens × 375x812px = 5 frames
  Public — Desktop: 5 screens × 1440x900px = 5 frames
  Admin — Mobile: 6 screens × 375x812px = 6 frames
  Admin — Desktop: 6 screens × 1440x900px = 6 frames
  Component Library page: all components organized by surface
  
  TOTAL: ~22 frames + component library

LAYER NAMING CONVENTION:
  [Surface]/[Screen]/[Section]/[Component]
  Example: Public/Catalog/ProductList/ProductCard
  Example: Admin/Products/Table/EditableRow

NOTES FOR FIGMA MAKE:
  - Use Auto Layout for all cards, rows, and lists
  - Use Variables for color tokens (reference palette above)
  - Use Components with variants for all interactive states
  - All text must be in text styles (not manual overrides)
  - All interactions must use Smart Animate for transitions
  - Bottom sheets: use overlay + slide-up animation
  - Sidebar panels: use overlay + slide-left/right animation
  - Sticky bars: use fixed positioning in prototype scroll frames