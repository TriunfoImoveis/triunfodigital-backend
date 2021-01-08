import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import Office from '@modules/organizations/infra/typeorm/entities/Office';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: true})
  avatar: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'date' })
  admission_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @Column({ type: 'varchar', length: 6, nullable: true })
  creci: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(type => Departament, users => User)
  @JoinColumn({ name: 'departament_id' })
  departament: Departament;

  @ManyToOne(type => Subsidiary, users => User, { nullable: true })
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @ManyToOne(type => Office, users => User)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @ManyToMany(type => Sale, sale => sale.sale_has_sellers)
  sales: Sale[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
