// Types for Sistema Aura - E-commerce Administration Dashboard

export type ConnectionStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  status: ConnectionStatus;
  lastSync: Date | null;
  productCount: number;
  endpoint?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  category: string;
  brand: string;
  images: string[];
  providerId: string;
  providerSku: string;
  syncedToAutoAzur: boolean;
  lastUpdated: Date;
}

export interface SyncLog {
  id: string;
  providerId: string;
  type: 'download' | 'upload';
  status: 'success' | 'error' | 'pending';
  message: string;
  productsAffected: number;
  timestamp: Date;
}

export interface Marketplace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  status: ConnectionStatus;
  productCount: number;
}

export interface DashboardStats {
  totalProducts: number;
  syncedProducts: number;
  pendingSync: number;
  activeProviders: number;
  activeMarketplaces: number;
  lastGlobalSync: Date | null;
}
