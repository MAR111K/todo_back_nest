import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttrs {
  username: string;
  password: string;
}

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, UserAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
