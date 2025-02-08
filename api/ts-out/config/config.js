module.exports = {
    "production": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgres",
        "ssl": false, /* TODO: Remove before production */
        "dialectOptions": {
            "ssl": {
                "require": false, /* TODO: Remove before production */
                "rejectUnauthorized": false
            }
        }
    }
};
export {};
