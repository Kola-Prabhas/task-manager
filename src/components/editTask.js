import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { updateTask } from '../store/taskSlice';


// A component for editing the existing tasks a variant of TaskInput it uses MaterialUI modal for modal window

export default function EditTask({ open, handleClose, taskTitle, taskId }) {
	const [task, setTask] = useState('');
	const dispatch = useDispatch();


	function handleChange(e) {
		setTask(e.target.value);
	}


	function handleSubmit(e) {
		e.preventDefault();
		console.log('task ', task);
		dispatch(updateTask({ taskId, task }));
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
				className='w-[45%] min-w-[300px] mx-auto bg-gray-100 py-8 px-8 rounded '
				onSubmit={handleSubmit}
			>
				<h2 className='text-center font-semibold text-4xl mb-8'>Create a Task</h2>

				<label htmlFor='task' className='block text-[24px] font-medium'>Task</label>
				<textarea
					className='outline-0 h-[250px] w-full lg:w-[80%] px-2 rounded-md border border-gray-300 focus:border-blue-400 text-[24px] font-medium'
					type='text'
					id='task'
					autoFocus
					value={task || taskTitle}
					onChange={(e) => handleChange(e)}
				></textarea>


				<div className='flex mt-8 justify-end gap-4'>
					<button
						className='bg-blue-600 text-white text-[16px] font-semibold px-4 py-2 rounded-md'
						disabled={task === ''}
					>Update</button>
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