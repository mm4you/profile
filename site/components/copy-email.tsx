"use client"
import {useEffect,useRef,useState} from 'react'
import {Mail,Check} from 'lucide-react'
import {useLanguage} from './language-provider'
import {identity} from '@/lib/profile'
export function CopyEmail({compact=false}:{compact?:boolean}) {
  const {t}=useLanguage(); const [state,setState]=useState<'idle'|'copied'|'failed'>('idle')
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null)
  useEffect(()=>()=>{if(timer.current) clearTimeout(timer.current)},[])
  async function copy() {
    try { await navigator.clipboard.writeText(identity.email); setState('copied') } catch { setState('failed') }
    if(timer.current) clearTimeout(timer.current)
    timer.current=setTimeout(()=>setState('idle'),2500)
  }
  return <span className="inline-flex flex-col items-start gap-1">
    <button type="button" onClick={copy} className={compact?'text-[11px] text-primary hover:underline cursor-pointer':'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/70 hover:bg-muted/50 text-foreground transition-colors cursor-pointer'}>
      {!compact && (state==='copied'?<Check className="w-3.5 h-3.5 text-emerald-600"/>:<Mail className="w-3.5 h-3.5 text-muted-foreground"/>)}
      <span>{state==='copied'?t.copied:compact?t.copy:t.copyEmail}</span>
    </button>
    <span className="sr-only" role="status">{state==='copied'?t.copied:''}</span>
    {state==='failed' && <span role="status" className="text-[10px] text-muted-foreground max-w-56">{t.copyFailed}</span>}
  </span>
}
