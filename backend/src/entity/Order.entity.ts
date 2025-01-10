import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Cart } from "./Cart.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: ["pending", "success", "removed"], default: "pending" })
  status: "pending" | "success" | "removed";

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Cart, { cascade: true, eager: true })
  @JoinColumn()
  cart: Cart;
}

