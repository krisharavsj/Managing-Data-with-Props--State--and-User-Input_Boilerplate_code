import{createContext, useContext,useState,useCallback,useRef,useEffect}from 'react';
import {STAGE,AGE}from '../constants';

const AppContext=createConntext(null);
export function AppProvider({children}){
    const [theme,setTheme]=useState(()=>localStorage.getItem('cv_theme')||'dark');
    useEffect(()=>{
        document.body.className=theme==='light'?'light-mode':'';
        localStorage.setItem('cv_theme',theme);
    },[theme]);


    const [userName]=useState('');
    const [userAge, setUserAge]=useState(AGE.ADULT);
    const[stage,setStage]=useState(STAGE.NAME);
    const[chatMsgs, setChatMsgs]=useState([])
    const[isBotTyping, setIsBotTyping]=useState(false);

    const msgCounter = useRef(0);

    const newId = () => `msg-${++msgCounter.current}`;

    // addMsg — append a new message to the visible chat

    const addMsg = useCallback((role, content) =>

        setChatMsgs(prev => [...prev, { id: newId(), role, content }]), []);

    // resetChat — wipe everything and restart onboarding from scratch

    const resetChat = useCallback(() => {

        setChatMsgs([]);

        setUserName('');

        setUserAge(AGE.ADULT);

        setIsBotTyping(false);

        setStage(STAGE.NAME);

    }, []);

    // ── Expose everything to child components via useApp() ─────────────────

    const value = {

        theme, setTheme,

        userName, setUserName,

        userAge, setUserAge,

        stage, setStage,

        chatMsgs, setChatMsgs, addMsg,

        isBotTyping, setIsBotTyping,

        resetChat,

    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}

// useApp — call this inside any component to access the shared state

export function useApp() {

    const ctx = useContext(AppContext);

    if (!ctx) throw new Error('useApp must be inside <AppProvider>');

    return ctx;

}