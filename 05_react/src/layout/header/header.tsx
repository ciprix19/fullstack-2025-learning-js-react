import './styles/header.css';
import type { ThemeState } from '../../interfaces/theme-state';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    theme: ThemeState;
    setTheme: (theme: ThemeState) => void;
}

export default function Header({ theme, setTheme }: HeaderProps ) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function changeTheme() {
        localStorage.setItem('theme', theme.status === 'red' ? 'blue': 'red');
        setTheme({ status: theme.status === 'red' ? 'blue': 'red' });
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className='gradient-bg'>
            <img className='logo-img' src={'images/logo_new.png'} alt='logo' title=':P'></img>
            <nav className='navbar' aria-label='Primary-navigation'>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li onClick={() => setIsMenuOpen(false)} className='nav-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)} className='nav-item'>
                        <Link to='/about'>About</Link>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)} className='nav-item'>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
            <div className='change-theme'>
                <button className='change-theme-button' onClick={changeTheme}>Change Theme</button>
            </div>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>
        </header>
    );
}