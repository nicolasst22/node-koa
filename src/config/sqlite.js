/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    development: {
        client: 'sqlite3',
        connection: { filename: "./src/db/ecommerce.sqlite"},
        useNullAsDefault: true
      },
      useNullAsDefault: true

}