import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('session')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  session_id: string;

  @OneToOne(() => User, user => user.session)
  @JoinColumn({ name: 'id' })
  user: User


  @Column({ type: 'boolean', nullable: false, default: true })
  valid: boolean

  @Column()
  userAgent: string

}
