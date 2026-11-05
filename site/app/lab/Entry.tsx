"use client"

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import s from './entry.module.css'
import { asset } from '@/lib/profile'

const Lanyard = dynamic(() => import('./ThreeLanyard'), { ssr: false })

interface EntryProps {
  vi: boolean
  onOpen: () => void
  cardOnly?: boolean
}

function drawCardFront(g: CanvasRenderingContext2D, img: HTMLImageElement | null, vi: boolean) {
  const W=1024,H=1440
  g.fillStyle='#10181d';g.fillRect(0,0,W,H)
  g.strokeStyle='#33434d';g.lineWidth=2;g.strokeRect(24,24,W-48,H-48)
  g.fillStyle='#2fc1e3';g.fillRect(24,66,7,62)
  g.fillStyle='#b4c3ca';g.font='500 23px Obel,monospace';g.fillText('KHANG / PERSONAL EDITION',60,104);g.textAlign='right';g.fillStyle='#2fc1e3';g.fillText('01 / 02',964,104);g.textAlign='left'
  // A true 4:6 portrait. Preserve the source color and show the full photograph.
  const px=60,py=150,pw=720,ph=1080
  if(img&&img.complete&&img.naturalWidth>0){
    g.save();g.beginPath();g.rect(px,py,pw,ph);g.clip()
    g.filter='none'
    const factor=Math.min(pw/img.naturalWidth,ph/img.naturalHeight)
    const w=img.naturalWidth*factor,h=img.naturalHeight*factor
    g.fillStyle='#f4f7f8';g.fillRect(px,py,pw,ph)
    g.drawImage(img,px+(pw-w)/2,py+(ph-h)/2,w,h)
    g.restore()
  }
  g.strokeStyle='#526771';g.lineWidth=1;g.strokeRect(px,py,pw,ph)
  g.save();g.translate(924,1194);g.rotate(-Math.PI/2)
  g.fillStyle='#2fc1e3';g.font='650 110px Obel,monospace';g.fillText('MM4YOU',0,0)
  g.fillStyle='#a0b5c0';g.font='400 22px Obel,monospace';g.fillText('WEB / SOFTWARE / UMT',0,-128)
  g.restore()
  g.fillStyle='#edf3f5';g.font='600 60px Arial,sans-serif';g.fillText('Ưng Nhựt Khang',60,1308)
  g.fillStyle='#becdd4';g.font='500 24px Obel,monospace';g.fillText('WEB DEVELOPER',60,1356)
  g.textAlign='right';g.fillStyle='#2fc1e3';g.fillText('UMT / SE',964,1356);g.textAlign='left'
  g.strokeStyle='#33434d';g.beginPath();g.moveTo(60,1380);g.lineTo(964,1380);g.stroke();g.fillStyle='#a0b5c0';g.font='400 22px Obel,monospace';g.fillText('github.com/mm4you',60,1410)
}
function drawCardBack(g:CanvasRenderingContext2D,vi:boolean){
  const mono='Obel, monospace'
  g.fillStyle='#10181d';g.fillRect(0,0,1024,1440)
  g.strokeStyle='#33434d';g.lineWidth=2;g.strokeRect(24,24,976,1392)
  g.fillStyle='#2fc1e3';g.fillRect(24,66,7,62)
  g.fillStyle='#b4c3ca';g.font=`500 23px ${mono}`;g.fillText('KHANG / PERSONAL EDITION',60,104)
  g.textAlign='right';g.fillStyle='#2fc1e3';g.fillText('02 / 02',964,104);g.textAlign='left'
  g.fillStyle='#edf3f5';g.font=`350 280px ${mono}`;g.fillText('MM',50,454)
  g.fillStyle='#2fc1e3';g.font=`650 260px ${mono}`;g.fillText('4YOU.',50,700)
  g.strokeStyle='#33434d';g.beginPath();g.moveTo(60,780);g.lineTo(964,780);g.stroke()
  g.fillStyle='#edf3f5';g.font='600 50px Arial,sans-serif';g.fillText('Ưng Nhựt Khang',60,872)
  g.fillStyle='#b4c3ca';g.font=`400 27px ${mono}`;g.fillText('WEB DEVELOPER / UMT',60,927)
  g.font='400 29px Arial,sans-serif'
  const bio=vi?['Tự phát triển ứng dụng web,','công cụ học tập và trò chơi.']:['Building web apps, learning tools','and little browser games.']
  bio.forEach((line,i)=>g.fillText(line,60,1000+i*42))
  g.fillStyle='#2fc1e3';g.font=`500 23px ${mono}`;g.fillText('REACT / NEXT.JS / TYPESCRIPT',60,1130)
  g.fillStyle='#b4c3ca';g.font=`400 23px ${mono}`;g.fillText('POSTGRESQL / SUPABASE / NEON',60,1172)
  g.strokeStyle='#33434d';g.beginPath();g.moveTo(60,1220);g.lineTo(964,1220);g.stroke()
  g.fillStyle='#edf3f5';g.font=`400 29px ${mono}`;g.fillText('contact@ungnhutkhang.id.vn',60,1290)
  g.fillStyle='#b4c3ca';g.font=`400 26px ${mono}`;g.fillText('ungnhutkhang.id.vn',60,1340)
  g.font=`500 20px ${mono}`;g.fillStyle='#8599a5';g.fillText('GITHUB / MM4YOU',60,1390);g.textAlign='right';g.fillText('HCMC, VN',964,1390);g.textAlign='left'
}
export default function Entry({ vi, onOpen, cardOnly=false }: EntryProps) {
  const [art, setArt] = useState<{ front: string; back: string; strap: string } | null>(null)
  const [ready, setReady] = useState(false)
  const [wide, setWide] = useState(false)
  useEffect(()=>{const media=window.matchMedia("(min-width:751px)");const sync=()=>setWide(media.matches);sync();media.addEventListener("change",sync);return()=>media.removeEventListener("change",sync)},[])
  const [failed, setFailed] = useState(false)
  const scene = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    const img = new Image()
    img.src = '/profile.jpg'

    const initArt = async () => {
      const obel = new FontFace('Obel', 'url(/fonts/obel/ObelMono-VF.woff2)', {weight:'100 900'})
      try { await obel.load(); document.fonts.add(obel) } catch { /* monospace fallback */ }
      try {
        await Promise.all([
          img.decode().catch(() => {}),
          document.fonts?.load('600 28px "Obel Mono"').catch(() => {}),
          document.fonts?.load('600 28px Obel').catch(() => {}),
        ])
      } catch {
        // Fallback gracefully
      }

      if (!alive) return

      try {
        // Front Canvas
        const fc = document.createElement('canvas')
        fc.width = 1024
        fc.height = 1440
        const fg = fc.getContext('2d')
        if (fg) drawCardFront(fg, img, vi)

        // Back Canvas
        const bc = document.createElement('canvas')
        bc.width = 1024
        bc.height = 1440
        const bg = bc.getContext('2d')
        if (bg) drawCardBack(bg, vi)

        setArt({
          front: fc.toDataURL('image/png'),
          back: bc.toDataURL('image/png'),
          strap: asset('umt-lanyard.svg'),
        })
      } catch {
        if (alive) {
          setArt({
            front: '/profile.jpg',
            back: '/profile.jpg',
            strap: '',
          })
        }
      }
    }

    initArt()
    return () => {
      alive = false
    }
  }, [vi])

  return <section className={`${s.entry} ${cardOnly?s.cardOnly: ""}`}>
    {!cardOnly&&<div className={s.editorial}>
      <span className={s.eyebrow}>{vi?'GIỚI THIỆU / 2026':'PERSONAL EDITION / 2026'}</span>
      <h1 className={s.name}>Ưng Nhựt Khang<span>.</span></h1>
      <p className={s.roleTitle}>WEB DEVELOPER / UMT</p>
      <p className={s.lead}>{vi?'Sinh viên Kỹ thuật phần mềm tại UMT. Mình phát triển ứng dụng web, công cụ học tập và những trò chơi nhỏ.':'Software Engineering student at UMT. I build web applications, learning tools, and little browser games.'}</p>
      <div className={s.actions}><button onClick={onOpen}>{vi?'Xem các dự án':'Explore my work'} ↓</button><a href={vi?'/cv-ung-nhut-khang.pdf':'/cv-ung-nhut-khang-en.pdf'} target="_blank" rel="noopener noreferrer">{vi?'Tải CV':'Download CV'} ↗</a></div>
    </div>}
    <div className={s.scene} ref={scene}>
      {art&&<Lanyard frontImage={art.front} backImage={art.back} strapImage={art.strap||undefined} strapOffset={.32} size={.58} anchor={wide?"right":"center"} strapLength={.50} strapWidth={.63} finish="matte" metal="graphite" cardColor="#152129" strapColor="#080c0d" breeze={.1} damping={.65} cornerRadius={.16} showReader={false} onReady={()=>setReady(true)} onUnsupported={()=>setFailed(true)}/>}
      {failed&&<div className={s.fallback}><img src="/profile.jpg" alt="Ưng Nhựt Khang"/><strong>Ưng Nhựt Khang</strong></div>}
      <div className={s.instruction}>{ready?(vi?'Kéo để xoay · Chạm để lật':'Drag to move · Tap to flip'):(vi?'Đang chuẩn bị thẻ…':'Preparing your card…')}</div>
    </div>
  </section>
}
