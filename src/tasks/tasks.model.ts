import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TaskGroup } from 'src/tasks_group/tasks_group.model';

interface TaskAttrs {
  text: string;
  creator: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  checked: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  creator: number;

  @ForeignKey(() => TaskGroup)
  @Column({ type: DataType.INTEGER, allowNull: false })
  group_id: number;

  @BelongsTo(() => TaskGroup)
  group: TaskGroup;
}
