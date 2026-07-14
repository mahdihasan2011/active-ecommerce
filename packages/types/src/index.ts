// User roles
export type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';

// Shop status
export type ShopStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Product statuses
export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Order statuses
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Payment statuses
export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED';

// Payout statuses
export type PayoutStatus = 'UNPAID' | 'PAID';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  coverImage?: string | null;
  status: ShopStatus;
  ownerId: string;
  owner?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  compareAtPrice?: number | null;
  isPublished: boolean;
  status: ProductStatus;
  shopId: string;
  shop?: Shop;
  categoryId?: string | null;
  category?: Category | null;
  viewCount: number;
  rating: number;
  variants?: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  productId: string;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: User;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  items?: OrderItem[];
  commissions?: VendorCommission[];
  driverId?: string | null;
  driver?: User | null;
  deliveryOTP?: string | null;
  proofOfDelivery?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  shopId: string;
  quantity: number;
  price: number;
  commissionRate: number;
  commissionAmount: number;
  netSellerEarning: number;
}

export interface VendorCommission {
  id: string;
  orderItemId: string;
  shopId: string;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  netSellerEarning: number;
  status: PayoutStatus;
  createdAt: Date;
  updatedAt: Date;
}

// API standard response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: string; // DEPOSIT, WITHDRAWAL, PURCHASE, EARNING
  status: string; // PENDING, COMPLETED, FAILED
  createdAt: Date;
}

export interface CheckoutItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CheckoutDto {
  shopId: string;
  items: CheckoutItem[];
  paymentMethod: 'WALLET' | 'COD';
}
