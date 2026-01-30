'use client';

import { useState } from 'react';
import { useAuraStore } from '@/lib/store';
import { formatNumber, formatCurrency } from '@/lib/utils';
import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    Package,
    CheckCircle,
    Clock,
    Cpu,
    Globe
} from 'lucide-react';

// Combined mock products from all providers
const allProducts = [
    { id: '1', sku: 'CVA-001', name: 'Laptop HP ProBook 450 G8', brand: 'HP', category: 'Laptops', price: 18999, stock: 45, synced: true, provider: 'cva' },
    { id: '2', sku: 'CVA-002', name: 'Monitor Dell UltraSharp 27"', brand: 'Dell', category: 'Monitores', price: 8499, stock: 120, synced: true, provider: 'cva' },
    { id: '3', sku: 'FF-001', name: 'Auriculares Bluetooth Premium', brand: 'SoundMax', category: 'Audio', price: 899, stock: 520, synced: true, provider: 'fulfil' },
    { id: '4', sku: 'FF-002', name: 'Smartwatch Deportivo Pro', brand: 'FitTech', category: 'Wearables', price: 1599, stock: 340, synced: true, provider: 'fulfil' },
    { id: '5', sku: 'CVA-003', name: 'Teclado Logitech MX Keys', brand: 'Logitech', category: 'Periféricos', price: 2899, stock: 234, synced: false, provider: 'cva' },
    { id: '6', sku: 'FF-003', name: 'Cargador Inalámbrico 15W', brand: 'PowerUp', category: 'Accesorios', price: 399, stock: 890, synced: true, provider: 'fulfil' },
    { id: '7', sku: 'CVA-004', name: 'Mouse Razer DeathAdder V2', brand: 'Razer', category: 'Periféricos', price: 1299, stock: 89, synced: true, provider: 'cva' },
    { id: '8', sku: 'FF-004', name: 'Funda Silicona iPhone 15', brand: 'CasePro', category: 'Fundas', price: 299, stock: 1200, synced: false, provider: 'fulfil' },
    { id: '9', sku: 'CVA-005', name: 'SSD Samsung 970 EVO 1TB', brand: 'Samsung', category: 'Almacenamiento', price: 2499, stock: 156, synced: true, provider: 'cva' },
    { id: '10', sku: 'FF-005', name: 'Cable USB-C a Lightning 2m', brand: 'ConnectPlus', category: 'Cables', price: 199, stock: 2500, synced: true, provider: 'fulfil' },
];

const providerInfo = {
    cva: { name: 'GRUPO CVA', icon: Cpu, color: 'text-blue-400' },
    fulfil: { name: 'FulFil', icon: Globe, color: 'text-green-400' },
};

export default function ProductosPage() {
    const { providers } = useAuraStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProvider = selectedProvider === 'all' || product.provider === selectedProvider;
        const matchesStatus = selectedStatus === 'all' ||
            (selectedStatus === 'synced' && product.synced) ||
            (selectedStatus === 'pending' && !product.synced);
        return matchesSearch && matchesProvider && matchesStatus;
    });

    const totalProducts = allProducts.length;
    const syncedProducts = allProducts.filter(p => p.synced).length;
    const totalValue = allProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Productos</h1>
                <p className="text-subtle mt-1">
                    Catálogo unificado de todos los proveedores
                </p>
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
                            <p className="text-xl font-bold text-white">{formatNumber(totalProducts)}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-success/20">
                            <CheckCircle size={20} className="text-success" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Sincronizados</p>
                            <p className="text-xl font-bold text-white">{syncedProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-warning/20">
                            <Clock size={20} className="text-warning" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Pendientes</p>
                            <p className="text-xl font-bold text-white">{totalProducts - syncedProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/20">
                            <Package size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Valor Total</p>
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
                            placeholder="Buscar por nombre, SKU o marca..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-surface-1 border border-border rounded-lg text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-muted" />
                        <select
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.target.value)}
                            className="px-4 py-2 bg-surface-1 border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                        >
                            <option value="all">Todos los proveedores</option>
                            {providers.filter(p => p.status !== 'disconnected').map(provider => (
                                <option key={provider.id} value={provider.id}>{provider.name}</option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 bg-surface-1 border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="synced">Sincronizados</option>
                            <option value="pending">Pendientes</option>
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
                            <th>Proveedor</th>
                            <th>Categoría</th>
                            <th className="text-right">Precio</th>
                            <th className="text-right">Stock</th>
                            <th className="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => {
                            const provider = providerInfo[product.provider as keyof typeof providerInfo];
                            const ProviderIcon = provider?.icon || Package;

                            return (
                                <tr key={product.id}>
                                    <td className="font-mono text-sm text-muted">{product.sku}</td>
                                    <td>
                                        <div>
                                            <p className="font-medium text-white">{product.name}</p>
                                            <p className="text-xs text-muted">{product.brand}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <ProviderIcon size={16} className={provider?.color} />
                                            <span className="text-sm text-subtle">{provider?.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="px-2 py-1 rounded-full text-xs bg-surface-3 text-subtle">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="text-right font-medium text-white">{formatCurrency(product.price)}</td>
                                    <td className="text-right">
                                        <span className={product.stock < 100 ? 'text-warning' : 'text-subtle'}>
                                            {formatNumber(product.stock)}
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
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-border">
                    <span className="text-sm text-muted">
                        Mostrando {filteredProducts.length} de {allProducts.length} productos
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-surface-3 text-muted disabled:opacity-50" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <span className="px-3 py-1 rounded-lg bg-primary text-white text-sm">1</span>
                        <button className="p-2 rounded-lg hover:bg-surface-3 text-muted">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
