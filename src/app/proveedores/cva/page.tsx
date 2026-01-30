'use client';

import { useState } from 'react';
import { useAuraStore } from '@/lib/store';
import { formatDate, formatNumber, formatCurrency } from '@/lib/utils';
import {
    RefreshCw,
    Upload,
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    Cpu,
    Package,
    DollarSign,
    Boxes
} from 'lucide-react';
import Link from 'next/link';

// Mock products for CVA
const mockProducts = [
    { id: '1', sku: 'CVA-001', name: 'Laptop HP ProBook 450 G8', brand: 'HP', category: 'Laptops', price: 18999, stock: 45, synced: true },
    { id: '2', sku: 'CVA-002', name: 'Monitor Dell UltraSharp 27"', brand: 'Dell', category: 'Monitores', price: 8499, stock: 120, synced: true },
    { id: '3', sku: 'CVA-003', name: 'Teclado Logitech MX Keys', brand: 'Logitech', category: 'Periféricos', price: 2899, stock: 234, synced: false },
    { id: '4', sku: 'CVA-004', name: 'Mouse Razer DeathAdder V2', brand: 'Razer', category: 'Periféricos', price: 1299, stock: 89, synced: true },
    { id: '5', sku: 'CVA-005', name: 'SSD Samsung 970 EVO 1TB', brand: 'Samsung', category: 'Almacenamiento', price: 2499, stock: 156, synced: true },
    { id: '6', sku: 'CVA-006', name: 'RAM Kingston Fury 16GB DDR4', brand: 'Kingston', category: 'Memoria', price: 1599, stock: 78, synced: false },
    { id: '7', sku: 'CVA-007', name: 'Procesador AMD Ryzen 7 5800X', brand: 'AMD', category: 'Procesadores', price: 7899, stock: 32, synced: true },
    { id: '8', sku: 'CVA-008', name: 'Tarjeta Gráfica NVIDIA RTX 3070', brand: 'NVIDIA', category: 'Tarjetas Gráficas', price: 14999, stock: 12, synced: true },
];

export default function CVAPage() {
    const { providers, syncProvider, uploadToAutoAzur } = useAuraStore();
    const provider = providers.find(p => p.id === 'cva');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    if (!provider) return null;

    const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

    const filteredProducts = mockProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const syncedCount = mockProducts.filter(p => p.synced).length;
    const totalValue = mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return (
        <div className="p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted">
                <Link href="/proveedores" className="hover:text-white transition-colors">
                    Proveedores
                </Link>
                <span>/</span>
                <span className="text-white">GRUPO CVA</span>
            </div>

            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 flex items-center justify-center">
                        <Cpu size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{provider.name}</h1>
                        <p className="text-subtle">{provider.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className={`status-badge ${provider.status === 'connected' ? 'status-connected' :
                                    provider.status === 'syncing' ? 'status-syncing' : 'status-disconnected'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-success' :
                                        provider.status === 'syncing' ? 'bg-warning animate-pulse' : 'bg-text-muted'
                                    }`} />
                                {provider.status === 'connected' ? 'Conectado' :
                                    provider.status === 'syncing' ? 'Sincronizando' : 'Desconectado'}
                            </span>
                            <span className="text-xs text-muted">
                                Última sync: {formatDate(provider.lastSync)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => syncProvider('cva')}
                        disabled={provider.status === 'syncing'}
                        className="btn btn-secondary"
                    >
                        <RefreshCw size={18} className={provider.status === 'syncing' ? 'animate-spin' : ''} />
                        Sincronizar
                    </button>
                    <button
                        onClick={() => uploadToAutoAzur('cva')}
                        disabled={provider.status === 'syncing'}
                        className="btn btn-primary"
                    >
                        <Upload size={18} />
                        Subir a AutoAzur
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <Package size={20} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Total Productos</p>
                            <p className="text-xl font-bold text-white">{formatNumber(provider.productCount)}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-success/20">
                            <Upload size={20} className="text-success" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Sincronizados</p>
                            <p className="text-xl font-bold text-white">{syncedCount}/{mockProducts.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/20">
                            <Boxes size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">En Stock</p>
                            <p className="text-xl font-bold text-white">{formatNumber(mockProducts.reduce((s, p) => s + p.stock, 0))}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-warning/20">
                            <DollarSign size={20} className="text-warning" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Valor Inventario</p>
                            <p className="text-xl font-bold text-white">{formatCurrency(totalValue)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="card p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-surface-1 border border-border rounded-lg text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-muted" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 bg-surface-1 border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                        >
                            <option value="all">Todas las categorías</option>
                            {categories.filter(c => c !== 'all').map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-secondary">
                        <Download size={18} />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="card overflow-hidden">
                <table className="table">
                    <thead>
                        <tr className="bg-surface-1">
                            <th>SKU</th>
                            <th>Producto</th>
                            <th>Marca</th>
                            <th>Categoría</th>
                            <th className="text-right">Precio</th>
                            <th className="text-right">Stock</th>
                            <th className="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="font-mono text-sm text-muted">{product.sku}</td>
                                <td className="font-medium text-white">{product.name}</td>
                                <td className="text-subtle">{product.brand}</td>
                                <td>
                                    <span className="px-2 py-1 rounded-full text-xs bg-surface-3 text-subtle">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="text-right font-medium text-white">{formatCurrency(product.price)}</td>
                                <td className="text-right">
                                    <span className={product.stock < 20 ? 'text-warning' : 'text-subtle'}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {product.synced ? (
                                        <span className="status-badge status-connected">Sincronizado</span>
                                    ) : (
                                        <span className="status-badge status-warning">Pendiente</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-border">
                    <span className="text-sm text-muted">
                        Mostrando {filteredProducts.length} de {mockProducts.length} productos
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-surface-3 text-muted disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <span className="px-3 py-1 rounded-lg bg-primary text-white text-sm">1</span>
                        <button className="px-3 py-1 rounded-lg hover:bg-surface-3 text-muted text-sm">2</button>
                        <button className="px-3 py-1 rounded-lg hover:bg-surface-3 text-muted text-sm">3</button>
                        <button className="p-2 rounded-lg hover:bg-surface-3 text-muted">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
