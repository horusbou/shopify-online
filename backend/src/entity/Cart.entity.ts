import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column, OneToMany } from "typeorm";
import { User } from "./User.entity";
import { CartProduct } from "./CartProduct.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @Column({ type: "enum", enum: ["active", "inactive", "under_review","accepted"], default: "active" })
  status: "active"|"inactive"|"under_review"|"accepted";

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, { cascade: true })
  cartProducts: CartProduct[];

}

