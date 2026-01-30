import { create } from 'zustand';
import { supabase } from './supabase';
import {
    Provider,
    Product,
    SyncLog,
    Marketplace,
    DashboardStats,
    ConnectionStatus
} from '@/types';
import {
    ProviderRow,
    ProductRow,
    MarketplaceRow,
    SyncLogRow,
    providerFromRow,
    productFromRow,
    marketplaceFromRow,
    syncLogFromRow,
} from '@/types/database';

interface AuraStore {
    // State
    providers: Provider[];
    marketplaces: Marketplace[];
    products: Product[];
    syncLogs: SyncLog[];
    autoAzurStatus: ConnectionStatus;
    isLoading: boolean;

    // Computed
    stats: DashboardStats;

    // Actions
    loadProviders: () => Promise<void>;
    loadMarketplaces: () => Promise<void>;
    loadProducts: (providerId?: string) => Promise<void>;
    loadSyncLogs: (providerId?: string) => Promise<void>;
    setProviderStatus: (providerId: string, status: ConnectionStatus) => Promise<void>;
    setAutoAzurStatus: (status: ConnectionStatus) => void;
    addSyncLog: (log: Omit<SyncLog, 'id' | 'createdAt'>) => Promise<void>;
    syncProvider: (providerId: string) => Promise<void>;
    uploadToAutoAzur: (providerId: string) => Promise<void>;
}

