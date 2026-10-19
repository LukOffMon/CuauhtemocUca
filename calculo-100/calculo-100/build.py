#!/usr/bin/env python3
"""
Genera index.html: UN solo archivo autocontenido (HTML + CSS + JS + KaTeX + fuentes en base64 + datos).
Uso:  python3 build.py        (no requiere dependencias; verify.py sí requiere sympy)
"""
import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT / "src"))
import data_src  # noqa: E402

KATEX = ROOT / "vendor" / "katex"


def katex_css() -> str:
    css = (KATEX / "katex.min.css").read_text(encoding="utf-8")

    # Deja solo woff2 (todos los navegadores modernos) y lo incrusta como data URI.
    pat = re.compile(r'src:url\(fonts/([^)]+?)\.woff2\) format\("woff2"\),url\([^)]*\) format\("woff"\),url\([^)]*\) format\("truetype"\)')

    def repl(m):
        b64 = base64.b64encode((KATEX / "fonts" / f"{m.group(1)}.woff2").read_bytes()).decode()
        return f'src:url(data:font/woff2;base64,{b64}) format("woff2")'

    out, n = pat.subn(repl, css)
    if n == 0 or "fonts/" in out:
        raise SystemExit("No se pudieron incrustar las fuentes de KaTeX (formato de CSS inesperado).")
    return out


def safe_script(s: str) -> str:
    # evita cerrar el <script> por accidente
    return s.replace("</script", "<\\/script")


def main():
    tpl = (ROOT / "src" / "template.html").read_text(encoding="utf-8")
    data = json.dumps(data_src.build_data(), ensure_ascii=False, separators=(",", ":"))
    html = (
        tpl.replace("/*__KATEX_CSS__*/", katex_css())
        .replace("/*__APP_CSS__*/", (ROOT / "src" / "styles.css").read_text(encoding="utf-8"))
        .replace("/*__KATEX_JS__*/", safe_script((KATEX / "katex.min.js").read_text(encoding="utf-8")))
        .replace("/*__DATA__*/", safe_script(data))
        .replace("/*__APP_JS__*/", safe_script((ROOT / "src" / "app.js").read_text(encoding="utf-8")))
    )
    (ROOT / "index.html").write_text(html, encoding="utf-8")
    print(f"index.html generado: {len(html) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
