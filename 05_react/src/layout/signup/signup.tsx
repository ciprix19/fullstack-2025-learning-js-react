import { useState, type MouseEvent } from 'react';
import './styles/signup.css';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [infoPanel, setInfoPanel] = useState<string>('');

    async function handleSignUpButton(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword
            })
        });
        const data = await response.json();
        console.log(data);
        setInfoPanel(data.message);
    }

    return (
        <main className='signup'>
            <section className='card'>
                <h1>Sign up</h1>
                <form>
                    <div>
                        <label>Email: </label>
                        <input onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Confirm password: </label>
                        <input type='password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <button onClick={e => handleSignUpButton(e)}>Sign Up</button>
                </form>
                <label>{infoPanel}</label>
                <br></br>
                <label>Already have an account? <Link to='/login'>Log in here</Link></label>
            </section>
        </main>
    );
}