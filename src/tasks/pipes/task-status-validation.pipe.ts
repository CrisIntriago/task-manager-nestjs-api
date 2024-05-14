import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    
    //cannot be modified in runtime
    readonly allowedStatuses= [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRES,
        TaskStatus.DONE,
    ]  

    transform(value: any){
              
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalidad status`);
        }
        return value;

    }

    private isStatusValid(status: any){

        const idx= this.allowedStatuses.indexOf(status);
        return idx!== -1;
    }
}