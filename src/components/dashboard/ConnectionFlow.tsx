'use client';

import { useEffect, useState } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    Edge,
    Position,
    Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAuraStore } from '@/lib/store';
import { ConnectionStatus } from '@/types';
import { Cpu, Globe, HelpCircle, Zap, ShoppingCart, Store, Package, LucideIcon } from 'lucide-react';

interface NodeData {
    label: string;
    status: ConnectionStatus;
    productCount?: number;
    icon?: LucideIcon;
}

interface CustomNodeProps {
    data: NodeData;
}

// Custom node component for providers
function ProviderNode({ data }: CustomNodeProps) {
    const status = data.status;
    const Icon = data.icon;

    return (
        <div className={`relative px-6 py-4 rounded-xl border-2 transition-all duration-300 ${status === 'connected' ? 'bg-surface-2 border-success/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' :
            status === 'syncing' ? 'bg-surface-2 border-warning/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse' :
                status === 'error' ? 'bg-surface-2 border-error/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
                    'bg-surface-2 border-border'
            }`}>
            <Handle type="source" position={Position.Right} className="!bg-primary !w-3 !h-3" />

            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === 'connected' ? 'bg-success/20 text-success' :
                    status === 'syncing' ? 'bg-warning/20 text-warning' :
                        status === 'error' ? 'bg-error/20 text-error' :
                            'bg-surface-3 text-muted'
                    }`}>
                    {Icon && <Icon size={20} />}
                </div>
                <div>
                    <p className="font-semibold text-white text-sm">{data.label}</p>
                    <p className="text-xs text-muted">{data.productCount?.toLocaleString() || 0} productos</p>
                </div>
            </div>

            {/* Status indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2 ring-surface-2 ${status === 'connected' ? 'bg-success' :
                status === 'syncing' ? 'bg-warning animate-ping' :
                    status === 'error' ? 'bg-error' :
                        'bg-text-muted'
                }`} />
        </div>
    );
}

// Custom node for AutoAzur (center hub)
function HubNode({ data }: CustomNodeProps) {
    const status = data.status;

    return (
        <div className={`relative px-8 py-6 rounded-2xl border-2 transition-all duration-300 ${status === 'connected' ? 'gradient-primary border-transparent shadow-[0_0_40px_rgba(139,92,246,0.3)]' :
            status === 'syncing' ? 'bg-warning/20 border-warning shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-pulse' :
                'bg-surface-2 border-border'
            }`}>
            <Handle type="target" position={Position.Left} className="!bg-secondary !w-3 !h-3" />
            <Handle type="source" position={Position.Right} className="!bg-secondary !w-3 !h-3" />

            <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Zap size={28} className="text-white" />
                </div>
                <div className="text-center">
                    <p className="font-bold text-white text-lg">{data.label}</p>
                    <p className="text-xs text-white/70">Integrador Central</p>
                </div>
            </div>
        </div>
    );
}

// Custom node for marketplaces
function MarketplaceNode({ data }: CustomNodeProps) {
    const status = data.status;
    const Icon = data.icon;

    return (
        <div className={`relative px-6 py-4 rounded-xl border-2 transition-all duration-300 ${status === 'connected' ? 'bg-surface-2 border-secondary/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' :
            status === 'syncing' ? 'bg-surface-2 border-warning/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse' :
                'bg-surface-2 border-border'
            }`}>
            <Handle type="target" position={Position.Left} className="!bg-secondary !w-3 !h-3" />

            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === 'connected' ? 'bg-secondary/20 text-secondary' :
                    status === 'syncing' ? 'bg-warning/20 text-warning' :
                        'bg-surface-3 text-muted'
                    }`}>
                    {Icon && <Icon size={20} />}
                </div>
                <div>
                    <p className="font-semibold text-white text-sm">{data.label}</p>
                    <p className="text-xs text-muted">{data.productCount?.toLocaleString() || 0} publicados</p>
                </div>
            </div>

            {/* Status indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2 ring-surface-2 ${status === 'connected' ? 'bg-secondary' :
                status === 'syncing' ? 'bg-warning animate-ping' :
                    'bg-text-muted'
                }`} />
        </div>
    );
}

const nodeTypes = {
    provider: ProviderNode,
    hub: HubNode,
    marketplace: MarketplaceNode,
};

export default function ConnectionFlow() {
    const { providers, marketplaces, autoAzurStatus } = useAuraStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const providerIcons = {
        cva: Cpu,
        fulfil: Globe,
        tbd: HelpCircle,
    };

    const marketplaceIcons = {
        mercadolibre: ShoppingCart,
        amazon: Package,
        walmart: Store,
    };

    const nodes: Node[] = [
        // Providers (left side)
        ...providers.map((provider, index) => ({
            id: provider.id,
            type: 'provider',
            position: { x: 50, y: 80 + index * 120 },
            data: {
                label: provider.name,
                status: provider.status,
                productCount: provider.productCount,
                icon: providerIcons[provider.id as keyof typeof providerIcons],
            },
        })),
        // AutoAzur (center)
        {
            id: 'autoazur',
            type: 'hub',
            position: { x: 350, y: 140 },
            data: {
                label: 'AutoAzur',
                status: autoAzurStatus,
            },
        },
        // Marketplaces (right side)
        ...marketplaces.map((marketplace, index) => ({
            id: marketplace.id,
            type: 'marketplace',
            position: { x: 650, y: 80 + index * 120 },
            data: {
                label: marketplace.name,
                status: marketplace.status,
                productCount: marketplace.productCount,
                icon: marketplaceIcons[marketplace.id as keyof typeof marketplaceIcons],
            },
        })),
    ];

    const edges: Edge[] = [
        // Provider -> AutoAzur edges
        ...providers.map((provider) => ({
            id: `${provider.id}-autoazur`,
            source: provider.id,
            target: 'autoazur',
            animated: provider.status === 'syncing',
            style: {
                stroke: provider.status === 'connected' ? '#10b981' :
                    provider.status === 'syncing' ? '#f59e0b' : '#3a3a4a',
                strokeWidth: 2,
            },
        })),
        // AutoAzur -> Marketplace edges
        ...marketplaces.map((marketplace) => ({
            id: `autoazur-${marketplace.id}`,
            source: 'autoazur',
            target: marketplace.id,
            animated: marketplace.status === 'syncing',
            style: {
                stroke: marketplace.status === 'connected' ? '#06b6d4' :
                    marketplace.status === 'syncing' ? '#f59e0b' : '#3a3a4a',
                strokeWidth: 2,
            },
        })),
    ];

    if (!mounted) {
        return (
            <div className="w-full h-[450px] bg-surface-2 rounded-2xl border border-border flex items-center justify-center">
                <div className="animate-pulse text-muted">Cargando diagrama...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-[450px] bg-surface-2 rounded-2xl border border-border overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
                className="bg-surface-1"
            >
                <Background color="#2a2a3a" gap={20} size={1} />
                <Controls className="!bg-surface-2 !border-border !rounded-lg [&>button]:!bg-surface-3 [&>button]:!border-border [&>button]:!text-subtle [&>button:hover]:!bg-primary" />
            </ReactFlow>
        </div>
    );
}
