import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger("TaskRepository");
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder("task");

        query.where("task.userId= :userId", { userId: user.id })


        if (status) {
            query.andWhere("task.status = :status", { status: status });
        }
        if (search) {
            query.andWhere("task.title LIKE :search OR task.description LIKE :search", { search: `%${search}%` });

        }
        try {
            const tasks = await query.getMany();
            return tasks;

        } catch (error) {
            this.logger.verbose("Failed to get tasks for user.")
            throw new InternalServerErrorException();
        }
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save()
        delete task.user;

        return task;

    }


}