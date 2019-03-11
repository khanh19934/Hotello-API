import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Cities {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column()
  public name: string

  @Column({ name: 'country_id' })
  public countryId: number

  @Column({ name: 'created_at' })
  public createdAt: Date

  @Column({ name: 'updated_at' })
  public updatedAt: Date
}

export default Cities
