-- -----------------------------------------------------
-- Drop Statements
-- -----------------------------------------------------
DROP TABLE IF EXISTS order_customization;
DROP TABLE IF EXISTS customization;
DROP TABLE IF EXISTS general_retract_control;
DROP TABLE IF EXISTS middle_opening_height;
DROP TABLE IF EXISTS middle_opening_width;
DROP TABLE IF EXISTS unit_height;
DROP TABLE IF EXISTS pivot_pro_height;
DROP TABLE IF EXISTS buildout;
DROP TABLE IF EXISTS tow_measurement;
DROP TABLE IF EXISTS bow_measurement;
DROP TABLE IF EXISTS roh_measurement;
DROP TABLE IF EXISTS loh_measurement;
DROP TABLE IF EXISTS nws_measurement;
DROP TABLE IF EXISTS measurement;
DROP TABLE IF EXISTS rainier;
DROP TABLE IF EXISTS hembar;
DROP TABLE IF EXISTS pilebrush;
DROP TABLE IF EXISTS cord_length;
DROP TABLE IF EXISTS mount_type;
DROP TABLE IF EXISTS brush_location;
DROP TABLE IF EXISTS starting_point;
DROP TABLE IF EXISTS right_track;
DROP TABLE IF EXISTS left_track;
DROP TABLE IF EXISTS add_buildout;
DROP TABLE IF EXISTS left_buildout;
DROP TABLE IF EXISTS right_buildout;
DROP TABLE IF EXISTS top_adapter;
DROP TABLE IF EXISTS bottom_adapter;
DROP TABLE IF EXISTS left_plumb;
DROP TABLE IF EXISTS right_plumb;
DROP TABLE IF EXISTS right_opening_height;
DROP TABLE IF EXISTS left_opening_height;
DROP TABLE IF EXISTS bottom_opening_width;
DROP TABLE IF EXISTS bottom_level;
DROP TABLE IF EXISTS top_level;
DROP TABLE IF EXISTS top_opening_width;
DROP TABLE IF EXISTS drive_side;
DROP TABLE IF EXISTS placement;
DROP TABLE IF EXISTS housing;
DROP TABLE IF EXISTS new_window_screen;
DROP TABLE IF EXISTS tab_spring;
DROP TABLE IF EXISTS public.window;
DROP TABLE IF EXISTS product_mesh;
DROP TABLE IF EXISTS mesh;
DROP TABLE IF EXISTS fabric;
DROP TABLE IF EXISTS fastener;
DROP TABLE IF EXISTS frame_size;
-- DROP TABLE IF EXISTS fabric_color;
DROP TABLE IF EXISTS handle_color;
DROP TABLE IF EXISTS hardware_color;
-- DROP TABLE IF EXISTS nws_color;
DROP TABLE IF EXISTS pivot_pro_color;
DROP TABLE IF EXISTS top_adapter_color;
DROP TABLE IF EXISTS bottom_adapter_color;
DROP TABLE IF EXISTS rainier_zipper_color;
DROP TABLE IF EXISTS product_color;
DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS mirage_3500;
DROP TABLE IF EXISTS mirage;
DROP TABLE IF EXISTS mohair;
DROP TABLE IF EXISTS mohair_position;
-- DROP TABLE IF EXISTS account;
-- DROP TYPE IF EXISTS account_type;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS order_log;
DROP TABLE IF EXISTS cust_order;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS public.order;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS address;











-- -----------------------------------------------------
-- Table address
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS address 
(
  address_id SERIAL,
  address_line1 CHARACTER VARYING NOT NULL,
  address_line2 CHARACTER VARYING NOT NULL,
  address_city CHARACTER VARYING NOT NULL,
  address_state CHARACTER VARYING NOT NULL,
  address_zip CHARACTER VARYING NOT NULL,
  CONSTRAINT address_pk PRIMARY KEY (address_id)
);


-- -----------------------------------------------------
-- Table customer
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS customer 
(
  customer_id SERIAL,
  customer_firstname CHARACTER VARYING NOT NULL,
  customer_lastname CHARACTER VARYING NOT NULL,
  CONSTRAINT customer_pk PRIMARY KEY (customer_id)
);


-- -----------------------------------------------------
-- Table order
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS public.order 
(
  order_id SERIAL,
  order_date DATE NOT NULL,
  estimated_date DATE NOT NULL,
  actual_date DATE NULL DEFAULT NULL,
  estimated_cost REAL NOT NULL,
  actual_cost REAL NULL DEFAULT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT order_pk PRIMARY KEY (order_id)
);

