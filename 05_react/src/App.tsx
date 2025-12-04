import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Footer from './layout/footer/footer'
import Header from './layout/header/header'
import Landing from './layout/landing/landing'
import About from './layout/about/about'
import Login from './layout/login/login'
import SignUp from './layout/signup/signup'
import ChangePassword from './layout/change-password/change-password'
import type { ThemeState } from './interfaces/theme-state'
import useCheckKey from './utils/useCheckKey'
import useLoadingState from './utils/useLoadingState'

const savedTheme = localStorage.getItem('theme');

function App() {
    const [theme, setTheme] = useState<ThemeState>({ status: 'red' });
    const loading = useLoadingState();

    useCheckKey('theme');
    useEffect(() => {
        if (savedTheme === 'red' || savedTheme === 'blue') {
            setTheme({ status: savedTheme });
        }
    }, []);

    if (!loading) {
        return (
            <div data-theme={theme.status} className='loading-screen'>Loading...</div>
        );
    }
    return (
        <BrowserRouter>
            <div data-theme={theme.status}>
                <Header theme={theme} setTheme={setTheme}></Header>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/change-password' element={<ChangePassword />}/>
                    {/* <Route path='/signup' element={<SignUp />} /> */}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App