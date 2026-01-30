'use client';

import { Bell, Search, RefreshCw } from 'lucide-react';
import { useAuraStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function Header() {
    const { providers, autoAzurStatus } = useAuraStore();

    const connectedProviders = providers.filter(p => p.status === 'connected').length;
    const lastSync = providers
        .filter(p => p.lastSync)
        .sort((a, b) => (b.lastSync?.getTime() || 0) - (a.lastSync?.getTime() || 0))[0]?.lastSync;

    return (
        <header className="hidden md:block fixed top-0 left-64 lg:left-72 right-0 h-16 bg-surface-1/95 backdrop-blur border-b border-border z-30">
            <div className="flex items-center justify-between h-full px-6">
                {/* Search */}
                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                        />
                        <input
                            type="text"
                            placeholder="Buscar productos, proveedores..."
                            className="input pl-10"
                        />
                    </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                    {/* Sync Status */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-2 border border-border">
                        <RefreshCw size={14} className="text-muted" />
                        <span className="text-xs text-subtle">
                            Última sync: {formatDate(lastSync || null)}
                        </span>
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-2 border border-border">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: autoAzurStatus === 'connected' ? '#22c55e' :
                                    autoAzurStatus === 'syncing' ? '#f59e0b' : '#ef4444',
                            }}
                        />
                        <span className="text-xs text-subtle">
                            {connectedProviders}/3 Proveedores
                        </span>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-surface-3 transition-colors btn-ghost">
                        <Bell size={20} className="text-subtle" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                    </button>
                </div>
            </div>
        </header>
    );
}
