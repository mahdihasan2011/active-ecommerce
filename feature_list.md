# Bumppa Marketplace: Full Feature Specifications

This document catalogs every functional capability required for the Bumppa Marketplace platform, segmented by client application boundaries and api service domains.

---

## 1. 🌐 Customer Storefront (External Frontend Project)

> [!NOTE]
> The Customer Storefront application is developed in a separate repository. However, all of its underlying business logic, database schemas, and REST APIs are designed, implemented, and handled inside the backend services of this project (`apps/api`).

### Customer-Facing APIs & Logic Handled by Backend
- **Multimodal Auth**: Password-based login, Social Auth (Google, Apple, Facebook integration), and passwordless OTP verification via phone numbers.
- **Customer Control Panel**: Editable profile details, saved delivery addresses ledger, and device logins monitor.
- **Account Security**: Two-Factor Authentication (2FA) toggles, and security logs showing recent IP/login changes.
- **Deposits Wallet**: Internal credit wallet mapping deposits, purchase debits, refund credits, and detailed audit lists.
- **OpenSearch Live Search**: Instant query search input with auto-complete recommendations.
- **Faceted Selection Filters**: Search result modifiers including price sliders, brand selectors, ratings (1–5 stars), stock status, and custom specifications.
- **Wishlist & Watches**: Save products with automated email/push notifications on price drops or restock alerts.
- **Comparison Engine**: Grid layout evaluating attributes, prices, sizes, and weights side-by-side.
- **Followed Sellers**: Social feed showing products from followed shops.
- **Unified Cart & Checkout**: API support for persistent cart storage, coupon validation, flash sales, and split checkout operations (grouping by vendor, processing commissions/payments).
- **Auctions Explorer**: Live bid logs, bid count indicators, minimum bid increment validations, and active timers.
- **Buyer Reviews**: Verified purchase reviews with ratings, text details, and image/video uploads.
- **Direct Messaging (DM)**: Chat panel allowing customer-to-vendor dialogs directly.

---

## 2. 🛡️ Admin Dashboard (`admin`)

The central administrative board governs platform metrics, seller compliance, and payouts.

### Metrics Analytics Panel
- **Operational Metrics**: Real-time Gross Merchandise Value (GMV), platform fee collections, active shops counts, and net payouts.
- **Interactive Graphs**: Performance visualizers for sales, top vendors, and delivery boys.

### Catalog Control
- **Global Hierarchy Managers**: Categorization tree nodes, brand listings, attributes definitions, and unit measures (e.g. grams, kg, pieces).
- **Size & Measurement Engine**: Standard size guides and product measurement charts configuration.
- **Product Badges**: Custom labels and badges configuration (e.g., "AI Pick", "Trending", "Limited").

### Seller & KYC Audit
- **Verification Center**: Document inspection boards evaluating tax documents, identity proof, and KYC files.
- **Lifecycle Actions**: Onboard status changes (`Approved`, `Suspended`, `Closed`) with custom change-note inputs.
- **Commission Control**: Define global platform commission overrides (%, category-specific, or seller-specific).

### Financial Operations
- **Withdrawal Payout Queue**: Review pending payout requests from sellers, authorize releases, or reject with notes.
- **Rider Cash Settlement**: Dashboard reconciling Cash on Delivery (COD) collections.

### Global Configuration
- **Platform Customization**: Store logos, default fonts, sliders, headers/footers, and default system languages/currencies.
- **Integrations Panel**: Configuration for SMS providers, S3 targets, payment gateways, and shipping parameters.

---

## 3. 🏪 Vendor Dashboard (`vendor`)

The self-service panel for merchants to manage listing catalogs, order processing, and financials.

### Shop Profile Builder
- **Appearance Customizer**: Profile banner editor, featured collections widget, and support contacts.
- **Store Policies**: Dynamic delivery ranges, shipping policies, and a vacation mode toggle.

### Inventory Control
- **Product Management**: CRUD for physical and digital variants, prices, and wholesale tiered rules.
- **Bulk Spreadsheet Loader**: Excel/CSV tools for mass additions or stock restocks.
- **AI Copywriter**: AI title and description prompts helper integrated into creation forms.

### Order Processing & Receipts
- **Store-Isolated Queue**: Vendor-specific order item pipelines (`Confirmed` -> `Processing` -> `Ready for Pickup`).
- **Bill Exports**: Generator formatting and exporting thermal invoice slips with bar-code mappings.

### Payouts & Wallets
- **Earning Analytics**: Real-time sales stats net of commission fees.
- **Withdrawal Requests**: Withdraw balance forms mapping bank accounts and mobile money targets.

---

## 4. 🚴 Delivery Portal (`delivery`)

Rider application optimized for quick doorstep completions and COD calculations.

### Dispatcher Board
- **Active Orders Queue**: Live feed listing pending packages ready for pickup from stores within delivery zones.
- **Task Controls**: Accept/Reject triggers for assigned delivery tasks.

### Navigation & Contact
- **Route Optimizer**: Visual path tracking to vendor pickup shops and customer addresses.
- **One-Touch Actions**: Quick call phone triggers.

### Proof of Delivery (PoD)
- **OTP Verification**: Form to type customer OTP to confirm doorstep package delivery.
- **COD Tracker**: Wallet counter mapping cash collected, requiring admin verification for settlement.
- **Digital Signatures**: Canvas field for client signatures and photo uploads.

---

## 5. ⚙️ Core Backend Services (`api`)

The unified NestJS API handles authentication, ledger transactions, search synchronization, and queue processing.

- **`AuthModule`**: Passport JWT strategies, RBAC validation guards, and OTP validation.
- **`CatalogModule`**: Relational models mapping variant updates, category structures, and OpenSearch BullMQ triggers.
- **`OrderModule`**: Interactive PostgreSQL `$transaction` blocks ensuring atomic split-order checkouts and inventory decrements.
- **`FinanceModule`**: Balance ledgers, commission calculations, and payout logs.
- **`NotificationQueueModule`**: Mailers, Firebase push triggers, and Puppeteer PDF generators.
