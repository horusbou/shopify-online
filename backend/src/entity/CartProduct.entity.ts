import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Cart } from "./Cart.entity";
import { Product } from "./Product.entity";

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts, { onDelete: "CASCADE" })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartProducts, { eager: true })
  product: Product;

  @Column({ type: "int", default: 1 })
  quantity: number;
}
