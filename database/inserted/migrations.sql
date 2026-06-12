-- Migration file for altering the database

-- Fabric type selection — put it on `window`, alongside the other
-- material lookups (color_id, mesh_id, fastener_id, frame_size_id, tab_spring_id)
ALTER TABLE public.window ADD COLUMN fabric_id INTEGER NULL
  REFERENCES fabric (fabric_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Width/height whole-number values, paired with the fractions already here
ALTER TABLE nws_measurement ADD COLUMN width_whole  INTEGER;
ALTER TABLE nws_measurement ADD COLUMN height_whole INTEGER;

-- Cross-cutting fields (NOT NWS-specific) — reusable by every product
ALTER TABLE public.order   ADD COLUMN order_type VARCHAR;
ALTER TABLE customizatRCHAR;