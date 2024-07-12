import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Student() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
        const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8084/')
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) =>{
        try{
        await axios.delete('http://localhost:8084/student/'+id) 
        window.location.reload(id)
        }catch(err){
           console.log(err);
        }
       }

    function handleSubmit(event) { 
        event.preventDefault();
        axios.post('http://localhost:8084', { name })
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(err => console.log(err));
    }

    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <form class="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit} >
              <div data-mdb-input-init class="form-outline flex-fill">
                <input type="text" id="form3" class="form-control form-control-lg"  onChange={e => setName(e.target.value)} 
                        value={name} />
                <label class="form-label" for="form3">What do you need to do today?</label>
              </div>
              <button type="submit"  class="btn btn-primary btn-lg ms-2">Add +</button>
            </form>

                <table className='table'>
                    
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.Name}</td>
                                
                                <td>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(student.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
