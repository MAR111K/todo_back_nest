import { Module, forwardRef } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TaskGroup } from 'src/tasks_group/tasks_group.model';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task, TaskGroup]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
