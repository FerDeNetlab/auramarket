'use client';

import { Settings, Key, Globe, Bell, Database, Shield } from 'lucide-react';

export default function ConfiguracionPage() {
    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Configuración</h1>
                <p className="text-subtle mt-1">
                    Administra las conexiones y preferencias del sistema
                </p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* API Connections */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <Key size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Conexiones API</h2>
                            <p className="text-sm text-muted">Credenciales de proveedores</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-surface-1 border border-border">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-white">GRUPO CVA</p>
                                <span className="status-badge status-connected">Conectado</span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-xs text-muted">API Key</label>
                                    <input
                                        type="password"
                                        value="••••••••••••••••"
                                        readOnly
                                        className="w-full mt-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-surface-1 border border-border">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-white">FulFil</p>
                                <span className="status-badge status-connected">Conectado</span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-xs text-muted">API Key</label>
                                    <input
                                        type="password"
                                        value="••••••••••••••••"
                                        readOnly
                                        className="w-full mt-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-surface-1 border border-border">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-white">AutoAzur</p>
                                <span className="status-badge status-connected">Conectado</span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-xs text-muted">Token de Acceso</label>
                                    <input
                                        type="password"
                                        value="••••••••••••••••"
                                        readOnly
                                        className="w-full mt-1 px-3 py-2 bg-surface-2 border border-border rounded-lg text-sm text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sync Settings */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-secondary/20">
                            <Database size={20} className="text-secondary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Sincronización</h2>
                            <p className="text-sm text-muted">Configuración de actualizaciones</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Sincronización automática</p>
                                <p className="text-sm text-muted">Actualizar productos cada hora</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Notificar errores</p>
                                <p className="text-sm text-muted">Recibir alertas por email</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Sincronizar precios</p>
                                <p className="text-sm text-muted">Actualizar precios automáticamente</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Sincronizar stock</p>
                                <p className="text-sm text-muted">Actualizar inventario en tiempo real</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-warning/20">
                            <Bell size={20} className="text-warning" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Notificaciones</h2>
                            <p className="text-sm text-muted">Alertas y avisos del sistema</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Stock bajo</p>
                                <p className="text-sm text-muted">Alertar cuando el stock sea menor a 10</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Nuevos productos</p>
                                <p className="text-sm text-muted">Notificar cuando haya nuevos productos</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-surface-3 relative">
                                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-text-muted" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-1">
                            <div>
                                <p className="font-medium text-white">Errores de conexión</p>
                                <p className="text-sm text-muted">Alertar problemas con APIs</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-success/20">
                            <Shield size={20} className="text-success" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Seguridad</h2>
                            <p className="text-sm text-muted">Acceso y permisos</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-surface-1">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-white">Cambiar contraseña</p>
                            </div>
                            <button className="btn btn-secondary w-full">
                                Actualizar contraseña
                            </button>
                        </div>

                        <div className="p-4 rounded-lg bg-surface-1">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-medium text-white">Autenticación de dos factores</p>
                                <span className="text-xs text-muted">Desactivado</span>
                            </div>
                            <button className="btn btn-primary w-full">
                                Activar 2FA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
