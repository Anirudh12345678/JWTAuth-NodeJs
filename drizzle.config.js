export default({
    schema: './db/schema.js',
    out: 'drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
      host: "localhost",
      user: "postgres",
      password: "123",
      database: "drizzle_db",
    },
  });