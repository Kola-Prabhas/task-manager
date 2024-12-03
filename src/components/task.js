import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete } from '../store/taskSlice';
import EditTask from './editTask';


// This component represents the individual task

export default function Task({ title, taskId, completed }) {
	const [openTaskEditor, setOpenTaskEditor] = useState(false);

	const dispatch = useDispatch();

	// using closures for concise syntax
	
	const toggleCompleted = (taskId) => () => {
		dispatch(toggleTaskComplete(taskId));
	};


	const handleDelete = (taskId) => () => {
		dispatch(deleteTask(taskId))
	};

	const handleClose = () => setOpenTaskEditor(false);

	const handleEdit = () => {
		setOpenTaskEditor(true);
	};



	return (
		<div className=" px-6 py-4 text-[20px] font-medium border border-gray-300 rounded-lg hover:border-blue-700 space-y-8">
			<p className={`${completed && 'line-through text-gray-400'}`}>{title}</p>

			<div className='flex items-center justify-end space-x-4'>
				<button
					className='bg-blue-400 hover:bg-blue-600 text-white text-[16px] font-semibold px-4 py-2 rounded-2xl mr-auto'
					onClick={toggleCompleted(taskId)}
				>
					Mark as {completed ? 'pending' : 'completed'}
				</button>
				<button
					className='bg-gray-600  hover:bg-gray-800 text-white text-[16px] font-semibold px-4 py-2 rounded-2xl'
					onClick={handleEdit}
				>
					Edit
				</button>
				<button
					className='bg-red-400 hover:bg-red-600 text-white text-[16px] font-semibold px-4 py-2 rounded-2xl'
					onClick={handleDelete(taskId)}
				>
					Delete
				</button>

			</div>

			<EditTask open={openTaskEditor} handleClose={handleClose} taskTitle={title} taskId={taskId} />
		</div>
	);

}