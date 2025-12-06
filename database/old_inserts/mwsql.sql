-------------------------------------------------
-- TABLE Mirage_color
-------------------------------------------------

-- mirage_color column
INSERT INTO 
mirage_color(mirage_color)
VALUES
(
    (SELECT color_id FROM color WHERE color_name = 'Midnight Black')
,   (SELECT color_id FROM color WHERE color_name = 'Slate Grey')
,   (SELECT color_id FROM color WHERE color_name = 'Linen Cream')
,   (SELECT color_id FROM color WHERE color_name = 'Redeau Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Sandalwood')
,   (SELECT color_id FROM color WHERE color_name = 'Tudor Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Polar White')
,   (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')
,   (SELECT color_id FROM color WHERE color_name = 'Hartford Green')
,   (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey')
,   (SELECT color_id FROM color WHERE color_name = 'Almond')
,   (SELECT color_id FROM color WHERE color_name = 'Autum Leaf')
,   (SELECT color_id FROM color WHERE color_name = 'Burgundy')
,   (SELECT color_id FROM color WHERE color_name = 'Charcoal')
,   (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic')
,   (SELECT color_id FROM color WHERE color_name = 'Evergreen')
,   (SELECT color_id FROM color WHERE color_name = 'Furniture White')
,   (SELECT color_id FROM color WHERE color_name = 'Gloss Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Metro Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Mocha')
,   (SELECT color_id FROM color WHERE color_name = 'Metalic Silver')
,   (SELECT color_id FROM color WHERE color_name = 'Oyster Grey')
,   (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green')
,   (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato')
,   (SELECT color_id FROM color WHERE color_name = 'Signal White')
,   (SELECT color_id FROM color WHERE color_name = 'Wicker')
,   (SELECT color_id FROM color WHERE color_name = 'Custom Match')
)

-- pivot_pro_color column
INSERT INTO 
mirage_color(pivot_pro_color)
VALUES
(
    (SELECT color_id FROM color WHERE color_name = 'Black')
,   (SELECT color_id FROM color WHERE color_name = 'Slate Grey')
,   (SELECT color_id FROM color WHERE color_name = 'Linen Cream')
,   (SELECT color_id FROM color WHERE color_name = 'Rideau Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Sandalwood')
,   (SELECT color_id FROM color WHERE color_name = 'Tudor Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Polar White')
,   (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')
)


---------------------------------------------------
-- Table rainier_color
---------------------------------------------------

-- est_hardware_color
INSERT
rainier_color(est_hardware_color)
VALUES
(
    (SELECT color_id FROM color WHERE color_name = 'Bright White')
,   (SELECT color_id FROM color WHERE color_name = 'Off White')
,   (SELECT color_id FROM color WHERE color_name = 'Gray')
,   (SELECT color_id FROM color WHERE color_name = 'Navajo')
,   (SELECT color_id FROM color WHERE color_name = 'Tan')
,   (SELECT color_id FROM color WHERE color_name = 'DesertSand')
,   (SELECT color_id FROM color WHERE color_name = 'Brown')
,   (SELECT color_id FROM color WHERE color_name = 'Green')
,   (SELECT color_id FROM color WHERE color_name = 'Bronze')
,   (SELECT color_id FROM color WHERE color_name = 'Black')
,   (SELECT color_id FROM color WHERE color_name = 'Silver')
,   (SELECT color_id FROM color WHERE color_name = 'Varies (specify in notes)')
,   (SELECT color_id FROM color WHERE color_name = 'RAL (Specifcy in Notes)')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Dark Gray')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Tan')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Copper Bronze')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Black')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Rust')
,   (SELECT color_id FROM color WHERE color_name = 'Textured Varies specify in notes')
)


-- est_fabric_color
INSERT
rainier_color(est_fabric_color)
VALUES
(
    (SELECT color_id FROM color WHERE color_name = 'TuffScreen NoSeeUm, Black, 120"- Part # 1340-0148')
,   (SELECT color_id FROM color WHERE color_name = 'TuffScreen Black')
,   (SELECT color_id FROM color WHERE color_name = 'TuffScreen Dark Gray')
,   (SELECT color_id FROM color WHERE color_name = 'TuffScreen Dark Bronze')
,   (SELECT color_id FROM color WHERE color_name = '20x20 Bug Tabacco')
,   (SELECT color_id FROM color WHERE color_name = '17x17 Super Screen, Black')
,   (SELECT color_id FROM color WHERE color_name = '17x17 Super Screen, Wht')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Black')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Dark Bronze')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Charcoal')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Carbon')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Stone Texture')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Shadow Texture')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Sand')
,   (SELECT color_id FROM color WHERE color_name = 'Suntex 95 Tobacco')
,   (SELECT color_id FROM color WHERE color_name = 'Twill 95% Dark Gray')
,   (SELECT color_id FROM color WHERE color_name = 'Nano 95% Tobacco')
,   (SELECT color_id FROM color WHERE color_name = 'Nano 95% Charcoal')
,   (SELECT color_id FROM color WHERE color_name = 'Nano 95% Expresso')
,   (SELECT color_id FROM color WHERE color_name = 'Nano 95% Stone Texture')
,   (SELECT color_id FROM color WHERE color_name = 'Nano 95% Black')
)


-- est_zipper_color
INSERT
rainier_color(est_zipper_color)
VALUES
(
    (SELECT color_id FROM color WHERE color_name = 'Black')
,   (SELECT color_id FROM color WHERE color_name = 'White')
)