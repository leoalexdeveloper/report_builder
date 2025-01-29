import {BaseEntity, Entity, Column, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, PrimaryColumn} from 'typeorm'
import {User} from './User'

@Entity('users_profiles')
export default class Profile extends BaseEntity {

  @Index()
  @OneToOne(() => User)
  @PrimaryColumn()
  id!:string

  @Index()
  @OneToOne(() => User)
  @Column({name: 'uuid', length:36, type: 'varchar', nullable: false})
  uuid!:string

  @Column({name:'first_name', length:255, type: 'varchar', nullable: false})
  firstName!:string

  @Column({name:'last_name', length:255, type: 'varchar', nullable: false})
  lastName!:string

  @Column({name:'phone_number', length:255, type: 'varchar', nullable: false})
  phoneNumber!:string

  @Column({name:'address_street', length:255, type: 'varchar', nullable: false})
  addressStreet!:string

  @Column({name:'address_number', length:255, type: 'varchar', nullable: false})
  addressNumber!:string

  @Column({name:'address_unit', length:255, type: 'varchar', nullable: false})
  addressUnit!:string

  @CreateDateColumn()
  createdAt!:Date

  @UpdateDateColumn()
  updatedAt!:Date

  @DeleteDateColumn()
  deletedAt!:Date
}
