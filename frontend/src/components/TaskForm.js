import { useState } from "react"

const TaskForm = () =>{
    const [title, setTitle] = useState('')
    const [load,setLoad ] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workout',{
            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new task added', json)
        }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Task</h3>
        <label>Task Name:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Assigned:</label>
        <input
          type="text"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>No. of Task:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />

        <button>Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default TaskForm