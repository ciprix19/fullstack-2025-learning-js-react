import './styles/landing.css'
import Testimonials from './testimonials';
import GenerateRandomFact from './generate-random-fact';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context/authContext';
import { Navigate } from 'react-router-dom';

export default function Landing() {
    const authContext = useContext(AuthContext);

    if (authContext.user === null) return <Navigate to='/login' />

    return (
        <main>
            <h1>DISCOVER <span className='dark-text'>DOCUFLOW</span></h1>
            <section>
                <h2>Document Your Tools, Clearly and Effortlessly</h2>
                <p>DocuFlow is built for developers, product teams, and creators who need a simple way to write, organize, and share documentation about their tools.</p>
                <img src={'images/process-documentation-tools-1.jpg'} alt='logo'></img>
            </section>
            <section>
                <div className='two-column-layout'>
                    <div className='card right-shadow'>
                        <h2>Built for Documentation About Tools</h2>
                        <ul>
                            <li>Structured Templates - Start faster with ready-to-use documentation templates.</li>
                            <li>Versioning - Keep your docs up-to-date with automatic version control.</li>
                            <li>Collaboration - Write together with your team in real-time.</li>
                            <li>Search & Navigation - Help users find what they need instantly.</li>
                            <li>Export & Share - Publish as websites, PDFs, or API docs.</li>
                        </ul>
                    </div>
                    <img src={'images/landing.jpg'} alt='logo'></img>
                </div>
            </section>
            <section>
                <h2>Writing Documentation Doesn't Have to Be Hard</h2>
                <p>Too often, documentation gets scattered across files, wikis, and outdated notes. DocuFlow streamlines the process by
                    giving you a dedicated space to create structured, easy-to-read documentation that actually helps people use your tool.</p>
            </section>
            <section>
                <div className='two-column-layout'>
                    <img src={'images/landing.jpg'} alt='logo'></img>
                    <div className='card left-shadow'>
                        <h2>Why Choose DocuFlow?</h2>
                        <ul className='emoji-list'>
                            <li>Focused on documenting tools, not just generic note-taking.</li>
                            <li>Designed with developers and product teams in mind.</li>
                            <li>Lightweight, clean, and easy to adopt.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <Testimonials />
            <GenerateRandomFact />
        </main>
    );
}