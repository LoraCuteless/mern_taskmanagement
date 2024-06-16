import { useTasksContext } from "../hooks/useTasksContext"

//Date Fns 
//First Install npm install date-fns

import { formatDistanceToNow } from 'date-fns';

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()
    const handleDelete = async () =>{
        const response = await fetch('/api/task/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type:'DELETE_TASKS', payload: json })
        }
    }

    const handleUpdate = async () =>{
        const response = await fetch('/api/task/' + task._id, {
            method: 'PATCH'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type:'UPDATE_TASKS', payload: json })
        }
    }
    return (
        <div className="task-details">
            <h4>{task.task_name}</h4>
            <p><strong>Task Details: </strong>{task.task_details}</p>
            <p><strong>Task Assigned: </strong>{task.assigned_to}</p>
            <p>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true})}</p>
            <button className='material-symbols-outlined' onClick={handleDelete} type='button' id='delete_button'>Delete</button>
            <button className='material-symbols-rounded' onClick={handleUpdate}type='button' id='edit_button'>Edit</button>
        </div>
    )
}

export default TaskDetails