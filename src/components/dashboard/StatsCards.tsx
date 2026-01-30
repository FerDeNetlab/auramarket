'use client';

import { useAuraStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { Package, CheckCircle, Clock, Truck, Store, RefreshCw } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color: 'primary' | 'success' | 'warning' | 'secondary';
}

function StatCard({ title, value, subtitle, icon, trend, color }: StatCardProps) {
    const colorClasses = {
        primary: 'from-primary/20 to-primary/5 border-primary/30',
        success: 'from-success/20 to-success/5 border-success/30',
        warning: 'from-warning/20 to-warning/5 border-warning/30',
        secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
    };

    const iconColors = {
        primary: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        secondary: 'text-secondary',
    };

    return (
        <div className={`relative p-6 rounded-2xl border bg-gradient-to-br ${colorClasses[color]} overflow-hidden`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-subtle font-medium">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {typeof value === 'number' ? formatNumber(value) : value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-muted mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                            <span>{trend.isPositive ? '↑' : '↓'}</span>
                            <span>{trend.value}% vs ayer</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-surface-1/50 ${iconColors[color]}`}>
                    {icon}
                </div>
            </div>

            {/* Decorative element */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 ${color === 'primary' ? 'bg-primary' :
                    color === 'success' ? 'bg-success' :
                        color === 'warning' ? 'bg-warning' :
                            'bg-secondary'
                }`} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Total Productos"
                value={totalProducts}
                subtitle="En todos los proveedores"
                icon={<Package size={24} />}
                trend={{ value: 12, isPositive: true }}
                color="primary"
            />
            <StatCard
                title="Sincronizados"
                value={syncedProducts}
                subtitle="Publicados en marketplaces"
                icon={<CheckCircle size={24} />}
                trend={{ value: 8, isPositive: true }}
                color="success"
            />
            <StatCard
                title="Pendientes"
                value={pendingSync}
                subtitle="Por subir a AutoAzur"
                icon={<Clock size={24} />}
                color="warning"
            />
            <StatCard
                title="Conexiones Activas"
                value={`${activeProviders + activeMarketplaces}/6`}
                subtitle={`${activeProviders} proveedores, ${activeMarketplaces} marketplaces`}
                icon={<RefreshCw size={24} />}
                color="secondary"
            />
        </div>
    );
}
