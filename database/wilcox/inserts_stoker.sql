INSERT INTO phantom_color ()
VALUES();

INSERT INTO phantom_build_out()
VALUES();

INSERT INTO meshlock()
VALUES();

INSERT INTO phantom_mesh()
VALUES();

INSERT INTO meshlock_mesh()
VALUES();

INSERT INTO type_of_screen()
VALUES();

INSERT INTO screen_color()
VALUES();

INSERT INTO wood_type()
VALUES();
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO est_placement(placement)
VALUES('Outside', 'Inside', 'Under Facing In', 'Under Facing Out');

INSERT INTO est_housing_series(housing series)
VALUES('3 Round', '4 Round', '5 Round', '4 Square', '5 Square');

INSERT INTO est_drive_side(drive)
VALUES('Left', 'Right');

INSERT INTO est_hembar(hembar)
VALUES('Short', 'Tall', 'Tall Reinforced');

INSERT INTO est_pilebrush(Pile Brush)
VALUES('Single 1/2" Black', 'Single 1" Black', 'Single 2" Black', 'Single 3/4 White', 'Double 1/2" Black', 'Double 1" Black', 'Double 2" Black', 'Double 3/4" White');

INSERT INTO est_brush_location(Brush Location)
VALUES('Side', 'Bottom');

INSERT INTO est_cord_length(Cord Length)
Values('12" (Std)', '24 (Upgrade)')

INSERT INTO est_mount_type(Tracks)
VALUES('Surface Mount', 'Recessed (Side)');

INSERT INTO est_top_opening_width()
VALUES();

INSERT INTO est_left_buildout()
VALUES();

INSERT INTO est_right_buildout()
VALUES();

INSERT INTO est_add_buildout()
VALUES();

INSERT INTO est_left_track()
VALUES();

INSERT INTO est_right_track()
VALUES();

INSERT INTO product_color(product_id, color_id)
VALUES
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Midnight Black')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Slate Grey')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Linen Cream')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Rideau Brown')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Sandalwood')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Tudor Brown')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Polar White')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Ex Pebble Grey')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Hartford Green')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Ansi 49 Grey')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Almond')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Autumn Leaf')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Burgundy')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Charcoal')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Dk Bronze Metallic')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Evergreen')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Furniture White')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Gloss Brown')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Metro Brown')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Mocha')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Metalic Silver')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Oyster Grey')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Seal Beach Green')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Sundried Tomato')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Signal White')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Wicker')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Mirage 3500')
    , (SELECT color_id FROM color WHERE color_name = 'Custom Match')
),
(
    (SELECT product_id FROM product WHERE product_name = 'Rainier')
    , (SELECT color_id FROM color WHERE color_name = 'Midnight Black')
),