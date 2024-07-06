import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8084/')
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <button className='btn btn-success mb-3'>Add +</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
