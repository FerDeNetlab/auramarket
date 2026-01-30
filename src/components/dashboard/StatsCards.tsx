'use client';

import { useAuraStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { Package, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant: 'blue' | 'green' | 'amber' | 'slate';
}

function StatCard({ title, value, subtitle, icon, trend, variant }: StatCardProps) {
    const variants = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
    };

    const iconBg = {
        blue: 'bg-blue-500/20',
        green: 'bg-emerald-500/20',
        amber: 'bg-amber-500/20',
        slate: 'bg-slate-500/20',
    };

    return (
        <div className="p-5 rounded-xl bg-surface-2 border border-border hover:border-border-hover transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted font-medium">{title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                        {typeof value === 'number' ? formatNumber(value) : value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-muted mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            <span>{trend.isPositive ? '↑' : '↓'}</span>
                            <span>{trend.value}% vs ayer</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${iconBg[variant]} ${variants[variant].split(' ')[2]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function StatsCards() {
    const { providers, marketplaces } = useAuraStore();

    const totalProducts = providers.reduce((sum, p) => sum + p.productCount, 0);
    const syncedProducts = marketplaces.reduce((sum, m) => sum + m.productCount, 0);
    const pendingSync = totalProducts - syncedProducts;
    const activeProviders = providers.filter(p => p.status === 'connected').length;
    const activeMarketplaces = marketplaces.filter(m => m.status === 'connected').length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <StatCard
                title="Total Productos"
                value={totalProducts}
                subtitle="En todos los proveedores"
                icon={<Package size={22} />}
                trend={{ value: 12, isPositive: true }}
                variant="blue"
            />
            <StatCard
                title="Sincronizados"
                value={syncedProducts}
                subtitle="Publicados en marketplaces"
                icon={<CheckCircle size={22} />}
                trend={{ value: 8, isPositive: true }}
                variant="green"
            />
            <StatCard
                title="Pendientes"
                value={pendingSync}
                subtitle="Por subir a AutoAzur"
                icon={<Clock size={22} />}
                variant="amber"
            />
            <StatCard
                title="Conexiones"
                value={`${activeProviders + activeMarketplaces}/6`}
                subtitle={`${activeProviders} prov, ${activeMarketplaces} mkts`}
                icon={<RefreshCw size={22} />}
                variant="slate"
            />
        </div>
    );
}
