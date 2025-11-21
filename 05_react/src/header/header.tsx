import './styles/header.css'
import logoImg from '../assets/images/logo_new.png'
import type { ThemeState } from '../interfaces/theme-state';
import { useState } from 'react';

interface HeaderProps {
    theme: ThemeState;
    setTheme: (theme: ThemeState) => void;
}

export default function Header({ theme, setTheme }: HeaderProps ) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function changeTheme() {
        console.log(theme);
        setTheme({ status: theme.status === 'red' ? 'blue': 'red'});
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className='gradient-bg'>
            <nav className='navbar' aria-label='Primary-navigation'>
                <div className='logo-div'>
                    <img className='logo-img' src={logoImg} alt='logo' title=':P'></img>
                    <p>DocuFlow</p>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className='nav-item'><a href='landing.html'>Home</a></li>
                    <li className='nav-item'><a href='about.html'>About</a></li>
                    <li className='nav-item'><a href='login.html'>Login</a></li>
                </ul>
                <div className='change-theme'>
                    <button className='change-theme-button' onClick={changeTheme}>Change Theme</button>
                </div>
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
            </nav>
        </header>
    );
}