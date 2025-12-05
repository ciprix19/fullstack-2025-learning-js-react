import { useContext } from 'react';
import { AuthContext } from '../../utils/context/authContext';
import './styles/about.css'
import { Navigate } from 'react-router-dom';

export default function About() {

    // if (localStorage.getItem('active') === 'false') return <Navigate to='/login' />

    return (
        <main>
            <h1>LEARN MORE ABOUT <span className="dark-text">DOCUFLOW</span></h1>
            <section>
                <div className="two-column-layout">
                    <div className="card left-shadow">
                        <h2>About DocuFlow</h2>
                        <p>DocuFlow is a simple, focused tool for writing documentation about your tools.
                            We created it to make documenting easier, faster, and less frustrating.</p>
                    </div>
                    <img src="images/about.png" alt="logo"/>
                </div>
            </section>
            <section>
                <div className="two-column-layout">
                    <img src="images/side-view-man-working-with-post-its_23-2149930950.avif" alt="logo"/>
                    <div className="card right-shadow">
                        <h2>Our Mission</h2>
                        <p>To help developers and teams create clear, structured documentation that makes their tools easier to use and share.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="two-column-layout">
                    <div className="card left-shadow">
                        <h2>Values</h2>
                        <ul>
                            <li>Clarity first</li>
                            <li>Collaboration made simple</li>
                            <li>Always up to date</li>
                        </ul>
                    </div>
                    <div className="rectangle"></div>
                </div>
            </section>
        </main>
    );
}