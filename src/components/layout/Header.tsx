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
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: '280px',
                right: 0,
                height: '64px',
                backgroundColor: 'rgba(17, 17, 24, 0.9)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #2a2a3a',
                zIndex: 40,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '0 24px',
                }}
            >
                {/* Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '576px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#71717a',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Buscar productos, proveedores..."
                            style={{
                                width: '100%',
                                paddingLeft: '40px',
                                paddingRight: '16px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                backgroundColor: '#1a1a24',
                                border: '1px solid #2a2a3a',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: 'white',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                {/* Status & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Sync Status */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#1a1a24',
                            border: '1px solid #2a2a3a',
                        }}
                    >
                        <RefreshCw size={14} style={{ color: '#71717a' }} />
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                            Última sync: {formatDate(lastSync || null)}
                        </span>
                    </div>

                    {/* Connection Status */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#1a1a24',
                            border: '1px solid #2a2a3a',
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: autoAzurStatus === 'connected' ? '#10b981' :
                                    autoAzurStatus === 'syncing' ? '#f59e0b' : '#ef4444',
                            }}
                        />
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                            {connectedProviders}/3 Proveedores
                        </span>
                    </div>

                    {/* Notifications */}
                    <button
                        style={{
                            position: 'relative',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Bell size={20} style={{ color: '#a1a1aa' }} />
                        <span
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#8b5cf6',
                                borderRadius: '50%',
                            }}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
