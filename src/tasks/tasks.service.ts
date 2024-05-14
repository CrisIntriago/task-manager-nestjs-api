import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID, randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }


    async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {

        const found = await this.taskRepository.findOne({ where: { id , userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        }
        return found;

    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);

    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);
        if (task.affected === 0) {
            throw new NotFoundException(`Task with id: ${id} not found`);
        };

    }
/*
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;

    }
*/
}
