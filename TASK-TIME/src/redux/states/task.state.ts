import { TaskModel } from "src/app/model/task.model";

export interface TaskState {
  task: TaskModel | null,
  tasks: TaskModel[],
  inProcess: boolean,
  isLoading: boolean,
  error: string
}
