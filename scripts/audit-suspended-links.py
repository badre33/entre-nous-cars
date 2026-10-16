from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re,json,sys,subprocess
from concurrent.futures import ThreadPoolExecutor
retired={x['route'] for x in json.loads(Path('dist/route-policy-report.json').read_text()) if x['result']=='static-noindex-notice'}
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,t,a):
  if t=='a':
   h=dict(a).get('href','');u=urlsplit(h)
   if (not u.netloc or u.netloc in ('benatna.ma','www.benatna.ma')) and u.path.rstrip('/') in retired:self.links.append(h)
paths=re.findall(r'<loc>https://benatna.ma([^<]*)</loc>',Path('dist/sitemap.xml').read_text());fail=[]
base=sys.argv[2].rstrip('/') if len(sys.argv)>2 else None
def fetch(p):return p,subprocess.check_output(['curl','-fsS','--max-time','40',base+p],text=True)
remote=dict(ThreadPoolExecutor(max_workers=6).map(fetch,paths)) if base else {}
for p in paths:
 f=Path('dist')/p.strip('/')/'index.html' if p!='/' else Path('dist/index.html');a=Links();a.feed(remote[p] if base else f.read_text())
 if a.links:fail.append({'path':p,'retiredLinks':sorted(set(a.links))})
result={'base':base or 'dist','pages':len(paths),'retiredRoutes':len(retired),'violations':fail};Path(sys.argv[1]).write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False));sys.exit(bool(fail))
