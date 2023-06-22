import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';
import { User } from 'src/users/users.model';

interface TaskGroupAttrs {
  title: string;
  creator: number;
}

@Table({ tableName: 'groups' })
export class TaskGroup extends Model<TaskGroup, TaskGroupAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  creator: number;

  @HasMany(() => Task)
  tasks: Task[];

  @BelongsTo(() => User)
  user: User;
}
