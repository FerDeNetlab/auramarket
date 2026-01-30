'use client';

import { useAuraStore } from '@/lib/store';
import { Cpu, Globe, HelpCircle, Zap, ShoppingCart, Store, Package, ArrowRight } from 'lucide-react';

export default function ConnectionFlow() {
    const { providers, marketplaces, autoAzurStatus } = useAuraStore();

    const providerIcons = {
        cva: Cpu,
        fulfil: Globe,
        tbd: HelpCircle,
    };

    const marketplaceIcons = {
        mercadolibre: ShoppingCart,
        amazon: Package,
        walmart: Store,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected':
                return 'border-emerald-500/30 bg-emerald-500/5';
            case 'syncing':
                return 'border-amber-500/30 bg-amber-500/5 animate-pulse';
            case 'error':
                return 'border-red-500/30 bg-red-500/5';
            default:
                return 'border-gray-700 bg-gray-800/30';
        }
    };

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'connected':
                return 'bg-emerald-500';
            case 'syncing':
                return 'bg-amber-500 animate-pulse';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 p-6 md:p-8">
            {/* Mobile: Vertical Flow */}
            <div className="block md:hidden space-y-6">
                {/* Providers Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Proveedores</h3>
                    {providers.map((provider) => {
                        const Icon = providerIcons[provider.slug as keyof typeof providerIcons] || HelpCircle;
                        return (
                            <div key={provider.id} className={`p-4 rounded-xl border transition-all ${getStatusColor(provider.status)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                                        <Icon size={20} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-white text-sm truncate">{provider.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${getStatusDot(provider.status)}`} />
                                        </div>
                                        <p className="text-xs text-gray-400">{provider.productCount.toLocaleString()} productos</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AutoAzur Hub */}
                <div className="flex justify-center py-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Zap size={24} className="text-white" />
                    </div>
                </div>

                {/* Marketplaces Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Marketplaces</h3>
                    {marketplaces.map((marketplace) => {
                        const Icon = marketplaceIcons[marketplace.slug as keyof typeof marketplaceIcons] || ShoppingCart;
                        return (
                            <div key={marketplace.id} className={`p-4 rounded-xl border transition-all ${getStatusColor(marketplace.status)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                                        <Icon size={20} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-white text-sm truncate">{marketplace.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${getStatusDot(marketplace.status)}`} />
                                        </div>
                                        <p className="text-xs text-gray-400">{marketplace.productCount.toLocaleString()} publicados</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Desktop: Horizontal Flow */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
                {/* Providers Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Proveedores</h3>
                    {providers.map((provider) => {
                        const Icon = providerIcons[provider.slug as keyof typeof providerIcons] || HelpCircle;
                        return (
                            <div key={provider.id} className={`group p-4 rounded-xl border transition-all hover:scale-105 ${getStatusColor(provider.status)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-colors">
                                        <Icon size={22} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-white text-sm">{provider.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${getStatusDot(provider.status)}`} />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">{provider.productCount.toLocaleString()} productos</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Center Hub */}
                <div className="flex flex-col items-center gap-4 px-4">
                    <ArrowRight size={24} className="text-gray-600" />
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full"></div>
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-2xl shadow-violet-500/30 border border-violet-500/20">
                            <Zap size={32} className="text-white" />
                        </div>
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusDot(autoAzurStatus)}`} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-white">AutoAzur</p>
                        <p className="text-xs text-gray-400">Hub Central</p>
                    </div>
                    <ArrowRight size={24} className="text-gray-600" />
                </div>

                {/* Marketplaces Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Marketplaces</h3>
                    {marketplaces.map((marketplace) => {
                        const Icon = marketplaceIcons[marketplace.slug as keyof typeof marketplaceIcons] || ShoppingCart;
                        return (
                            <div key={marketplace.id} className={`group p-4 rounded-xl border transition-all hover:scale-105 ${getStatusColor(marketplace.status)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-colors">
                                        <Icon size={22} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-white text-sm">{marketplace.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${getStatusDot(marketplace.status)}`} />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">{marketplace.productCount.toLocaleString()} publicados</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-700/50 flex flex-wrap items-center gap-4 justify-center text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-gray-400">Conectado</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-gray-400">Sincronizando</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-gray-400">Desconectado</span>
                </div>
            </div>
        </div>
    );
}
