import './styles/landing.css'
import processDocumentationToolsImage from '../../assets/images/process-documentation-tools-1.jpg'
import landingImage from '../../assets/images/landing.jpg'
import Testimonials from './testimonials';
import GenerateRandomFact from './generate-random-fact';

export default function Landing() {
    return (
        <>
            <h1>DISCOVER <span className='dark-text'>DOCUFLOW</span></h1>
            <section>
                <h3>Document Your Tools, Clearly and Effortlessly</h3>
                <p>DocuFlow is built for developers, product teams, and creators who need a simple way to write, organize, and share documentation about their tools.</p>
                <figure>
                    <img src={processDocumentationToolsImage} alt='logo'></img>
                </figure>
            </section>
            <section>
                <div className='two-column-layout'>
                    <div className='card right-shadow'>
                        <h3>Built for Documentation About Tools</h3>
                        <ul>
                            <li>Structured Templates - Start faster with ready-to-use documentation templates.</li>
                            <li>Versioning - Keep your docs up-to-date with automatic version control.</li>
                            <li>Collaboration - Write together with your team in real-time.</li>
                            <li>Search & Navigation - Help users find what they need instantly.</li>
                            <li>Export & Share - Publish as websites, PDFs, or API docs.</li>
                        </ul>
                    </div>
                    <figure>
                        <img src={landingImage} alt='logo'></img>
                    </figure>
                </div>
            </section>
            <section>
                <h3>Writing Documentation Doesn't Have to Be Hard</h3>
                <p>Too often, documentation gets scattered across files, wikis, and outdated notes. DocuFlow streamlines the process by
                    giving you a dedicated space to create structured, easy-to-read documentation that actually helps people use your tool.</p>
            </section>
            <section>
                <div className='two-column-layout'>
                    <figure>
                        <img src={landingImage} alt='logo'></img>
                    </figure>
                    <div className='card left-shadow'>
                        <h3>Why Choose DocuFlow?</h3>
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
        </>
    );
}