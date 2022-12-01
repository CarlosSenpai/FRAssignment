import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'

const Register = (props) => {
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: ""
    });

    const [dataOccupation, setDataOccupation]  = useState([]);

    const [dataState, setDataState] = useState([]);

    const [confirmReg, setConfirmReg] = useState("");


    useEffect(() => {
        axios.get(`https://frontend-take-home.fetchrewards.com/form`).then((res) => {
            setDataOccupation(res.data.occupations);
            setDataState(res.data.states);
        }).catch((err)=>console.log(err))
    }, [])

    const handleChange = (e) => {
        setUser ({
            ...user,[e.target.name]: e.target.value
        });
        setConfirmReg("");
    };

    const register = (e) => {
            e.preventDefault();
            axios.post('https://frontend-take-home.fetchrewards.com/form', user).then( (res) => {
            setUser({
                    name: "",
                    email: "",
                    password: "",
                    occupation: "",
                    state: ""
                })
            console.log(res.status);
            setConfirmReg("Thank you for registering!");
            })
            .catch((err) => {
                console.log(err)
            setConfirmReg("")
            })
        }

    
    return(
    <>

<section>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </section>
        

    <form onSubmit={register} id="form">

        <div className="mb-3">
            <label className='label'> Full Name: </label>
            <input value={user.name} type="text" name="name" onChange={(e) => handleChange(e)} required class="form-control"  />
        </div>

        <div className="mb-3">
            <label class="label" > Email: </label>
            <input value={user.email}type="text" name="email" onChange={(e) => handleChange(e)} required class="form-control" />
        </div>

        <div className="mb-3">
            <label class="label"> Password: </label>
            <input value={user.password}type="password" name="password" onChange={(e) => handleChange(e)} required class="form-control" />
        </div>

        <div className="mb-3">
            <label class="label"> Occupation: </label>
            <select value={user.occupation} name="occupation" onChange={(e) => handleChange(e)} required class="form-control" >
                <option></option>
                {
                    dataOccupation.map((dataOccupation, index) => (
                        <option key={index} value={dataOccupation}>{dataOccupation}</option>
                    ))
                }
            </select>
        </div>

        <div className="mb-3">
            <label class="label"> State: </label>
            <select value={user.state} name="state" onChange={(e) => handleChange(e)} required class="form-control" >
                <option></option>
                {
                    dataState.map((dataState, index) => (
                        <option key={index} value={dataState.name}>{dataState.name}</option>
                    ))
                }
            </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

    </form>

        {confirmReg ? <h4 id="confirmation">{confirmReg}</h4> : null}
        
    </>

)
}

export default Register;