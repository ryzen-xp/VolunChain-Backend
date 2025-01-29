# Testing with SQLite

This project supports PostgreSQL (for production) and SQLite (for testing). This guide explains how to set up and use SQLite as an alternative database for testing, allowing developers to run tests without requiring a full PostgreSQL instance, simplifying the setup process for contributors.

## Database Configuration

The application supports two database types configured via the `DB_TYPE` environment variable:

- `postgres` for PostgreSQL (default)
- `sqlite` for SQLite (testing)

### Environment Setup

During testing, change the DB_TYPE environment variable from `postgres` to `sqlite`. This will reconfigure the TypeORM AppDataSource object to use SQLite and setup a transient, lightweight database for running tests.

### Steps

1. Follow the instructions in the respository [README.md](./readme.md) to clone the repository, start Docker, and create your contribution branch.

2. Ensure all dependencies are installed by runnning this command:

    ```bash
    npm install
    ```

3. **For Testing**: Create a new `.env.test` file in the project's root directory and add this variable:

    ```env
    DB_TYPE=sqlite
    ```

4. **For Development**: Edit the `.env` file in the root folder of the directory to confirm full functionality of your PostgreSQL database before pushing to production:

    ```env
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=volunchain
    DB_PASSWORD=volunchain123
    DB_NAME=volunchain
    ```

## Running Tests

### Quick Start

After writing test scripts in the `tests` folder, run them using SQLite with the  command: `npm test` or `npm run test`.

### Benefits of SQLite Testing

- No additional database setup required
- Uses an in-memory database (`:memory:`), ensuring fast execution
- Ideal for CI/CD pipelines

### Benefits of using .env.test

- Isolation: Test configurations don’t interfere with development or production.
- Reproducibility: Ensures tests run with the same configuration every time.
- Security: Avoids using production credentials in tests.
- Flexibility: Easily switch between environments by loading the appropriate .env file.

## Database Migrations

Migrations should be database-agnostic to support both PostgreSQL and SQLite.

## Troubleshooting

### Common Issues & Fixes

1. **SQLite Issues**
   - Ensure write permissions in the project directory
   - Verify `node_modules` is installed
   - Check if `sqlite3` package is installed:

     ```bash
     npm install sqlite3 --save-dev
     ```

2. **PostgreSQL Connection Issues**
   - Ensure PostgreSQL service is running
   - Verify database credentials in `.env`
   - Check if the database exists or create a new one in `psql` shell

3. **Database Inconsistencies**

   - Ensure migrations do not use raw SQL specific to PostgreSQL
   - Use TypeORM’s schema API for compatibility across databases
   - Verify table constraints are supported in SQLite

### Notes

- Migrations: All migrations must use TypeORM’s schema API (e.g., queryRunner.createTable) instead of raw SQL to ensure compatibility with SQLite.

- In-Memory Database: SQLite uses an in-memory database (:memory:) during tests, so no additional setup is required.

- PostgreSQL-Specific Features: Avoid using PostgreSQL-specific features (e.g., jsonb, uuid) in migrations or queries if you plan to support SQLite.

### Development Best Practices

- Write tests for both SQLite and PostgreSQL
- Keep migrations database-agnostic using TypeORM’s schema API
- Test both configurations before submitting pull requests

### Need Help?

If you encounter issues:

1. Check error messages for hints
2. Verify environment variables are set correctly
3. Ensure dependencies are installed
4. Check official documentation
5. Open an issue with detailed reproduction steps
