INSERT INTO mirage
(mirage_build_out)
VALUES
('None'),
('1" X 2" L Flap'),
('5/8 Sq Tube'),
('Mohair (back of housing)'),
('Calk'),
('Custom');


-- CREATE TABLE IF NOT EXISTS mesh 
-- (
--   mesh_id SERIAL,
--   mesh_type CHARACTER VARYING NOT NULL,
--   CONSTRAINT mesh_pk PRIMARY KEY (mesh_id)
-- );


INSERT INTO mesh
(mesh_type)
VALUES
("BV"),
("Bug"),
("Patio"),
("Tuff"),
("Pet"),
("SS"),
("Charcoal (18x14)"),
("20x20 Insect Mesh"),
("Solar Mesh (20x30)"),
("Privacy Mesh SW2360"),
("Privacy Mesh ES7505"),
("Privacy Mesh ES7510"),
("TuffScreen/NoSeeUm (Standard)"),
("Suntex 80 Charcoal/Black (Non-Standard) (Add $100)"),
("Suntex 90 Charcoal/Black (Non-Standard) (Add $100)"),
("Suntex 95 Charcoal/Black (Non-Standard) (Add $100)"),
("Custom (Non-Standard) (Add $??)");


INSERT INTO measurement 
(measurement_name)
VALUES
('1/16'),
('1/8'),
('3/16'),
('1/4'),
('5/16'),
('3/8'),
('7/16'),
('1/2'),
('9/16'),
('5/8'),
('11/16'),
('3/4'),
('13/16'),
('7/8'),
('15/16');
