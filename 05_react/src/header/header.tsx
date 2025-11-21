import './styles/header.css'
import logoImg from '../assets/images/logo_new.png'
import type { ThemeState } from '../enum/ThemeState';

interface HeaderProps {
    theme: ThemeState;
    setTheme: Function;
}

export default function Header({ theme, setTheme }: HeaderProps ) {
    function changeTheme() {
        console.log(theme);
        setTheme({ status: theme.status === 'red' ? 'blue': 'red'});
    }

    return (
        <header className='gradient-bg'>
            <nav className='navbar' aria-label='Primary-navigation'>
                <div className='logo-div'>
                    {/* <img className='logo-img' src='./assets/images/logo_new.png' alt='logo' title=':P'></img> */}
                    <img className='logo-img' src={logoImg} alt='logo' title=':P'></img>
                    <p>DocuFlow</p>
                </div>
                <ul className='nav-menu'>
                    <li className='nav-item'><a href='landing.html'>Home</a></li>
                    <li className='nav-item'><a href='about.html'>About</a></li>
                    <li className='nav-item'><a href='login.html'>Login</a></li>
                </ul>
                <div className='change-theme'>
                    <button className='change-theme-button' onClick={changeTheme}>Change Theme</button>
                </div>
                <div className='hamburger'>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
            </nav>
        </header>
    );
}