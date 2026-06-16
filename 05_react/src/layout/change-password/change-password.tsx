import { useState, type MouseEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/change-password.css'

export default function ChangePassword() {
    const [infoPanel, setInfoPanel] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    async function handleChangePasswordButton(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/users/change-password', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });
        const data = await response.json();
        console.log(data);
        setInfoPanel(data.message);
    }

    return (
        <main className="change-pass">
            <section className="card">
                <h1>Reset</h1>
                <br></br>
                <h1>Password</h1>
                <form>
                    <div>
                        <label>Email: </label>
                        <input onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type='password' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Confirm password: </label>
                        <input type='password' onChange={e => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <button onClick={e => handleChangePasswordButton(e)}>Change Password</button>
                </form>
                <label>{infoPanel}</label>
                <label>Return to <Link to='/login'>log in</Link> page</label>
            </section>
        </main>
    );
}