import { TaskModel } from 'src/app/model/task.model';
import { createReducer, on } from '@ngrx/store';
import { TaskActions } from '../actions/task.action';
import { TaskState } from '../states/task.state';

let initialState: TaskState = {
  task: null,
  tasks: [],
  inProcess: false,
  isLoading: false,
  error: '',
};

export const TaskReducer = createReducer(
  initialState,
  on(TaskActions.getAllForUser, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      tasks: [],
      isLoading: true,
      error: '',
    };
  }),
  on(TaskActions.getAllForUserSuccess, (state, { tasks, type }) => {
    console.log(type);
    return {
      ...state,
      tasks: tasks,
      isLoading: false,
    };
  }),
  on(TaskActions.getAllForUserFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      tasks: [],
      isLoading: false,
      error: error,
    };
  }),
  on(TaskActions.create, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      task: null,
      inProcess: true,
      error: '',
    };
  }),
  on(TaskActions.createSuccess, (state, { task }) => {
    // let tasks = [...state.tasks!];
    // tasks.push(task);
    console.log(task);

    return {
      ...state,
      tasks: [...state.tasks, task],
      inProcess: false,
    };
  }),
  on(TaskActions.createFail, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(TaskActions.delete, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: true,
      error: '',
    };
  }),
  on(TaskActions.deleteSuccess, (state, { task, type }) => {
    console.log(type);
    // let tasks = [...state.tasks!];
    // let temp: any = [];
    // tasks.forEach((task) => {
    //   if (task.taskId === task.taskId) {
    //     temp.push(task);
    //     return;
    //   }
    //   temp.push(task);
    // });
    return {
      ...state,
      inProcess: false,
    };
  }),
  on(TaskActions.deleteFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(TaskActions.update, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: true,
      error: '',
    };
  }),
  on(TaskActions.updateSuccess, (state, { task, type }) => {
    console.log(type);
    // let tasks = [...state.tasks!];
    // let temp: any = [];
    // tasks.forEach((task) => {
    //   if (task.taskId === task.taskId) {
    //     temp.push(task);
    //     return;
    //   }
    //   temp.push(task);
    // });
    return {
      ...state,
      inProcess: false,
    };
  }),
  on(TaskActions.updateFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      inProcess: false,
      error: error,
    };
  }),
  on(TaskActions.get, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  }),
  on(TaskActions.getSuccess, (state, { task, type }) => {
    console.log(type);
    return {
      ...state,
      task: task,
      isLoading: false,
    };
  }),
  on(TaskActions.getFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  //get all task by project id
  on(TaskActions.getAllByProjectId, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      tasks: [],
      isLoading: true,
      error: '',
    };
  }),
  on(TaskActions.getAllByProjectIdSuccess, (state, { tasks, type }) => {
    console.log(type);
    return {
      ...state,
      tasks: tasks,
      isLoading: false,
    };
  }),
  on(TaskActions.getAllByProjectIdFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  })
);
