'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Truck,
    Upload,
    Settings,
    ChevronRight,
    Cpu,
    Globe,
    HelpCircle,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

const navigation: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/',
        icon: <LayoutDashboard size={20} />,
    },
    {
        label: 'Proveedores',
        href: '/proveedores',
        icon: <Truck size={20} />,
        children: [
            { label: 'GRUPO CVA', href: '/proveedores/cva', icon: <Cpu size={18} /> },
            { label: 'FulFil', href: '/proveedores/fulfil', icon: <Globe size={18} /> },
            { label: 'Proveedor TBD', href: '/proveedores/tbd', icon: <HelpCircle size={18} /> },
        ],
    },
    {
        label: 'Productos',
        href: '/productos',
        icon: <Package size={20} />,
    },
    {
        label: 'AutoAzur',
        href: '/autoazur',
        icon: <Upload size={20} />,
    },
    {
        label: 'Configuración',
        href: '/configuracion',
        icon: <Settings size={20} />,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <aside
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: '280px',
                backgroundColor: '#111118',
                borderRight: '1px solid #2a2a3a',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 50,
            }}
        >
            {/* Logo */}
            <div style={{ padding: '24px', borderBottom: '1px solid #2a2a3a' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div
                        className="gradient-primary"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>A</span>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>Sistema Aura</h1>
                        <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Aura Market Admin</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {navigation.map((item) => (
                        <li key={item.href} style={{ marginBottom: '4px' }}>
                            <Link
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    backgroundColor: isActive(item.href) ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                    color: isActive(item.href) ? '#8b5cf6' : '#a1a1aa',
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                                    {item.icon}
                                </span>
                                <span style={{ flex: 1, fontWeight: 500 }}>{item.label}</span>
                                {item.children && (
                                    <ChevronRight
                                        size={16}
                                        style={{
                                            transition: 'transform 0.2s',
                                            transform: isActive(item.href) ? 'rotate(90deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </Link>

                            {/* Children */}
                            {item.children && isActive(item.href) && (
                                <ul style={{ listStyle: 'none', paddingLeft: '16px', marginTop: '4px', margin: 0 }}>
                                    {item.children.map((child) => (
                                        <li key={child.href} style={{ marginBottom: '4px' }}>
                                            <Link
                                                href={child.href}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    backgroundColor: pathname === child.href ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                                    color: pathname === child.href ? '#8b5cf6' : '#71717a',
                                                }}
                                            >
                                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>
                                                    {child.icon}
                                                </span>
                                                <span>{child.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div style={{ padding: '16px', borderTop: '1px solid #2a2a3a' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: '#1a1a24',
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>AM</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'white', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Aura Market
                        </p>
                        <p style={{ fontSize: '12px', color: '#71717a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            admin@auramarket.mx
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
