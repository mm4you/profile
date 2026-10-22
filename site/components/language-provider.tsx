"use client"
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { content, type Language } from '@/lib/profile'
const LanguageContext = createContext<{ language: Language; setLanguage: (lang: Language) => void; t: typeof content.vi | typeof content.en }>({language:'vi',setLanguage:()=>{},t:content.vi})
export function LanguageProvider({children}:{children:React.ReactNode}) {
  const [language,setValue] = useState<Language>('vi')
  const setLanguage = useCallback((lang:Language) => {
    setValue(lang)
    document.documentElement.lang = lang
    try { localStorage.setItem('cv-language',lang); const url=new URL(location.href); url.searchParams.set('lang',lang); history.replaceState(null,'',url) } catch {}
  },[])
  useEffect(() => {
    let initial:Language='vi'
    try { const value=new URLSearchParams(location.search).get('lang') || localStorage.getItem('cv-language'); if(value==='en') initial='en' } catch {}
    setLanguage(initial)
  },[setLanguage])
  useEffect(() => {
    document.title = `Ưng Nhựt Khang | Web Developer · ${language==='vi'?'Hồ sơ cá nhân':'Portfolio'}`
  },[language])
  return <LanguageContext.Provider value={{language,setLanguage,t:content[language]}}>{children}</LanguageContext.Provider>
}
export const useLanguage=()=>useContext(LanguageContext)
