'use client';

import { useEffect } from 'react';
import StatsCards from '@/components/dashboard/StatsCards';
import ConnectionFlow from '@/components/dashboard/ConnectionFlow';
import ActivityLog from '@/components/dashboard/ActivityLog';
import { useAuraStore } from '@/lib/store';
import { RefreshCw, Upload } from 'lucide-react';

export default function DashboardPage() {
  const {
    syncProvider,
    uploadToAutoAzur,
    providers,
    autoAzurStatus,
    loadProviders,
    loadMarketplaces,
    loadSyncLogs,
  } = useAuraStore();

  // Load data from Supabase on mount
  useEffect(() => {
    loadProviders();
    loadMarketplaces();
    loadSyncLogs();
  }, []);

  const isSyncing = providers.some(p => p.status === 'syncing') || autoAzurStatus === 'syncing';

  const handleSyncAll = async () => {
    for (const provider of providers.filter(p => p.status !== 'disconnected')) {
      await syncProvider(provider.id);
    }
  };

  const handleUploadAll = async () => {
    for (const provider of providers.filter(p => p.status === 'connected')) {
      await uploadToAutoAzur(provider.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-muted mt-1">
            Vista general del flujo de sincronización
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="btn btn-secondary btn-sm sm:btn"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Sincronizar Todo</span>
            <span className="sm:hidden">Sync</span>
          </button>
          <button
            onClick={handleUploadAll}
            disabled={isSyncing}
            className="btn btn-primary btn-sm sm:btn"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Subir a AutoAzur</span>
            <span className="sm:hidden">Subir</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Connection Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-white">Flujo de Conexión</h2>
        </div>
        <ConnectionFlow />
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <ActivityLog />
        </div>

        {/* Quick Actions */}
        <div className="card p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
          <div className="space-y-2">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => syncProvider(provider.id)}
                disabled={provider.status === 'disconnected' || provider.status === 'syncing'}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-1 hover:bg-surface-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ border: 'none', cursor: provider.status === 'disconnected' ? 'not-allowed' : 'pointer' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-emerald-500' :
                      provider.status === 'syncing' ? 'bg-amber-500 animate-pulse' :
                        'bg-slate-500'
                    }`} />
                  <span className="text-sm text-white">{provider.name}</span>
                </div>
                <span className="text-xs text-muted">
                  {provider.status === 'syncing' ? 'Sincronizando...' : 'Sincronizar'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
