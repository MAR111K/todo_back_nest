import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение всех вопросов' })
  @Get()
  getTask(@Req() request: Request) {
    return this.tasksService.getTasks(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание вопроса' })
  @Post()
  createTask(@Body() taskDto: CreateTaskDto, @Req() request: Request) {
    return this.tasksService.createTask(taskDto, request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удаление вопроса' })
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение вопроса' })
  @Patch(':id')
  changeTask(@Param('id') id: string, @Body() taskDto: CreateTaskDto) {
    return this.tasksService.changeTask(id, taskDto);
  }
}
