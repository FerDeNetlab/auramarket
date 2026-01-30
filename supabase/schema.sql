-- Sistema Aura - Database Schema
-- Ejecutar este SQL en Supabase SQL Editor

-- Extension para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =======================
-- TABLA: providers
-- =======================
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'syncing', 'error')),
  product_count INTEGER DEFAULT 0,
  api_url TEXT,
  api_key TEXT,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================
-- TABLA: products
-- =======================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  brand VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  synced_to_autoazur BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices para products
CREATE INDEX idx_products_provider ON products(provider_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_synced ON products(synced_to_autoazur);

-- =======================
-- TABLA: marketplaces
-- =======================
CREATE TABLE marketplaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'syncing', 'error')),
  product_count INTEGER DEFAULT 0,
  api_url TEXT,
  api_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================
-- TABLA: sync_logs
-- =======================
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('success', 'error', 'pending')),
  products_synced INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices para sync_logs
CREATE INDEX idx_sync_logs_provider ON sync_logs(provider_id);
CREATE INDEX idx_sync_logs_created ON sync_logs(created_at DESC);

-- =======================
-- SEED DATA INICIAL
-- =======================

-- Proveedores
INSERT INTO providers (name, slug, description, status, product_count, last_sync) VALUES
('GRUPO CVA', 'cva', 'Proveedor mexicano de tecnología IT', 'connected', 15420, NOW() - INTERVAL '2 hours'),
('FulFil', 'fulfil', 'Dropshipping y fulfillment desde China', 'connected', 8750, NOW() - INTERVAL '3 hours'),
('Proveedor TBD', 'tbd', 'Tercer proveedor por definir', 'disconnected', 0, NULL);

-- Marketplaces
INSERT INTO marketplaces (name, slug, status, product_count) VALUES
('Mercado Libre', 'mercadolibre', 'connected', 12500),
('Amazon', 'amazon', 'connected', 8200),
('Walmart', 'walmart', 'connected', 5400);

-- Productos de ejemplo (GRUPO CVA)
INSERT INTO products (provider_id, sku, name, description, brand, category, price, stock) 
SELECT 
  p.id,
  'CVA-' || s.num,
  'Laptop HP ProBook ' || (400 + s.num) || ' G' || (s.num % 3 + 8),
  'Laptop empresarial con procesador Intel',
  CASE (s.num % 3)
    WHEN 0 THEN 'HP'
    WHEN 1 THEN 'Dell'
    ELSE 'Lenovo'
  END,
  CASE (s.num % 4)
    WHEN 0 THEN 'Laptops'
    WHEN 1 THEN 'Monitores'
    WHEN 2 THEN 'Periféricos'
    ELSE 'Accesorios'
  END,
  (8000 + (random() * 15000))::DECIMAL(10,2),
  (10 + (random() * 200))::INTEGER
FROM providers p
CROSS JOIN generate_series(1, 10) AS s(num)
WHERE p.slug = 'cva';

-- Productos de ejemplo (FulFil)
INSERT INTO products (provider_id, sku, name, description, brand, category, price, stock)
SELECT 
  p.id,
  'FFL-' || s.num,
  'Producto Electrónico ' || s.num,
  'Producto desde China',
  'Generic',
  'Electrónicos',
  (500 + (random() * 3000))::DECIMAL(10,2),
  (50 + (random() * 500))::INTEGER
FROM providers p
CROSS JOIN generate_series(1, 10) AS s(num)
WHERE p.slug = 'fulfil';

-- Logs de sincronización
INSERT INTO sync_logs (provider_id, action, status, products_synced, message)
SELECT 
  p.id,
  'sync',
  'success',
  (random() * 100)::INTEGER,
  'Sincronización automática completada'
FROM providers p
WHERE p.status = 'connected'
ORDER BY random()
LIMIT 5;

-- =======================
-- FUNCIONES Y TRIGGERS
-- =======================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketplaces_updated_at BEFORE UPDATE ON marketplaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =======================
-- ROW LEVEL SECURITY (RLS)
-- =======================
-- Por ahora dejamos las tablas públicas para desarrollo
-- En producción, configurar políticas RLS apropiadas

ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Política temporal: permitir todo (cambiar en producción)
CREATE POLICY "Enable all for all users" ON providers FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON products FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON marketplaces FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON sync_logs FOR ALL USING (true);
