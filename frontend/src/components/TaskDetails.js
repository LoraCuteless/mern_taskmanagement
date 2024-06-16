import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//Date Fns 
//First Install npm install date-fns

import { formatDistanceToNow } from 'date-fns';

const TaskDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const handleClick = async () =>{
        const response = await fetch('/api/workout/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type:'DELETE_WORKOUT', payload: json })
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Task Details: </strong>{workout.load}</p>
            <p><strong>Task Assigned: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>

            <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
        </div>
    )
}

export default TaskDetails