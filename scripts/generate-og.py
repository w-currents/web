"""Genera las imágenes para compartir (1200x630) en public/og/. Requiere: pip install playwright && playwright install chromium.
Uso (con el sitio corriendo o no; usa archivos locales): python3 scripts/generate-og.py"""
import re, pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
site = (root / 'src/content/site.ts').read_text()
svcs = re.findall(r"slug: '([^']+)'.*?short: '([^']+)', title: '([^']+)'.*?img: '([^']+)'", site)
font = (root / 'public/fonts/InterTight.woff2').as_uri()
iso = (root / 'public/img/wordmark.png').as_uri()
eng = (root / 'public/img/ingeniero.webp').as_uri()

def page(title, sub, img, pos='center'):
    bg = f"linear-gradient(90deg,#1B3B4F 0%,#1B3B4F 46%,#1B3B4Fcc 62%,transparent 100%), url('{img}') {pos}/cover" if img else "#1B3B4F"
    return f"""<style>@font-face{{font-family:I;src:url({font});font-weight:100 900}}
*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:630px;background:{bg};font-family:I;color:#fff;position:relative;overflow:hidden}}
.t{{position:absolute;left:64px;top:170px;width:620px;font-size:60px;font-weight:600;letter-spacing:-.03em;line-height:1.05}}
.s{{position:absolute;left:64px;top:430px;width:560px;font-size:26px;color:#c3d6dd;line-height:1.3}}
.l{{position:absolute;left:64px;top:56px;height:44px}}.bar{{position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(90deg,#006986,#9fd0e0)}}</style>
<img class=l src="{iso}"><div class=t>{title}</div><div class=s>{sub}</div><div class=bar></div>"""

out = root / 'public/og'; out.mkdir(exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1200, 'height': 630})
    jobs = [('default', 'Ingeniería para Infraestructura Crítica', 'Minería · energía · industria · Chile', eng, 'right bottom')]
    jobs += [(sl, t, 'wcurrents · Ingeniería para Infraestructura Crítica', (root / 'public' / im.lstrip('/')).as_uri(), 'right center') for sl, _, t, im in svcs]
    for name, t, s, im, pos in jobs:
        tmp = root / 'scripts/_og.html'; tmp.write_text('<!doctype html><meta charset=utf-8>' + page(t, s, im, pos)); pg.goto(tmp.as_uri()); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(400)
        pg.screenshot(path=str(out / f'{name}.jpg'), type='jpeg', quality=86)
    b.close()
(root / 'scripts/_og.html').unlink(missing_ok=True)
print('OG listas:', len(jobs))
