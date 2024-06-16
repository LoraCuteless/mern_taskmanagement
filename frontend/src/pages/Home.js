import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

import TaskForm from "../components/TaskForm"
import TaskDetails from "../components/TaskDetails"

const Home =()=>{
    const {workouts, dispatch} = useWorkoutsContext()
    
    useEffect(()=>{
        const fetchWorks = async ()=>
            {
                const response = await fetch('/api/workout')
                const json = await response.json()

                if (response.ok){
                    dispatch({type: 'SET_WORKOUTS', payload: json})
                }
            }
        fetchWorks()
    },[dispatch])

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <TaskDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home