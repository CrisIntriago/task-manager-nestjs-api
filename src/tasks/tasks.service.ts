import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { UUID, randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {

    private tasks: Task[] = [];



    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById( id:string): Task {
        return this.tasks.find(task => task.id ===id);
        
    }

    createTask(createTaskDto : CreateTaskDto) : Task {

        const {title, description}= createTaskDto;
        const task: Task = {
            id: randomUUID(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

}