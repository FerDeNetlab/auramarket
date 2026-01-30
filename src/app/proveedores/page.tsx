'use client';

import Link from 'next/link';
import { useAuraStore } from '@/lib/store';
import { formatDate, formatNumber } from '@/lib/utils';
import { Cpu, Globe, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';

const providerIcons = {
    cva: Cpu,
    fulfil: Globe,
    tbd: HelpCircle,
};

const providerColors = {
    cva: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
    fulfil: 'from-green-500/20 to-green-600/5 border-green-500/30',
    tbd: 'from-gray-500/20 to-gray-600/5 border-gray-500/30',
};

export default function ProveedoresPage() {
    const { providers, syncProvider } = useAuraStore();

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Proveedores</h1>
                <p className="text-subtle mt-1">
                    Gestiona la sincronización de productos con cada proveedor
                </p>
            </div>

            {/* Provider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => {
                    const Icon = providerIcons[provider.id as keyof typeof providerIcons] || HelpCircle;
                    const colorClass = providerColors[provider.id as keyof typeof providerColors] || providerColors.tbd;

                    return (
                        <div
                            key={provider.id}
                            className={`relative p-6 rounded-2xl border bg-gradient-to-br ${colorClass} overflow-hidden`}
                        >
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 status-badge ${provider.status === 'connected' ? 'status-connected' :
                                    provider.status === 'syncing' ? 'status-syncing' :
                                        provider.status === 'error' ? 'status-error' :
                                            'status-disconnected'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-success' :
                                        provider.status === 'syncing' ? 'bg-warning animate-pulse' :
                                            provider.status === 'error' ? 'bg-error' :
                                                'bg-text-muted'
                                    }`} />
                                {provider.status === 'connected' ? 'Conectado' :
                                    provider.status === 'syncing' ? 'Sincronizando' :
                                        provider.status === 'error' ? 'Error' : 'Desconectado'}
                            </div>

                            {/* Icon & Title */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-surface-1/50 flex items-center justify-center">
                                    <Icon size={28} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                                    <p className="text-sm text-muted">{provider.description}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-surface-1/30">
                                    <p className="text-xs text-muted">Productos</p>
                                    <p className="text-xl font-bold text-white">{formatNumber(provider.productCount)}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface-1/30">
                                    <p className="text-xs text-muted">Última Sync</p>
                                    <p className="text-sm font-medium text-white">{formatDate(provider.lastSync)}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => syncProvider(provider.id)}
                                    disabled={provider.status === 'disconnected' || provider.status === 'syncing'}
                                    className="btn btn-secondary flex-1"
                                >
                                    <RefreshCw size={16} className={provider.status === 'syncing' ? 'animate-spin' : ''} />
                                    {provider.status === 'syncing' ? 'Sincronizando...' : 'Sincronizar'}
                                </button>
                                <Link
                                    href={`/proveedores/${provider.slug}`}
                                    className="btn btn-primary"
                                >
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5 bg-white" />
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Cómo funciona</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
                            1
                        </div>
                        <div>
                            <p className="font-medium text-white">Sincronizar</p>
                            <p className="text-sm text-muted">Descarga los productos del proveedor a tu catálogo local</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
                            2
                        </div>
                        <div>
                            <p className="font-medium text-white">Revisar</p>
                            <p className="text-sm text-muted">Verifica precios, stock y descripciones</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
                            3
                        </div>
                        <div>
                            <p className="font-medium text-white">Publicar</p>
                            <p className="text-sm text-muted">Sube a AutoAzur para distribuir a marketplaces</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
