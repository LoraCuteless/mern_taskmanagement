import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

const TaskForm = () =>{
    const {dispatch} = useTasksContext()
    const [task_name, setTaskName] = useState('')
    const [task_details,setTaskDetails ] = useState('')
    const [assigned_to, setAssignedTo] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] =useState([])


    const handleSubmit = async (e) =>{
        e.preventDefault()

        const task = {task_name, task_details, assigned_to}

        const response = await fetch('/api/task',{
            method:'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTaskName('')
            setTaskDetails('')
            setAssignedTo('')
            setError(null)
            console.log('new task added', json)
            dispatch({type:'CREATE_TASKS',payload: json})
        }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Task</h3>
        <label>Task Name:</label>
        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          value={task_name}
          className={emptyFields.includes('task_name')?'error':''}
        />

        <label>Task details:</label>
        <textarea
          type="text"
          onChange={(e) => setTaskDetails(e.target.value)}
          value={task_details}
          className={emptyFields.includes('task_details')?'error':''}
        ></textarea>

        <label>Assigned To:</label>
        <input
          type="text"
          onChange={(e) => setAssignedTo(e.target.value)}
          value={assigned_to}
          className={emptyFields.includes('assigned_to')?'error':''}
        />

        <button>Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default TaskForm