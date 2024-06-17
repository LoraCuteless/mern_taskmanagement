import { useState,useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

const TaskUpdateForm = ({task, onClose}) =>{
    const {dispatch} = useTasksContext()
    const [task_name, setTaskName] = useState('')
    const [task_details,setTaskDetails ] = useState('')
    const [assigned_to, setAssignedTo] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] =useState([])

    // Use useEffect to populate form fields when task changes
    useEffect(() => {
      if (task) {
        setTaskName(task.task_name || ""); // Populate task_name with task.task_name if available
        setTaskDetails(task.task_details || ""); // Populate task_details with task.task_details if available
        setAssignedTo(task.assigned_to || ""); // Populate assigned_to with task.assigned_to if available
        setDeadline(task.deadline || ""); // Populate assigned_to with task.assigned_to if available
      }
    }, [task]); // Dependency array ensures useEffect runs when task prop changes

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const updateTask = {task_name, task_details, assigned_to, deadline}

        const response = await fetch('/api/task/'+ task._id,{
            method:'PATCH',
            body: JSON.stringify(updateTask),
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
            setDeadline('')
            setError(null)
            console.log('new task added', json)
            dispatch({type:'UPDATE_TASKS',payload: json})
            onClose()
        }
    }

    const handleCancel = () => {
      // Reset form fields or perform any other necessary actions
      setTaskName("")
      setTaskDetails("")
      setAssignedTo("")
      setDeadline("")

      setError(null)
      onClose() // Close the form
    };

    return (
      <form className="update" onSubmit={handleSubmit}>
        <h3>Update Task</h3>
        <label>Task Name:</label>
        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          value={task_name}
          className={emptyFields.includes('task_name')?'error':''}
        />

        <label>Task details:</label>
        <textarea id="task_details"
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

        <label>Deadline:</label>
        <input
          type="date"
          onChange={(e) => setDeadline(e.target.value)}
          value={deadline}
          className={emptyFields.includes('deadline')?'error':''}
        />

        <div id="container_button">
          <button type='submit'>Update Task</button>
          <button type='button' id="cancelTask" onClick={handleCancel}>Cancel</button>
        </div>
        
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default TaskUpdateForm