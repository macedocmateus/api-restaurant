export default {
    client: "sqlite3",
    connection: {
        filename: "./src/database/database.db",
    },

    // Criando pool para restrição entre as chaves estrangeiras entre as tabelas, para não permitir que adicione dentro de um pedido um produto que não exista.
    pool: {
        afterCreate: (connection: any, done: any) => {
            connection.run("PRAGMA foreign_keys = ON");
            done();
        },
    },

    useNullAsDefault: true,
    migrations: {
        extensions: "ts",
        directory: "./src/database/migrations",
    },
    seeds: {
        extensions: "ts",
        directory: "./src/database/seeds",
    },
};
