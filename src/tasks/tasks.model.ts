import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TaskAttrs {
  text: string;
}

@Table({ tableName: 'tasks', updatedAt: false })
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
}
