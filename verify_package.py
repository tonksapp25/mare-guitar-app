from pathlib import Path
from html.parser import HTMLParser
import xml.etree.ElementTree as ET
import wave
import numpy as np

root=Path(__file__).resolve().parent/'output'
class CheckHTML(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.links=[];self.sounds=[];self.cards=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids
            self.ids.add(a['id'])
        if tag=='a':self.links.append(a.get('href',''))
        if tag=='audio':self.sounds.append(a['src'])
        if tag=='article' and a.get('class')=='card':self.cards+=1
text=(root/'gitarska_pustolovina.html').read_text(encoding='utf-8')
parser=CheckHTML();parser.feed(text)
assert parser.cards==26
assert '<html lang="hr">' in text
for href in parser.links+parser.sounds:
    if href.startswith('#'):assert href[1:] in parser.ids,href
    elif not href.startswith(('https://','http://')):assert (root/href).is_file(),href
svgs=text.split('<svg ')[1:]
for svg in svgs:ET.fromstring('<svg '+svg.split('</svg>')[0]+'</svg>')
assert len(parser.sounds)==5
results=[]
for name in parser.sounds:
    with wave.open(str(root/name)) as wav:
        sr=wav.getframerate();samples=np.frombuffer(wav.readframes(wav.getnframes()),dtype=np.int16)
        assert wav.getnchannels()==1 and wav.getsampwidth()==2
        assert np.max(np.abs(samples.astype(float)))<32767
        results.append((name,round(len(samples)/sr,2)))
with wave.open(str(root/'audio/05_bratec_martin_motiv.wav')) as wav:
    sr=wav.getframerate();samples=np.frombuffer(wav.readframes(wav.getnframes()),dtype=np.int16)
expected=[(4,261.6256),(5,293.6648),(6,329.6276),(7,261.6256),(8,261.6256),(9,293.6648),(10,329.6276),(11,261.6256),(12,329.6276),(13,349.2282),(14,391.9954),(16,329.6276),(17,349.2282),(18,391.9954)]
for start,target in expected:
    section=samples[int((start+.1)*sr):int((start+.8)*sr)]
    spectrum=abs(np.fft.rfft(section*np.hanning(len(section))))
    measured=np.fft.rfftfreq(len(section),1/sr)[np.argmax(spectrum)]
    assert abs(measured-target)<2,(start,target,measured)
print('OK: 26 kartice; svi lokalni linkovi; valjani SVG crtezi; 5 zvukova; svih 14 tonova audio motiva provjereno.')
print(results)
