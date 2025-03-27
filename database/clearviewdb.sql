-- -----------------------------------------------------
-- Drop Statements
-- -----------------------------------------------------
DROP TABLE IF EXISTS customization;
DROP TABLE IF EXISTS cust_order;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS order_log;
DROP TABLE IF EXISTS public.order;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS door;
-- DROP TABLE IF EXISTS account; 
DROP TABLE IF EXISTS general_retract_control;
DROP TABLE IF EXISTS hale_door; 
DROP TABLE IF EXISTS hale_screen_model; 
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS general_retract_control;
DROP TABLE IF EXISTS hale_door;
DROP TABLE IF EXISTS hale_screen_model;
DROP TABLE IF EXISTS mirage;
DROP TABLE IF EXISTS mirage_3500;
DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS frame_size;
DROP TABLE IF EXISTS fastener;
DROP TABLE IF EXISTS mesh; 
DROP TABLE IF EXISTS new_window_screen;
DROP TABLE IF EXISTS mesh;
DROP TABLE IF EXISTS public.window;
DROP TABLE IF EXISTS new_window_screen;
DROP TABLE IF EXISTS phantom;
DROP TABLE IF EXISTS rainier;
DROP TABLE IF EXISTS placement;
DROP TABLE IF EXISTS housing_series;
DROP TABLE IF EXISTS drive_side;
DROP TABLE IF EXISTS hembar;
DROP TABLE IF EXISTS pilebrush;
DROP TABLE IF EXISTS brush_location;
DROP TABLE IF EXISTS cord_length;
DROP TABLE IF EXISTS mount_type;
DROP TABLE IF EXISTS top_opening;
DROP TABLE IF EXISTS buildout;
DROP TABLE IF EXISTS track;
DROP TABLE IF EXISTS sunscreen;
DROP TABLE IF EXISTS viewguard; 
DROP TABLE IF EXISTS wizard_smart_screen;
DROP TABLE IF EXISTS measurement;
DROP TABLE IF EXISTS nws_measurement;
DROP TABLE IF EXISTS rainier_color;
DROP TABLE IF EXISTS mirage_3500_mesh;
DROP TABLE IF EXISTS mirage_mesh;
DROP TABLE IF EXISTS mirage_3500_color;
DROP TABLE IF EXISTS mirage_color;
DROP TABLE IF EXISTS rainier_order;
DROP TABLE IF EXISTS mirage_order;
DROP TABLE IF EXISTS mirage_3500_order;
DROP TABLE IF EXISTS nws_order;

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

-- -----------------------------------------------------
-- Table door
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS door 
(
  door_id SERIAL,
  slide_type BOOLEAN NULL,
  slide_color BOOLEAN NULL,
  wheels_num INTEGER NOT NULL,
  swing_type BOOLEAN NULL,
  swing_color BOOLEAN NULL,
  opening_side CHARACTER(2) NOT NULL,
  handle_style BOOLEAN NULL,
  CONSTRAINT door_pk PRIMARY KEY (door_id)
);

-- Account Type Creation
DROP TYPE IF EXISTS account_type CASCADE;
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
-- Table general_retract_control
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS general_retract_control 
(
  general_retract_control_id SERIAL,
  door_type CHARACTER VARYING NULL,
  door_mount CHARACTER VARYING NULL,
  opening_side CHARACTER VARYING NULL,
  fraction CHARACTER VARYING NULL,
  mesh CHARACTER VARYING NULL,
  mohair CHARACTER VARYING NULL,
  mohair_position CHARACTER VARYING NULL,
  top_adapter CHARACTER VARYING NULL,
  build_out CHARACTER VARYING NULL,
  btm_adapter CHARACTER VARYING NULL,
  btm_adapter_color CHARACTER VARYING NULL,
  CONSTRAINT grc_pk PRIMARY KEY (general_retract_control_id)
);


