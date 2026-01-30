'use client';

import { useState } from 'react';
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
    Menu,
    X,
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const NavContent = () => (
        <>
            {/* Logo */}
            <div className="p-5 border-b border-border">
                <Link href="/" className="flex items-center gap-3 no-underline" onClick={closeMobileMenu}>
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white m-0">Sistema Aura</h1>
                        <p className="text-xs text-muted m-0">Aura Market Admin</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={!item.children ? closeMobileMenu : undefined}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors"
                                style={{
                                    backgroundColor: isActive(item.href) ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: isActive(item.href) ? '#3b82f6' : '#94a3b8',
                                }}
                            >
                                <span className="flex items-center justify-center w-5 h-5">
                                    {item.icon}
                                </span>
                                <span className="flex-1 font-medium">{item.label}</span>
                                {item.children && (
                                    <ChevronRight
                                        size={16}
                                        className="transition-transform"
                                        style={{
                                            transform: isActive(item.href) ? 'rotate(90deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </Link>

                            {/* Children */}
                            {item.children && isActive(item.href) && (
                                <ul className="mt-1 ml-4 space-y-1">
                                    {item.children.map((child) => (
                                        <li key={child.href}>
                                            <Link
                                                href={child.href}
                                                onClick={closeMobileMenu}
                                                className="flex items-center gap-3 px-4 py-2 rounded-lg no-underline text-sm transition-colors"
                                                style={{
                                                    backgroundColor: pathname === child.href ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                                    color: pathname === child.href ? '#3b82f6' : '#64748b',
                                                }}
                                            >
                                                <span className="flex items-center justify-center w-4 h-4">
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
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-white text-xs font-medium">AM</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white m-0 truncate">Aura Market</p>
                        <p className="text-xs text-muted m-0 truncate">admin@auramarket.mx</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface-1 border-b border-border">
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/" className="flex items-center gap-3 no-underline">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="text-white font-semibold">Sistema Aura</span>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg bg-surface-3 text-subtle hover:text-white transition-colors"
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className="md:hidden fixed top-0 left-0 bottom-0 w-72 bg-surface-1 z-50 flex flex-col transition-transform duration-300"
                style={{
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                <NavContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 lg:w-72 bg-surface-1 border-r border-border flex-col z-40">
                <NavContent />
            </aside>
        </>
    );
}
