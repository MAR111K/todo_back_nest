import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { TaskGroup } from 'src/tasks_group/tasks_group.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User,TaskGroup]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