-- -----------------------------------------------------
-- Table hale_door
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS hale_door 
(
  hale_door_id SERIAL,
  size BOOLEAN NULL,
  flap_config BOOLEAN NULL,
  door_color BOOLEAN NULL,
  sec_cover_load BOOLEAN NULL,
  second_ext_cover CHARACTER(1) NOT NULL,
  rain_cap CHARACTER(1) NOT NULL,
  flap CHARACTER(1) NOT NULL,
  thickness CHARACTER VARYING NOT NULL,
  CONSTRAINT hale_door_pk PRIMARY KEY (hale_door_id)
  thickness BOOLEAN NULL,
  CONSTRAINT hale_door_pk PRIMARY KEY (table_id)
);


-- -----------------------------------------------------
-- Table hale_screen_model
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS hale_screen_model 
(
  hale_screen_model_id SERIAL,
  model_size BOOLEAN NULL,
  model_color BOOLEAN NULL,
  model_thickness BOOLEAN NULL,
  model_has_flap CHARACTER(2) NOT NULL,
  model_placement BOOLEAN NULL,
  CONSTRAINT hale_screen_model_pk PRIMARY KEY (hale_screen_model_id)
);


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
-- Table color
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS color 
(
  color_id SERIAL,
  color_name CHARACTER VARYING NOT NULL,
  CONSTRAINT color_pk PRIMARY KEY (color_id)
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
-- Table window
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS public.window 
(
  window_id SERIAL,
  tab_spring CHARACTER VARYING NOT NULL,
  color_id INTEGER NOT NULL,
  frame_size_id INTEGER NOT NULL,
  fastener_id INTEGER NOT NULL,
  mesh_id INTEGER NOT NULL,
  CONSTRAINT window_pk PRIMARY KEY (window_id),
  INDEX window_fk1_idx (color_id),
  INDEX window_fk2_idx (frame_size_id),
  INDEX window_fk3_idx (fastener_id),
  INDEX window_fk4_idx (mesh_id),
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
  INDEX nws_fk1_idx (window_id),
  CONSTRAINT nws_fk1
    FOREIGN KEY (window_id)
    REFERENCES public.window (window_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table pilebrush
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS phantom 
(
  phantom_id SERIAL,
  phantom_color BOOLEAN NULL,
  phantom_build_out BOOLEAN NULL DEFAULT 'None',
  meshlock CHARACTER(1) NOT NULL,
  phantom_mesh CHARACTER VARYING(200) NOT NULL,
  meshlock_mesh CHARACTER VARYING(100) NOT NULL,
  type_of_screen CHARACTER VARYING(60) NOT NULL,
  screen_color BOOLEAN NULL,
  wood_type BOOLEAN NULL,
  mount BOOLEAN NULL,
  hembar BOOLEAN NULL,
  tracks BOOLEAN NULL,
  mesh BOOLEAN NULL,
  CONSTRAINT phantom_pk PRIMARY KEY (phantom_id)
);


-- -----------------------------------------------------
-- Table rainier
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table Rainier Housing
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS housing
(
  housing_id SERIAL,
  housing_name CHARACTER VARYING NOT NULL,
  CONSTRAINT housing_pk PRIMARY KEY (housing_id)
)

CREATE TABLE rainier_housing
(
rainier_housing_id SERIAL,
est_housing_series BOOLEAN NOT NULL,
act_housing_series BOOLEAN NOT NULL,
housing_id INTEGER NOT NULL,
CONSTRAINT rainier_housing_pk PRIMARY KEY (rainier_housing_id),
CONSTRAINT rainier_housing_fk1
  FOREIGN KEY (housing_id)
  REFERENCES housing (housing_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table rainier_placement
-- -----------------------------------------------------
-- 

CREATE TABLE IF NOT EXISTS placement
(
  placement_id SERIAL,
  placement_name CHARACTER VARYING NOT NULL,
  CONSTRAINT placement_pk PRIMARY KEY (placement_id)
)


CREATE TABLE rainier_placement
(
  rainier_placement_id SERIAL,
  est_placement BOOLEAN NOT NULL,
  act_placement BOOLEAN NOT NULL;
);

-- -----------------------------------------------------
-- Table rainier_drive_side
-- -----------------------------------------------------
-- 

CREATE TABLE IF NOT EXISTS drive_side
(
  drive_side_id SERIAL,
  drive_side_name CHARACTER VARYING NOT NULL,
  CONSTRAINT drive_side_pk PRIMARY KEY (drive_side_id)
)

CREATE TABLE rainier_drive_side
(
  rainier_drive_side_id SERIAL,
  est_drive_side BOOLEAN NULL,
  act_drive_side BOOLEAN NULL
);

CREATE TABLE rainier_hembar
(
  rainier_hembar_id SERIAL,
  est_hembar BOOLEAN NULL,
  act_hembar BOOLEAN NULL
);

CREATE TABLE rainier_pilebrush
(
  rainier_pilebrush_id SERIAL,
  est_brush_location BOOLEAN NULL,
  act_brush_location BOOLEAN NULL
);

CREATE TABLE rainier_brush_loction
(
  rainier_brush_loction_id SERIAL,
  est_brush_location BOOLEAN NULL,
  act_brush_location BOOLEAN NULL
);

CREATE TABLE rainier_cord_length
(
  rainier_cord_length_id SERIAL,
  est_brush_location BOOLEAN NULL,
  act_brush_location BOOLEAN NULL
);

CREATE TABLE rainier_mount_type
(
  rainier_mount_type_id SERIAL,
  est_mount_type BOOLEAN NULL,
  act_mount_type BOOLEAN NULL
);

CREATE TABLE rainier_top_opening_width
(
  rainier_top_opening_width_id SERIAL,
  est_top_opening_width BOOLEAN NULL,
  act_top_opening_width BOOLEAN NULL  
);

CREATE TABLE rainier_top_level
(
  rainier_top_level_id SERIAL,
  est_top_level BOOLEAN NULL,
  act_top_level BOOLEAN NULL
);

CREATE TABLE rainier_bottom_level
(
  rainier_bottom_level_id SERIAL,
  est_bottom_level BOOLEAN NULL,
  act_bottom_level BOOLEAN NULL
);

CREATE TABLE rainier_bottom_opening_width
(
  rainier_bottom_opening_width_id SERIAL,
  est_rainier_bottom_opening_width BOOLEAN NULL,
  act_rainier_bottom_opening_width BOOLEAN NULL
);

CREATE TABLE rainier_right_opening_height
(
  rainier_right_opening_height_id SERIAL,
  est_rainier_right_opening_height BOOLEAN NULL,
  act_rainier_right_opening_height BOOLEAN NULL
);

CREATE TABLE rainier_right_plumb
(
  rainier_right_plumb_id SERIAL,
  est_right_plumb BOOLEAN NULL,
  act_right_plumb BOOLEAN NULL
);

CREATE TABLE rainier_left_plumb
(
  rainier_left_plumb_id SERIAL,
  est_left_plumb BOOLEAN NULL,
  act_left_plumb BOOLEAN NULL
);

CREATE TABLE rainier_right_buildout
(
  rainier_right_buildout_id SERIAL,
  est_rainier_right_buildout BOOLEAN NULL,
  act_rainier_right_buildout BOOLEAN NULL 
);

CREATE TABLE rainier_left_buildout
(
  rainier_left_buildout_id SERIAL,
  est_left_buildout BOOLEAN NULL,
  act_left_buildout BOOLEAN NULL
);

CREATE TABLE rainier_add_buildout
(
  rainier_add_buildout_id SERIAL,
  est_rrainier_add_buildout BOOLEAN NULL,
  act_rainier_add_buildout BOOLEAN NULL
)

CREATE TABLE rainier_left_track
(
  rainier_left_track_id SERIAL,
  est_left_track BOOLEAN NULL,
  act_left_track BOOLEAN NULL
);

CREATE TABLE rainier_right_track
(
  rainier_right_track_id SERIAL,
  est_right_track BOOLEAN NULL,
  act_right_track BOOLEAN NULL
);

CREATE TABLE rainier_starting_point
(
  rainer_starting_point_id SERIAL,
  est_rainier_starting_point BOOLEAN NULL
  act_starting_point BOOLEAN NULL,
);

CREATE TABLE IF NOT EXISTS rainier 
(
  rainier_id SERIAL,
  rainier_housing_id INTEGER NOT NULL,
  rainier_placement_id INTEGER NOT NULL,
  rainier_drive_side_id INTEGER NOT NULL,
  rainier_hembar_id INTEGER NOT NULL,
  rainier_pilebrush_id INTEGER NOT NULL,
  rainier_brush_location_id INTEGER NOT NULL,
  rainier_cord_length_id INTEGER NOT NULL,
  rainier_mount_type_id INTEGER NOT NULL,
  rainier_top_opening_width_id INTEGER NOT NULL,
  rainier_top_level_id INTEGER NOT NULL,
  rainier_bottom_level_id INTEGER NOT NULL,
  rainier_bottom_opening_width_id INTEGER NOT NULL,
  rainier_right_opening_height_id INTEGER NOT NULL,
  rainier_right_plumb_id INTEGER NOT NULL,
  rainier_left_plumb_id INTEGER NOT NULL,
  rainier_right_buildout_id INTEGER NOT NULL,
  rainier_left_buildout_id INTEGER NOT NULL,
  rainier_add_buildout_id INTEGER NOT NULL,
  rainier_left_track_id INTEGER NOT NULL,
  rainier_right_track_id INTEGER NOT NULL,

  CONSTRAINT rainier_pk PRIMARY KEY (rainier_id),
  CONSTRAINT rainier_housing_fk1
    FOREIGN KEY (rainier_housing_id)
    REFERENCES rainier_housing (rainier_housing_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_placement_fk2
    FOREIGN KEY (rainier_placement_id)
    REFERENCES rainier_placement (rainier_placement_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT rainier_drive_side_fk3
    FOREIGN KEY (rainier_drive_side_id)
    REFERENCES rainier_drive_side (rainier_drive_side_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT rainier_housing_fk1
    FOREIGN KEY (rainier_housing_id)
    REFERENCES rainier_housing (rainier_housing_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

-- -----------------------------------------------------
-- Table sunscreen
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS sunscreen 
(
  sunscreen_id SERIAL,
  cast_clip CHARACTER VARYING(5) NOT NULL,
  CONSTRAINT susnscreen_pk PRIMARY KEY (sunscreen_id)
);


-- -----------------------------------------------------
-- Table view_guard
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS viewguard 
(
  viewguard_id SERIAL,
  handle_color CHARACTER VARYING(10) NOT NULL,
  door_type CHARACTER VARYING(10) NOT NULL,
  number_of_slides INTEGER NOT NULL,
  color CHARACTER VARYING(10) NOT NULL,
  handle_style BOOLEAN NULL,
  deadbolt BOOLEAN NULL,
  CONSTRAINT viewguard_pk PRIMARY KEY (viewguard_id)
);


-- -----------------------------------------------------
-- Table wizard_smart_screen
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS wizard_smart_screen 
(
  wizard_smart_screen_id SERIAL,
  location_on_house BOOLEAN NULL,
  placement BOOLEAN NULL,
  color BOOLEAN NULL,
  fabric_type BOOLEAN NULL,
  housing_size BOOLEAN NULL,
  drive_side BOOLEAN NULL,
  bottom_seal BOOLEAN NULL,
  zipper_color BOOLEAN NULL,
  probe_color BOOLEAN NULL,
  cable_length BOOLEAN NULL,
  top_opening_width BOOLEAN NULL,
  top_level BOOLEAN NULL,
  bottom_opening_width BOOLEAN NULL,
  bottom_level BOOLEAN NULL,
  right_opening_height BOOLEAN NULL,
  right_plump BOOLEAN NULL,
  right_opening_height BOOLEAN NULL,
  right_plump BOOLEAN NULL,
  two_by_two_angle BOOLEAN NULL,
  track_type BOOLEAN NULL,
  track_punched BOOLEAN NULL,
  starting_poINTEGER BOOLEAN NULL,
  order_width BOOLEAN NULL,
  order_height BOOLEAN NULL,
  CONSTRAINT wss_pk PRIMARY KEY (wizard_smart_screen_id)
);


-- -----------------------------------------------------
-- Table measurement
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS measurement 
(
  measurement_id SERIAL,
  measurement_name BOOLEAN NULL,
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
  width_fraction CHARACTER(1) NULL,
  width_plus_minus CHARACTER(1) NULL,
  height_fraction CHARACTER(1) NULL,
  height_plus_minus CHARACTER(1) NULL,
  CONSTRAINT nws_measurement_pk PRIMARY KEY (nws_measurement_id),
  INDEX nws_measurement_fk1_idx (measurement_id),
  INDEX nws_measurement_fk2_idx (nws_id),
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
    mirage_3500_id INTEGER NULL,
    mirage_id INTEGER NULL,
    rainier_id INTEGER NULL,
    door_id INTEGER NULL,
    hale_screen_model_id INTEGER NULL,
    phantom_id INTEGER NULL,
    wizard_smart_screen_id INTEGER NULL,
    viewguard_id INTEGER NULL,
    sunscreen_id INTEGER NULL,
    hale_door_id INTEGER NULL,
    general_retract_control_id INTEGER NULL,
    nws_measurement_id INTEGER NULL,
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
    CONSTRAINT customization_fk10
      FOREIGN KEY (door_id)
      REFERENCES door (door_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk11
      FOREIGN KEY (hale_screen_model_id)
      REFERENCES hale_screen_model (hale_screen_model_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk12
      FOREIGN KEY (phantom_id)
      REFERENCES phantom (phantom_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk13
      FOREIGN KEY (wizard_smart_screen_id)
      REFERENCES wizard_smart_screen (wizard_smart_screen_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk14
      FOREIGN KEY (viewguard_id)
      REFERENCES viewguard (viewguard_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk15
      FOREIGN KEY (hale_door_id)
      REFERENCES hale_door (hale_door_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk16
      FOREIGN KEY (general_retract_control_id)
      REFERENCES general_retract_control (general_retract_control_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT customization_fk17
      FOREIGN KEY (nws_measurement_id)
      REFERENCES nws_measurement (nws_measurement_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );




-- INSERTS

INSERT INTO color (color_name)
VALUES ('Midnight Black', 'Slack Grey', 'Limen Cream', 'Rindeau Brown', 'Sandalwood', 'Tudor Brown', 'Polar White', 'Ex Pebble Grey'
        , 'Hatford Green', 'Ansi 49 Grey', 'Almond', 'Autumn Leaf', 'Bergundy', 'Charcoal', 'Dk Bronze Metallic', 'Evergreen'
        , 'Furniture White', 'Gloss Brown', 'Metro Brown', 'Mocha', 'Metalic Silver', 'Oyster Grey', 'Seal Beach Green', 'Sundried Tomato', 'Signal White', 'Wicker', 'Custom Match');

INSERT INTO frame_size (size_type)
VALUES ('1/4"', '5/16"', '3/8"', '7/16"', '1"', 'OC', 'IC');

INSERT INTO fastener (fastener_type)
VALUES ('None', 'RH (Ram Horn Spring)', 'PP (Pointed Plunger)', 'SP (Standard Plunger)', 'FP (Fat Plunger)', '1" FP (1" Fat Plunger)', 'PL (Pointer Latch)', 'CC (Cast Clip)', 'F-Chanel', 'H-Chanel', 'Combination', 'Custom')

INSERT INTO mesh (mesh_type)
VALUES ('BV', 'Bug', 'Patio', 'Tuff', 'Pet', 'SS')


INSERT INTO PRODUCT (product_name)
VALUES ("Mirage", "Mirage 3500", "New Window Screen", "Rainier")




