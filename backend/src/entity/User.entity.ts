import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToOne, OneToMany } from "typeorm";
import { Session } from "./Session.entity";
import { Order } from "./Order.entity";
import { Cart } from "./Cart.entity";
import { Product } from "./Product.entity";


@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: "enum", enum: ["vendor", "customer", "admin"], default: "customer" })
  role: "vendor" | "customer" | "admin";

  @Column({type:"bool", default:true})
  isActive:boolean;

  @OneToOne(() => Session, session => session.user)
  session: Session

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Product, (product) => product.vendor)
  product: Product[]
}

