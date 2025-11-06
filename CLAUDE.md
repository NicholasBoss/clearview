# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Clearview is a custom retractable screen door ordering and management system for a manufacturing/retail business. Built with Node.js/Express backend, EJS templates, and PostgreSQL database.

## Development Commands

**Start development server (with hot reload):**
```bash
npm run dev
```

**Start production server:**
```bash
npm start
```

**Database setup:**
```bash
# Execute the schema file against your PostgreSQL database
psql $DATABASE_URL -f database/clearviewdb.sql
```

**Access application:**
- Development: http://localhost:5500
- Uses environment variables from `.env` file

## Technology Stack

- **Backend:** Express.js 4.21.2 with EJS templating
- **Database:** PostgreSQL with `pg` driver (direct SQL, no ORM)
- **Auth:** JWT tokens (httpOnly cookies) + bcryptjs
- **Sessions:** PostgreSQL-backed sessions via `connect-pg-simple`
- **Validation:** express-validator 7.2.1
- **Package Manager:** pnpm 9.11.0

## Architecture

**MVC Pattern:**
- **Models** (`models/`): Data access layer with direct PostgreSQL queries
- **Views** (`views/`): EJS templates with layouts and partials
- **Controllers** (`controllers/`): Business logic layer

**Middleware Chain:**
1. Session management (PostgreSQL-backed)
2. Flash messages
3. Body/cookie parsing
4. JWT validation (`utilities.checkJWTToken`)
5. Authorization (`checkLogin`, `checkAuth`, `checkAdmin`)

**Route Structure:**
- `/` - General routes (home, about)
- `/account` - Authentication and account management
- `/orders` - Product order CRUD operations

## Database Architecture

**Key Design Patterns:**

1. **Lookup Tables:** Extensive use of lookup tables for all configurable options (colors, mesh types, measurements, adapters, etc.)

2. **Junction Tables:** Many-to-many relationships via junction tables (e.g., `product_color`, `product_mesh`, `tow_measurement`, etc.)

3. **Measurement System:** Unique fractional measurement handling:
   - User inputs integer + fraction (e.g., 36 + 1/4")
   - Stored in dimensional tables (`top_opening_width`, etc.)
   - Linked to `measurement` lookup table via junction tables

4. **Order Workflow Flags:**
   - `is_estimate` - Order created but not confirmed
   - `is_confirmed` - Order confirmed by customer
   - `is_complete` - Order completed by admin
   - `is_cancelled` - Order cancelled (admin only)

**Helper Pattern:**
```javascript
// getOrInsert pattern in ordersModel.js
// Checks if value exists before inserting to prevent duplicates
const colorId = await getOrInsert('color', 'color_name', colorValue);
```

## Form Validation & Error Handling

**Validation Pattern:**
- All validation in `utilities/*Validation.js` using express-validator
- POST/Redirect/GET pattern prevents form resubmission
- Validation errors stored in session
- Form data preserved on validation failure

**Error Display:**
- Errors shown as banner at top of forms
- Individual field errors highlighted
- Flash messages for user feedback

## Multi-Step Order Forms

**Mirage 3500 Workflow (Current Implementation):**
1. `GET /orders/createMirage3500` - Display form with 40+ fields populated from database
2. `POST /orders/confirmMirage3500` - Validate and store in session
3. `GET /orders/confirmMirage3500` - Display confirmation page (editable)
4. `POST /orders/saveMirage3500` - Insert to database with `is_estimate=true`

**Form Data Flow:**
- Step 1→2: Form data validated and stored in `req.session`
- Step 2→3: Session data displayed for confirmation
- Step 3→4: Final save to database
- localStorage used client-side to preserve form data on navigation

**Other Product Types (In Progress):**
- Mirage, Rainier, NWS - Similar patterns being developed

## Authentication & Authorization

**Role Hierarchy:**
1. **Client** - Basic access (create orders)
2. **Employee** - Enhanced access
3. **Admin** - Management access
4. **DBA** - Database administration

**Middleware Usage:**
```javascript
// Require any logged-in user
router.get('/orders/create', checkLogin, controller.showCreate);

// Require Employee or higher
router.get('/admin', checkAuth, controller.adminPanel);

// Require Admin or DBA
router.delete('/orders/:id', checkAdmin, controller.deleteOrder);
```

## Important Implementation Details

1. **Development Mode Query Logging:** Database queries logged to console in development mode via wrapper function

2. **SSL Handling:** Conditional SSL configuration based on `NODE_ENV` for local vs production database

3. **Measurement Fields:** Forms use paired integer + fraction inputs that combine server-side into dimensional values

4. **Session-Based Multi-Step Forms:** Form data persists in session between create → confirm → save steps

5. **Dynamic Form Population:** Dropdown options loaded from database at render time (colors, mesh types, adapters, etc.)

6. **Soft Deletes:** Use boolean flags rather than hard deletes to preserve order history

## Current Development State (per Peter.txt)

**Completed:**
- User registration and authentication
- Mirage 3500 complete order flow (create → confirm → save)
- Form validation with error handling
- Dynamic form population from database
- Session-based form data persistence

**In Progress:**
- localStorage persistence improvements
- Account page order listing
- Order editing capabilities
- Additional product forms (Mirage, Rainier, NWS)

**Planned:**
- is_estimate flag set on create (not confirm)
- is_confirmed flag set on final confirmation
- Account page displays all orders with status
- Admin order completion workflow
- Cancel order functionality (admin only)
- Soft delete implementation

## Working with Database Models

**Query Pattern:**
```javascript
// All models use direct pg queries with connection pool
const pool = require('../database/');

async function getData() {
  const sql = "SELECT column FROM table WHERE condition = $1";
  const result = await pool.query(sql, [value]);
  return result.rows;
}
```

**No SELECT * statements:** Always specify columns explicitly (per development notes)

**Transaction Handling:** Multi-table inserts should use transactions (not yet fully implemented)

## File Locations

**Complex Logic:**
- `controllers/ordersController.js` - Multi-step form handling
- `models/ordersModel.js` (745 lines) - Database operations with getOrInsert pattern
- `utilities/ordersValidation.js` (370 lines) - Comprehensive validation rules

**Large Forms:**
- `views/orders/createMirage3500.ejs` (39KB) - Complex product configuration form

**Database Schema:**
- `database/clearviewdb.sql` (1206 lines) - Full PostgreSQL schema

**Development Notes:**
- `Peter.txt` - Current development status and TODO list
