import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, selectTasks } from './store/taskSlice';
import Task from './components/task';
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';

function App() {
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('All');
	const tasks = useSelector(selectTasks);
	const dispatch = useDispatch();



	function handleClose() {
		setOpen(false);
	}

	function handleFilter(e) {
		setFilter(e.target.value);
	}


	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks'));

		// This sets the tasks stored in the localStorage to state during the first render

		if (storedTasks && !tasks.length) {
			dispatch(setTasks(storedTasks));
		}

	}, []);


	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});



	// filteredTasks represents the tasks obtained after applying filter like completed, pending, all etc.

	let filteredTasks = [];


	if (filter === 'Completed') {
		filteredTasks = tasks?.filter(task => task.completed)?.map(task => {
			return (
				<Task title={task.title} key={task.id} completed={task.completed} taskId={task.id} />
			);
		})

	} else if (filter === 'Pending') {
		filteredTasks = tasks?.filter(task => !task.completed)?.map(task => {
			return (
				<Task title={task.title} key={task.id} completed={task.completed} taskId={task.id} />
			);
		})

	} else {
		filteredTasks = tasks?.map(task => {
			return <Task title={task.title} key={task.id} completed={task.completed} taskId={task.id} />
		})
	}




	return (
		<div className='w-full min-h-screen bg-gradient-to-r from-[#FFFEFF] to-[#D7FFFE] flex flex-col items-center'>
			<h1 className='text-[#333333] text-[30px] font-semibold text-center mt-8'>To-Do App</h1>

			<div className='flex justify-between items-center my-8  w-[350px] sm:w-[600px] md:w-[750px] xl:w-[1000px]'>
				<button
					className='bg-blue-600 text-white text-[16px] font-semibold px-4 py-2 rounded-md'
					onClick={() => setOpen(true)}
				>
					Add Task
				</button>

				<select
					className='h-[30px] px-4 py-1 text-[18px] font-semibold rounded-md'
					onChange={(e) => handleFilter(e)}

				>
					<option value='All'>All</option>
					<option value='Completed'>Completed</option>
					<option value='Pending'>Pending</option>
				</select>

			</div>

			<TaskInput open={open} handleClose={handleClose} />
			<TaskList>
				{
					filteredTasks.length ? filteredTasks : <p className='text-xl text-center font-semibold'>No tasks... create one</p>
				}
			</TaskList>
		</div>
	);
}


export default App;