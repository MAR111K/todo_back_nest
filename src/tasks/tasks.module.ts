import { Module,forwardRef } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[SequelizeModule.forFeature([Task]), forwardRef(() => AuthModule)],
  exports:[TasksService]
})
export class TasksModule {}
