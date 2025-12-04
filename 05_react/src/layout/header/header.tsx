import './styles/header.css';
import type { ThemeState } from '../../interfaces/theme-state';
import type { User } from '../../interfaces/user';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    theme: ThemeState;
    setTheme: (theme: ThemeState) => void;
}

export default function Header({ theme, setTheme }: HeaderProps ) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLogged, setUserLogged] = useState<User>();

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
                    <li onClick={() => setIsMenuOpen(false)}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)}>
                        <Link to='/about'>About</Link>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)}>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <label onClick={changeTheme}>Change Theme</label>
                    </li>
                    <li>
                        <label>{ userLogged !== undefined ? `Logged in as: ${userLogged.email}` : 'Not logged in' }</label>
                    </li>
                </ul>
            </nav>
            {/* <div className='change-theme'>
                <button className='change-theme-button' onClick={changeTheme}>Change Theme</button>
            </div>
            <label>{ userLogged !== null ? `Logged in as: ${userLogged.email}` : 'Not logged in' }</label> */}
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>
        </header>
    );
}