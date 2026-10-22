"""Save a dated public GitHub activity chart. Uses only the Python standard library."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.request import Request,urlopen
from datetime import date,timedelta
from html import escape
import json
ROOT=Path(__file__).resolve().parents[1]
class Calendar(HTMLParser):
    def __init__(self): super().__init__(); self.days=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'data-date' in a and 'data-level' in a:
            self.days.append((date.fromisoformat(a['data-date']),int(a['data-level'])))
url='https://github.com/users/mm4you/contributions'
parser=Calendar()
parser.feed(urlopen(Request(url,headers={'User-Agent':'Portfolio activity snapshot'}),timeout=20).read().decode())
if not parser.days: raise RuntimeError('GitHub did not return a contribution calendar; previous chart retained.')
start=min(d for d,l in parser.days)
start-=timedelta(days=(start.weekday()+1)%7)
colors=['#ebedf0','#c6dbea','#8fb7d5','#508ab6','#0f4c81']
months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
parts=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 130" role="img" aria-label="Public GitHub contributions for mm4you">','<title>Public GitHub contributions — mm4you</title>',f'<metadata>Source: {url}; captured: 2026-10-22. Public contribution intensity, levels 0–4.</metadata>']
for d,level in parser.days:
    week=(d-start).days//7; day=(d.weekday()+1)%7; x=33+week*13; y=25+day*13
    parts.append(f'<rect x="{x}" y="{y}" width="10" height="10" rx="2" fill="{colors[level]}"><title>{d.isoformat()} · level {level}</title></rect>')
    if d.day==1 and week>0: parts.append(f'<text x="{x}" y="14" font-size="9" font-family="Arial,sans-serif" fill="#57606a">{months[d.month-1]}</text>')
for text,row in [('Mon',1),('Wed',3),('Fri',5)]: parts.append(f'<text x="0" y="{33+row*13}" font-size="9" font-family="Arial,sans-serif" fill="#57606a">{text}</text>')
parts.append('</svg>')
(ROOT/'site/public/github-activity.svg').write_text(''.join(parts),encoding='utf-8')
print(f'Saved {len(parser.days)} public activity cells.')
