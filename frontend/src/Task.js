import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8084/')
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) =>{
        try{
        await axios.delete('http://localhost:8084/task/'+id) 
        window.location.reload(id)
        }catch(err){
           console.log(err);
        }
       }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8084', { name });
            setTasks([...tasks, res.data]);
            setName('');
        } catch (err) {
            console.log(err);
        }
    };

    const toggleCompleted = async (id, completed) => {
        try {
            await axios.put(`http://localhost:8084/task/${id}`, { completed: !completed });
            setTasks(tasks.map(task => task.ID === id ? { ...task, completed: !task.completed } : task));
        } catch (err) {
            console.log(err);
        }
    }



    const handleChange = (id, completed) => {
        toggleCompleted(id, completed);
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className="container-fluid" style={{ background: "Green", padding: "15px 0", color: "#fafafa" }}>
                    <div className="container">
                        <h5 style={{ color: "#fafafa", marginLeft: "205px" }}>TODO LIST</h5>
                    </div>
                </div>
                <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline flex-fill">
                        <input
                        style={{  marginTop: "30px" }}
                            type="text"
                            id="form3"
                            className="form-control form-control-lg"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <label className="form-label" htmlFor="form3">What do you need to do today?</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg ms-2">Add +</button>
                </form>
                <table className='table'>
                    <tbody>
                    {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleChange(task.ID, task.completed)}
                                        
                                    />
                                </td>
                                {task.completed ? <s>{task.Name}</s> : task.Name}                                <td>
                                    <button
                                        style={{ color: "red", cursor: "pointer" }}
                                        className="fa-solid fa-trash-can"
                                        onClick={() => handleDelete(task.ID)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Task;
