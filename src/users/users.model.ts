import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { TaskGroup } from 'src/tasks_group/tasks_group.model';

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

  @HasMany(() => TaskGroup)
  tasks_group: TaskGroup[];
}
