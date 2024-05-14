import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto : GetTasksFilterDTO) : Promise<Task[]> {
        const {status ,search } = filterDto;
        const query = this.createQueryBuilder("task");

        if(status){
            query.andWhere("task.status = :status", {status : status});
        }
        if(search){
            query.andWhere("task.title LIKE :search OR task.description LIKE :search", {search : `%${search}%`});

        }

        const tasks= await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        await task.save()

        return task;

    }


}