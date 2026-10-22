'use strict';

const english = {
  navProjects: 'Projects', navEducation: 'Education', navSkills: 'Skills', navContact: 'Contact',
  themeLight: 'Light theme', themeDark: 'Dark theme',
  emailAction: 'Send email ↗', availability: 'Seeking a web development internship',
  githubHeading: 'GitHub & source code', githubIntro: 'Learning through products that can be used every day.',
  repoIelts: 'IELTS vocabulary with SRS, practice games and progress tracking.',
  repoPort: 'Port entry scheduling, operations coordination and green credit rewards.',
  repoMusic: 'A FLAC web music player with installable PWA support.',
  repoCsvc: 'A team project for facilities management at UMT.',
  achievementHeading: 'Featured achievement', awardDetail: 'Semifinalist · Smart port logistics project',
  skip: 'Skip to CV',
  print: 'Print CV',
  download: 'Download CV (PDF · Vietnamese)',
  specialization: 'Information Technology student, majoring in Software Engineering',
  phone: 'Phone:',
  addressLabel: 'Location:',
  address: 'Cat Lai Ward, Ho Chi Minh City, Vietnam',
  objectiveHeading: 'Career objective',
  objective: 'Software Engineering student at UMT seeking a web development internship. Hands-on experience with React, Next.js, TypeScript, databases and API integration through personal and team projects. A quick, independent learner who uses AI tools to support programming, research and product development. Eager to learn professional workflows and contribute to real projects.',
  educationHeading: 'Education',
  university: 'Ho Chi Minh City University of Management and Technology (UMT)',
  educationDate: '2024 – present',
  major: 'Information Technology, majoring in Software Engineering (SE)',
  gpa: 'Current GPA:',
  graduation: 'Expected graduation: 2028.',
  projectsHeading: 'Featured projects',
  ielts1: 'An IELTS vocabulary app with spaced repetition (SRS, SM-2 algorithm), practice games and pronunciation.',
  ielts2: 'Supports sign-in, saved learning data, progress tracking and a learning activity heatmap.',
  music1: 'A web music player with FLAC playback, playlists and lock-screen controls through the Media Session API.',
  music2: 'Responsive on mobile and desktop, with installable PWA support.',
  portTitle: 'Smart port scheduling and logistics coordination system',
  port1: 'Supports port entry bookings, appointment management, operations dashboards and green credit rewards.',
  port2: 'GreenSlot AI recommends time slots; role-based access for drivers, administrators and operators.',
  achievementLabel: 'Achievement:',
  achievement: 'Top 20 (Semifinalist), Digiport Logistics Hackathon 2025.',
  csvcTitle: 'CSVC UMT (Facilities Management)',
  inDevelopment: 'In development',
  privateRepo: '(Private repository)',
  csvc1: 'A team project developing a web application for facilities management at UMT.',
  roleLabel: 'Role:',
  csvcRole: 'Development team member.',
  skillsHeading: 'Technical skills',
  responsive: 'responsive UI.',
  auth: 'basic authentication (Auth).',
  databaseLabel: 'Databases',
  toolsLabel: 'Tools & deployment',
  aiLabel: 'AI-assisted coding',
  ai: 'Uses AI tools to support documentation research, coding and debugging.',
  englishLabel: 'English',
  english: 'B1–B2 (self-assessed, not certified).',
  interestsHeading: 'Interests',
  interests: 'Meeting friends, conversations over coffee, listening to music and watching films.',
  contactHeading: 'Contact',
  phoneLabel: 'Phone',
  backToTop: 'Back to top ↑'
};
const labels = {
  vi: {
    navigation: 'Điều hướng',
    toolbar: 'Tùy chọn CV', language: 'Ngôn ngữ',
    portrait: 'Ảnh chân dung Ưng Nhựt Khang',
    ieltsSource: 'Mã nguồn IELTS Vocabulary trên GitHub (mở tab mới)',
    musicSource: 'Mã nguồn Drive Music trên GitHub (mở tab mới)',
    portSource: 'Mã nguồn InnovateX Smart Port trên GitHub (mở tab mới)',
    csvcSource: 'Kho mã nguồn riêng tư CSVC UMT trên GitHub (cần quyền truy cập, mở tab mới)'
  },
  en: {
    navigation: 'Navigation',
    toolbar: 'CV options', language: 'Language',
    portrait: 'Portrait of Ưng Nhựt Khang',
    ieltsSource: 'IELTS Vocabulary source code on GitHub (opens in a new tab)',
    musicSource: 'Drive Music source code on GitHub (opens in a new tab)',
    portSource: 'InnovateX Smart Port source code on GitHub (opens in a new tab)',
    csvcSource: 'Private CSVC UMT repository on GitHub (access required, opens in a new tab)'
  }
};
const translatedNodes = [...document.querySelectorAll('[data-i18n]')];
const vietnamese = Object.fromEntries(translatedNodes.map(node => [node.dataset.i18n, node.textContent]));
vietnamese.themeDark = 'Giao diện tối';
function updateThemeButton() {
  const button = document.querySelector('#theme');
  const key = document.documentElement.dataset.theme === 'light' ? 'themeDark' : 'themeLight';
  button.dataset.i18n = key;
  button.textContent = (document.documentElement.lang === 'en' ? english : vietnamese)[key];
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#fafaf9' : '#0e1115';
  updateThemeButton();
  try { localStorage.setItem('cv-theme', document.documentElement.dataset.theme); } catch { /* Theme remains usable without storage. */ }
}
document.querySelector('#theme').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
let initialTheme = 'dark';
try { initialTheme = localStorage.getItem('cv-theme') || 'dark'; } catch { /* Default to dark. */ }
setTheme(initialTheme);
const descriptions = {
  vi: 'CV của Ưng Nhựt Khang — sinh viên Kỹ thuật phần mềm tại UMT, Web Developer. Học vấn, kỹ năng, dự án và thông tin liên hệ.',
  en: 'CV of Ưng Nhựt Khang — Software Engineering student at UMT and Web Developer. Education, skills, featured projects and contact details.'
};
function setLanguage(language) {
  const lang = language === 'en' ? 'en' : 'vi';
  const content = lang === 'en' ? english : vietnamese;
  document.documentElement.lang = lang;
  translatedNodes.forEach(node => { node.textContent = content[node.dataset.i18n]; });
  document.querySelectorAll('[data-aria]').forEach(node => node.setAttribute('aria-label', labels[lang][node.dataset.aria]));
  document.querySelectorAll('[data-alt]').forEach(node => { node.alt = labels[lang][node.dataset.alt]; });
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  document.querySelector('meta[name="description"]').content = descriptions[lang];
  updateThemeButton();
  try { localStorage.setItem('cv-language', lang); } catch { /* Language still works when browser storage is unavailable. */ }
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  } catch { /* Also support opening the CV directly as a local file. */ }
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
document.querySelector('#print').addEventListener('click', () => window.print());
let savedLanguage;
try { savedLanguage = localStorage.getItem('cv-language'); } catch { /* Default to Vietnamese. */ }
setLanguage(new URLSearchParams(window.location.search).get('lang') || savedLanguage || 'vi');
