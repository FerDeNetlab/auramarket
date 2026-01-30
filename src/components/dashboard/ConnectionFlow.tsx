'use client';

import { useAuraStore } from '@/lib/store';
import { Cpu, Globe, HelpCircle, Zap, ShoppingCart, Store, Package, ArrowRight, Check } from 'lucide-react';

export default function ConnectionFlow() {
    const { providers, marketplaces, autoAzurStatus } = useAuraStore();

    const providerIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
        cva: Cpu,
        fulfil: Globe,
        tbd: HelpCircle,
    };

    const marketplaceIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
        mercadolibre: ShoppingCart,
        amazon: Package,
        walmart: Store,
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'connected':
                return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-500' };
            case 'syncing':
                return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-500 animate-pulse' };
            case 'error':
                return { bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-500' };
            default:
                return { bg: 'bg-slate-500/5', border: 'border-slate-500/20', dot: 'bg-slate-500' };
        }
    };

    return (
        <div className="bg-surface-2 rounded-xl border border-border p-4 md:p-6">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
                {/* Providers */}
                <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">Proveedores</h4>
                    <div className="space-y-2">
                        {providers.map((provider) => {
                            const Icon = providerIcons[provider.slug] || HelpCircle;
                            const styles = getStatusStyles(provider.status);
                            return (
                                <div key={provider.id} className={`flex items-center gap-3 p-3 rounded-lg ${styles.bg} border ${styles.border}`}>
                                    <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center">
                                        <Icon size={16} className="text-subtle" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{provider.name}</p>
                                        <p className="text-xs text-muted">{provider.productCount.toLocaleString()} productos</p>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Center Hub */}
                <div className="flex justify-center py-3">
                    <div className="flex items-center gap-3">
                        <ArrowRight size={16} className="text-muted" />
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                            <Zap size={22} className="text-white" />
                        </div>
                        <ArrowRight size={16} className="text-muted" />
                    </div>
                </div>

                {/* Marketplaces */}
                <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">Marketplaces</h4>
                    <div className="space-y-2">
                        {marketplaces.map((marketplace) => {
                            const Icon = marketplaceIcons[marketplace.slug] || ShoppingCart;
                            const styles = getStatusStyles(marketplace.status);
                            return (
                                <div key={marketplace.id} className={`flex items-center gap-3 p-3 rounded-lg ${styles.bg} border ${styles.border}`}>
                                    <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center">
                                        <Icon size={16} className="text-subtle" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{marketplace.name}</p>
                                        <p className="text-xs text-muted">{marketplace.productCount.toLocaleString()} publicados</p>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
                {/* Providers */}
                <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wide mb-4">Proveedores</h4>
                    <div className="space-y-3">
                        {providers.map((provider) => {
                            const Icon = providerIcons[provider.slug] || HelpCircle;
                            const styles = getStatusStyles(provider.status);
                            return (
                                <div key={provider.id} className={`flex items-center gap-3 p-4 rounded-xl ${styles.bg} border ${styles.border} transition-all hover:scale-[1.02]`}>
                                    <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center">
                                        <Icon size={20} className="text-subtle" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-white">{provider.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                        </div>
                                        <p className="text-xs text-muted mt-0.5">{provider.productCount.toLocaleString()} productos</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Center Hub */}
                <div className="flex flex-col items-center gap-4 pt-10">
                    <ArrowRight size={20} className="text-muted" />
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                            <Zap size={28} className="text-white" />
                        </div>
                        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${autoAzurStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                            <Check size={10} className="text-white" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-white">AutoAzur</p>
                        <p className="text-xs text-muted">Hub Central</p>
                    </div>
                    <ArrowRight size={20} className="text-muted" />
                </div>

                {/* Marketplaces */}
                <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wide mb-4">Marketplaces</h4>
                    <div className="space-y-3">
                        {marketplaces.map((marketplace) => {
                            const Icon = marketplaceIcons[marketplace.slug] || ShoppingCart;
                            const styles = getStatusStyles(marketplace.status);
                            return (
                                <div key={marketplace.id} className={`flex items-center gap-3 p-4 rounded-xl ${styles.bg} border ${styles.border} transition-all hover:scale-[1.02]`}>
                                    <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center">
                                        <Icon size={20} className="text-subtle" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-white">{marketplace.name}</p>
                                            <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                        </div>
                                        <p className="text-xs text-muted mt-0.5">{marketplace.productCount.toLocaleString()} publicados</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
