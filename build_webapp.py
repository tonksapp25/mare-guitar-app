"""Build file:// compatible data and assets from the existing teaching package."""
from pathlib import Path
import json,re,shutil

from marija_app_cards import apply_marija_app_data

root=Path(__file__).resolve().parent
data=apply_marija_app_data(json.loads((root/'output/sadrzaj.json').read_text(encoding='utf-8')))
source=(root/'output/gitarska_pustolovina.html').read_text(encoding='utf-8')
svgs=iter(re.findall(r'<svg\b.*?</svg>',source,re.S))
figures={}
def key(kind,values):return kind+'|'+json.dumps(values,ensure_ascii=False,separators=(',',':'))
for page in data['pages']:
    for block in page['blocks']:
        if block[0]=='fig':figures[key(block[1],block[2])]=next(svgs)
        elif block[0]=='cards':
            for card in block[1]:figures[key(card['kind'],card['data'])]=next(svgs)
assert next(svgs,None) is None
for kind in ('guitar','posture'):
    figures[key(kind,None)]=(root/'assets/illustrations'/f'{kind}.svg').read_text(encoding='utf-8')
data['figures']=figures
(root/'data.js').write_text('window.GUITAR_DATA = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
assets=root/'assets/audio';assets.mkdir(parents=True,exist_ok=True)
for path in (root/'output/audio').glob('*.wav'):shutil.copy2(path,assets/path.name)
n_cards=len(data['cards'])
print(f'Local app data ready: {n_cards} cards, 27 source sheets, 5 audio examples.')
