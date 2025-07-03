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
fabric
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
VALUES 
-- Mirage & M3500 colors
('Midnight Black'), ('Slate Grey'), ('Limen Cream'), ('Rindeau Brown'), ('Bronze') ('Sandalwood'), ('Tudor Brown'), ('Polar White'), ('Ex Pebble Grey')
, ('Hatford Green'), ('Ansi 49 Grey'), ('Almond'), ('Autumn Leaf'), ('Bergundy'), ('Charcoal'), ('Dk Bronze Metallic'), ('Evergreen')
, ('Furniture White'), ('Gloss Brown'), ('Metro Brown'), ('Mocha'), ('Metalic Silver'), ('Oyster Grey'), ('Seal Beach Green')
, ('Sundried Tomato'), ('Signal White'), ('Wicker'), ('Custom')
-- NWS colors
, ('White'), ('Black'), ('Tan'), ('CB'), ('Mill')
-- Rainier Colors
, ('Bright White'), ('Off White'), ('Gray'), ('Navajo'), ('Desert Sand'), ('Brown'), ('Green'), ('Silver')
, ('Varies (Specify in Notes)'), ('RAL (Specify in Notes)'), ('Textured Dark Gray'), ('Textured Tan'), ('Textured Copper Bronze')
, ('Textured Black'), ('Textured Rust'), ('Textured Varies (Specify in Notes)')
-- Rainier fabric colors
, ('Dark Bronze'), ('Dark Gray'), ('Tobacco'), ('Carbon'), ('Stone Texture'), ('Shadow Texture'), ('Sand')
, ('Expresso'), ('Mushroom (Safari Cashmere)'), ('Quartz'), ('Twill Tobacco'), ('Twill Charcoal'), ('Twill Black');


INSERT INTO product_color (product_id, color_id)
VALUES
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'White'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Bronze'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Tan'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'CB'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Mill'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Black'))
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Custom'))

, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Midnight Black'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Slate Grey'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Linen Cream'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Rideau Bown'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Sandalwood'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Tudor Brown'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Polar White'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Hartford Green'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Almond'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Autum Leaf'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Burgundy'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Charcoal'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Evergreen'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Furniture White'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Gloss Brown'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Metro Brown'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Mocha'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Metallic Silver'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Oyster Grey'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Signal White'))
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Wicker'));


INSERT INTO fabric (fabric_name)
VALUES 
('Tuffscreen NoSeeUm'),
('Tuffscreen'),
('20x20 Bug'),
('17x17 Super Screen'),
('Suntex 95'),
('Twill 95%'),
('Nano 95%'),
('Textilene 95%'),
('Suntex 97'),
('Nano 97%'),
('Sheereave 2703'),
('Solar 90%');

INSERT INTO fabric_color (fabric_id, product_color_id)
VALUES
((SELECT fabric_id FROM fabric WHERE fabric_name = 'Tuffscreen NoSeeUm'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'White')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Tuffscreen'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Tuffscreen'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dark Gray')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Tuffscreen'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dark Bronze')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = '20x20 Bug'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tobacco')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = '17x17 Super Screen'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = '17x17 Super Screen'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'White')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dark Bronze')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Carbon')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Stone Texture')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Shadow Texture')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sand')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 95'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tobacco')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Twill 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dark Gray')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tobacco')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Expresso')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Stone Texture')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Shadow Texture')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Textilene 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Mushroom (Safari Cashmere)')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Textilene 95%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Quartz')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 97'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Suntex 97'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dark Bronze')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Tobacco')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Sheereave 2703'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Solar 90%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tobacco')));

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
('24'' (upgrade)');

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
('Outside'),
('Inside'),
('Under Facing In'),
('Under Facing Out');

INSERT INTO housing
(housing_series_name)
VALUES 
('3 Round'),
('4 Round'),
('5 Round'),
('4 Square'),
('5 Square');

INSERT INTO bottom_adapter
(bottom_adapter_name)
VALUES
('Ramp Sill'),
('Top Sill'),
('Break Sill'),
('2" In Sill'),
('5" In Sill'),
('Out Sill'),
('None');

INSERT INTO top_adpater
(top_adapter_name)
VALUES
('TrimSill'),
('1'' Sq'),
('1/2" Sq'),
('None');

