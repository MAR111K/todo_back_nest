import { Module, forwardRef } from '@nestjs/common';
import { TasksGroupController } from './tasks_group.controller';
import { TasksGroupService } from './tasks_group.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskGroup } from './tasks_group.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Task } from 'src/tasks/tasks.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [TasksGroupController],
  providers: [TasksGroupService],
  imports: [
    SequelizeModule.forFeature([TaskGroup,Task,User]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
})
export class TasksGroupModule {}
