-- -----------------------------------------------------
-- Drop Statements
-- -----------------------------------------------------
DROP TABLE IF EXISTS customization;
DROP TABLE IF EXISTS tow_measurement;
DROP TABLE IF EXISTS bow_measurement;
DROP TABLE IF EXISTS roh_measurement;
DROP TABLE IF EXISTS loh_measurement;
DROP TABLE IF EXISTS brush_location;
DROP TABLE IF EXISTS nws_measurement;
DROP TABLE IF EXISTS measurement;
DROP TABLE IF EXISTS rainier;
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
DROP TABLE IF EXISTS bottom_opening_width;
DROP TABLE IF EXISTS bottom_level;
DROP TABLE IF EXISTS top_level;
DROP TABLE IF EXISTS top_opening_width;
DROP TABLE IF EXISTS drive_side;
DROP TABLE IF EXISTS placement;
DROP TABLE IF EXISTS housing;
DROP TABLE IF EXISTS new_window_screen;
DROP TABLE IF EXISTS `window`;
DROP TABLE IF EXISTS product_mesh;
DROP TABLE IF EXISTS mesh;
DROP TABLE IF EXISTS fabric;
DROP TABLE IF EXISTS fastener;
DROP TABLE IF EXISTS frame_size;
DROP TABLE IF EXISTS fabric_color;
DROP TABLE IF EXISTS handle_color;
DROP TABLE IF EXISTS hardware_color;
DROP TABLE IF EXISTS nws_color;
DROP TABLE IF EXISTS pivot_pro_color;
DROP TABLE IF EXISTS top_adapter_color;
DROP TABLE IF EXISTS rainier_zipper_color;
DROP TABLE IF EXISTS product_color;
DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS mirage_3500;
DROP TABLE IF EXISTS mirage;
DROP TABLE IF EXISTS general_retract_control;
-- DROP TABLE IF EXISTS account;
-- DROP TYPE IF EXISTS account_type;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS order_log;
DROP TABLE IF EXISTS cust_order;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS address;











