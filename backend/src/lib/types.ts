import { Repository } from "typeorm";
import { User } from "../entity/User.entity";
import { Session } from "../entity/Session.entity";
import { Cart, CartProduct, Order, Product } from "../entity";
import { Category } from "../entity/Category";

export interface Database {
  users: Repository<User>;
  sessions: Repository<Session>;
  products: Repository<Product>;
  orders: Repository<Order>;
  carts: Repository<Cart>;
  cartProduct:Repository<CartProduct>;
  categories:Repository<Category>
}
