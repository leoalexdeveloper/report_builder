import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!:string

  @Index()
  @Column({name: 'uuid', length:36, type: 'varchar', nullable: false})
  uuid!:string

  @Column({name:'name', length:255, type: 'varchar', nullable: false})
  name!:string

  @Column({name:'password', length:60, type: 'varchar', nullable: false})
  password!:string

  @Column({name:'email', length:255, type: 'varchar', nullable: false, unique:true})
  email!:string

  @Column({name:'active', type: 'boolean', default: false, nullable: false})
  active!:boolean

  @Column({name:'activation_code', length:60, type: 'varchar', nullable: false, unique: true})
  activationCode!:string

  @Column({name:'change_password_code', length:60, type: 'varchar', nullable: false, unique: true})
  changePasswordCode!:string | null

  @CreateDateColumn()
  createdAt!:Date

  @UpdateDateColumn()
  updatedAt!:Date | null

  @DeleteDateColumn()
  deletedAt!:Date | null
}
