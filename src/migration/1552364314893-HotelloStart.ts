import { MigrationInterface, QueryRunner } from 'typeorm'

export class HotelloStart1552364314893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await Promise.all([
      queryRunner.query(`use hotello`),
      queryRunner.query(`
    create table countries (
		id INT AUTO_INCREMENT  PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
)
    `),
      queryRunner.query(`create table cities (
        id INT AUTO_INCREMENT  PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        foreign key (country_id) references countries(id) ON DELETE CASCADE
    )`),
      queryRunner.query(`
      create table districts (
        id INT AUTO_INCREMENT  PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        foreign key (city_id) references cities(id) ON DELETE CASCADE
    )
      `),
      queryRunner.query(`
      create table users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        country_id INT NOT NULL,
        city_id INT NOT NULL,
        district_id INT NOT NULL ,
        is_active BOOLEAN not null default 0,
        role VARCHAR(100),
        hotel_id INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        foreign key (country_id) references countries(id) ON DELETE CASCADE,
        foreign key (city_id) references cities(id) ON DELETE CASCADE,
        foreign key (district_id) references districts(id) ON DELETE CASCADE
    )
      `),
      queryRunner.query(`ALTER TABLE 'users' AUTO_INCREMENT = 800000`),
      queryRunner.query(`ALTER TABLE 'districts' AUTO_INCREMENT = 60000`),
      queryRunner.query(`ALTER TABLE 'cities' AUTO_INCREMENT = 70000`),
      queryRunner.query(`ALTER TABLE 'countries' AUTO_INCREMENT = 80000`)
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users')
    await queryRunner.dropTable('countries')
    await queryRunner.dropTable('cities')
    await queryRunner.dropTable('districts')
  }
}
