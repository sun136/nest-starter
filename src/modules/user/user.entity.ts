import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('as_user')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar', length: 20, comment: '账号', unique: true })
  account: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 32, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 16, comment: '昵称' })
  nickname: string;
}
