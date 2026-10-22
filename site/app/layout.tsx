import type { Metadata } from 'next'
import './globals.css'
import {ThemeProvider} from '@/components/theme-provider'
import {LanguageProvider} from '@/components/language-provider'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ungnhutkhang.id.vn/'
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:'Ưng Nhựt Khang | Web Developer',
  description:'Ưng Nhựt Khang — Software Engineering student at UMT seeking a web development internship. Projects, skills, education and contact details.',
  authors:[{name:'Ưng Nhựt Khang',url:'https://github.com/mm4you'}],
  alternates:{canonical:siteUrl},
  icons:{icon:`${basePath}/favicon.svg`},
  openGraph:{title:'Ưng Nhựt Khang | Web Developer',description:'Portfolio, projects and contact details for Ưng Nhựt Khang.',url:siteUrl,siteName:'Ưng Nhựt Khang',locale:'en_US',type:'website',images:[{url:new URL('profile.jpg',siteUrl).href,width:1707,height:2560,alt:'Ưng Nhựt Khang'}]},
}
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en" suppressHydrationWarning className="scroll-smooth"><body className="antialiased font-sans selection:bg-primary/15 selection:text-primary min-h-screen bg-background text-foreground">
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LanguageProvider><a href="#main" className="fixed -top-20 left-4 z-50 rounded-md bg-foreground text-background px-4 py-2 focus:top-2">Đến nội dung chính / Skip to content</a>{children}</LanguageProvider>
    </ThemeProvider>
  </body></html>
}
