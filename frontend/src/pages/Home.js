import { useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

import TaskForm from "../components/TaskForm"
import TaskDetails from "../components/TaskDetails"

const Home =()=>{
    const {tasks, dispatch} = useTasksContext()
    
    useEffect(()=>{
        const fetchWorks = async ()=>
            {
                const response = await fetch('/api/task')
                const json = await response.json()

                if (response.ok){
                    dispatch({type: 'SET_TASKS', payload: json})
                }
            }
        fetchWorks()
    },[dispatch])

    return(
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task)=>(
                    <TaskDetails key={task._id} task={task}/>
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home