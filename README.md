# Aura Market - Admin Dashboard

Dashboard de administración e-commerce para Aura Market. Gestión de proveedores (GRUPO CVA, FulFil) y sincronización con marketplaces vía AutoAzur.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **UI Components**: React Flow, Lucide Icons
- **Deployment**: Vercel

## 📦 Instalación

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🎨 Características

- Dashboard con visualización de flujo de datos
- Gestión de 3 proveedores de productos
- Sincronización con AutoAzur
- UI moderna con tema oscuro personalizado
- Responsive design

## 📁 Estructura

```
src/
├── app/              # Páginas (App Router)
├── components/       # Componentes React
│   ├── dashboard/   # Componentes del dashboard
│   └── layout/      # Sidebar, Header
├── lib/             # Utilidades y stores
└── types/           # TypeScript types
```

## 🔗 Deployment

El proyecto está configurado para deployarse automáticamente en Vercel:

1. Conectar repo en [vercel.com](https://vercel.com)
2. Framework: Next.js (auto-detectado)
3. Deploy

## 📝 Próximos Pasos

- [ ] Configurar base de datos (Neon/Supabase)
- [ ] Implementar APIs de proveedores
- [ ] Integración con AutoAzur
- [ ] Sistema de autenticación
