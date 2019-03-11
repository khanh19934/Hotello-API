import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Districts {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column()
  public name: string

  @Column({ name: 'city_id' })
  public cityId: number

  @Column({ name: 'created_at' })
  public createdAt: Date

  @Column({ name: 'updated_at' })
  public updatedAt: Date
}

export default Districts
