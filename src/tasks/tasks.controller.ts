import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  createTasks(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }
}
