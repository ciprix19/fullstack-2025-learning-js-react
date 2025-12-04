import { useState, type MouseEvent } from 'react';
import './styles/login.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [infoPanel, setInfoPanel] = useState<string>('');
    const navigate = useNavigate();

    async function handleLogInButton(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) setInfoPanel(data.message);
        else {
            navigate('/');
        }
    }

    return (
        <main className='login'>
            <section className='card'>
                <h1>Log In</h1>
                <form>
                    <div>
                        <label>Email: </label>
                        <input onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type='password' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button onClick={e => handleLogInButton(e)}>Sign In</button>
                </form>
                <label>{infoPanel}</label>
                <label>Don't have an account yet? <Link to='/signup'>Sign up here</Link></label>
                <br></br>
                <label><Link to='/change-password'>Forgot your password?</Link></label>
            </section>
        </main>
    );
}