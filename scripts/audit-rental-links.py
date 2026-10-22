"""No public rental anchor may open an unqualified business WhatsApp message."""
import argparse,json,re,subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,parse_qs
from concurrent.futures import ThreadPoolExecutor
p=argparse.ArgumentParser();p.add_argument('--base');p.add_argument('--dist',default='dist');p.add_argument('--output',required=True);a=p.parse_args()
def get(url):return subprocess.check_output(['curl','-fsS','--max-time','40',url],text=True)
xml=get(a.base.rstrip('/')+'/sitemap.xml') if a.base else (Path(a.dist)/'sitemap.xml').read_text()
paths=re.findall(r'<loc>https://benatna.ma([^<]*)</loc>',xml)
class Anchors(HTMLParser):
 def __init__(self):super().__init__();self.bad=[];self.qualified=0
 def handle_starttag(self,tag,attrs):
  if tag!='a':return
  href=dict(attrs).get('href','');u=urlsplit(href)
  if u.hostname in ('wa.me','api.whatsapp.com','web.whatsapp.com'):
   phone=u.path if u.hostname=='wa.me' else parse_qs(u.query).get('phone',[''])[0]
   if re.sub(r'\D','',phone)=='212699024526':self.bad.append(href)
  if u.path=='/louer' and parse_qs(u.query).get('demande')==['1']:self.qualified+=1
def check(path):
 body=get(a.base.rstrip('/')+path) if a.base else (Path(a.dist)/(path.strip('/')+'/index.html' if path!='/' else 'index.html')).read_text()
 doc=Anchors();doc.feed(body);return {'path':path,'unqualifiedLinks':doc.bad,'qualifiedLinks':doc.qualified}
with ThreadPoolExecutor(max_workers=6) as pool:rows=list(pool.map(check,paths))
result={'base':a.base or a.dist,'pages':len(rows),'failures':[r for r in rows if r['unqualifiedLinks']],'qualifiedLinks':sum(r['qualifiedLinks'] for r in rows),'javascriptExecuted':False}
Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False));raise SystemExit(bool(result['failures']))
