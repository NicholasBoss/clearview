const pool = require('./index');

async function runMigration() {
    try {
        console.log('Starting migration...');
        
        const queries = [
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS pivot_pro_color_id INT`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS top_adapter_color_id INT`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS top_adapter_width VARCHAR(50)`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS unit_height VARCHAR(50)`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS pivot_pro_height VARCHAR(50)`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS bottom_adapter_width VARCHAR(50)`,
            `ALTER TABLE general_retract_control ADD COLUMN IF NOT EXISTS opening_height VARCHAR(50)`
        ];

        for (const query of queries) {
            console.log(`Executing: ${query}`);
            await pool.query(query);
        }

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
