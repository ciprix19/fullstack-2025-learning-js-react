import { useState } from 'react'
import './App.css'
import Footer from './footer/footer'
import Header from './header/header'
import Landing from './layout/landing/landing'
import type { ThemeState } from './interfaces/theme-state'

function App() {
    const [theme, setTheme] = useState<ThemeState>({status: 'red'});
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

export default App
