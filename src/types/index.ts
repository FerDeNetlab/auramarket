// Types for Sistema Aura - E-commerce Administration Dashboard

export type ConnectionStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ConnectionStatus;
  productCount: number;
  apiUrl?: string;
  apiKey?: string;
  lastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  providerId: string;
  sku: string;
  name: string;
  description?: string;
  brand?: string;
  category?: string;
  price: number;
  stock: number;
  images?: string[];
  metadata?: Record<string, any>;
  syncedToAutoazur: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncLog {
  id: string;
  providerId: string;
  action: string;
  status: 'success' | 'error' | 'pending';
  productsSynced: number;
  message?: string;
  createdAt: Date;
}

export interface Marketplace {
  id: string;
  name: string;
  slug: string;
  status: ConnectionStatus;
  productCount: number;
  apiUrl?: string;
  apiKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalProducts: number;
  syncedProducts: number;
  pendingSync: number;
  activeProviders: number;
  activeMarketplaces: number;
  lastGlobalSync: Date | null;
}
