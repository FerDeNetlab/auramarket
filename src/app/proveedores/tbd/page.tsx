'use client';

import Link from 'next/link';
import { HelpCircle, ArrowLeft, Settings, Plug } from 'lucide-react';

export default function TBDPage() {
    return (
        <div className="p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted">
                <Link href="/proveedores" className="hover:text-white transition-colors">
                    Proveedores
                </Link>
                <span>/</span>
                <span className="text-white">Proveedor TBD</span>
            </div>

            {/* Coming Soon Card */}
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-500/20 to-gray-600/5 border border-gray-500/30 flex items-center justify-center mx-auto mb-6">
                        <HelpCircle size={48} className="text-gray-400" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">Proveedor por Definir</h1>
                    <p className="text-subtle mb-8">
                        Este espacio está reservado para integrar un tercer proveedor.
                        Una vez que definas cuál será, podremos configurar la conexión con su API.
                    </p>

                    <div className="space-y-4">
                        <div className="card p-4 text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20">
                                    <Plug size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">¿Tienes un proveedor en mente?</p>
                                    <p className="text-sm text-muted">
                                        Comparte la documentación de su API para iniciar la integración
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card p-4 text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-secondary/20">
                                    <Settings size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Requisitos de integración</p>
                                    <p className="text-sm text-muted">
                                        Necesitamos: URL de API, credenciales y documentación
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/proveedores"
                        className="btn btn-secondary mt-8 inline-flex"
                    >
                        <ArrowLeft size={18} />
                        Volver a Proveedores
                    </Link>
                </div>
            </div>
        </div>
    );
}
