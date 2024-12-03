import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { addTask } from '../store/taskSlice';


// This component is used to add new tasks. It uses MateriaUI modal for modal window

export default function TaskInput({ open, handleClose }) {
	const [task, setTask] = useState('');
	const dispatch = useDispatch();


	function handleChange(e) {
		setTask(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		dispatch(addTask(task));
		handleClose();
		setTask('');
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			className='flex items-center justify-center'

		>
			<form
				className='w-[80%] min-w-[300px] max-w-[900px] mx-auto bg-gray-100 py-8 px-8 rounded '
				onSubmit={handleSubmit}
			>
				<h2 className='text-center font-semibold text-4xl mb-8'>Create a Task</h2>

				<label htmlFor='task' className='block text-[24px] font-medium'>Task</label>
				<textarea
					className='outline-0 h-[250px] w-full lg:w-[80%] px-2 rounded-md border border-gray-300 focus:border-blue-400 text-[20px] sm:text-[24px] font-medium'
					type='text'
					id='task'
					autoFocus
					value={task}
					onChange={(e) => handleChange(e)}
				></textarea>


				<div className='flex mt-8 justify-end gap-4'>
					<button
						className='bg-blue-600 text-white text-[16px] font-semibold px-4 py-2 rounded-md'
					>Add</button>
					<button
						type='button'
						className='bg-gray-300 text-[#333333] text-[16px] font-semibold px-4 py-2 rounded-md'
						onClick={handleClose}
					>Cancel</button>
				</div>
			</form>
		</Modal>

	);
}