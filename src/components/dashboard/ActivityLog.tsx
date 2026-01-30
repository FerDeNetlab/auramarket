'use client';

import { useAuraStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { ArrowDownCircle, ArrowUpCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ActivityLog() {
    const { syncLogs, providers } = useAuraStore();

    const getProviderName = (providerId: string) => {
        return providers.find(p => p.id === providerId)?.name || providerId;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle size={16} className="text-success" />;
            case 'error':
                return <XCircle size={16} className="text-error" />;
            default:
                return <Clock size={16} className="text-warning animate-spin" />;
        }
    };

    const getTypeIcon = (type: string) => {
        return type === 'download'
            ? <ArrowDownCircle size={16} className="text-primary" />
            : <ArrowUpCircle size={16} className="text-secondary" />;
    };

    // Show mock data if no real logs
    const displayLogs = syncLogs.length > 0 ? syncLogs : [
        {
            id: '1',
            providerId: 'cva',
            action: 'download',
            status: 'success' as const,
            message: 'Sincronización automática completada',
            productsSynced: 324,
            createdAt: new Date(Date.now() - 3600000),
        },
        {
            id: '2',
            providerId: 'fulfil',
            action: 'upload',
            status: 'success' as const,
            message: 'Productos subidos a AutoAzur',
            productsSynced: 156,
            createdAt: new Date(Date.now() - 7200000),
        },
        {
            id: '3',
            providerId: 'cva',
            action: 'download',
            status: 'success' as const,
            message: 'Actualización de precios completada',
            productsSynced: 892,
            createdAt: new Date(Date.now() - 10800000),
        },
    ];

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Actividad Reciente</h3>
                <span className="text-xs text-muted">Últimas 24 horas</span>
            </div>

            <div className="space-y-3">
                {displayLogs.slice(0, 5).map((log) => (
                    <div
                        key={log.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-surface-1 hover:bg-surface-3 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            {getTypeIcon(log.action)}
                            {getStatusIcon(log.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{log.message}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-muted">{getProviderName(log.providerId)}</span>
                                <span className="text-xs text-muted">•</span>
                                <span className="text-xs text-muted">{log.productsSynced} productos</span>
                            </div>
                        </div>

                        <span className="text-xs text-muted whitespace-nowrap">
                            {formatDate(log.createdAt)}
                        </span>
                    </div>
                ))}
            </div>

            {displayLogs.length === 0 && (
                <div className="text-center py-8 text-muted">
                    <p>No hay actividad reciente</p>
                </div>
            )}
        </div>
    );
}