export const useAuraStore = create<AuraStore>((set, get) => ({
    providers: [],
    marketplaces: [],
    products: [],
    syncLogs: [],
    autoAzurStatus: 'connected',
    isLoading: false,

    get stats() {
        const state = get();
        const totalProducts = state.providers.reduce((sum, p) => sum + p.productCount, 0);
        const syncedProducts = state.marketplaces.reduce((sum, m) => sum + m.productCount, 0);

        return {
            totalProducts,
            syncedProducts,
            pendingSync: totalProducts - syncedProducts,
            activeProviders: state.providers.filter(p => p.status === 'connected').length,
            activeMarketplaces: state.marketplaces.filter(m => m.status === 'connected').length,
            lastGlobalSync: state.providers
                .filter(p => p.lastSync)
                .sort((a, b) => (b.lastSync?.getTime() || 0) - (a.lastSync?.getTime() || 0))[0]?.lastSync || null,
        };
    },

    loadProviders: async () => {
        set({ isLoading: true });
        try {
            const { data, error } = await supabase
                .from('providers')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            const providers = (data as ProviderRow[]).map(providerFromRow);
            set({ providers, isLoading: false });
        } catch (error) {
            console.error('Error loading providers:', error);
            set({ isLoading: false });
        }
    },

    loadMarketplaces: async () => {
        set({ isLoading: true });
        try {
            const { data, error } = await supabase
                .from('marketplaces')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            const marketplaces = (data as MarketplaceRow[]).map(marketplaceFromRow);
            set({ marketplaces, isLoading: false });
        } catch (error) {
            console.error('Error loading marketplaces:', error);
            set({ isLoading: false });
        }
    },

    loadProducts: async (providerId?: string) => {
        set({ isLoading: true });
        try {
            let query = supabase.from('products').select('*');

            if (providerId) {
                query = query.eq('provider_id', providerId);
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) throw error;

            const products = (data as ProductRow[]).map(productFromRow);
            set({ products, isLoading: false });
        } catch (error) {
            console.error('Error loading products:', error);
            set({ isLoading: false });
        }
    },

    loadSyncLogs: async (providerId?: string) => {
        try {
            let query = supabase.from('sync_logs').select('*');

            if (providerId) {
                query = query.eq('provider_id', providerId);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;

            const syncLogs = (data as SyncLogRow[]).map(syncLogFromRow);
            set({ syncLogs });
        } catch (error) {
            console.error('Error loading sync logs:', error);
        }
    },

    setProviderStatus: async (providerId, status) => {
        try {
            const { error } = await supabase
                .from('providers')
                .update({ status })
                .eq('id', providerId);

            if (error) throw error;

            set((state) => ({
                providers: state.providers.map(p =>
                    p.id === providerId ? { ...p, status } : p
                ),
            }));
        } catch (error) {
            console.error('Error updating provider status:', error);
        }
    },

    setAutoAzurStatus: (status) => set({ autoAzurStatus: status }),

    addSyncLog: async (log) => {
        try {
            const { data, error } = await supabase
                .from('sync_logs')
                .insert({
                    provider_id: log.providerId,
                    action: log.action,
                    status: log.status,
                    products_synced: log.productsSynced,
                    message: log.message,
                })
                .select()
                .single();

            if (error) throw error;

            const newLog = syncLogFromRow(data as SyncLogRow);

            set((state) => ({
                syncLogs: [newLog, ...state.syncLogs.slice(0, 49)],
            }));
        } catch (error) {
            console.error('Error adding sync log:', error);
        }
    },

    syncProvider: async (providerId) => {
        const { setProviderStatus, addSyncLog, loadProviders } = get();

        await setProviderStatus(providerId, 'syncing');
        await addSyncLog({
            providerId,
            action: 'download',
            status: 'pending',
            message: 'Iniciando sincronización...',
            productsSynced: 0,
        });

        // Simulate API call to provider
        await new Promise(resolve => setTimeout(resolve, 2000));

        const productsDownloaded = Math.floor(Math.random() * 500) + 100;

        try {
            // First, get current provider to increment count
            const { data: provider } = await supabase
                .from('providers')
                .select('product_count')
                .eq('id', providerId)
                .single();

            // Update provider in DB
            const { error } = await supabase
                .from('providers')
                .update({
                    status: 'connected',
                    last_sync: new Date().toISOString(),
                    product_count: (provider?.product_count || 0) + productsDownloaded,
                })
                .eq('id', providerId);

            if (error) throw error;

            await setProviderStatus(providerId, 'connected');
            await addSyncLog({
                providerId,
                action: 'download',
                status: 'success',
                message: `Sincronización completada exitosamente`,
                productsSynced: productsDownloaded,
            });

            // Reload providers to get updated counts
            await loadProviders();
        } catch (error) {
            console.error('Error syncing provider:', error);
            await setProviderStatus(providerId, 'error');
            await addSyncLog({
                providerId,
                action: 'download',
                status: 'error',
                message: 'Error en la sincronización',
                productsSynced: 0,
            });
        }
    },

    uploadToAutoAzur: async (providerId) => {
        const { addSyncLog, setAutoAzurStatus } = get();

        setAutoAzurStatus('syncing');
        await addSyncLog({
            providerId,
            action: 'upload',
            status: 'pending',
            message: 'Subiendo productos a AutoAzur...',
            productsSynced: 0,
        });

        // Simulate API call to AutoAzur
        await new Promise(resolve => setTimeout(resolve, 3000));

        const productsUploaded = Math.floor(Math.random() * 300) + 50;

        try {
            // Mark products as synced to AutoAzur
            const { error } = await supabase
                .from('products')
                .update({ synced_to_autoazur: true })
                .eq('provider_id', providerId)
                .eq('synced_to_autoazur', false);

            if (error) throw error;

            setAutoAzurStatus('connected');
            await addSyncLog({
                providerId,
                action: 'upload',
                status: 'success',
                message: `Productos subidos a AutoAzur exitosamente`,
                productsSynced: productsUploaded,
            });
        } catch (error) {
            console.error('Error uploading to AutoAzur:', error);
            setAutoAzurStatus('error');
            await addSyncLog({
                providerId,
                action: 'upload',
                status: 'error',
                message: 'Error al subir productos a AutoAzur',
                productsSynced: 0,
            });
        }
    },
}));
