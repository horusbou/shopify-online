import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { User } from "./User.entity";
import { CartProduct } from "./CartProduct.entity";
import { Category } from "./Category";

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

  @ManyToMany(() => Category, (category) => category.products, { cascade: true })
  @JoinTable()
  categories: Category[];
}