-- -----------------------------------------------------
-- Table customer_address
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS customer_address 
(
  customer_address_id SERIAL,
  customer_id INTEGER NOT NULL,
  address_id INTEGER NOT NULL,
  CONSTRAINT cust_address_pk PRIMARY KEY (customer_address_id),
  CONSTRAINT fk_customer_address_address1
    FOREIGN KEY (address_id)
    REFERENCES address (address_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_customer_address_customer1
    FOREIGN KEY (customer_id)
    REFERENCES customer (customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table cust_order
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS cust_order 
(
  cust_order_id SERIAL,
  customer_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  customer_address_id INTEGER NOT NULL,
  CONSTRAINT cust_order_pk PRIMARY KEY (cust_order_id),
  CONSTRAINT cust_order_fk1
    FOREIGN KEY (customer_id)
    REFERENCES customer (customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT cust_order_fk2
    FOREIGN KEY (order_id)
    REFERENCES public.order (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT cust_order_fk3
    FOREIGN KEY (customer_address_id)
    REFERENCES customer_address (customer_address_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table order_log
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS order_log
(
  order_log_id SERIAL,
  customer_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  actual_date DATE NULL DEFAULT NULL,
  CONSTRAINT order_log_pk PRIMARY KEY (order_log_id),
  CONSTRAINT order_log_fk1
    FOREIGN KEY (customer_id)
    REFERENCES customer (customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT order_log_fk2
    FOREIGN KEY (account_id)
    REFERENCES account (account_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT order_log_fk3
    FOREIGN KEY (order_id)
    REFERENCES public.order (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS product
(
  product_id SERIAL,
  product_name CHARACTER VARYING NOT NULL,
  CONSTRAINT product_pk PRIMARY KEY (product_id)
);



-- Account Type Creation
CREATE TYPE account_type AS ENUM
('Employee', 'Admin', 'DBA');

-- -----------------------------------------------------
-- Table account
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS account 
(
  account_id SERIAL,
  account_firstname CHARACTER VARYING NOT NULL,
  account_lastname CHARACTER VARYING NOT NULL,
  account_email CHARACTER VARYING NOT NULL,
  account_password CHARACTER VARYING NOT NULL,
  account_type account_type NOT NULL DEFAULT 'Employee'::account_type,
  CONSTRAINT account_pk PRIMARY KEY (account_id)
);


-- -----------------------------------------------------
-- Table door
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS door 
-- (
--   door_id SERIAL,
--   slide_type BOOLEAN NULL,
--   slide_color BOOLEAN NULL,
--   wheels_num INTEGER NOT NULL,
--   swing_type BOOLEAN NULL,
--   swing_color BOOLEAN NULL,
--   opening_side CHARACTER(2) NOT NULL,
--   handle_style BOOLEAN NULL,
--   CONSTRAINT door_pk PRIMARY KEY (door_id)
-- );

-- -----------------------------------------------------
-- Table mohair
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mohair 
(
  mohair_id SERIAL,
  mohair_type CHARACTER VARYING NOT NULL,
  CONSTRAINT mohair_pk PRIMARY KEY (mohair_id)
);

CREATE TABLE IF NOT EXISTS mohair_position
(
  mohair_position_id SERIAL,
  mohair_position_name CHARACTER VARYING NOT NULL,
  CONSTRAINT mohair_position_pk PRIMARY KEY (mohair_position_id)
);

-- -----------------------------------------------------
-- Table hale_door
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS hale_door 
-- (
--   hale_door_id SERIAL,
--   size BOOLEAN NULL,
--   flap_config BOOLEAN NULL,
--   door_color BOOLEAN NULL,
--   sec_cover_load BOOLEAN NULL,
--   second_ext_cover CHARACTER(1) NOT NULL,
--   rain_cap CHARACTER(1) NOT NULL,
--   flap CHARACTER(1) NOT NULL,
--   thickness CHARACTER VARYING NOT NULL,
--   CONSTRAINT hale_door_pk PRIMARY KEY (hale_door_id)
--   thickness BOOLEAN NULL,
--   CONSTRAINT hale_door_pk PRIMARY KEY (table_id)
-- );


-- -----------------------------------------------------
-- Table hale_screen_model
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS hale_screen_model 
-- (
--   hale_screen_model_id SERIAL,
--   model_size BOOLEAN NULL,
--   model_color BOOLEAN NULL,
--   model_thickness BOOLEAN NULL,
--   model_has_flap CHARACTER(2) NOT NULL,
--   model_placement BOOLEAN NULL,
--   CONSTRAINT hale_screen_model_pk PRIMARY KEY (hale_screen_model_id)
-- );


-- -----------------------------------------------------
-- Table mirage
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mirage
(
  mirage_id SERIAL,
  mirage_build_out CHARACTER VARYING NOT NULL,
  CONSTRAINT mirage_pk PRIMARY KEY (mirage_id)
);

-- -----------------------------------------------------
-- Table mirage_3500
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mirage_3500 
(
  mirage_3500_id SERIAL,
  mirage_3500_handle CHARACTER VARYING NOT NULL,
  CONSTRAINT mirage_3500_pk PRIMARY KEY (mirage_3500_id)
);

-- -----------------------------------------------------
-- Table frame_size
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS frame_size 
(
  frame_size_id SERIAL,
  size_type CHARACTER VARYING NOT NULL,
  CONSTRAINT frame_size_pk PRIMARY KEY (frame_size_id)
);

-- -----------------------------------------------------
-- Table fabric
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS fabric
(
  fabric_id SERIAL,
  fabric_name CHARACTER VARYING NOT NULL,
  CONSTRAINT fabric_pk PRIMARY KEY (fabric_id)
);

-- -----------------------------------------------------
-- Table fastener
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS fastener 
(
  fastener_id SERIAL,
  fastener_type CHARACTER VARYING NOT NULL,
  CONSTRAINT fastener_pk PRIMARY KEY (fastener_id)
);


-- -----------------------------------------------------
-- Table mesh
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mesh 
(
  mesh_id SERIAL,
  mesh_type CHARACTER VARYING NOT NULL,
  CONSTRAINT mesh_pk PRIMARY KEY (mesh_id)
);

-- -----------------------------------------------------
-- Table color
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS color 
(
  color_id SERIAL,
  color_name CHARACTER VARYING NOT NULL,
  CONSTRAINT color_pk PRIMARY KEY (color_id)
);

-- -----------------------------------------------------
-- Table product_color
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS product_color
(
  product_color_id SERIAL,
  product_id INTEGER NOT NULL,
  color_id INTEGER NOT NULL,
  CONSTRAINT product_color_pk PRIMARY KEY (product_color_id),
  CONSTRAINT product_color_fk1
    FOREIGN KEY (product_id)
    REFERENCES product (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT product_color_fk2
    FOREIGN KEY (color_id)
    REFERENCES color (color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table product_mesh
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS product_mesh
(
  product_mesh_id SERIAL,
  product_id INTEGER NULL,
  mesh_id INTEGER NULL,
  product_color_id INTEGER NULL,
  fabric_id INTEGER NULL,
  CONSTRAINT product_mesh_pk PRIMARY KEY (product_mesh_id),
    CONSTRAINT product_mesh_fk1
    FOREIGN KEY (product_id)
    REFERENCES product (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT product_mesh_fk2
    FOREIGN KEY (mesh_id)
    REFERENCES mesh (mesh_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT product_mesh_fk3
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT product_mesh_fk4
    FOREIGN KEY (fabric_id)
    REFERENCES fabric (fabric_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table tab_spring
-- -----------------------------------------------------
CREATE TABLE tab_spring
(
  tab_spring_id SERIAL,
  tab_spring_name CHARACTER VARYING NOT NULL,
  CONSTRAINT tab_spring_pk PRIMARY KEY (tab_spring_id)
);

-- -----------------------------------------------------
-- Table window
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS public.window 
(
  window_id SERIAL,
  tab_spring_id INTEGER NOT NULL,
  color_id INTEGER NOT NULL,
  frame_size_id INTEGER NOT NULL,
  fastener_id INTEGER NOT NULL,
  mesh_id INTEGER NOT NULL,
  CONSTRAINT window_pk PRIMARY KEY (window_id),
  CONSTRAINT window_fk1
    FOREIGN KEY (color_id)
    REFERENCES color (color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT window_fk2
    FOREIGN KEY (frame_size_id)
    REFERENCES frame_size (frame_size_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT window_fk3
    FOREIGN KEY (fastener_id)
    REFERENCES fastener (fastener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT window_fk4
    FOREIGN KEY (mesh_id)
    REFERENCES mesh (mesh_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table phantom
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS new_window_screen 
(
  nws_id SERIAL,
  width_inch BOOLEAN NULL,
  height_inch BOOLEAN NULL,
  window_id INTEGER NOT NULL,
  CONSTRAINT nws_pk PRIMARY KEY (nws_id),
  CONSTRAINT nws_fk1
    FOREIGN KEY (window_id)
    REFERENCES public.window (window_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table handle_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS handle_color
(
  handle_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  mirage_3500_id INTEGER NOT NULL,
  CONSTRAINT handle_color_pk PRIMARY KEY (handle_color_id),
  CONSTRAINT handle_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT handle_color_fk2
    FOREIGN KEY (mirage_3500_id)
    REFERENCES mirage_3500 (mirage_3500_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table hardware_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS hardware_color
(
  hardware_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  CONSTRAINT hardware_color_pk PRIMARY KEY (hardware_color_id),
  CONSTRAINT hardware_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table pivot_pro_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pivot_pro_color
(
  pivot_pro_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  CONSTRAINT pivot_pro_color_pk PRIMARY KEY (pivot_pro_color_id),
  CONSTRAINT pivot_pro_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table top_adapter_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS top_adapter_color
(
  top_adapter_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  CONSTRAINT top_adapter_color_pk PRIMARY KEY (top_adapter_color_id),
  CONSTRAINT top_adapter_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS bottom_adapter_color
(
  bottom_adapter_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  CONSTRAINT bottom_adapter_color_pk PRIMARY KEY (bottom_adapter_color_id),
  CONSTRAINT bottom_adapter_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table rainier_zipper_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rainier_zipper_color
(
  rainier_zipper_color_id SERIAL,
  product_color_id INTEGER NOT NULL,
  CONSTRAINT rainier_zipper_color_pk PRIMARY KEY (rainier_zipper_color_id),
  CONSTRAINT rainier_zipper_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table pilebrush
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS phantom 
-- (
--   phantom_id SERIAL,
--   phantom_color BOOLEAN NULL,
--   phantom_build_out BOOLEAN NULL DEFAULT 'None',
--   meshlock CHARACTER(1) NOT NULL,
--   phantom_mesh CHARACTER VARYING(200) NOT NULL,
--   meshlock_mesh CHARACTER VARYING(100) NOT NULL,
--   type_of_screen CHARACTER VARYING(60) NOT NULL,
--   screen_color BOOLEAN NULL,
--   wood_type BOOLEAN NULL,
--   mount BOOLEAN NULL,
--   hembar BOOLEAN NULL,
--   tracks BOOLEAN NULL,
--   mesh BOOLEAN NULL,
--   CONSTRAINT phantom_pk PRIMARY KEY (phantom_id)
-- );


-- -----------------------------------------------------
-- Table rainier
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table housing
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS housing
(
  housing_id SERIAL,
  housing_series_name CHARACTER VARYING NOT NULL,
  CONSTRAINT housing_pk PRIMARY KEY (housing_id)
);

-- -----------------------------------------------------
-- Table placement
-- -----------------------------------------------------
-- 
CREATE TABLE IF NOT EXISTS placement
(
  placement_id SERIAL,
  placement_name CHARACTER VARYING NOT NULL,
  CONSTRAINT placement_pk PRIMARY KEY (placement_id)
);

CREATE TABLE IF NOT EXISTS drive_side
(
  drive_side_id SERIAL,
  drive_side_name CHARACTER VARYING NOT NULL,
  CONSTRAINT drive_side_pk PRIMARY KEY (drive_side_id)
);

CREATE TABLE IF NOT EXISTS hembar
(
  hembar_id SERIAL,
  hembar_name CHARACTER VARYING NOT NULL,
  CONSTRAINT hembar_pk PRIMARY KEY (hembar_id)
);

CREATE TABLE IF NOT EXISTS pilebrush
(
  pilebrush_id SERIAL,
  pilebrush_name CHARACTER VARYING NOT NULL,
  CONSTRAINT pilebrush_pk PRIMARY KEY (pilebrush_id)
);

CREATE TABLE IF NOT EXISTS brush_location
(
  brush_location_id SERIAL,
  brush_location_name CHARACTER VARYING NOT NULL,
  CONSTRAINT brush_location_pk PRIMARY KEY (brush_location_id)
);

CREATE TABLE IF NOT EXISTS cord_length
(
  cord_length_id SERIAL,
  cord_length_name CHARACTER VARYING NOT NULL,
  CONSTRAINT cord_length_pk PRIMARY KEY (cord_length_id)
);

CREATE TABLE IF NOT EXISTS mount_type
(
  mount_type_id SERIAL,
  mount_type_name CHARACTER VARYING NOT NULL,
  CONSTRAINT mount_type_pk PRIMARY KEY (mount_type_id)
);

CREATE TABLE IF NOT EXISTS top_opening_width
(
  top_opening_width_id SERIAL,
  top_opening_width_name CHARACTER VARYING NULL,
  CONSTRAINT top_opening_width_pk PRIMARY KEY (top_opening_width_id) 
);

CREATE TABLE IF NOT EXISTS top_level
(
  top_level_id SERIAL,
  top_level_name CHARACTER VARYING NOT NULL,
  CONSTRAINT top_level_pk PRIMARY KEY (top_level_id)
);

CREATE TABLE IF NOT EXISTS top_adapter
(
  top_adapter_id SERIAL,
  top_adapter_name CHARACTER VARYING NOT NULL,
  CONSTRAINT top_adapter_pk PRIMARY KEY (top_adapter_id)
);

CREATE TABLE IF NOT EXISTS bottom_adapter
(
  bottom_adapter_id SERIAL,
  bottom_adapter_name CHARACTER VARYING NOT NULL,
  CONSTRAINT bottom_adapter_pk PRIMARY KEY (bottom_adapter_id)
);

CREATE TABLE IF NOT EXISTS bottom_level
(
  bottom_level_id SERIAL,
  bottom_level_name CHARACTER VARYING NOT NULL,
  CONSTRAINT bottom_level_pk PRIMARY KEY (bottom_level_id)
);

CREATE TABLE IF NOT EXISTS bottom_opening_width
(
  bottom_opening_width_id SERIAL,
  bottom_opening_width_name CHARACTER VARYING NOT NULL,
  CONSTRAINT bottom_opening_width_pk PRIMARY KEY (bottom_opening_width_id)
);

CREATE TABLE IF NOT EXISTS right_opening_height
(
  right_opening_height_id SERIAL,
  right_opening_height_name CHARACTER VARYING NOT NULL,
  CONSTRAINT right_opening_height_pk PRIMARY KEY (right_opening_height_id)
);

CREATE TABLE IF NOT EXISTS left_opening_height
(
  left_opening_height_id SERIAL,
  left_opening_height_name CHARACTER VARYING NOT NULL,
  CONSTRAINT left_opening_height_pk PRIMARY KEY (left_opening_height_id)
);

CREATE TABLE IF NOT EXISTS right_plumb
(
  right_plumb_id SERIAL,
  right_plumb_name CHARACTER VARYING NOT NULL,
  CONSTRAINT right_plumb_pk PRIMARY KEY (right_plumb_id)
);

CREATE TABLE IF NOT EXISTS left_plumb
(
  left_plumb_id SERIAL,
  left_plumb_name CHARACTER VARYING NOT NULL,
  CONSTRAINT left_plumb_pk PRIMARY KEY (left_plumb_id)
);

CREATE TABLE IF NOT EXISTS right_buildout
(
  right_buildout_id SERIAL,
  right_buildout_name CHARACTER VARYING NOT NULL,
  CONSTRAINT right_buildout_pk PRIMARY KEY (right_buildout_id)
);

CREATE TABLE IF NOT EXISTS left_buildout
(
  left_buildout_id SERIAL,
  left_buildout_name CHARACTER VARYING NOT NULL,
  CONSTRAINT left_buildout_pk PRIMARY KEY (left_buildout_id)
);

CREATE TABLE IF NOT EXISTS add_buildout
(
  add_buildout_id SERIAL,
  add_buildout_name CHARACTER VARYING NOT NULL,
  CONSTRAINT add_buildout_pk PRIMARY KEY (add_buildout_id)
);

CREATE TABLE IF NOT EXISTS left_track
(
  left_track_id SERIAL,
  left_track_name CHARACTER VARYING NOT NULL,
  CONSTRAINT left_track_pk PRIMARY KEY (left_track_id)
);

CREATE TABLE IF NOT EXISTS right_track
(
  right_track_id SERIAL,
  right_track_name CHARACTER VARYING NOT NULL,
  CONSTRAINT right_track_pk PRIMARY KEY (right_track_id)
);

CREATE TABLE IF NOT EXISTS starting_point
(
  starting_point_id SERIAL,
  starting_point_name CHARACTER VARYING NOT NULL,
  CONSTRAINT starting_point_pk PRIMARY KEY (starting_point_id)
);

CREATE TABLE IF NOT EXISTS buildout
(
  buildout_id SERIAL,
  buildout_name CHARACTER VARYING NOT NULL,
  CONSTRAINT buildout_pk PRIMARY KEY (buildout_id)
);

CREATE TABLE IF NOT EXISTS rainier 
(
  rainier_id SERIAL,
  housing_id INTEGER NOT NULL,
  placement_id INTEGER NOT NULL,
  drive_side_id INTEGER NOT NULL,
  hembar_id INTEGER NOT NULL,
  pilebrush_id INTEGER NOT NULL,
  brush_location_id INTEGER NOT NULL,
  cord_length_id INTEGER NOT NULL,
  mount_type_id INTEGER NOT NULL,
  top_opening_width_id INTEGER NOT NULL,
  top_level_id INTEGER NOT NULL,
  bottom_level_id INTEGER NOT NULL,
  bottom_opening_width_id INTEGER NOT NULL,
  right_opening_height_id INTEGER NOT NULL,
  right_plumb_id INTEGER NOT NULL,
  left_plumb_id INTEGER NOT NULL,
  right_buildout_id INTEGER NOT NULL,
  left_buildout_id INTEGER NOT NULL,
  add_buildout_id INTEGER NOT NULL,
  left_track_id INTEGER NOT NULL,
  right_track_id INTEGER NOT NULL,
  product_mesh_id INTEGER NOT NULL,
  CONSTRAINT rainier_pk PRIMARY KEY (rainier_id),
  CONSTRAINT rainier_fk1
    FOREIGN KEY (housing_id)
    REFERENCES housing (housing_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk2
    FOREIGN KEY (placement_id)
    REFERENCES placement (placement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk3
    FOREIGN KEY (drive_side_id)
    REFERENCES drive_side (drive_side_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk4
    FOREIGN KEY (hembar_id)
    REFERENCES hembar (hembar_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk5
    FOREIGN KEY (pilebrush_id)
    REFERENCES pilebrush (pilebrush_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk6
    FOREIGN KEY (brush_location_id)
    REFERENCES brush_location (brush_location_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk7
    FOREIGN KEY (cord_length_id)
    REFERENCES cord_length (cord_length_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk8
    FOREIGN KEY (mount_type_id)
    REFERENCES mount_type (mount_type_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk9
    FOREIGN KEY (top_opening_width_id)
    REFERENCES top_opening_width (top_opening_width_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk10
    FOREIGN KEY (top_level_id)
    REFERENCES top_level (top_level_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk11
    FOREIGN KEY (bottom_level_id)
    REFERENCES bottom_level (bottom_level_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk12
    FOREIGN KEY (bottom_opening_width_id)
    REFERENCES bottom_opening_width (bottom_opening_width_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk13
    FOREIGN KEY (right_opening_height_id)
    REFERENCES right_opening_height (right_opening_height_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk14
    FOREIGN KEY (right_plumb_id)
    REFERENCES right_plumb (right_plumb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk15
    FOREIGN KEY (left_plumb_id)
    REFERENCES left_plumb (left_plumb_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk16
    FOREIGN KEY (right_buildout_id)
    REFERENCES right_buildout (right_buildout_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk17
    FOREIGN KEY (left_buildout_id)
    REFERENCES left_buildout (left_buildout_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk18
    FOREIGN KEY (add_buildout_id)
    REFERENCES add_buildout (add_buildout_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk19
    FOREIGN KEY (left_track_id)
    REFERENCES left_track (left_track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk20
    FOREIGN KEY (right_track_id)
    REFERENCES right_track (right_track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_fk21
    FOREIGN KEY (product_mesh_id)
    REFERENCES product_mesh (product_mesh_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table sunscreen
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS sunscreen 
-- (
--   sunscreen_id SERIAL,
--   cast_clip CHARACTER VARYING(5) NOT NULL,
--   CONSTRAINT susnscreen_pk PRIMARY KEY (sunscreen_id)
-- );


-- -----------------------------------------------------
-- Table view_guard
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS viewguard 
-- (
--   viewguard_id SERIAL,
--   handle_color CHARACTER VARYING(10) NOT NULL,
--   door_type CHARACTER VARYING(10) NOT NULL,
--   number_of_slides INTEGER NOT NULL,
--   color CHARACTER VARYING(10) NOT NULL,
--   handle_style BOOLEAN NULL,
--   deadbolt BOOLEAN NULL,
--   CONSTRAINT viewguard_pk PRIMARY KEY (viewguard_id)
-- );


-- -----------------------------------------------------
-- Table wizard_smart_screen
-- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS wizard_smart_screen 
-- (
--   wizard_smart_screen_id SERIAL,
--   location_on_house BOOLEAN NULL,
--   placement BOOLEAN NULL,
--   color BOOLEAN NULL,
--   fabric_type BOOLEAN NULL,
--   housing_size BOOLEAN NULL,
--   drive_side BOOLEAN NULL,
--   bottom_seal BOOLEAN NULL,
--   zipper_color BOOLEAN NULL,
--   probe_color BOOLEAN NULL,
--   cable_length BOOLEAN NULL,
--   top_opening_width BOOLEAN NULL,
--   top_level BOOLEAN NULL,
--   bottom_opening_width BOOLEAN NULL,
--   bottom_level BOOLEAN NULL,
--   right_opening_height BOOLEAN NULL,
--   right_plump BOOLEAN NULL,
--   right_opening_height BOOLEAN NULL,
--   right_plump BOOLEAN NULL,
--   two_by_two_angle BOOLEAN NULL,
--   track_type BOOLEAN NULL,
--   track_punched BOOLEAN NULL,
--   starting_poINTEGER BOOLEAN NULL,
--   order_width BOOLEAN NULL,
--   order_height BOOLEAN NULL,
--   CONSTRAINT wss_pk PRIMARY KEY (wizard_smart_screen_id)
-- );


-- -----------------------------------------------------
-- Table measurement
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS measurement 
(
  measurement_id SERIAL,
  measurement_name CHARACTER VARYING NULL,
  CONSTRAINT measurement_pk PRIMARY KEY (measurement_id)
);

-- -----------------------------------------------------
-- Table nws_measurement
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS nws_measurement 
(
  nws_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  nws_id INTEGER NOT NULL,
  width_fraction CHARACTER VARYING NULL,
  width_plus_minus CHARACTER(1) NULL,
  height_fraction CHARACTER VARYING NULL,
  height_plus_minus CHARACTER(1) NULL,
  CONSTRAINT nws_measurement_pk PRIMARY KEY (nws_measurement_id),
  CONSTRAINT nws_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT nws_measurement_fk2_idx
    FOREIGN KEY (nws_id)
    REFERENCES new_window_screen (nws_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table loh_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS loh_measurement
(
  loh_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  left_opening_height_id INTEGER NOT NULL,
  CONSTRAINT loh_measurement_pk PRIMARY KEY (loh_measurement_id),
  CONSTRAINT loh_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT loh_measurement_fk2
    FOREIGN KEY (left_opening_height_id)
    REFERENCES left_opening_height (left_opening_height_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table roh_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS roh_measurement
(
  roh_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  right_opening_height_id INTEGER NOT NULL,
  CONSTRAINT roh_measurement_pk PRIMARY KEY (roh_measurement_id),
  CONSTRAINT roh_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT roh_measurement_fk2
    FOREIGN KEY (right_opening_height_id)
    REFERENCES right_opening_height (right_opening_height_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table bow_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bow_measurement
(
  bow_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  bottom_opening_width_id INTEGER NOT NULL,
  CONSTRAINT bow_measurement_pk PRIMARY KEY (bow_measurement_id),
  CONSTRAINT bow_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT bow_measurement_fk2
    FOREIGN KEY (bottom_opening_width_id)
    REFERENCES bottom_opening_width (bottom_opening_width_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table bow_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tow_measurement
(
  tow_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  top_opening_width_id INTEGER NOT NULL,
  CONSTRAINT tow_measurement_pk PRIMARY KEY (tow_measurement_id),
  CONSTRAINT tow_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT tow_measurement_fk2
    FOREIGN KEY (top_opening_width_id)
    REFERENCES top_opening_width (top_opening_width_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS taw_measurement
(
  taw_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  top_adapter_id INTEGER NOT NULL,
  CONSTRAINT taw_measurement_pk PRIMARY KEY (taw_measurement_id),
  CONSTRAINT taw_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT taw_measurement_fk2
    FOREIGN KEY (top_adapter_id)
    REFERENCES top_adapter (top_adapter_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS baw_measurement
(
  baw_measurement_id SERIAL,
  measurement_id INTEGER NOT NULL,
  bottom_adapter_id INTEGER NOT NULL,
  CONSTRAINT baw_measurement_pk PRIMARY KEY (baw_measurement_id),
  CONSTRAINT baw_measurement_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT baw_measurement_fk2
    FOREIGN KEY (bottom_adapter_id)
    REFERENCES bottom_adapter (bottom_adapter_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS middle_opening_height
(
  middle_opening_height_id SERIAL,
  middle_opening_height_name CHARACTER VARYING NOT NULL,
  CONSTRAINT middle_opening_height_pk PRIMARY KEY (middle_opening_height_id)
);

CREATE TABLE IF NOT EXISTS middle_opening_width
(
  middle_opening_width_id SERIAL,
  middle_opening_width_name CHARACTER VARYING NOT NULL,
  CONSTRAINT middle_opening_width_pk PRIMARY KEY (middle_opening_width_id)
);

CREATE TABLE IF NOT EXISTS unit_height
(
  unit_height_id SERIAL,
  unit_height_name CHARACTER VARYING NOT NULL,
  CONSTRAINT unit_height_pk PRIMARY KEY (unit_height_id)
);

CREATE TABLE IF NOT EXISTS pivot_pro_height
(
  pivot_pro_height_id SERIAL,
  pivot_pro_height_name CHARACTER VARYING NOT NULL,
  CONSTRAINT pivot_pro_height_pk PRIMARY KEY (pivot_pro_height_id)
);

-- -----------------------------------------------------
-- Table general_retract_control
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS general_retract_control 
(
  general_retract_control_id SERIAL,
  door_type CHARACTER VARYING NULL,
  door_mount CHARACTER VARYING NULL,
  opening_side CHARACTER VARYING NULL,
  measurement_id INTEGER NOT NULL,
  mesh_id INTEGER NOT NULL,
  mohair_id INTEGER NOT NULL,
  mohair_position_id INTEGER NOT NULL,
  top_adapter_id INTEGER NOT NULL,
  buildout_id INTEGER NOT NULL,
  bottom_adapter_id INTEGER NOT NULL,
  bottom_adapter_color_id INTEGER NULL,
  CONSTRAINT grc_pk PRIMARY KEY (general_retract_control_id),
  CONSTRAINT grc_fk1
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (measurement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk2
    FOREIGN KEY (mesh_id)
    REFERENCES mesh (mesh_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk3
    FOREIGN KEY (mohair_id)
    REFERENCES mohair (mohair_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk4
    FOREIGN KEY (mohair_position_id)
    REFERENCES mohair_position (mohair_position_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk5
    FOREIGN KEY (top_adapter_id)
    REFERENCES top_adapter (top_adapter_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk6
    FOREIGN KEY (buildout_id)
    REFERENCES buildout (buildout_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk7
    FOREIGN KEY (bottom_adapter_id)
    REFERENCES bottom_adapter (bottom_adapter_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT grc_fk8
    FOREIGN KEY (bottom_adapter_color_id)
    REFERENCES bottom_adapter_color (bottom_adapter_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table customization
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS customization
  (
    customization_id SERIAL,
    product_id INTEGER NOT NULL,
    measurement_id INTEGER NOT NULL,
    frame_size_id INTEGER NOT NULL,
    fastener_id INTEGER NOT NULL,
    color_id INTEGER NOT NULL,
    mesh_id INTEGER NOT NULL,
    product_mesh_id INTEGER NOT NULL,
    mirage_3500_id INTEGER NULL,
    mirage_id INTEGER NULL,
    rainier_id INTEGER NULL,
    -- door_id INTEGER NULL,
    -- hale_screen_model_id INTEGER NULL,
    -- phantom_id INTEGER NULL,
    -- wizard_smart_screen_id INTEGER NULL,
    -- viewguard_id INTEGER NULL,
    -- sunscreen_id INTEGER NULL,
    -- hale_door_id INTEGER NULL,
    general_retract_control_id INTEGER NULL,
    nws_measurement_id INTEGER NULL,
    starting_point_id INTEGER NULL,
    top_level_id INTEGER NULL,
    bottom_level_id INTEGER NULL,
    left_plumb_id INTEGER NULL,
    right_plumb_id INTEGER NULL,
    taw_measurement_id INTEGER NULL,
    baw_measurement_id INTEGER NULL,
    middle_opening_height_id INTEGER NULL,
    middle_opening_width_id INTEGER NULL,
    unit_height_id INTEGER NULL,
    pivot_pro_height_id INTEGER NULL,
    CONSTRAINT customization_pk PRIMARY KEY (customization_id),
    CONSTRAINT customization_fk1
      FOREIGN KEY (product_id)
      REFERENCES product (product_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk2
      FOREIGN KEY (measurement_id)
      REFERENCES measurement (measurement_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk3
      FOREIGN KEY (frame_size_id)
      REFERENCES frame_size (frame_size_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk4
      FOREIGN KEY (fastener_id)
      REFERENCES fastener (fastener_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk5
      FOREIGN KEY (color_id)
      REFERENCES color (color_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk6
      FOREIGN KEY (mesh_id)
      REFERENCES mesh (mesh_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk7
      FOREIGN KEY (mirage_3500_id)
      REFERENCES mirage_3500 (mirage_3500_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk8
      FOREIGN KEY (mirage_id)
      REFERENCES mirage (mirage_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk9
      FOREIGN KEY (rainier_id)
      REFERENCES rainier (rainier_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk10
    --   FOREIGN KEY (door_id)
    --   REFERENCES door (door_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk11
    --   FOREIGN KEY (hale_screen_model_id)
    --   REFERENCES hale_screen_model (hale_screen_model_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk12
    --   FOREIGN KEY (phantom_id)
    --   REFERENCES phantom (phantom_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk13
    --   FOREIGN KEY (wizard_smart_screen_id)
    --   REFERENCES wizard_smart_screen (wizard_smart_screen_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk14
    --   FOREIGN KEY (viewguard_id)
    --   REFERENCES viewguard (viewguard_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    -- CONSTRAINT customization_fk15
    --   FOREIGN KEY (hale_door_id)
    --   REFERENCES hale_door (hale_door_id)
    --   ON DELETE CASCADE
    --   ON UPDATE CASCADE,
    CONSTRAINT customization_fk16
      FOREIGN KEY (general_retract_control_id)
      REFERENCES general_retract_control (general_retract_control_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk17
      FOREIGN KEY (nws_measurement_id)
      REFERENCES nws_measurement (nws_measurement_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk18
      FOREIGN KEY (starting_point_id)
      REFERENCES starting_point (starting_point_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk19
      FOREIGN KEY (top_level_id)
      REFERENCES top_level (top_level_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk20
      FOREIGN KEY (bottom_level_id)
      REFERENCES bottom_level (bottom_level_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk21
      FOREIGN KEY (left_plumb_id)
      REFERENCES left_plumb (left_plumb_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk22
      FOREIGN KEY (right_plumb_id)
      REFERENCES right_plumb (right_plumb_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk23
      FOREIGN KEY (taw_measurement_id)
      REFERENCES taw_measurement (taw_measurement_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk24
      FOREIGN KEY (baw_measurement_id)
      REFERENCES baw_measurement (baw_measurement_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk25
      FOREIGN KEY (middle_opening_height_id)
      REFERENCES middle_opening_height (middle_opening_height_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk26
      FOREIGN KEY (middle_opening_width_id)
      REFERENCES middle_opening_width (middle_opening_width_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk27
      FOREIGN KEY (unit_height_id)
      REFERENCES unit_height (unit_height_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk28
      FOREIGN KEY (pivot_pro_height_id)
      REFERENCES pivot_pro_height (pivot_pro_height_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );

-- -----------------------------------------------------
-- TABLE ORDER CUSTOMIZATION
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS order_customization
(
  order_customization_id SERIAL,
  order_id INTEGER NOT NULL,
  customization_id INTEGER NOT NULL,
  is_estimate BOOLEAN NULL,
  is_confirmed BOOLEAN NULL,
  is_completed BOOLEAN NULL,
  is_cancelled BOOLEAN NULL,
  CONSTRAINT order_customization_pk PRIMARY KEY (order_customization_id),
  CONSTRAINT order_customization_fk1
    FOREIGN KEY (order_id)
    REFERENCES public.order (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT order_customization_fk2
    FOREIGN KEY (customization_id)
    REFERENCES customization (customization_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);




-- INSERTS

-- INSERT INTO color (color_name)
-- VALUES ('Midnight Black', 'Slack Grey', 'Limen Cream', 'Rindeau Brown', 'Sandalwood', 'Tudor Brown', 'Polar White', 'Ex Pebble Grey'
--         , 'Hatford Green', 'Ansi 49 Grey', 'Almond', 'Autumn Leaf', 'Bergundy', 'Charcoal', 'Dk Bronze Metallic', 'Evergreen'
--         , 'Furniture White', 'Gloss Brown', 'Metro Brown', 'Mocha', 'Metalic Silver', 'Oyster Grey', 'Seal Beach Green', 'Sundried Tomato', 'Signal White', 'Wicker', 'Custom Match');

-- INSERT INTO frame_size (size_type)
-- VALUES ('1/4"', '5/16"', '3/8"', '7/16"', '1"', 'OC', 'IC');

-- INSERT INTO fastener (fastener_type)
-- VALUES ('None', 'RH (Ram Horn Spring)', 'PP (Pointed Plunger)', 'SP (Standard Plunger)', 'FP (Fat Plunger)', '1" FP (1" Fat Plunger)', 'PL (Pointer Latch)', 'CC (Cast Clip)', 'F-Chanel', 'H-Chanel', 'Combination', 'Custom')

-- INSERT INTO mesh (mesh_type)
-- VALUES ('BV', 'Bug', 'Patio', 'Tuff', 'Pet', 'SS')


-- INSERT INTO PRODUCT (product_name)
-- VALUES ("Mirage", "Mirage 3500", "New Window Screen", "Rainier")




