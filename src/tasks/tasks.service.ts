import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { TaskGroup } from 'src/tasks_group/tasks_group.model';

@Injectable()
export class TasksService {
  constructor(
    private userService: UsersService,
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(TaskGroup) private tasksGroupRepository: typeof TaskGroup,
  ) {}

  async createTask(dto: CreateTaskDto, request: Request) {
    const creator = await this.userService.getUserByToken(request);

    const chechGroup = await this.tasksGroupRepository.findOne({
      where: { id: dto.group_id },
    });

    if (chechGroup) {
      const task = await this.taskRepository.create({ ...dto, creator });
      return task;
    } else {
      throw new HttpException('Такой группы нет', HttpStatus.BAD_REQUEST);
    }
  }

  async getTasks(request: Request) {
    const creator = await this.userService.getUserByToken(request);
    const tasks = await this.taskRepository.findAll({
      where: {
        creator,
      },
    });
    return tasks;
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (task) {
      await this.taskRepository.destroy({
        where: {
          id,
        },
      });
    } else {
      throw new HttpException('Такой задачи нет', HttpStatus.BAD_REQUEST);
    }
  }

  async changeTask(id: string, newTask: CreateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (task) {
      await this.taskRepository.update(
        { ...newTask },
        {
          where: {
            id,
          },
        },
      );
    } else {
      throw new HttpException('Такой задачи нет', HttpStatus.BAD_REQUEST);
    }
  }
}
