import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Student() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
        axios.post('http://localhost:8084', { name, email })
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(err => console.log(err));
    }

    
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Enter votre nom' 
                        className='form-control mb-3' 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                    />
                    <input 
                        type="text" 
                        placeholder='Enter votre email' 
                        className='form-control mb-3' 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}
                    />
                    <button className='btn btn-success mb-3'>Add +</button>
                </form>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
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
