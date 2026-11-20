import {useApp} from '../context/AppContext';

export default function NNavbar(){
    const{theme, setTheme,resetChat}=useApp();
    return (
        <nav className="app-navbar">
            <div className="navbar-inner">
                <button className="navbar-brand" onClick={resetChat} title="start over">
                    <i className="bi bi-film"></i>
                    AI powered CineVerse
                </button>
                <div className="navbar-right">
                    <span className="nav-badge">
                        <i className="bi bi-stars" style={{marginRight:5}}></i>
                        AI Powered
                    </span>
                    <button
                    className="btn-icon"
                    title={isLight ? 'Switch to dark mode': 'Switch to light mode'} onClick={()=>setTheme(isLight ? 'dark':'light')}
                    >

                    </button>
                    <i className={`bi ${isLight ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} />
                </div>

            </div>
        </nav>
    );
}