-- -----------------------------------------------------
-- Table address
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS address (
  address_id INT AUTO_INCREMENT,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255) NOT NULL,
  address_city VARCHAR(255) NOT NULL,
  address_state VARCHAR(255) NOT NULL,
  address_zip VARCHAR(255) NOT NULL,
  PRIMARY KEY (address_id)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table customer
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS customer (
  customer_id INT AUTO_INCREMENT,
  customer_firstname VARCHAR(255) NOT NULL,
  customer_lastname VARCHAR(255) NOT NULL,
  PRIMARY KEY (customer_id)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table order
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `order` (
  order_id INT AUTO_INCREMENT,
  order_date DATE NOT NULL,
  estimated_date DATE NOT NULL,
  actual_date DATE DEFAULT NULL,
  estimated_cost FLOAT NOT NULL,
  actual_cost FLOAT DEFAULT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table customer_address
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS customer_address (
  customer_address_id INT AUTO_INCREMENT,
  customer_id INT NOT NULL,
  address_id INT NOT NULL,
  PRIMARY KEY (customer_address_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table cust_order
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS cust_order (
  cust_order_id INT AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_id INT NOT NULL,
  customer_address_id INT NOT NULL,
  PRIMARY KEY (cust_order_id),
  CONSTRAINT cust_order_fk1
    FOREIGN KEY (customer_id)
    REFERENCES customer (customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT cust_order_fk2
    FOREIGN KEY (order_id)
    REFERENCES `order` (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT cust_order_fk3
    FOREIGN KEY (customer_address_id)
    REFERENCES customer_address (customer_address_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table order_log
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS order_log (
  order_log_id INT AUTO_INCREMENT,
  customer_id INT NOT NULL,
  account_id INT NOT NULL,
  order_id INT NOT NULL,
  actual_date DATE DEFAULT NULL,
  PRIMARY KEY (order_log_id),
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
    REFERENCES `order` (order_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS product (
  product_id INT AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (product_id)
 ) ENGINE=InnoDB;



-- Account Type Creation
-- MySQL ENUM will be defined inline in the account table below

-- -----------------------------------------------------
-- Table account
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS account (
  account_id INT AUTO_INCREMENT,
  account_firstname VARCHAR(255) NOT NULL,
  account_lastname VARCHAR(255) NOT NULL,
  account_email VARCHAR(255) NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type ENUM('Employee','Admin','DBA') NOT NULL DEFAULT 'Employee',
  PRIMARY KEY (account_id)
) ENGINE=InnoDB;


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
-- Table general_retract_control
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS general_retract_control (
  general_retract_control_id INT AUTO_INCREMENT,
  door_type VARCHAR(255) NULL,
  door_mount VARCHAR(255) NULL,
  opening_side VARCHAR(255) NULL,
  measurement_id INT NOT NULL,
  mesh_id INT NOT NULL,
  mohair_id INT NOT NULL,
  mohair_position VARCHAR(255) NULL,
  top_adapter_id INT NOT NULL,
  build_out_id INT NOT NULL,
  bottom_adapter_id INT NOT NULL,
  btm_adapter_color VARCHAR(255) NULL,
  PRIMARY KEY (general_retract_control_id)
) ENGINE=InnoDB;


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

CREATE TABLE IF NOT EXISTS mirage (
  mirage_id INT AUTO_INCREMENT,
  mirage_build_out VARCHAR(255) NOT NULL,
  PRIMARY KEY (mirage_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table mirage_3500
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mirage_3500 (
  mirage_3500_id INT AUTO_INCREMENT,
  mirage_3500_handle VARCHAR(255) NOT NULL,
  PRIMARY KEY (mirage_3500_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table frame_size
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS frame_size (
  frame_size_id INT AUTO_INCREMENT,
  size_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (frame_size_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table fabric
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS fabric (
  fabric_id INT AUTO_INCREMENT,
  fabric_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (fabric_id)
 ) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table fastener
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS fastener (
  fastener_id INT AUTO_INCREMENT,
  fastener_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (fastener_id)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table mesh
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mesh (
  mesh_id INT AUTO_INCREMENT,
  mesh_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (mesh_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table color
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS color (
  color_id INT AUTO_INCREMENT,
  color_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (color_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table product_color
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS product_color (
  product_color_id INT AUTO_INCREMENT,
  product_id INT NOT NULL,
  color_id INT NOT NULL,
  PRIMARY KEY (product_color_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table product_mesh
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS product_mesh (
  product_mesh_id INT AUTO_INCREMENT,
  product_id INT NULL,
  mesh_id INT NULL,
  product_color_id INT NULL,
  fabric_id INT NULL,
  PRIMARY KEY (product_mesh_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table tab_spring
-- -----------------------------------------------------
CREATE TABLE tab_spring (
  tab_spring_id INT AUTO_INCREMENT,
  tab_spring_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (tab_spring_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table window
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `window` (
  window_id INT AUTO_INCREMENT,
  tab_spring_id INT NOT NULL,
  color_id INT NOT NULL,
  frame_size_id INT NOT NULL,
  fastener_id INT NOT NULL,
  mesh_id INT NOT NULL,
  PRIMARY KEY (window_id),
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
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table phantom
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS new_window_screen (
  nws_id INT AUTO_INCREMENT,
  width_inch TINYINT(1) NULL,
  height_inch TINYINT(1) NULL,
  window_id INT NOT NULL,
  PRIMARY KEY (nws_id),
  CONSTRAINT nws_fk1
    FOREIGN KEY (window_id)
    REFERENCES `window` (window_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table handle_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS handle_color (
  handle_color_id INT AUTO_INCREMENT,
  product_color_id INT NOT NULL,
  mirage_3500_id INT NOT NULL,
  PRIMARY KEY (handle_color_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table hardware_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS hardware_color (
  hardware_color_id INT AUTO_INCREMENT,
  product_color_id INT NOT NULL,
  PRIMARY KEY (hardware_color_id),
  CONSTRAINT hardware_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table pivot_pro_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pivot_pro_color (
  pivot_pro_color_id INT AUTO_INCREMENT,
  product_color_id INT NOT NULL,
  PRIMARY KEY (pivot_pro_color_id),
  CONSTRAINT pivot_pro_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table top_adapter_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS top_adapter_color (
  top_adapter_color_id INT AUTO_INCREMENT,
  product_color_id INT NOT NULL,
  PRIMARY KEY (top_adapter_color_id),
  CONSTRAINT top_adapter_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table rainier_zipper_color
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rainier_zipper_color (
  rainier_zipper_color_id INT AUTO_INCREMENT,
  product_color_id INT NOT NULL,
  PRIMARY KEY (rainier_zipper_color_id),
  CONSTRAINT rainier_zipper_color_fk1
    FOREIGN KEY (product_color_id)
    REFERENCES product_color (product_color_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

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

CREATE TABLE IF NOT EXISTS housing (
  housing_id INT AUTO_INCREMENT,
  housing_series_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (housing_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table placement
-- -----------------------------------------------------
-- 
CREATE TABLE IF NOT EXISTS placement (
  placement_id INT AUTO_INCREMENT,
  placement_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (placement_id)
 ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS drive_side (
  drive_side_id INT AUTO_INCREMENT,
  drive_side_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (drive_side_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS hembar (
  hembar_id INT AUTO_INCREMENT,
  hembar_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (hembar_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pilebrush (
  pilebrush_id INT AUTO_INCREMENT,
  pilebrush_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (pilebrush_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS brush_location (
  brush_location_id INT AUTO_INCREMENT,
  brush_location_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (brush_location_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cord_length (
  cord_length_id INT AUTO_INCREMENT,
  cord_length_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (cord_length_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS mount_type (
  mount_type_id INT AUTO_INCREMENT,
  mount_type_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (mount_type_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS top_opening_width (
  top_opening_width_id INT AUTO_INCREMENT,
  top_opening_width_name VARCHAR(255) NULL,
  PRIMARY KEY (top_opening_width_id) 
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS top_level (
  top_level_id INT AUTO_INCREMENT,
  top_level_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (top_level_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS top_adapter (
  top_adapter_id INT AUTO_INCREMENT,
  top_adapter_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (top_adapter_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bottom_adapter (
  bottom_adapter_id INT AUTO_INCREMENT,
  bottom_adapter_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (bottom_adapter_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bottom_level (
  bottom_level_id INT AUTO_INCREMENT,
  bottom_level_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (bottom_level_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bottom_opening_width (
  bottom_opening_width_id INT AUTO_INCREMENT,
  bottom_opening_width_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (bottom_opening_width_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS right_opening_height (
  right_opening_height_id INT AUTO_INCREMENT,
  right_opening_height_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (right_opening_height_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS left_opening_height (
  left_opening_height_id INT AUTO_INCREMENT,
  left_opening_height_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (left_opening_height_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS right_plumb (
  right_plumb_id INT AUTO_INCREMENT,
  right_plumb_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (right_plumb_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS left_plumb (
  left_plumb_id INT AUTO_INCREMENT,
  left_plumb_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (left_plumb_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS right_buildout (
  right_buildout_id INT AUTO_INCREMENT,
  right_buildout_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (right_buildout_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS left_buildout (
  left_buildout_id INT AUTO_INCREMENT,
  left_buildout_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (left_buildout_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS add_buildout (
  add_buildout_id INT AUTO_INCREMENT,
  add_buildout_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (add_buildout_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS left_track (
  left_track_id INT AUTO_INCREMENT,
  left_track_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (left_track_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS right_track (
  right_track_id INT AUTO_INCREMENT,
  right_track_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (right_track_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS starting_point (
  starting_point_id INT AUTO_INCREMENT,
  starting_point_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (starting_point_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rainier (
  rainier_id INT AUTO_INCREMENT,
  housing_id INT NOT NULL,
  placement_id INT NOT NULL,
  drive_side_id INT NOT NULL,
  hembar_id INT NOT NULL,
  pilebrush_id INT NOT NULL,
  brush_location_id INT NOT NULL,
  cord_length_id INT NOT NULL,
  mount_type_id INT NOT NULL,
  top_opening_width_id INT NOT NULL,
  top_level_id INT NOT NULL,
  bottom_level_id INT NOT NULL,
  bottom_opening_width_id INT NOT NULL,
  right_opening_height_id INT NOT NULL,
  right_plumb_id INT NOT NULL,
  left_plumb_id INT NOT NULL,
  right_buildout_id INT NOT NULL,
  left_buildout_id INT NOT NULL,
  add_buildout_id INT NOT NULL,
  left_track_id INT NOT NULL,
  right_track_id INT NOT NULL,
  fabric_id INT NOT NULL,
  is_estimate TINYINT(1) NULL,
  is_confirmed TINYINT(1) NULL,

  PRIMARY KEY (rainier_id),
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
    ON UPDATE CASCADE
) ENGINE=InnoDB;

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

CREATE TABLE IF NOT EXISTS measurement (
  measurement_id INT AUTO_INCREMENT,
  measurement_name VARCHAR(255) NULL,
  PRIMARY KEY (measurement_id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table nws_measurement
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS nws_measurement (
  nws_measurement_id INT AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  nws_id INT NOT NULL,
  width_fraction VARCHAR(255) NULL,
  width_plus_minus CHAR(1) NULL,
  height_fraction VARCHAR(255) NULL,
  height_plus_minus CHAR(1) NULL,
  PRIMARY KEY (nws_measurement_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table loh_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS loh_measurement (
  loh_measurement_id INT AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  left_opening_height_id INT NOT NULL,
  PRIMARY KEY (loh_measurement_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table roh_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS roh_measurement (
  roh_measurement_id INT AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  right_opening_height_id INT NOT NULL,
  PRIMARY KEY (roh_measurement_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table bow_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bow_measurement (
  bow_measurement_id INT AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  bottom_opening_width_id INT NOT NULL,
  PRIMARY KEY (bow_measurement_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table bow_measurement
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tow_measurement (
  tow_measurement_id INT AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  top_opening_width_id INT NOT NULL,
  PRIMARY KEY (tow_measurement_id),
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
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table customization
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS customization
  (
    customization_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,
    measurement_id INT NOT NULL,
    frame_size_id INT NOT NULL,
    fastener_id INT NOT NULL,
    color_id INT NOT NULL,
    mesh_id INT NOT NULL,
    product_mesh_id INT NOT NULL,
    mirage_3500_id INT NULL,
    mirage_id INT NULL,
    rainier_id INT NULL,
    -- door_id INTEGER NULL,
    -- hale_screen_model_id INTEGER NULL,
    -- phantom_id INTEGER NULL,
    -- wizard_smart_screen_id INTEGER NULL,
    -- viewguard_id INTEGER NULL,
    -- sunscreen_id INTEGER NULL,
    -- hale_door_id INTEGER NULL,
    general_retract_control_id INTEGER NULL,
  nws_measurement_id INTEGER NULL,
  is_estimate TINYINT(1) NULL,
  is_confirmed TINYINT(1) NULL,
  PRIMARY KEY (customization_id),
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
      ON UPDATE CASCADE
  ) ENGINE=InnoDB;




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




