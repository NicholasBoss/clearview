-- tow_measurement
-- bow_measurement
-- roh_measurement
-- loh_measurement
-- nws_measurement
-- measurement
-- rainier
-- starting_point
-- right_track
-- left_track
-- brush_location
-- pilebrush
-- add_buildout
-- left_buildout
-- right_buildout
-- top_adapter
-- bottom_adapter
-- hembar
-- cord_length
-- frame_size
-- left_plumb
-- right_plumb
-- right_opening_height
-- bottom_opening_width
-- bottom_level
-- top_level
-- top_opening_width
-- drive_side
-- placement
-- housing
-- new_window_screen
-- public.window
-- product_mesh
-- mesh
-- fabric
-- fastener
-- frame_size
-- fabric_color
-- handle_color
-- hardware_color
-- pivot_pro_color
-- top_adapter_color
-- rainier_zipper_color
-- product_color
-- color
-- mirage_3500
-- mirage
-- general_retract_control
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
('Midnight Black')
, ('Slate Grey')
, ('Limen Cream')
, ('Rindeau Brown')
, ('Bronze')
, ('Sandalwood')
, ('Tudor Brown')
, ('Polar White')
, ('Ex Pebble Grey')
, ('Hatford Green')
, ('Ansi 49 Grey')
, ('Almond')
, ('Autumn Leaf')
, ('Burgundy')
, ('Charcoal')
, ('Dk Bronze Metallic')
, ('Evergreen')
, ('Furniture White')
, ('Gloss Brown')
, ('Metro Brown')
, ('Mocha')
, ('Metallic Silver')
, ('Oyster Grey')
, ('Seal Beach Green')
, ('Sundried Tomato')
, ('Signal White')
, ('Wicker')
, ('Charcoal/Black')
, ('Custom')
-- NWS colors
, ('White'), ('Black'), ('Tan'), ('CB'), ('Mill')
-- Rainier Colors
, ('Bright White'), ('Off White'), ('Gray'), ('Navajo'), ('Desert Sand'), ('Brown'), ('Green'), ('Silver')
, ('Varies (Specify in Notes)'), ('RAL (Specify in Notes)'), ('Textured Dark Gray'), ('Textured Tan'), ('Textured Copper Bronze')
, ('Textured Black'), ('Textured Rust'), ('Textured Varies (Specify in Notes)')
-- Rainier fabric colors
, ('Dark Bronze'), ('Dark Gray'), ('Tobacco'), ('Carbon'), ('Stone Texture'), ('Shadow Texture'), ('Sand')
, ('Expresso'), ('Mushroom (Safari Cashmere)'), ('Quartz'), ('Twill Tobacco'), ('Twill Charcoal'), ('Twill Black')
-- Bottom Adapter Colors
, ('Black Anodized'), ('Bronze Anodized');


INSERT INTO product_color (product_id, color_id)
VALUES
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'White')) -- 1
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Bronze')) -- 2
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Tan')) -- 3
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'CB')) -- 4
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Mill')) -- 5
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Black')) -- 6
, ((SELECT product_id FROM product WHERE product_name = 'New Window Screen'), (SELECT color_id FROM color WHERE color_name = 'Custom')) -- 7

, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Black')) -- 8
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'White')) -- 9
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Bright White')) -- 10
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Off White')) -- 11
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Gray')) -- 12
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Tan')) -- 13
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Navajo')) -- 14
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Desert Sand')) -- 15
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Brown')) -- 16
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Bronze'))
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Charcoal')) -- 17
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Green')) -- 18
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Silver')) -- 19
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Varies (Specify in Notes)')) -- 20
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'RAL (Specify in Notes)')) -- 21
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Dark Gray')) -- 22
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Tan')) -- 23
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Copper Bronze')) -- 24
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Black')) -- 25
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Rust')) -- 26
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Textured Varies (Specify in Notes)')) -- 27
-- Rainier fabric colors
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Dark Bronze')) -- 28
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Dark Gray')) -- 29
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Tobacco')) -- 30
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Carbon')) -- 31
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Stone Texture')) -- 32
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Shadow Texture')) -- 33
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Sand')) -- 34
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Expresso')) -- 35
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Mushroom (Safari Cashmere)')) -- 36
, ((SELECT product_id FROM product WHERE product_name = 'Rainier'), (SELECT color_id FROM color WHERE color_name = 'Quartz')) -- 37

, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Black')) -- 38
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Midnight Black')) -- 39
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Slate Grey')) -- 40
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Limen Cream')) -- 41
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Rindeau Brown')) -- 42
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Sandalwood')) -- 43
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Tudor Brown')) -- 44
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Polar White')) -- 45
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')) -- 46
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Hatford Green')) -- 47
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey')) -- 48
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Almond')) -- 49
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Autumn Leaf')) -- 50
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Burgundy')) -- 51
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Charcoal')) -- 52
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic')) -- 53
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Evergreen')) -- 54
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Furniture White')) -- 55
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Gloss Brown')) -- 56
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Metro Brown')) -- 57
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Mocha')) -- 58
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Metallic Silver')) -- 59
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Oyster Grey')) -- 60
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green')) -- 61
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato')) -- 62
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Signal White')) -- 63
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Wicker')) -- 64
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Custom')) -- 65

, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Slate Grey')) -- 66
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Limen Cream')) -- 67
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Midnight Black')) -- 68
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Rindeau Brown')) -- 69
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Sandalwood')) -- 70
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Tudor Brown')) -- 71
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Polar White')) -- 72
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')) -- 73
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Hatford Green')) -- 74
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey')) -- 75
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Almond')) -- 76
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Autumn Leaf')) -- 77
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Burgundy')) -- 78
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Charcoal')) -- 79
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic')) -- 80
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Evergreen')) -- 81
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Furniture White')) -- 82
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Gloss Brown')) -- 83
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Metro Brown')) -- 84
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Mocha')) -- 85
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Metallic Silver')) -- 86
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Oyster Grey')) -- 87
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green')) -- 88
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato')) -- 89
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Signal White')) -- 90
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Wicker')) -- 91
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green')) -- 92
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Bronze')) -- 93
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Charcoal/Black')) -- 94
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Custom')) -- 95
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Black Anodized')) -- 96
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Bronze Anodized')) -- 97
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'Mill')) -- 98
, ((SELECT product_id FROM product WHERE product_name = 'Mirage'), (SELECT color_id FROM color WHERE color_name = 'White')) -- 99
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'White')) -- 100
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Black Anodized')) -- 101
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Bronze Anodized')) -- 102
, ((SELECT product_id FROM product WHERE product_name = 'Mirage 3500'), (SELECT color_id FROM color WHERE color_name = 'Mill')); -- 103

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
('Nano 97% Twill'),
('Sheereave 2703'),
('Solar 90%');

INSERT INTO product_mesh (fabric_id, product_color_id)
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
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97% Twill'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Tobacco')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97% Twill'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Nano 97% Twill'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Twill Black')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Sheereave 2703'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Charcoal')))
, ((SELECT fabric_id FROM fabric WHERE fabric_name = 'Solar 90%'), (SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tobacco')));

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

INSERT INTO top_adapter
(top_adapter_name)
VALUES
('TrimSill'),
('1'' Sq'),
('1/2" Sq'),
('None');

INSERT INTO right_track
(right_track_name)
VALUES
('Surface Mount'),
('Recessed (Side) Mount');

INSERT INTO left_track
(left_track_name)
VALUES
('Surface Mount'),
('Recessed (Side) Mount');

INSERT INTO right_buildout
(right_buildout_name)
VALUES
('None'),
('1" X 2" L Angle'),
('1" X 3" L Angle'),
('1" X 2" Tube'),
('1" X 1" Sq Tube'),
('Custom');

INSERT INTO left_buildout
(left_buildout_name)
VALUES
('None'),
('1" X 2" L Angle'),
('1" X 3" L Angle'),
('1" X 2" Tube'),
('1" X 1" Sq Tube'),
('Custom');

INSERT INTO buildout (buildout_name)
VALUES
('None')
, ('1" x 2" L Flap')
, ('1'' Sq Tube')
, ('5/8" Sq Tube')
, ('Mohair (back of housing)')
, ('Calk')
, ('Custom');

-- product_mesh
-- handle_color
-- hardware_color
-- pivot_pro_color
-- top_adapter_color
-- rainier_zipper_color

INSERT INTO product_mesh (product_id, mesh_id)
VALUES
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'BV')),
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'Bug')),
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'Patio')),
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'Tuff')),
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'Pet')),
((SELECT product_id FROM product WHERE product_name = 'New Window Screen'),
 (SELECT mesh_id FROM mesh WHERE mesh_type = 'SS'));


INSERT INTO handle_color (product_color_id, mirage_3500_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Midnight Black')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Pivot Pro')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Polar White')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Pivot Pro')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Pivot Pro')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sandalwood')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Pivot Pro')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Custom')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Pivot Pro')),
 ((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Midnight Black')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Recessed')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Polar White')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Recessed')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Recessed')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sandalwood')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Recessed')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Custom')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Recessed')),
 ((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Midnight Black')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Standard')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Polar White')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Standard')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Standard')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sandalwood')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Standard')),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Custom')),
 (SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = 'Standard'));


INSERT INTO pivot_pro_color (product_color_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Slate Grey'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Limen Cream'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Rindeau Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sandalwood'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tudor Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Polar White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')));

INSERT INTO top_adapter_color (product_color_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Midnight Black'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Slate Grey'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Limen Cream'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Rindeau Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sandalwood'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tudor Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Polar White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Hatford Green'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Almond'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Autumn Leaf'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Burgundy'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Charcoal'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Evergreen'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Furniture White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Gloss Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Metro Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Mocha'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Metallic Silver'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Oyster Grey'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Signal White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Wicker'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Custom')));

INSERT INTO bottom_adapter_color (product_color_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black Anodized'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze Anodized'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Mill'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage') AND color_id = (SELECT color_id FROM color WHERE color_name = 'White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black Anodized'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze Anodized'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Mill'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Mirage 3500') AND color_id = (SELECT color_id FROM color WHERE color_name = 'White')));

INSERT INTO hardware_color (product_color_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bright White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Off White'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Gray'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Navajo'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Tan'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Desert Sand'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Brown'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Green'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Bronze'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Silver'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Varies (Specify in Notes)'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'RAL (Specify in Notes)'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Dark Gray'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Tan'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Copper Bronze'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Black'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Rust'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Textured Varies (Specify in Notes)')));

INSERT INTO rainier_zipper_color (product_color_id)
VALUES
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'Black'))),
((SELECT product_color_id FROM product_color WHERE product_id = (SELECT product_id FROM product WHERE product_name = 'Rainier') AND color_id = (SELECT color_id FROM color WHERE color_name = 'White')));

INSERT INTO mohair (mohair_type)
VALUES
('.200 MoHair X .187')
, ('.250 MoHair X .187')
, ('.300 MoHair X .187')
, ('.350 MoHair X .187');

INSERT INTO mohair_position (mohair_position_name)
VALUES
('Edge')
, ('Inside');

INSERT INTO tab_spring (tab_spring_name)
VALUES
('L')
, ('S')
, ('None');