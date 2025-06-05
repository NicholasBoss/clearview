DROP TABLE IF EXISTS nws_measurement;
DROP TABLE IF EXISTS measurement;
DROP TABLE IF EXISTS rainier;
DROP TABLE IF EXISTS starting_point;
DROP TABLE IF EXISTS right_track;
DROP TABLE IF EXISTS left_track;
DROP TABLE IF EXISTS add_buildout;
DROP TABLE IF EXISTS left_buildout;
DROP TABLE IF EXISTS right_buildout;
DROP TABLE IF EXISTS left_plumb;
DROP TABLE IF EXISTS right_plumb;
DROP TABLE IF EXISTS right_opening_height;
DROP TABLE IF EXISTS bottom_opening_width;
DROP TABLE IF EXISTS bottom_level;
DROP TABLE IF EXISTS top_level;
DROP TABLE IF EXISTS top_opening_width;
DROP TABLE IF EXISTS drive_side;
DROP TABLE IF EXISTS placement;
DROP TABLE IF EXISTS housing;
DROP TABLE IF EXISTS custom_new_window_screen;
DROP TABLE IF EXISTS new_window_screen;
DROP TABLE IF EXISTS public.window;
DROP TABLE IF EXISTS product_mesh;
DROP TABLE IF EXISTS mesh;
DROP TABLE IF EXISTS mesh;
DROP TABLE IF EXISTS fastener;
-- DROP TABLE IF EXISTS frame_size;
DROP TABLE IF EXISTS product_color;
-- DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS mirage_3500;
DROP TABLE IF EXISTS mirage;
DROP TABLE IF EXISTS general_retract_control;
DROP TABLE IF EXISTS account;
DROP TYPE IF EXISTS account_type;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS order_log;
DROP TABLE IF EXISTS cust_order;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS public.order;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS address;

INSERT INTO color (color_name)
VALUES ('Midnight Black'), ('Slack Grey'), ('Limen Cream'), ('Rindeau Brown'), ('Sandalwood'), ('Tudor Brown'), ('Polar White'), ('Ex Pebble Grey')
        , ('Hatford Green'), ('Ansi 49 Grey'), ('Almond'), ('Autumn Leaf'), ('Bergundy'), ('Charcoal'), ('Dk Bronze Metallic'), ('Evergreen')
        , ('Furniture White'), ('Gloss Brown'), ('Metro Brown'), ('Mocha'), ('Metalic Silver'), ('Oyster Grey'), ('Seal Beach Green'), ('Sundried Tomato'), ('Signal White'), ('Wicker'), ('Custom Match');

INSERT INTO frame_size (size_type)
VALUES ('1/4"'), ('5/16"'), ('3/8"'), ('7/16"'), ('1"'), ('OC'), ('IC');
