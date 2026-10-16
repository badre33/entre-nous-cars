"""Check server HTML without JavaScript; curl uses the system trust store."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
from urllib.parse import urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--base', default='https://benatna.ma')
parser.add_argument('--dist')
parser.add_argument('--output', required=True)
args = parser.parse_args()

def curl(url):
    command = ['curl', '-sS', '--max-time', '40', '-w', '\n%{http_code}', url]
    response = subprocess.run(command, capture_output=True, text=True, check=True)
    html, status = response.stdout.rsplit('\n', 1)
    return html, int(status), command

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.text = []
        self.canonical = []
        self.robots = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('name') == 'robots': self.robots.append(attrs.get('content', ''))
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
    def handle_data(self, data):
        if not self.skip: self.text.append(data)

xml = Path(args.dist, 'sitemap.xml').read_text() if args.dist else curl(args.base + '/sitemap.xml')[0]
urls = re.findall(r'<loc>\s*([^<]+)', xml)

def check(url):
    path = urlsplit(url).path
    if args.dist:
        file = Path(args.dist, path.strip('/'), 'index.html') if path != '/' else Path(args.dist, 'index.html')
        html, status, command = file.read_text(), 200, ['read', str(file)]
    else:
        html, status, command = curl(args.base.rstrip('/') + path)
    doc = Document(); doc.feed(html)
    text = ' '.join(doc.text)
    claims = re.findall(r'4[.,]8\s*/\s*5|1[\s,.]?(?:200|247)\+?\s+avis', text, re.I)
    return {'url': url, 'status': status, 'command': command,
            'sha256': sha256(html.encode()).hexdigest(),
            'aggregateRating': html.count('aggregateRating'), 'unsupportedClaims': claims,
            'canonical': doc.canonical, 'robots': doc.robots,
            'title': re.findall(r'<title[^>]*>(.*?)</title>', html, re.S)}

with ThreadPoolExecutor(max_workers=6) as pool: results = list(pool.map(check, urls))
report = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'javascriptExecuted': False,
          'source': args.dist or args.base, 'count': len(results), 'pages': results}
Path(args.output).parent.mkdir(parents=True, exist_ok=True)
Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
failures = [r for r in results if r['status'] != 200 or r['aggregateRating'] or r['unsupportedClaims']]
print(json.dumps({'pages': len(results), 'failures': len(failures), 'urls': [r['url'] for r in failures]}, ensure_ascii=False))
raise SystemExit(bool(failures))
