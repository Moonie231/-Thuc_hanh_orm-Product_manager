import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    username: "root",
    password: "1234",
    database: "dbtest",
    synchronize: false,
    logging: false,
    entities: ["dist/src/entity/*.js"],
    migrations: ["dist/src/migrations/*.js"],
})