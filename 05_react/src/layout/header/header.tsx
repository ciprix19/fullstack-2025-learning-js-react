import './styles/header.css';
import type { ThemeState } from '../../utils/interfaces/theme-state';
import type { User } from '../../utils/interfaces/user';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/context/authContext';

interface HeaderProps {
    theme: ThemeState;
    setTheme: (theme: ThemeState) => void;
}

export default function Header({ theme, setTheme }: HeaderProps ) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authContext = useContext(AuthContext);

    function changeTheme() {
        localStorage.setItem('theme', theme.status === 'red' ? 'blue': 'red');
        setTheme({ status: theme.status === 'red' ? 'blue': 'red' });
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleLogout() {
        authContext.setUser(null);
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
                    <li>
                        <label onClick={changeTheme}>Change Theme</label>
                    </li>
                    <li>
                        <label>{ authContext.user !== null ? `Logged in as: ${authContext.user.email}` : 'Not logged in' }</label>
                    </li>
                    <li onClick={authContext.user !== null ? handleLogout : () => {}}>
                        {authContext.user !== null ?
                            'Logout' :
                            <Link to='/login'>Login</Link>
                        }
                    </li>
                </ul>
            </nav>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>
        </header>
    );
}