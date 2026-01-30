// Database Types
export interface Provider {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: 'connected' | 'disconnected' | 'syncing' | 'error';
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

export interface Marketplace {
    id: string;
    name: string;
    slug: string;
    status: 'connected' | 'disconnected' | 'syncing' | 'error';
    productCount: number;
    apiUrl?: string;
    apiKey?: string;
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

// Database row types (snake_case from Supabase)
export interface ProviderRow {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: string;
    product_count: number;
    api_url?: string;
    api_key?: string;
    last_sync?: string;
    created_at: string;
    updated_at: string;
}

export interface ProductRow {
    id: string;
    provider_id: string;
    sku: string;
    name: string;
    description?: string;
    brand?: string;
    category?: string;
    price: number;
    stock: number;
    images?: any;
    metadata?: any;
    synced_to_autoazur: boolean;
    created_at: string;
    updated_at: string;
}

export interface MarketplaceRow {
    id: string;
    name: string;
    slug: string;
    status: string;
    product_count: number;
    api_url?: string;
    api_key?: string;
    created_at: string;
    updated_at: string;
}

export interface SyncLogRow {
    id: string;
    provider_id: string;
    action: string;
    status: string;
    products_synced: number;
    message?: string;
    created_at: string;
}

// Helper functions to convert database rows to app types
export function providerFromRow(row: ProviderRow): Provider {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        status: row.status as Provider['status'],
        productCount: row.product_count,
        apiUrl: row.api_url,
        apiKey: row.api_key,
        lastSync: row.last_sync ? new Date(row.last_sync) : undefined,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function productFromRow(row: ProductRow): Product {
    return {
        id: row.id,
        providerId: row.provider_id,
        sku: row.sku,
        name: row.name,
        description: row.description,
        brand: row.brand,
        category: row.category,
        price: Number(row.price),
        stock: row.stock,
        images: row.images || [],
        metadata: row.metadata || {},
        syncedToAutoazur: row.synced_to_autoazur,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function marketplaceFromRow(row: MarketplaceRow): Marketplace {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        status: row.status as Marketplace['status'],
        productCount: row.product_count,
        apiUrl: row.api_url,
        apiKey: row.api_key,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

export function syncLogFromRow(row: SyncLogRow): SyncLog {
    return {
        id: row.id,
        providerId: row.provider_id,
        action: row.action,
        status: row.status as SyncLog['status'],
        productsSynced: row.products_synced,
        message: row.message,
        createdAt: new Date(row.created_at),
    };
}
