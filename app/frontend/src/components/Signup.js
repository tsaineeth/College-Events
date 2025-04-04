import React, {useState} from 'react';
import API from "../api";

function Signup() {
    const [formData, setFormData] = useState({username: '', email: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();

        API.post('/auth/signup', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            setMessage(response?.message);
        }).catch(function (error) {
            setMessage(error?.response?.data?.error);
            console.log(error);
        });
    };

    return (<div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow rounded">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Sign Up</h3>
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Username</label>
                                    <input name="username" className="form-control" onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" onChange={handleChange}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control"
                                           onChange={handleChange} required/>
                                </div>
                                <button className="btn btn-primary w-100">Register</button>
                            </form>
                            <p className="mt-3 text-center">
                                Already have an account? <a href="/login">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Signup;
