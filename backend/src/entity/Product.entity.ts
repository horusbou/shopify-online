import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Cart } from "./Cart.entity";
import { Order } from "./Order.entity";
import { User } from "./User.entity";
import { CartProduct } from "./CartProduct.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({type: "float"})
  price: number;

  @Column()
  amount: number;

  @Column({default:''})
  description:string;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];

  @ManyToOne(() => User, (user) => user.product)
  vendor: User
}

