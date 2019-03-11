import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Countries {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column()
  public name: string

  @Column({ name: 'created_at' })
  public createdAt: Date

  @Column({ name: 'updated_at' })
  public updatedAt: Date
}

export default Countries
