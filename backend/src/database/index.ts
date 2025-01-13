import { User, Session, Product, Order, Cart, CartProduct } from "../entity";
import { DataSource } from "typeorm";
import { Database } from "../lib/types";
import { Category } from "../entity/Category";

const user = process.env.DB_USER;
const userPassword = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || '5432');

 console.log({
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER, 
   userPassword: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
 });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username: user,
  password: userPassword,
  database,
  synchronize: false,
  logging: true,
  entities: [User, Session, Product, Order, Cart,CartProduct,Category],
  subscribers: [],
  migrations: ["src/migration/**/*.ts"],
});

const db: Database = {
  users: AppDataSource.getRepository(User),
  sessions: AppDataSource.getRepository(Session),
  products: AppDataSource.getRepository(Product),
  cartProduct:AppDataSource.getRepository(CartProduct),
  carts: AppDataSource.getRepository(Cart),
  orders: AppDataSource.getRepository(Order),
  categories: AppDataSource.getRepository(Category)
};

export default db;
