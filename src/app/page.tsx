'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import StatsCards from '@/components/dashboard/StatsCards';
import ActivityLog from '@/components/dashboard/ActivityLog';
import { useAuraStore } from '@/lib/store';
import { RefreshCw, Upload, ArrowRight } from 'lucide-react';

// Dynamic import for React Flow (requires client-side only)
const ConnectionFlow = dynamic(
  () => import('@/components/dashboard/ConnectionFlow'),
  { ssr: false, loading: () => <FlowSkeleton /> }
);

function FlowSkeleton() {
  return (
    <div className="w-full h-[450px] bg-surface-2 rounded-2xl border border-border flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface-3 animate-pulse" />
        <div className="h-4 w-32 bg-surface-3 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const {
    syncProvider,
    uploadToAutoAzur,
    providers,
    autoAzurStatus,
    loadProviders,
    loadMarketplaces,
    loadSyncLogs,
    isLoading,
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
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-subtle mt-1">
            Vista general del flujo de sincronización
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="btn btn-secondary"
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            Sincronizar Todo
          </button>
          <button
            onClick={handleUploadAll}
            disabled={isSyncing}
            className="btn btn-primary"
          >
            <Upload size={18} />
            Subir a AutoAzur
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Connection Flow Diagram */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Flujo de Conexión</h2>
          <div className="flex items-center gap-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Conectado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
              <span>Sincronizando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error" />
              <span>Error</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-text-muted" />
              <span>Desconectado</span>
            </div>
          </div>
        </div>

        <ConnectionFlow />

        {/* Flow Description */}
        <div className="flex items-center justify-center gap-4 text-sm text-subtle">
          <span className="px-3 py-1 rounded-full bg-success/10 border border-success/30 text-success">
            3 APIs Proveedores
          </span>
          <ArrowRight size={20} className="text-muted" />
          <span className="px-3 py-1 rounded-full gradient-primary text-white">
            AutoAzur
          </span>
          <ArrowRight size={20} className="text-muted" />
          <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary">
            Marketplaces
          </span>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityLog />
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => syncProvider(provider.id)}
                disabled={provider.status === 'disconnected' || provider.status === 'syncing'}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-1 hover:bg-surface-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-success' :
                    provider.status === 'syncing' ? 'bg-warning animate-pulse' :
                      'bg-text-muted'
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
