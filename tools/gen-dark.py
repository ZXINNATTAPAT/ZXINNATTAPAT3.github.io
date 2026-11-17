import re, sys, colorsys, tinycss2
VARS = """:root{
  --dk-bg:#121214;
  --dk-surface:#1c1c1f;
  --dk-surface-2:#26262b;
  --dk-border:#34343a;
  --dk-text:#ececec;
  --dk-text-muted:#a1a1aa;
  --dk-accent:#ec5f5f;
  --dk-accent-strong:#a30000;
  color-scheme:dark;
}
html,body{background-color:var(--dk-bg)!important;color:var(--dk-text)}
[style*="background-color: #f8f8ff"],[style*="background-color: rgb(248, 248, 255)"]{background-color:var(--dk-bg)!important}
[style*="background: #f0f0f0"]{background:var(--dk-surface-2)!important;color:var(--dk-text)!important}
[style*="color: #1d1d1f"],[style*="color: #2c2c2c"],[style*="color: #333"],[style*="color: rgb(29, 29, 31)"],[style*="color: rgb(44, 44, 44)"],[style*="color: rgb(51, 51, 51)"]{color:var(--dk-text)!important}
[style*="color: #6b6b6b"],[style*="color: #666"],[style*="color: rgb(107, 107, 107)"],[style*="color: rgb(102, 102, 102)"]{color:var(--dk-text-muted)!important}
a:focus-visible,button:focus-visible{outline:2px solid var(--dk-accent)!important;outline-offset:2px}
html{--bs-body-bg:var(--dk-bg);--bs-body-color:var(--dk-text);--bs-secondary-color:var(--dk-text-muted);--bs-tertiary-color:var(--dk-text-muted);--bs-emphasis-color:var(--dk-text);--bs-border-color:var(--dk-border);--bs-secondary-bg:var(--dk-surface-2);--bs-tertiary-bg:var(--dk-surface)}
.text-muted{color:var(--dk-text-muted)!important}
/* mono-dark logos: flip so they stay visible on dark backgrounds */
img[src*="nextjs-original"],img[src*="github-original"],img[src*="cursor/111111"],img[src*="railway/0B0D0E"],img[src*="render/000000"],img[src*="vercel/111111"],img[src*="simpleicons.org/termius"],img[src*="notion-original"],img[src*="django-plain"],img[src*="fcc_secondary"],img[src*="solidity-original"],img[src*="devicon/codex"]{filter:invert(1) hue-rotate(180deg)!important}
.door-note--yellow{color:#2a2a2a!important}
.hamburger-line{background-color:var(--dk-text)!important}
"""
NAMED={'white':(255,255,255,1),'black':(0,0,0,1)}
COL=re.compile(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|\b(?:white|black)\b')
def parse(s):
    s=s.strip()
    if s.lower() in NAMED: return NAMED[s.lower()]
    if s.startswith('#'):
        h=s[1:]
        if len(h) in (3,4): h=''.join(c*2 for c in h)
        if len(h) not in (6,8): return None
        r,g,b=(int(h[i:i+2],16) for i in (0,2,4)); a=int(h[6:8],16)/255 if len(h)==8 else 1
        return r,g,b,a
    m=re.match(r'rgba?\((.*)\)',s)
    if not m: return None
    if 'var(' in s: return None
    parts=re.split(r'[\s,/]+',m.group(1).strip())
    try:
        nums=[float(p.rstrip('%'))*(2.55 if p.endswith('%') else 1) for p in parts[:3]]
        a=float(parts[3].rstrip('%'))/(100 if parts[3].endswith('%') else 1) if len(parts)>3 else 1
    except: return None
    return (*nums,a)
def fmt(r,g,b,a):
    r,g,b=(max(0,min(255,round(x))) for x in (r,g,b))
    return f'#{r:02x}{g:02x}{b:02x}' if a>=0.999 else f'rgba({r},{g},{b},{round(a,3)})'
def mix(var,a): return f'var({var})' if a>=0.999 else f'color-mix(in srgb,var({var}) {round(a*100,1)}%,transparent)'
def info(r,g,b):
    h,l,s=colorsys.rgb_to_hls(r/255,g/255,b/255); return h,l,s
def is_red(r,g,b): h,l,s=info(r,g,b); return s>0.5 and (h<0.03 or h>0.95) and l<0.45
def tx(c,role):
    r,g,b,a=c
    if a==0: return None
    h,l,s=info(r,g,b)
    gray=s<0.15 or l>0.93 or l<0.08
    if role=='text':
        if is_red(r,g,b): return mix('--dk-accent',a)
        if gray and l<0.25: return mix('--dk-text',a)
        if gray and l<0.62: return mix('--dk-text-muted',a)
        if not gray and l<0.35: # dark colored text -> lighten
            r2,g2,b2=colorsys.hls_to_rgb(h,0.72,min(s,0.6)); return fmt(r2*255,g2*255,b2*255,a)
        return None
    if role=='bg':
        if is_red(r,g,b): return None
        if gray and l>=0.995: return mix('--dk-surface',a)
        if gray and l>=0.9: return mix('--dk-bg',a)
        if gray and l>=0.6: return mix('--dk-surface-2',a)
        if gray and l<0.2: return mix('--dk-surface-2',a)
        if not gray and l>0.7:
            r2,g2,b2=colorsys.hls_to_rgb(h,0.14,min(s,0.35)); return fmt(r2*255,g2*255,b2*255,a)
        return None
    if role=='border':
        if is_red(r,g,b): return mix('--dk-accent',a)
        if gray and l>=0.6: return mix('--dk-border',a)
        if gray and l<0.25 and a>0.5: return mix('--dk-border',a)
        if not gray and l>0.7:
            r2,g2,b2=colorsys.hls_to_rgb(h,0.3,min(s,0.4)); return fmt(r2*255,g2*255,b2*255,a)
        return None
    if role=='shadow':
        if gray and l>0.8: return fmt(255,255,255,a*0.06)
        if gray and l<0.2: return fmt(0,0,0,min(0.6,a*2.2))
        return None
def role_of(p):
    p=p.lower()
    if p in('color','fill','stroke','caret-color','-webkit-text-fill-color','text-decoration-color','column-rule-color'): return 'text'
    if p.startswith('background'): return 'bg'
    if p.startswith('border') or p.startswith('outline'): return 'border'
    if p in('box-shadow','text-shadow','filter','-webkit-box-shadow'): return 'shadow'
    if p.startswith('--'):
        n=p
        if any(k in n for k in('bg','glow','background')): return 'bg'
        if 'border' in n: return 'border'
        if 'accent-rgb' in n: return 'rgbtriplet'
        if n in('--c1','--c2','--c3'): return 'bg'
        return None
    return None
def conv_value(val,role):
    if role=='rgbtriplet':
        m=re.fullmatch(r'\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*',val)
        if m and is_red(*map(int,m.groups())): return ' 236, 95, 95'
        return None
    changed=False
    def rep(m):
        nonlocal changed
        c=parse(m.group(0))
        if not c: return m.group(0)
        out=tx(c,role)
        if out is None: return m.group(0)
        changed=True; return out
    new=COL.sub(rep,val)
    return new if changed else None
def decls_out(content, keep_all=False):
    out=[]
    items=tinycss2.parse_blocks_contents(content, skip_whitespace=True, skip_comments=True)
    clip=any(d.type=='declaration' and 'background-clip' in d.lower_name and 'text' in tinycss2.serialize(d.value) for d in items)
    for d in items:
        if d.type!='declaration': continue
        val=tinycss2.serialize(d.value).strip()
        role=role_of(d.lower_name if not d.name.startswith('--') else d.name)
        if clip and role=='bg': role='text'
        nv=conv_value(val,role) if role else None
        imp='!important' if d.important else ''
        if nv is not None: out.append(f'{d.name}:{nv}{imp}')
        elif keep_all: out.append(f'{d.name}:{val}{imp}')
    return out
def walk(rules, depth=0):
    out=[]
    for r in rules:
        if r.type=='qualified-rule':
            sel=tinycss2.serialize(r.prelude).strip()
            ds=decls_out(r.content)
            if ds: out.append(f'{sel}{{{";".join(ds)}}}')
        elif r.type=='at-rule' and r.content is not None:
            kw=r.lower_at_keyword; pre=tinycss2.serialize(r.prelude).strip()
            if kw in('media','supports','layer','container'):
                inner=walk(tinycss2.parse_rule_list(r.content,skip_whitespace=True,skip_comments=True),depth+1)
                if inner: out.append(f'@{kw} {pre}{{{"".join(inner)}}}')
            elif kw.endswith('keyframes'):
                frames=tinycss2.parse_rule_list(r.content,skip_whitespace=True,skip_comments=True)
                anych=False; fo=[]
                for f in frames:
                    if f.type!='qualified-rule': continue
                    ch=decls_out(f.content); 
                    if ch: anych=True
                    allds=decls_out(f.content,keep_all=True)
                    # rebuild with changes applied
                    fo.append(f'{tinycss2.serialize(f.prelude).strip()}{{{";".join(allds)}}}')
                if anych:
                    # keep_all keeps original for unchanged, changed values substituted
                    out.append(f'@{r.at_keyword} {pre}{{{"".join(fo)}}}')
    return out
res=[VARS]
for path in sys.argv[1:]:
    css=open(path,encoding='utf-8').read()
    rules=tinycss2.parse_stylesheet(css,skip_whitespace=True,skip_comments=True)
    res.append(f'/* overrides for {path.split("/")[-1]} */\n'+'\n'.join(walk(rules)))
print('\n'.join(res))
