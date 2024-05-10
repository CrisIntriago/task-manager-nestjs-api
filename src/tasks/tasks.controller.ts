import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    @Get("(/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.tasksService.getTaskById()
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto
        ): Task{
            return this.tasksService.createTask(CreateTaskDto)
        }



}