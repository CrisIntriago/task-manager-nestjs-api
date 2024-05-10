import { IsIn, IsOptional, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks.model";


export class GetTasksFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRES,TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}