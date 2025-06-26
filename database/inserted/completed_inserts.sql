tow_measurement
bow_measurement
roh_measurement
loh_measurement
nws_measurement
-- measurement
-- rainier
starting_point
right_track
left_track
-- brush_location
-- pilebrush
add_buildout
left_buildout
right_buildout
top_adapter
bottom_adapter
-- hembar
-- cord_length
-- frame_size
left_plumb
right_plumb
right_opening_height
bottom_opening_width
bottom_level
top_level
top_opening_width
-- drive_side
-- placement
-- housing
custom_new_window_screen
new_window_screen
public.window
product_mesh
-- mesh
-- fastener
-- frame_size
fabric_color
handle_color
hardware_color
nws_color
pivot_pro_color
top_adapter_color
rainier_zipper_color
product_color
-- color
-- mirage_3500
-- mirage
general_retract_control
-- account
-- account_type
-- product
-- order_log
-- cust_order
-- customer_address
-- public.order
-- customer
-- address

INSERT INTO product (product_name)
VALUES 
('Rainier')
, ('New Window Screen')
, ('Mirage 3500')
, ('Mirage');

INSERT INTO color (color_name)
VALUES ('Midnight Black'), ('Slack Grey'), ('Limen Cream'), ('Rindeau Brown'), ('Sandalwood'), ('Tudor Brown'), ('Polar White'), ('Ex Pebble Grey')
        , ('Hatford Green'), ('Ansi 49 Grey'), ('Almond'), ('Autumn Leaf'), ('Bergundy'), ('Charcoal'), ('Dk Bronze Metallic'), ('Evergreen')
        , ('Furniture White'), ('Gloss Brown'), ('Metro Brown'), ('Mocha'), ('Metalic Silver'), ('Oyster Grey'), ('Seal Beach Green'), ('Sundried Tomato'), ('Signal White'), ('Wicker'), ('Custom Match');

INSERT INTO frame_size (size_type)
VALUES ('1/4"'), ('5/16"'), ('3/8"'), ('7/16"'), ('1"'), ('OC'), ('IC');

INSERT INTO mirage ( mirage_build_out )
VALUES ( 'None')
        , ('Bug Flap Black')
        , ('Bug Flap Grey')
        , ('1'' X 2\'' L Flap')
        , ('1'' Sq')
        , ('1/2'' Sq')
        , ('Custom');

INSERT INTO mirage_3500 (mirage_3500_handle)
VALUES ('Pivot Pro')
        , ('Recessed')
        , ('Standard'); 


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


INSERT INTO brush_location
(brush_location_name)
VALUES
('Side'),
('Bottom');


INSERT INTO pilebrush
(pilebrush_name)
VALUES 
('Single 1/2" Black'),
('Single 1" Black'),
('Single 2" Black'),
('Single 3/4" White'),
('Double 1/2" Black'),
('Double 1" Black'),
('Double 2" Black'),
('Double 3/4" White');

INSERT INTO drive_side
(drive_side_name)
VALUES
('Left'),
('Right');

INSERT INTO fastener
(fastener_type)
VALUES
('RH (Ram Horn Sprint)'),
('PP (Pointed Plunger)'),
('SP (Standard Plunger)'),
('FP (Fat Plunger)'),
('PL (Pointed Latch)'),
('CC (Cast Clip)'),
('F-Chanel'),
('H-Chanel'),
('Combination'),
('Custom');

INSERT INTO mesh
(mesh_type)
VALUES
('BV'),
('Bug'),
('Patio'),
('Tuff'),
('Pet'),
('SS');

INSERT INTO hembar
(hembar_name)
VALUES
('Short'),
('Tall'),
('Tall Reinforced');

INSERT INTO cord_length
(cord_length_name)
VALUES
('12" (Std)'),
('24" (upgrade)');

INSERT INTO frame_size
(size_type)
VALUES
('1/4"'),
('5/16"'),
('3/8"'),
('7/16"'),
('1"'),
('OC'),
('IC');

INSERT INTO placement
(placement_name)
VALUES 
('ILO Left (for LH door)'),
('ILO Right (for RH door)');

INSERT INTO housing
(housing_series_name)
VALUES 
('3 Round'),
('4 Round'),
('5 Round'),
('4 Square'),
('5 Square');

-- There is also a housing type in the google sheet: 
-- INSERT INTO housing
-- (housing_series_name OR housing_type?)
-- VALUES
-- ('Full Cassette'),
-- ('Cassette w/ NO Cover'),
-- ('Brackets Only');
-- Which to use for housing table????

-- These are all the inserts I could find, lmk if I missed any 
-- Peter Ashworth