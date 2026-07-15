# Master Implementation Plan: Bumppa Marketplace

This plan outlines the step-by-step checklist across **12 structured sprints** to implement the Bumppa Marketplace platform.

---

## Phase 1: Core System Architecture & Base Management (Weeks 1 – 4)

### Sprint 1: Security, Roles & Staff Logins
- **Step 1.1: Database Security Setup**
  - Define `StaffLog` and `SecurityEvent` models in `schema.prisma`.
  - Add tables tracking login history and admin action audits.
  - Run database migrations and generate the client.
- **Step 1.2: Granular RBAC Middleware**
  - Implement `@Permissions()` decorators inside `apps/api/src/auth/decorators/permissions.decorator.ts`.
  - Build `PermissionsGuard` evaluating active scopes for admin routes.
- **Step 1.3: Multi-Provider Authentication**
  - Build passport strategy files for Google/Facebook token validations.
  - Link OTP routes with SMS credentials configurations.
- **Step 1.4: Admin Roles Scaffolding**
  - Build `apps/admin/src/app/staff` listing registered admins, roles, and toggles for permissions.
  - Configure SMTP settings pages.

### Sprint 2: Core Catalog setup & CSV Import/Export
- **Step 2.1: Model Schema Updates**
  - Add `Brand`, `Unit`, `Color`, `Attribute`, `SizeGuide` models to `schema.prisma`.
  - Regenerate client and update packages/types interfaces.
- **Step 2.2: BullMQ CSV Parser**
  - Setup parsing workers in `apps/api/src/jobs` to handle CSV data inputs asynchronously.
  - Expose API endpoints for bulk categories upload.
- **Step 2.3: Design Studio Admin Console**
  - Build frontend configurations for fonts selectors, slide banner files, and header/footer configurations.
- **Step 2.4: Vendor File Manager**
  - Build image, video, and file directories inside `apps/vendor` sending files directly to S3.

---

## Phase 2: Product Engine, Vendor Ecosystem & AI Studio (Weeks 5 – 8)

### Sprint 3: Seller Lifecycle & KYC Verification
- **Step 3.1: Seller State Machine**
  - Implement dynamic enum lifecycle states: `Applied` -> `Review` -> `Verification` -> `Approved` -> `Risk Review` -> `Suspended` -> `Closed`.
  - Construct service methods validating status transitions.
- **Step 3.2: Seller Document Pipeline**
  - Build upload endpoints for tax details, license PDFs, and KYC forms.
- **Step 3.3: Admin Verification Audits**
  - Create the admin review screen displaying compliance checklists and action buttons.
- **Step 3.4: Vendor Onboarding Checklist**
  - Scanners checking readiness indicators before allowing product listing.

### Sprint 4: Catalog capabilities, AI Copywriter & OpenSearch Sync
- **Step 4.1: Variant Matrices**
  - Build dynamic pricing, wholesale pricing tiers, and badging tags logic.
- **Step 4.2: AI Studio Integrations**
  - Connect OpenAI/Claude API hooks into product forms to automatically compose SEO copy.
- **Step 4.3: OpenSearch BullMQ sync**
  - Hook product CRUD operations to trigger indexing events to OpenSearch.
- **Step 4.4: Vendor Catalog Manager**
  - Add listing forms inside the vendor portal supporting wholesale rules and variants.

---

## Phase 3: Sales Engine, Financial Ledger & OpenSearch Commerce (Weeks 9 – 12)

### Sprint 5: OpenSearch Discoveries & Slides Cart
- **Step 5.1: Faceted Search APIs**
  - Deploy autocomplete API and multi-faceted query builders for OpenSearch.
- **Step 5.2: Product Comparison Matrix**
  - Build comparative grid components evaluating price, weight, and ratings side-by-side.
- **Step 5.3: Slide-over multi-vendor cart**
  - Group items by shopId, calculate shipping totals per vendor, and handle coupon code validations.

### Sprint 6: Split checkout Transactions & Ledgers
- **Step 6.1: Relational Order splits**
  - Write transaction blocks splitting parent orders into child orders by vendor.
- **Step 6.2: Platform Commission Ledger**
  - Record commission payouts, net merchant payouts, and platform fee splits on checkout completion.
- **Step 6.3: Thermal bill printer**
  - Compile HTML bill templates to print packing slips with barcodes.
- **Step 6.4: Order Timeline Tracking**
  - Build real-time order status tracking on storefront customer panel.

---

## Phase 4: Logistics, Delivery Boy System & Payment Infrastructure (Weeks 13 – 16)

### Sprint 7: Logistics Courier Fleet App
- **Step 7.1: Driver assignment algorithms**
  - Build auto-assignment queues mapping orders to nearby riders.
- **Step 7.2: Delivery Boy portal**
  - Build tasks feeds, navigation directions integration, and OTP validation screens.
- **Step 7.3: Proof-of-Delivery validations**
  - Add signature fields and camera upload functions inside the courier portal.

### Sprint 8: Payments, Wallets & Refunds
- **Step 8.1: Payment Gateway integrations**
  - Wire Stripe, PayPal, and Paystack libraries.
- **Step 8.2: Wallet deposits panel**
  - Build transaction logs and credit adjustments forms.
- **Step 8.3: Dispute resolution module**
  - Construct ticket timelines for refund claims.

---

## Phase 5: Advanced Business Models & Marketing Engine (Weeks 17 – 20)

### Sprint 9: Auctions, Wholesale (B2B) & Preorders
- **Step 9.1: Live bid WebSockets**
  - Construct WS servers broadcasting bids and updating active timers in real time.
- **Step 9.2: B2B tiered bulk rules**
  - Enforce unit threshold checks on checkout.
- **Step 9.3: Preorders payment engine**
  - Enable partial booking payments.

### Sprint 10: Promotions, Affiliates & Loyalty Points
- **Step 10.1: Flash sale timer engine**
  - Build coupon validation schedulers.
- **Step 10.2: Affiliate referral tracker**
  - Generate unique links, map user cookies to referrals, and credit commission ledger entries.
- **Step 10.3: Club points converter**
  - Convert reward points to wallet balances.

---

## Phase 6: Analytics, Marketing, Support & Deployment (Weeks 21 – 24)

### Sprint 11: Reports, Tickets & GA4 pixels
- **Step 11.1: Report generation**
  - Build analytics charts mapping sales records.
- **Step 11.2: Customer Support center**
  - Build direct support ticket chat modules.
- **Step 11.3: Marketing scripts**
  - Set up GA4 tracking pixels and Firebase cloud messaging schedules.

### Sprint 12: Deployment Hardening & K8s pipelines
- **Step 12.1: Audit checks**
  - Validate security rate-limiting and access token lifetimes.
- **Step 12.2: Load checkups**
  - Run transaction checkups.
- **Step 12.3: Production build pipelines**
  - Deploy Kubernetes setups using Helm charts.
