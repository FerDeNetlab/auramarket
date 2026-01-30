'use client';

import { useAuraStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import {
    Zap,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    ShoppingCart,
    Package,
    Store,
    ArrowRight,
    Settings,
    ExternalLink
} from 'lucide-react';

export default function AutoAzurPage() {
    const { marketplaces, autoAzurStatus, providers, setAutoAzurStatus } = useAuraStore();

    const totalProducts = providers.reduce((sum, p) => sum + p.productCount, 0);
    const publishedProducts = marketplaces.reduce((sum, m) => sum + m.productCount, 0);
    const connectedMarketplaces = marketplaces.filter(m => m.status === 'connected').length;

    const marketplaceIcons = {
        mercadolibre: ShoppingCart,
        amazon: Package,
        walmart: Store,
    };

    const handleTestConnection = async () => {
        setAutoAzurStatus('syncing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAutoAzurStatus('connected');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                        <Zap size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">AutoAzur</h1>
                        <p className="text-subtle">Integrador central de marketplaces</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className={`status-badge ${autoAzurStatus === 'connected' ? 'status-connected' :
                                    autoAzurStatus === 'syncing' ? 'status-syncing' : 'status-error'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${autoAzurStatus === 'connected' ? 'bg-success' :
                                        autoAzurStatus === 'syncing' ? 'bg-warning animate-pulse' : 'bg-error'
                                    }`} />
                                {autoAzurStatus === 'connected' ? 'Conectado' :
                                    autoAzurStatus === 'syncing' ? 'Sincronizando' : 'Error'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleTestConnection}
                        disabled={autoAzurStatus === 'syncing'}
                        className="btn btn-secondary"
                    >
                        <RefreshCw size={18} className={autoAzurStatus === 'syncing' ? 'animate-spin' : ''} />
                        Probar Conexión
                    </button>
                    <a
                        href="https://autoazur.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        <ExternalLink size={18} />
                        Ir a AutoAzur
                    </a>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted">Productos en Catálogo</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(totalProducts)}</p>
                            <p className="text-xs text-muted mt-1">De todos los proveedores</p>
                        </div>
                        <div className="p-3 rounded-xl bg-primary/20">
                            <Package size={24} className="text-primary" />
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted">Publicados</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(publishedProducts)}</p>
                            <p className="text-xs text-success mt-1">
                                {((publishedProducts / totalProducts) * 100).toFixed(1)}% del catálogo
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-success/20">
                            <CheckCircle size={24} className="text-success" />
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted">Marketplaces Activos</p>
                            <p className="text-3xl font-bold text-white mt-1">{connectedMarketplaces}/{marketplaces.length}</p>
                            <p className="text-xs text-muted mt-1">Canales conectados</p>
                        </div>
                        <div className="p-3 rounded-xl bg-secondary/20">
                            <Store size={24} className="text-secondary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Flow Visualization */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Flujo de Publicación</h2>
                <div className="flex items-center justify-center gap-4 py-8">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-success/20 border border-success/30 flex items-center justify-center mx-auto mb-2">
                            <Package size={32} className="text-success" />
                        </div>
                        <p className="text-sm font-medium text-white">Proveedores</p>
                        <p className="text-xs text-muted">{formatNumber(totalProducts)} productos</p>
                    </div>

                    <ArrowRight size={32} className="text-muted" />

                    <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-2 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                            <Zap size={40} className="text-white" />
                        </div>
                        <p className="text-sm font-medium text-white">AutoAzur</p>
                        <p className="text-xs text-muted">Hub central</p>
                    </div>

                    <ArrowRight size={32} className="text-muted" />

                    <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center mx-auto mb-2">
                            <Store size={32} className="text-secondary" />
                        </div>
                        <p className="text-sm font-medium text-white">Marketplaces</p>
                        <p className="text-xs text-muted">{formatNumber(publishedProducts)} publicados</p>
                    </div>
                </div>
            </div>

            {/* Marketplaces */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">Marketplaces Conectados</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {marketplaces.map((marketplace) => {
                        const Icon = marketplaceIcons[marketplace.id as keyof typeof marketplaceIcons] || Store;

                        return (
                            <div key={marketplace.id} className="card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                                            <Icon size={24} className="text-secondary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{marketplace.name}</p>
                                            <span className={`status-badge text-xs ${marketplace.status === 'connected' ? 'status-connected' :
                                                    marketplace.status === 'syncing' ? 'status-syncing' : 'status-disconnected'
                                                }`}>
                                                {marketplace.status === 'connected' ? 'Conectado' :
                                                    marketplace.status === 'syncing' ? 'Sincronizando' : 'Desconectado'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div>
                                        <p className="text-2xl font-bold text-white">{formatNumber(marketplace.productCount)}</p>
                                        <p className="text-xs text-muted">productos publicados</p>
                                    </div>
                                    <button className="btn btn-secondary text-sm py-2 px-4">
                                        <Settings size={16} />
                                        Configurar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Info Card */}
            <div className="card p-6 border-primary/30 bg-primary/5">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <AlertCircle size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-1">¿Cómo funciona AutoAzur?</h3>
                        <p className="text-sm text-subtle">
                            AutoAzur actúa como un puente inteligente entre tus proveedores y los marketplaces.
                            Sincroniza automáticamente precios, stock y descripciones en todos tus canales de venta.
                            Los productos subidos desde Sistema Aura se publican automáticamente en los marketplaces configurados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
