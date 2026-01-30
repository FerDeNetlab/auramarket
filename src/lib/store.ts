import { create } from 'zustand';
import { Provider, Product, SyncLog, Marketplace, DashboardStats, ConnectionStatus } from '@/types';

// Mock data for initial state
const mockProviders: Provider[] = [
    {
        id: 'cva',
        name: 'GRUPO CVA',
        slug: 'cva',
        description: 'Proveedor mexicano de equipo de cómputo',
        status: 'connected',
        lastSync: new Date(Date.now() - 3600000),
        productCount: 15420,
    },
    {
        id: 'fulfil',
        name: 'FulFil',
        slug: 'fulfil',
        description: 'Dropshipping internacional',
        status: 'connected',
        lastSync: new Date(Date.now() - 7200000),
        productCount: 8750,
    },
    {
        id: 'tbd',
        name: 'Proveedor TBD',
        slug: 'tbd',
        description: 'Próximamente disponible',
        status: 'disconnected',
        lastSync: null,
        productCount: 0,
    },
];

const mockMarketplaces: Marketplace[] = [
    {
        id: 'mercadolibre',
        name: 'Mercado Libre',
        slug: 'mercadolibre',
        status: 'connected',
        productCount: 12500,
    },
    {
        id: 'amazon',
        name: 'Amazon',
        slug: 'amazon',
        status: 'connected',
        productCount: 8200,
    },
    {
        id: 'walmart',
        name: 'Walmart',
        slug: 'walmart',
        status: 'syncing',
        productCount: 5400,
    },
];

interface AuraStore {
    // State
    providers: Provider[];
    marketplaces: Marketplace[];
    products: Product[];
    syncLogs: SyncLog[];
    autoAzurStatus: ConnectionStatus;

    // Computed
    stats: DashboardStats;

    // Actions
    setProviderStatus: (providerId: string, status: ConnectionStatus) => void;
    setAutoAzurStatus: (status: ConnectionStatus) => void;
    addSyncLog: (log: Omit<SyncLog, 'id' | 'timestamp'>) => void;
    syncProvider: (providerId: string) => Promise<void>;
    uploadToAutoAzur: (providerId: string) => Promise<void>;
}

export const useAuraStore = create<AuraStore>((set, get) => ({
    providers: mockProviders,
    marketplaces: mockMarketplaces,
    products: [],
    syncLogs: [],
    autoAzurStatus: 'connected',

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

    setProviderStatus: (providerId, status) => set((state) => ({
        providers: state.providers.map(p =>
            p.id === providerId ? { ...p, status } : p
        ),
    })),

    setAutoAzurStatus: (status) => set({ autoAzurStatus: status }),

    addSyncLog: (log) => set((state) => ({
        syncLogs: [
            {
                ...log,
                id: `log-${Date.now()}`,
                timestamp: new Date(),
            },
            ...state.syncLogs.slice(0, 99), // Keep last 100 logs
        ],
    })),

    syncProvider: async (providerId) => {
        const { setProviderStatus, addSyncLog } = get();

        setProviderStatus(providerId, 'syncing');
        addSyncLog({
            providerId,
            type: 'download',
            status: 'pending',
            message: 'Iniciando sincronización...',
            productsAffected: 0,
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const productsDownloaded = Math.floor(Math.random() * 500) + 100;

        setProviderStatus(providerId, 'connected');
        addSyncLog({
            providerId,
            type: 'download',
            status: 'success',
            message: `Sincronización completada exitosamente`,
            productsAffected: productsDownloaded,
        });

        set((state) => ({
            providers: state.providers.map(p =>
                p.id === providerId
                    ? { ...p, lastSync: new Date(), productCount: p.productCount + productsDownloaded }
                    : p
            ),
        }));
    },

    uploadToAutoAzur: async (providerId) => {
        const { addSyncLog, setAutoAzurStatus } = get();

        setAutoAzurStatus('syncing');
        addSyncLog({
            providerId,
            type: 'upload',
            status: 'pending',
            message: 'Subiendo productos a AutoAzur...',
            productsAffected: 0,
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));

        const productsUploaded = Math.floor(Math.random() * 300) + 50;

        setAutoAzurStatus('connected');
        addSyncLog({
            providerId,
            type: 'upload',
            status: 'success',
            message: `Productos subidos a AutoAzur exitosamente`,
            productsAffected: productsUploaded,
        });
    },
}));
