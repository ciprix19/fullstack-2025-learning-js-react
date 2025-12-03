import { useEffect, useState } from 'react'
import './App.css'
import Footer from './footer/footer'
import Header from './header/header'
import Landing from './layout/landing/landing'
import type { ThemeState } from './interfaces/theme-state'
import useCheckKey from './utils/useCheckKey'
import useLoadingState from './utils/useLoadingState'

const savedTheme = localStorage.getItem('theme');

function App() {
    const [theme, setTheme] = useState<ThemeState>({ status: 'red' });
    const loading = useLoadingState();
    const check = useCheckKey('theme');

    useEffect(() => {
        if (savedTheme === 'red' || savedTheme === 'blue') {
            setTheme({ status: savedTheme });
        }
    }, []);

    if (!loading) {
        return (
            <div data-theme={theme.status} className='loading-screen'>Loading...</div>
        );
    } else {
        return (
            <div data-theme={theme.status}>
                <Header theme={theme} setTheme={setTheme}></Header>
                <main>
                    <Landing />
                </main>
                <Footer />
            </div>
        );
    }
}

export default App