import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseGuards,
  Request,
  Req,
  Query,
} from '@nestjs/common';
import { TasksGroupService } from './tasks_group.service';
import { CreateTaskGroupDto } from './dto/create-group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('tasks_group')
export class TasksGroupController {
  constructor(private groupService: TasksGroupService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение групп' })
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'text',
    required: false,
  })
  @Get()
  getGroups(@Query('search') search: string, @Req() request: Request) {
    return this.groupService.getGroups(request, search);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание групп' })
  @Post()
  createGroup(@Body() groupDto: CreateTaskGroupDto, @Req() request: Request) {
    return this.groupService.createGroup(groupDto, request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удаление групп' })
  @Delete(':id')
  deleteGroup(@Param('id') id: string) {
    return this.groupService.deleteGroup(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменение групп' })
  @Patch(':id')
  changeGroup(@Param('id') id: string, @Body() groupDto: CreateTaskGroupDto) {
    return this.groupService.changeGroup(id, groupDto);
  }
}
