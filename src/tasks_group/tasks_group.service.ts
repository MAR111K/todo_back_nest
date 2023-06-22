import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskGroup } from './tasks_group.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskGroupDto } from './dto/create-group.dto';
import { UsersService } from 'src/users/users.service';
import { Task } from 'src/tasks/tasks.model';
import { Op } from 'sequelize';

@Injectable()
export class TasksGroupService {
  constructor(
    private userService: UsersService,
    @InjectModel(TaskGroup) private taskGroupRepository: typeof TaskGroup,
  ) {}

  async getFiltersTaskGroups(request: Request, search: string) {
    const creator = await this.userService.getUserByToken(request);
    const groups = await this.taskGroupRepository.findAll({
      include: [
        {
          model: Task,
          where: { text: { [Op.like]: `%${search}%` } },
        },
      ],
      where: { creator },
    });
    return groups;
  }

  async getGroups(request: Request, search: string) {
    const creator = await this.userService.getUserByToken(request);

    if (search === undefined) {
      const groups = await this.taskGroupRepository.findAll({
        include: [Task],
        where: { creator },
      });
      return groups;
    } else {
      const groups = await this.getFiltersTaskGroups(request, search);
      return groups;
    }
  }

  async createGroup(dto: CreateTaskGroupDto, request: Request) {
    const creator = await this.userService.getUserByToken(request);
    const group = await this.taskGroupRepository.create({ ...dto, creator });
    return group;
  }

  async deleteGroup(id: string) {
    const group = await this.taskGroupRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (group) {
      await this.taskGroupRepository.destroy({
        where: {
          id,
        },
      });
    } else {
      throw new HttpException('Такой задачи нет', HttpStatus.BAD_REQUEST);
    }
  }

  async changeGroup(id: string, newGroup: CreateTaskGroupDto) {
    const group = await this.taskGroupRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (group) {
      await this.taskGroupRepository.update(
        { ...newGroup },
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
