import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "auth",
  synchronize: true,
  logging: true,
  entities: ['./dist/Database/Entities/**/*.js'],
  subscribers: [],
  migrations: [],
})

export const InitializingDatabase = async () => {
  return await AppDataSource.initialize().then(() => true).catch(err => {console.log(err); return false})
}
