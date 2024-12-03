import { createSlice } from '@reduxjs/toolkit';


// using taskId in state to create unique ID's for tasks rather than using array indexes for better performance

const initialState = {
	tasks: [],
	taskId: 0,
	status: 'idle'
};



const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {	
		addTask: (state, task) => {
			state.tasks.push({ id: state.taskId, title: task.payload, completed: false });
			state.taskId += 1;
		},

		setTasks: (state, tasks) => {
			state.tasks = tasks.payload;

			// when we run the app in localhost the taskId value will be reset to 0
			// so there may be a task with id 0 and adding subsequent tasks also creates duplicate id's
			// so we set the value of taskId to be 1 greater than maxId of tasks to create unique id's

			let maxId = 0;

			state.tasks.forEach(task => {
				if (task.id > maxId) maxId = task.id + 1;
			})


			state.taskId = maxId;
		},

		deleteTask: (state, taskId) => { 
			state.tasks = state.tasks.filter(task => task.id !== taskId.payload);
			console.log('state.tasks ', state.tasks);
		},

		updateTask: (state, taskInfo) => {
			const currentTask = state.tasks.find(task => task.id === taskInfo.payload.taskId);
			currentTask.title = taskInfo.payload.task;
		},

		toggleTaskComplete: (state, taskId) => {
			const currentTask = state.tasks.find(task => task.id === taskId.payload);
			currentTask.completed = !currentTask.completed;
		},
	}
});



export const { addTask, deleteTask, toggleTaskComplete, setTasks, updateTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
export const selectTasks = state => state.task.tasks;