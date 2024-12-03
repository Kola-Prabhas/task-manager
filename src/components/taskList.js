

// This component wraps all the Tasks

export default function TaskList({ children }) {
	return (
		<div className=' w-[350px] sm:w-[600px] md:w-[750px] xl:w-[1000px] space-y-8'>
			{children}
		</div>
	)
}