import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { createHash } from '../utils/common'

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column()
  public email: string

  @Column()
  public password: string

  @Column({ name: 'last_name' })
  public lastName: string

  @Column({ name: 'first_name' })
  public firstName: string

  @Column()
  public address: string

  @Column({ name: 'phone_number' })
  public phoneNumber: number

  @Column()
  public active: boolean

  @Column({ name: 'created_at' })
  public createdAt: Date

  @Column({ name: 'updated_at' })
  public updatedAt: Date

  private tempPassword: string

  @AfterLoad()
  private loadTempPassword(): void {
    if (this.password) {
      this.tempPassword = this.password
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  private async encryptPassword() {
    if (this.tempPassword !== this.password) {
      this.password = await createHash(this.password)
    }
  }
}

export default Users
