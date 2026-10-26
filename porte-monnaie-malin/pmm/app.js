'use strict';
/* Porte-Monnaie Malin — finanzas personales 100% locales, privadas y offline. */
const VERSION='4.0',K='pmm_v3',OLD_KEYS=['pmm_v2','pmm_v1'];
const $=s=>document.querySelector(s),uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CURS=['MXN','USD','EUR','COP','ARS','CLP','PEN','BRL'],LOC={MXN:'es-MX',USD:'en-US',EUR:'es-ES',COP:'es-CO',ARS:'es-AR',CLP:'es-CL',PEN:'es-PE',BRL:'pt-BR'};
const AUTO='Automático',OPENING='Saldo inicial';
const THEMES={'Verde Financiero':['#0e2721','#16372f','#eef3ec','#9bb5a8','#d9a93f','#5fcf9a','#27493f'],'Verde Claro':['#f1f5f2','#ffffff','#14261f','#566b62','#9a6a0c','#1b7a52','#d6e2db'],'Oscuro Neón':['#0b0b14','#151526','#f2f2ff','#8d8db3','#00f0ff','#ff2bd6','#2a2a45'],'Cyberpunk':['#14061f','#220a35','#fff4d6','#c19ad6','#fcee09','#ff3c6e','#3d1559'],'Claro Ejecutivo':['#f3f5f8','#ffffff','#18212f','#5b6778','#1b4f9c','#0d7a54','#d9dfe7'],'Pastel Soft':['#fbf4fa','#ffffff','#3b3050','#6f6288','#8a4fc4','#2f8f78','#eadcf0'],'Monocromático':['#111111','#1c1c1c','#f0f0f0','#999999','#ffffff','#bbbbbb','#333333'],'Océano':['#08202e','#0f3347','#e6f4f8','#8fb4c4','#4cc3e8','#7be0b8','#1d4b63'],'Atardecer':['#2a1220','#3d1b2e','#fff0e6','#d1a3a8','#ff9d4d','#ffd36e','#59283f'],'Bosque':['#16200f','#212f17','#eef4e2','#a5b88a','#c9e265','#78d17c','#36492a'],'Lavanda Noche':['#1a1530','#261f45','#f0ecff','#a99fd1','#b69cff','#7ee0d0','#3a3066'],'Arena':['#efe6d4','#faf5ea','#2b2418','#7d705a','#a4561c','#2f7a55','#d8cbb0']};
const LBL={need:'Necesario',ant:'Hormiga',inv:'Inversión',otro:'Otro'},EMO={need:'🧺',ant:'🐜',inv:'📈',otro:'🏷️',inc:'💰',pay:'💳'};
const PAYS=['Efectivo','Débito','Crédito'],ICAT=['Nómina','Ventas','Transferencia','Rendimientos','Otro'];
const D={v:3,profile:null,tx:[],cards:[],goals:[],rec:[],ch:[],chBase:10,budget:{total:0,need:0,ant:0,inv:0,otro:0},learn:{},lastPay:'Efectivo',lastCard:'',theme:AUTO,hide:false,fs:16,dense:false,h1:'14:00',h2:'20:00',tourDone:false,notif:false,last:'',lastBk:''};
let S=structuredClone(D);

/* ---------- íconos ---------- */
const IC={home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',plus:'<path d="M12 5v14M5 12h14"/>',chart:'<path d="M3 3v18h18"/><path d="M7 15v-4M12 15V7M17 15v-7"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',set:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M2 12s3.5-7 10-7c2 0 3.7.7 5.1 1.6M22 12s-3.5 7-10 7c-2 0-3.7-.7-5.1-1.6M3 3l18 18"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',left:'<path d="m15 18-6-6 6-6"/>',right:'<path d="m9 18 6-6-6-6"/>',dl:'<path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16"/>',card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'};
const ic=(n,l)=>`<svg class="ico" viewBox="0 0 24 24" ${l?`role="img" aria-label="${l}"`:'aria-hidden="true"'}>${IC[n]}</svg>`;

/* ---------- utilidades de fecha y dinero ---------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today=()=>ymd(new Date()),thisMonth=()=>today().slice(0,7);
const addDays=(s,k)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+k);return ymd(d)},ds=k=>addDays(today(),-k);
const nowLocal=()=>{const d=new Date();return `${ymd(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`};
const monthAdd=(ym,k)=>{const[y,mo]=ym.split('-').map(Number),d=new Date(y,mo-1+k,1);return `${d.getFullYear()}-${pad(d.getMonth()+1)}`};
const daysIn=ym=>{const[y,mo]=ym.split('-').map(Number);return new Date(y,mo,0).getDate()};
const monthName=ym=>new Date(ym+'-15T12:00').toLocaleDateString('es',{month:'long',year:'numeric'});
const dayLabel=s=>s===today()?'Hoy':s===ds(1)?'Ayer':new Date(s+'T12:00').toLocaleDateString('es',{weekday:'long',day:'numeric',month:'long'});
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const cur=()=>S.profile?.cur||'MXN';
let NF={};const fmt=()=>NF[cur()]||(NF[cur()]=new Intl.NumberFormat(LOC[cur()],{style:'currency',currency:cur()}));
const money=n=>fmt().format(n||0),m=(n,c='')=>`<span class="amt ${c}">${money(n)}</span>`;
const decSep=()=>(1.5).toLocaleString(LOC[cur()]).charAt(1);
/* Acepta 1,250.50 · 1.250,50 · 28,5 · $ 300 según la moneda elegida. */
function parseAmount(v){let s=String(v??'').replace(/[^\d.,]/g,'');if(!/\d/.test(s))return NaN;
 const lc=s.lastIndexOf(','),ld=s.lastIndexOf('.');
 if(lc>-1&&ld>-1){const d=lc>ld?',':'.';s=s.split(d===','?'.':',').join('').replace(d,'.')}
 else if(lc>-1||ld>-1){const c=lc>-1?',':'.',p=s.split(c),thousands=p.length>2||(c!==decSep()&&p[p.length-1].length===3);s=thousands?p.join(''):p.join('.')}
 const n=parseFloat(s);return Number.isFinite(n)?Math.round(n*100)/100:NaN}
const sum=a=>a.reduce((s,t)=>s+t.amt,0),byDate=(a,b)=>a.date.localeCompare(b.date);
const exp=(p='')=>S.tx.filter(t=>t.type==='exp'&&t.date.startsWith(p)),incSum=p=>sum(S.tx.filter(t=>t.type==='inc'&&t.cat!==OPENING&&t.date.startsWith(p)));
const fld=(l,h,c='')=>`<label class="${c}"><span class="k">${l}</span>${h}</label>`;
const scc=s=>s>=70?'n':s>=40?'w':'a',colDays=d=>d<=3?'a':d<=7?'w':'n',CV={n:'var(--ok)',w:'var(--wr)',a:'var(--bad)'};
const pct=(a,b)=>b?Math.round(100*a/b):0,barCls=p=>p>=100?'a':p>=80?'w':'';
const opts=(arr,sel)=>arr.map(([v,l])=>`<option value="${esc(v)}" ${v===sel?'selected':''}>${esc(l)}</option>`).join('');
const plural=(n,s,p=s+'s')=>`${n} ${n===1?s:p}`;
const cardName=id=>S.cards.find(c=>c.id===id)?.name||'';

/* ---------- avisos y diálogos ---------- */
let toastT,toastFn=null;
function toast(t,act){const el=$('#toast');toastFn=act?.fn||null;el.innerHTML=`<span>${esc(t)}</span>${act?`<button data-a="toastAct">${esc(act.label)}</button>`:''}`;clearTimeout(toastT);toastT=setTimeout(()=>{el.innerHTML='';toastFn=null},act?7000:3200)}
let lock=false,lastFocus=null,resolver=null;
function modal(h,o={}){const box=$('#modal');
 if(!h){const r=resolver;resolver=null;box.innerHTML='';lock=false;document.body.style.overflow='';if(r)r(null);if(lastFocus?.isConnected)lastFocus.focus();lastFocus=null;return}
 if(!box.innerHTML)lastFocus=document.activeElement;lock=!!o.locked;
 box.innerHTML=`<div class="ov"><div class="pn" role="dialog" aria-modal="true" aria-labelledby="dlgT" tabindex="-1">${h}</div></div>`;document.body.style.overflow='hidden';
 (box.querySelector('[autofocus]')||box.querySelector('.pn')).focus()}
const head=(t,x=true)=>`<div class="dh"><h3 id="dlgT">${t}</h3>${x?`<button type="button" class="ic" data-a="mclose" aria-label="Cerrar">${ic('x')}</button>`:''}</div>`;
const answer=v=>{const r=resolver;resolver=null;modal();r?.(v)};
function ask(msg,{title='¿Seguro?',ok='Aceptar',danger=false}={}){return new Promise(r=>{modal(`${head(title)}<p>${msg}</p><div class="btns end"><button data-a="askN">Cancelar</button><button class="${danger?'danger':'p'}" data-a="askY" autofocus>${esc(ok)}</button></div>`);resolver=r})}
function askAmount(title,{value='',hint=''}={}){return new Promise(r=>{modal(`<form data-f="askAmt" novalidate>${head(title)}${hint?`<p class="k">${hint}</p>`:''}<input id="aa" class="amtin" inputmode="decimal" autocomplete="off" placeholder="0.00" value="${esc(value)}" aria-label="Monto" autofocus><div id="aerr" class="k a hint" role="alert"></div><div class="btns end"><button type="button" data-a="mclose">Cancelar</button><button class="p">Aceptar</button></div></form>`);resolver=r})}

/* ---------- persistencia (localStorage + IndexedDB) ---------- */
let dbp;
function idb(mode,v){return new Promise(res=>{try{dbp=dbp||new Promise((ok,no)=>{const q=indexedDB.open('pmm',1);q.onupgradeneeded=()=>q.result.createObjectStore('s');q.onsuccess=()=>ok(q.result);q.onerror=no});
 dbp.then(db=>{const s=db.transaction('s',mode==='get'?'readonly':'readwrite').objectStore('s'),x=mode==='put'?s.put(v,'d'):mode==='del'?s.delete('d'):s.get('d');x.onsuccess=()=>res(x.result);x.onerror=()=>res()}).catch(()=>{dbp=null;res()})}catch{res()}})}
let saveFail=false;
const save=()=>{const j=JSON.stringify(S);try{localStorage.setItem(K,j);saveFail=false}catch{if(!saveFail)toast('Almacenamiento lleno: descarga un respaldo');saveFail=true}idb('put',j)};
function sane(o){o=o&&typeof o==='object'?o:{};
 const n=structuredClone(D),num=x=>Number.isFinite(+x)?+x:0,pos=x=>Math.max(0,Math.round(num(x)*100)/100),str=(x,l=120)=>String(x??'').slice(0,l),cl=x=>Math.min(31,Math.max(1,Math.round(+x)||1)),tm=(x,d)=>/^\d\d:\d\d$/.test(x)?x:d,arr=x=>Array.isArray(x)?x:[];
 const seen=new Set(),okId=x=>{const v=typeof x==='string'&&/^[\w-]{1,40}$/.test(x)&&!seen.has(x)?x:uid();seen.add(v);return v};
 if(o.profile?.name)n.profile={name:str(o.profile.name,30),cur:CURS.includes(o.profile.cur)?o.profile.cur:'MXN'};
 const oc=arr(o.cards),ids=[];
 n.cards=oc.map((c,i)=>{const id=okId(c.id);ids[i]=id;return{id,name:str(c.name,40)||'Tarjeta',limit:Math.max(1,num(c.limit)),rate:Math.max(0,num(c.rate)),cut:cl(c.cut),due:cl(c.due)}});
 const cid=v=>n.cards.some(c=>c.id===v)?v:(v!==''&&v!=null&&ids[+v]&&!oc[+v]?.id?ids[+v]:'');
 const dt=x=>{x=str(x,16);return /^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(x)?x:x.slice(0,10)+'T12:00'};
 n.tx=arr(o.tx).filter(t=>t&&['exp','inc','pay'].includes(t.type)&&num(t.amt)>0&&/^\d{4}-\d\d-\d\d/.test(t.date)).map(t=>({id:okId(t.id),type:t.type,amt:pos(t.amt),desc:str(t.desc),cls:LBL[t.cls]?t.cls:'otro',pay:t.type==='pay'?'Débito':PAYS.includes(t.pay)?t.pay:'Efectivo',card:t.type==='inc'?'':cid(t.card),date:dt(t.date),note:str(t.note,200),cat:str(t.cat,30),late:!!t.late}));
 n.goals=arr(o.goals).filter(g=>g&&g.n&&num(g.t)>0).map(g=>({id:okId(g.id),n:str(g.n,40),t:pos(g.t),s:pos(g.s),due:/^\d{4}-\d\d-\d\d$/.test(g.due)?g.due:''}));
 n.rec=arr(o.rec).filter(r=>r&&['exp','inc'].includes(r.type)&&num(r.amt)>0&&r.desc).map(r=>({id:okId(r.id),type:r.type,desc:str(r.desc,60),amt:pos(r.amt),day:cl(r.day),cls:LBL[r.cls]?r.cls:'need',pay:PAYS.includes(r.pay)?r.pay:'Débito',card:cid(r.card),cat:str(r.cat,30),last:/^\d{4}-\d\d$/.test(r.last)?r.last:''}));
 n.ch=[...new Set(arr(o.ch).map(Number).filter(w=>Number.isInteger(w)&&w>=1&&w<=52))];n.chBase=Math.max(1,num(o.chBase)||10);
 for(const k in n.budget)n.budget[k]=pos(o.budget?.[k]);
 if(o.learn&&typeof o.learn==='object')Object.entries(o.learn).slice(-400).forEach(([k,v])=>{if(LBL[v]&&k.length<=60)n.learn[k]=v});
 n.lastPay=PAYS.includes(o.lastPay)?o.lastPay:'Efectivo';n.lastCard=cid(o.lastCard||'');
 n.theme=o.theme===AUTO||THEMES[o.theme]?o.theme:o.v>=3||!o.theme?AUTO:'Verde Financiero';n.hide=!!o.hide;n.fs=Math.min(20,Math.max(13,num(o.fs)||16));n.dense=!!o.dense;n.h1=tm(o.h1,'14:00');n.h2=tm(o.h2,'20:00');n.tourDone=!!o.tourDone;n.notif=!!o.notif;n.last=str(o.last,20);n.lastBk=str(o.lastBk,10);return n}

/* ---------- motor inteligente ---------- */
const KW={need:'renta alquiler hipoteca luz agua gas internet telefono celular recarga despensa super supermercado mercado walmart soriana chedraui costco bodega transporte camion gasolina metro metrobus uber didi taxi pasaje estacionamiento caseta salud medicina medicinas medicamento medicamentos farmacia doctor medico consulta dentista hospital seguro escuela colegiatura inscripcion uniforme utiles comida tortillas leche huevo huevos pan verdura verduras fruta frutas carne pollo arroz frijol aceite jabon detergente papel panales predial mantenimiento lavanderia',
ant:'botana botanas papas sabritas cafe antojo antojos refresco refrescos coca dulce dulces chocolate netflix spotify disney hbo prime youtube juego juegos videojuego steam cine snack helado cerveza cervezas alcohol vino galleta galletas chicle starbucks suscripcion ubereats rappi didifood pizza hamburguesa hamburguesas tacos elote churros fiesta bar antro cigarros apuesta',
inv:'libro libros gimnasio gym curso cursos clase clases ahorro herramienta herramientas deporte taller certificacion inversion cetes acciones udemy coursera idioma ingles computadora laptop'};
const RX=Object.fromEntries(Object.entries(KW).map(([k,v])=>[k,new RegExp('\\b('+v.split(' ').join('|')+')\\b','g')]));
const STOP=new Set('en de del por para la el los las con una uno unos unas que mas mis tus sus al y o a'.split(' '));
const keyOf=s=>norm(s).replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w.length>2&&!STOP.has(w)).slice(0,2).join(' ');
function classify(desc){const k=keyOf(desc);if(k&&S.learn[k])return S.learn[k];const t=norm(desc).replace(/uber eats/g,'ubereats').replace(/didi food/g,'didifood');let b='otro',n=0;for(const c of['ant','inv','need']){const x=(t.match(RX[c])||[]).length;if(x>n){n=x;b=c}}return b}
function learn(desc,cls){const k=keyOf(desc);if(!k)return;delete S.learn[k];S.learn[k]=cls;const ks=Object.keys(S.learn);if(ks.length>400)delete S.learn[ks[0]]}
const DIAG={need:['Gasto necesario','Cubre lo vital. Compara precios si puedes.'],inv:['Gasto inteligente','Esto trabaja a tu favor a largo plazo.'],ant:['Gasto hormiga','Pequeño hoy, grande al año. Revisa el simulador en Planear.'],otro:['Sin clasificar','Elige la categoría y la app aprenderá para la próxima.']};
/* «$28 en papas ayer» → {amt:28, desc:'Papas', dd:1} */
function smart(text){let t=` ${text} `,amt=NaN,dd=0;
 const x=t.match(/\$\s*(\d[\d.,]*)/)||t.match(/(\d[\d.,]*)\s*(?:pesos|mxn|usd|eur|d[oó]lares|euros|soles|reales)\b/i);
 if(x){amt=parseAmount(x[1]);t=t.replace(x[0],' ')}else{const all=[...t.matchAll(/(?:^|\s)(\d[\d.,]*)(?=\s|$)/g)],l=all[all.length-1];if(l){amt=parseAmount(l[1]);t=t.slice(0,l.index)+' '+t.slice(l.index+l[0].length)}}
 if(/(^|\s)(antier|anteayer)(?=\s|$)/i.test(t)){dd=2;t=t.replace(/(^|\s)(antier|anteayer)(?=\s|$)/i,' ')}else if(/(^|\s)ayer(?=\s|$)/i.test(t)){dd=1;t=t.replace(/(^|\s)ayer(?=\s|$)/i,' ')}
 let desc=t.replace(/\s+/g,' ').trim().replace(/^((en|de|por|para|del|el|la|los|las|un|una)\s+)+/i,'').replace(/[\s.,;:]+$/,'');
 return{amt,desc:desc&&desc[0].toUpperCase()+desc.slice(1),dd}}
function score(d){const e=exp(d);if(!e.length)return 90;const t=sum(e),p=c=>sum(e.filter(x=>x.cls===c))/t,mo=d.slice(0,7),b=incSum(mo)/30;
 const s=100-60*p('ant')-10*p('otro')+15*p('inv')-(b&&t>b*1.3?Math.min(25,25*(t/b-1.3)):0)+(b&&sum(exp(mo))<b*24?5:0);return Math.max(0,Math.min(100,Math.round(s)))}
function bal(){let inc=0,cash=0,cred=0,pay=0;for(const t of S.tx){if(t.type==='inc')inc+=t.amt;else if(t.type==='pay')pay+=t.amt;else if(t.pay==='Crédito')cred+=t.amt;else cash+=t.amt}return{inc,ex:cash+cred,liq:inc-cash-pay,debt:cred-pay}}
/* Revisa que la liquidez nunca sea negativa y que ninguna tarjeta pase su límite. */
function ledgerError(list){const run=(L,onlyFinal)=>{let q=0;const d={},ck=()=>{if(q<-.005)return `Fondos insuficientes: te faltarían ${money(-q)}.`;for(const c of S.cards){const v=d[c.id]||0;if(v>c.limit+.005)return `Excede el límite de ${c.name} por ${money(v-c.limit)}.`;if(v<-.005)return `El pago supera la deuda de ${c.name}.`}return null};
 for(const t of L.slice().sort(byDate)){if(t.type==='inc')q+=t.amt;else if(t.type==='pay'){q-=t.amt;d[t.card]=(d[t.card]||0)-t.amt}else if(t.pay==='Crédito')d[t.card]=(d[t.card]||0)+t.amt;else q-=t.amt;if(!onlyFinal){const e=ck();if(e)return e}}return onlyFinal?ck():null};
 return run(list,!!run(S.tx))}
const cdebt=c=>sum(exp().filter(t=>t.pay==='Crédito'&&t.card===c.id))-sum(S.tx.filter(t=>t.type==='pay'&&t.card===c.id));
function daysTo(day){const n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate()),at=(y,mo)=>new Date(y,mo,Math.min(day,new Date(y,mo+1,0).getDate()));let d=at(t.getFullYear(),t.getMonth());if(d<t)d=at(t.getFullYear(),t.getMonth()+1);return Math.round((d-t)/864e5)}
const wk=o=>exp().filter(t=>{const d=t.date.slice(0,10);return d>ds(7*(o+1))&&d<=ds(7*o)});
function sm(e){const t=sum(e),p=c=>pct(sum(e.filter(x=>x.cls===c)),t);return{t,need:p('need'),ant:p('ant'),inv:p('inv')}}
const rec=(s,sc)=>!s.t?'Día sin gastos: excelente. Mantén el ritmo.':s.ant>30?'Mañana cambia un gasto hormiga por una opción casera.':sc>=80?'Buen control. Aparta una parte para tu meta de ahorro.':'Define un tope diario y revisa lo que quedó sin clasificar.';
const waText=k=>{const s=sm(k==='w'?wk(0):exp(today())),sc=score(today());return `🪙 *Porte-Monnaie Malin* — ${k==='w'?'últimos 7 días':today()}\n💸 Gastado: ${money(s.t)}\n✅ Necesario: ${s.need}%\n🐜 Hormiga: ${s.ant}%\n📈 Inversión: ${s.inv}%\n⭐ Score de hoy: ${sc}/100\n💡 ${rec(s,sc)}`};
/* Gastos fijos: cuándo tocan este mes y si ya se registraron. */
const recDay=r=>Math.min(r.day,daysIn(thisMonth())),recDone=r=>r.last===thisMonth();
const recPending=()=>S.rec.filter(r=>!recDone(r)&&recDay(r)<=new Date().getDate());
function spendPlan(){const mo=thisMonth(),left=daysIn(mo)-new Date().getDate()+1,spent=sum(exp(mo)),todaySp=sum(exp(today())),fixed=sum(S.rec.filter(r=>r.type==='exp'&&!recDone(r)));
 if(S.budget.total){const avail=S.budget.total-(spent-todaySp);return{kind:'b',daily:avail/left-todaySp,left:S.budget.total-spent,days:left}}
 const liq=bal().liq-fixed;return{kind:'l',daily:(liq+todaySp)/left-todaySp,left:liq,days:left,fixed}}

/* ---------- estado de la interfaz ---------- */
const TABS=[['home','Inicio','home'],['movs','Movimientos','list'],['add','Nuevo','plus'],['stats','Análisis','chart'],['plan','Planear','target']];
const ROUTES=['home','movs','stats','plan','set'];
let tab='home',hm=thisMonth(),fb='',charts=[],ts=0,PL='bud',SH=null,installEv=null,updReady=false;
const MF={mo:thisMonth(),q:'',type:'all',cls:'all',lim:120};

/* ---------- piezas de vista ---------- */
function txRow(t){const k=t.type==='exp'?t.cls:t.type,cn=cardName(t.card);
 const sub=t.type==='exp'?`<span class="tag ${t.cls}">${LBL[t.cls]}</span>${esc(t.pay)}${cn?' · '+esc(cn):''}`:t.type==='inc'?`Ingreso${t.cat?' · '+esc(t.cat):''}`:'Pago de tarjeta';
 return `<button class="tx" data-a="edit" data-i="${t.id}"><span class="av ${k}" aria-hidden="true">${EMO[k]}</span><span class="grow"><span class="d ell" style="display:block">${esc(t.desc)}</span><span class="s">${sub} · ${t.date.slice(11,16)}${t.late?' · <span class="tag">olvidado</span>':''}${t.note?` · 📝 <span class="ell" style="max-width:12em;display:inline-block;vertical-align:bottom">${esc(t.note)}</span>`:''}</span></span><span class="r"><b class="amt ${t.type==='inc'?'n':''}">${t.type==='inc'?'+':'−'}${money(t.amt)}</b></span></button>`}
function txList(L,empty='Aún no hay movimientos.'){if(!L.length)return `<div class="empty">${ic('list')}${empty}</div>`;let h='',d='';
 const tot={};L.forEach(t=>{const k=t.date.slice(0,10);if(t.type==='exp')tot[k]=(tot[k]||0)+t.amt});
 for(const t of L){const k=t.date.slice(0,10);if(k!==d){d=k;h+=`<div class="day"><span>${dayLabel(k)}</span>${tot[k]?`<span class="amt">−${money(tot[k])}</span>`:''}</div>`}h+=txRow(t)}return h}
const sorted=L=>L.slice().sort((a,b)=>b.date.localeCompare(a.date));
const mnav=(a,v,all)=>`<div class="mnav"><button class="ic" data-a="${a}" data-i="-1" aria-label="Mes anterior">${ic('left')}</button><b>${v==='all'?'Todo el historial':monthName(v)}</b><button class="ic" data-a="${a}" data-i="1" aria-label="Mes siguiente" ${v!=='all'&&v>=thisMonth()?'disabled':''}>${ic('right')}</button>${all?`<button class="chip ${v==='all'?'on':''}" data-a="${a}" data-i="all">Todo</button>`:''}</div>`;
const ring=(v,c)=>`<div class="ring" style="--v:${v};--c:${CV[c]}" role="img" aria-label="Score ${v} de 100"><b class="${c}">${v}</b></div>`;
const greet=()=>{const h=new Date().getHours();return h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches'};
const feedback=t=>{const[a,b]=DIAG[t.cls];return `<div class="msg ok"><span><b>${EMO[t.cls]} ${a}</b> — ${b} Score de hoy: <b>${score(today())}</b>.</span><button class="sm" data-a="edit" data-i="${t.id}">Cambiar</button></div>`};

function alerts(){const out=[],mo=thisMonth();
 if(updReady)out.push(`<div class="msg"><span>Hay una versión nueva de la app lista.</span><button class="sm p" data-a="reload">Actualizar</button></div>`);
 recPending().forEach(r=>out.push(`<div class="msg ${r.type==='exp'?'bad':'ok'}"><span>${r.type==='exp'?'Pago fijo':'Ingreso fijo'} pendiente: <b>${esc(r.desc)}</b> ${m(r.amt)} (día ${recDay(r)})</span><button class="sm p" data-a="recDo" data-i="${r.id}">Registrar</button><button class="sm" data-a="recSkip" data-i="${r.id}">Omitir este mes</button></div>`));
 S.cards.forEach(c=>{const debt=cdebt(c),dd=daysTo(c.due),dc=daysTo(c.cut);if(debt>.005&&dd<=5)out.push(`<div class="msg bad"><span>Pago de <b>${esc(c.name)}</b> ${dd?`en ${plural(dd,'día')}`:'<b>hoy</b>'} · deuda ${m(debt)}</span><button class="sm" data-a="payCard" data-i="${c.id}">Pagar</button></div>`);else if(dc<=2)out.push(`<div class="msg"><span>Corte de <b>${esc(c.name)}</b> ${dc?`en ${plural(dc,'día')}`:'<b>hoy</b>'}.</span></div>`)});
 if(S.budget.total){const p=pct(sum(exp(mo)),S.budget.total);if(p>=80)out.push(`<div class="msg ${p>=100?'bad':''}"><span>${p>=100?'Rebasaste':'Llevas el '+p+'% de'} tu presupuesto del mes.</span><button class="sm" data-a="go" data-i="plan" data-p="bud">Ver</button></div>`)}
 if(S.tx.length>=5&&(!S.lastBk||S.lastBk<ds(30)))out.push(`<div class="msg"><span>${S.lastBk?'Hace más de 30 días que no respaldas':'Aún no tienes un respaldo'}. Tus datos solo viven en este dispositivo.</span><button class="sm" data-a="backup">Respaldar ahora</button></div>`);
 return out.join('')}

/* ---------- vistas ---------- */
const V={
home(){const b=bal(),sc=score(today()),mo=thisMonth(),mi=incSum(mo),me=sum(exp(mo)),sp=spendPlan(),rc=sorted(S.tx).slice(0,6);
 return `<h2>${greet()}, ${esc(S.profile.name)}</h2>${alerts()}
<div class="pn hero"><div class="row nb" style="align-items:flex-start;padding:0"><div class="grow"><div class="k">Liquidez disponible</div><div class="num big">${m(b.liq,b.liq<0?'a':'')}</div></div>${ring(sc,scc(sc))}</div>
<div class="meta k">${sp.daily>0?`<span>Puedes gastar <b class="amt" style="color:var(--ink)">${money(sp.daily)}</b> hoy${sp.kind==='b'?' según tu presupuesto':''}</span>`:sp.kind==='b'?'<span class="a">Ya usaste tu presupuesto de hoy</span>':''}<span>${plural(sp.days,'día')} para fin de mes</span>${b.debt>.005?`<span>Deuda en tarjetas ${m(b.debt)}</span>`:''}</div>
<p class="btns" style="margin:12px 0 0"><button class="sm" data-a="close">Cierre del día</button><button class="sm" data-a="newTx" data-i="inc">+ Ingreso</button>${S.cards.length?'<button class="sm" data-a="newTx" data-i="pay">Pagar tarjeta</button>':''}</p></div>
<div class="pn"><h3>Anota un gasto</h3><form class="quick" data-f="quick" autocomplete="off"><input id="qa" data-c="qa" placeholder="45 café · $320 gasolina ayer" aria-label="Gasto rápido: monto y descripción" enterkeyhint="done" list="dlq"><button class="p" aria-label="Anotar">${ic('plus')}</button></form><datalist id="dlq">${suggest('exp')}</datalist>
<div class="hint k" id="qh">Escribe monto y concepto; la categoría se detecta sola. <button class="lnk" data-a="newTx" data-i="exp">Más detalles</button></div><div id="fb" aria-live="polite">${fb}</div></div>
<div class="g"><div class="pn kpi"><div class="k">Ingresos de ${monthName(mo).split(' ')[0]}</div><div class="num n">${m(mi)}</div></div><div class="pn kpi"><div class="k">Gastos del mes</div><div class="num a">${m(me)}</div></div><div class="pn kpi"><div class="k">Ahorro del mes</div><div class="num ${mi-me>=0?'n':'a'}">${m(mi-me)}</div></div>${S.budget.total?`<div class="pn kpi"><div class="k">Presupuesto</div><div class="num">${pct(me,S.budget.total)}%</div><div class="bar"><i class="${barCls(pct(me,S.budget.total))}" style="width:${Math.min(100,pct(me,S.budget.total))}%"></i></div></div>`:''}</div>
<div class="pn"><h3>Recientes ${S.tx.length>6?'<button class="lnk" data-a="go" data-i="movs">Ver todos</button>':''}</h3>${txList(rc,'Aún no hay movimientos. Anota tu primer gasto arriba.')}</div>`},

movs(){return `<h2>Movimientos</h2><div class="row nb" style="padding-top:0;flex-wrap:wrap">${mnav('mfMo',MF.mo,true)}<button class="sm" data-a="csv">${ic('dl')} CSV</button></div>
<div class="filters"><label class="sr" style="position:relative"><input id="q" type="search" value="${esc(MF.q)}" placeholder="Buscar concepto, nota…" data-c="q" aria-label="Buscar"></label><select data-ch="ft" aria-label="Tipo">${opts([['all','Todos'],['exp','Gastos'],['inc','Ingresos'],['pay','Pagos']],MF.type)}</select><select data-ch="fc" aria-label="Categoría">${opts([['all','Categorías'],...Object.entries(LBL)],MF.cls)}</select></div>
<div class="pn" id="lst">${movList()}</div>`},

stats(){const mo=hm,e=exp(mo),i=incSum(mo),t=sum(e),n=daysIn(mo),now=mo===thisMonth(),el=now?new Date().getDate():n,proj=now?t/el*n:t,rate=i?pct(i-t,i):null;
 const vals=Array.from({length:n},(_,k)=>sum(exp(`${mo}-${pad(k+1)}`))),nz=vals.filter(Boolean),ref=S.budget.total?S.budget.total/n:i?i/n:nz.length?sum(nz.map(a=>({amt:a})))/nz.length:1;
 const cell=v=>v<=ref*.7?'var(--ok)':v<=ref*1.2?'var(--wr)':'var(--bad)',off=(new Date(mo+'-01T12:00').getDay()+6)%7;
 const byc=Object.keys(LBL).map(k=>[k,sum(e.filter(x=>x.cls===k))]);
 return `<h2>Análisis</h2><div class="row nb" style="padding-top:0;flex-wrap:wrap">${mnav('hmMo',mo)}<button class="sm" data-a="pdf">${ic('dl')} PDF del mes</button></div>
<div class="g"><div class="pn kpi"><div class="k">Ingresos</div><div class="num n">${m(i)}</div></div><div class="pn kpi"><div class="k">Gastos</div><div class="num a">${m(t)}</div></div><div class="pn kpi"><div class="k">Ahorro${rate!==null?` · ${rate}%`:''}</div><div class="num ${i-t>=0?'n':'a'}">${m(i-t)}</div></div><div class="pn kpi"><div class="k">${now?'Proyección de gasto':'Promedio diario'}</div><div class="num">${m(now?proj:t/n)}</div></div></div>
<div class="g2"><div class="pn"><h3>Mapa de calor</h3><div class="hm">${['L','M','X','J','V','S','D'].map(d=>`<span>${d}</span>`).join('')}${'<span></span>'.repeat(off)}${vals.map((v,k)=>{const d=`${mo}-${pad(k+1)}`;return `<button data-a="day" data-i="${d}" class="${v?'':'z'} ${d===today()?'t':''}" ${v?`style="background:${cell(v)};color:var(--hmt)"`:''} aria-label="${k+1}: ${S.hide?'oculto':money(v)}">${k+1}</button>`}).join('')}</div>
<div class="lg"><span><i style="background:var(--ok)"></i>≤70%</span><span><i style="background:var(--wr)"></i>≤120%</span><span><i style="background:var(--bad)"></i>más</span><span>de ${m(ref)}/día</span></div></div>
<div class="pn"><h3>Por categoría</h3>${t?`<div class="cv sq" style="height:190px"><canvas id="ch1" role="img" aria-label="Gasto por categoría"></canvas></div>${byc.map(([k,v])=>`<div class="row"><span><span class="tag ${k}">${EMO[k]} ${LBL[k]}</span></span><span class="r">${m(v)} <span class="k">${pct(v,t)}%</span></span></div>`).join('')}`:`<div class="empty">${ic('chart')}Sin gastos este mes.</div>`}</div></div>
<div class="pn"><h3>Ritmo de gasto acumulado</h3><div class="cv"><canvas id="ch3" role="img" aria-label="Gasto acumulado del mes contra el mes anterior"></canvas></div></div>
<div class="pn"><h3>Ingresos vs gastos, 6 meses</h3><div class="cv"><canvas id="ch2" role="img" aria-label="Comparativo de 6 meses"></canvas></div></div>
<div class="g2">${weekly()}${topSpend(e,t)}</div>${subs()}`},

plan(){const segs=[['bud','Presupuesto'],['cards','Tarjetas'],['goals','Metas'],['rec','Fijos'],['tools','Simuladores']];
 return `<h2>Planear</h2><div class="seg" role="tablist">${segs.map(([k,l])=>`<button role="tab" aria-selected="${PL===k}" class="${PL===k?'on':''}" data-a="pl" data-i="${k}">${l}</button>`).join('')}</div>${P[PL]()}`},

set(){return `<h2>Ajustes</h2><div class="g2"><div class="pn"><h3>Perfil</h3><div class="f">${fld('Nombre',`<input value="${esc(S.profile.name)}" maxlength="30" data-c="name">`)}${fld('Moneda',`<select data-ch="cur">${opts(CURS.map(c=>[c,c]),cur())}</select>`)}</div><p class="k">Cambiar la moneda solo cambia el símbolo; no convierte montos.</p></div>
<div class="pn"><h3>Apariencia</h3><div class="f">${fld('Tema',`<select data-ch="theme">${opts([[AUTO,'Automático (según el sistema)'],...Object.keys(THEMES).map(t=>[t,t])],S.theme)}</select>`)}${fld(`Tamaño de letra · <span id="fsv">${S.fs}px</span>`,`<input type="range" min="13" max="20" value="${S.fs}" data-c="fs">`)}</div><label class="chk"><input type="checkbox" data-ch="dense" ${S.dense?'checked':''}> Vista compacta en listas</label><label class="chk"><input type="checkbox" data-ch="hide" ${S.hide?'checked':''}> Ocultar saldos (modo discreto)</label></div></div>
<div class="g2"><div class="pn"><h3>Resúmenes diarios</h3><div class="f">${fld('Medio día',`<input type="time" value="${S.h1}" data-ch="h1">`)}${fld('Cierre diario',`<input type="time" value="${S.h2}" data-ch="h2">`)}</div><p><button data-a="notif">${S.notif&&window.Notification?.permission==='granted'?'✓ Notificaciones activas':'Activar notificaciones'}</button></p><p class="k">Llegan mientras la app esté abierta o en segundo plano; sin servidor no pueden dispararse con ella cerrada.</p></div>
<div class="pn"><h3>Respaldo y exportación</h3><div class="btns"><button class="p" data-a="backup">${ic('dl')} Descargar respaldo (.json)</button><button data-a="csvAll">CSV completo</button><button data-a="pdf">PDF de ${monthName(hm)}</button></div>${fld('Restaurar respaldo (.json)','<input type="file" accept=".json,application/json" data-ch="imp">','sp')}<p class="k">Último respaldo: ${S.lastBk||'nunca'}. Usa el respaldo para pasar tus datos a otro dispositivo.</p></div></div>
${installEv?`<div class="pn"><h3>Instalar</h3><p class="k">Úsala como app, sin barra del navegador y sin conexión.</p><button class="p" data-a="install">Instalar Porte-Monnaie Malin</button></div>`:''}
<div class="pn"><h3>Zona de riesgo</h3><button class="danger" data-a="wipe">Borrar todos mis datos</button></div>
<p class="k" style="text-align:center">Porte-Monnaie Malin ${VERSION} · ${S.tx.length} movimientos · todo se guarda solo en este dispositivo.<br><i>L'art de gérer votre argent en toute sagesse.</i></p>`}};

function suggest(type){const seen=new Set();return sorted(S.tx).filter(t=>t.type===type&&!seen.has(t.desc)&&seen.add(t.desc)).slice(0,40).map(t=>`<option value="${esc(t.desc)}">`).join('')}
function movFiltered(){const q=norm(MF.q);return sorted(S.tx.filter(t=>(MF.mo==='all'||t.date.startsWith(MF.mo))&&(MF.type==='all'||t.type===MF.type)&&(MF.cls==='all'||t.type==='exp'&&t.cls===MF.cls)&&(!q||norm(`${t.desc} ${t.note} ${t.cat} ${t.pay} ${cardName(t.card)}`).includes(q))))}
function movList(){const L=movFiltered(),i=sum(L.filter(t=>t.type==='inc')),e=sum(L.filter(t=>t.type==='exp'));
 return `<div class="sum3"><div><span class="k">Ingresos</span><b class="n">${m(i)}</b></div><div><span class="k">Gastos</span><b class="a">${m(e)}</b></div><div><span class="k">Neto</span><b class="${i-e>=0?'n':'a'}">${m(i-e)}</b></div></div><p class="k" style="text-align:center;margin:0 0 6px">${plural(L.length,'movimiento')}</p>
${txList(L.slice(0,MF.lim),MF.q||MF.type!=='all'||MF.cls!=='all'?'Sin resultados con esos filtros.':'No hay movimientos en este periodo.')}${L.length>MF.lim?`<p style="text-align:center"><button data-a="more">Ver ${Math.min(120,L.length-MF.lim)} más</button></p>`:''}`}
function weekly(){const tw=sum(wk(0)),lw=sum(wk(1)),df=lw?pct(tw-lw,lw):null,dow=Array(7).fill(0),all=exp(),tt=sum(all),dn=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];all.forEach(t=>dow[new Date(t.date.slice(0,10)+'T12:00').getDay()]+=t.amt);
 const mi=dow.indexOf(Math.max(...dow)),pc=tt?Math.round(100*(dow[mi]/(tt/7)-1)):0,top=Object.entries(LBL).map(([k,v])=>[v,sum(wk(0).filter(t=>t.cls===k))]).sort((a,b)=>b[1]-a[1])[0];
 return `<div class="pn"><h3>Tu semana</h3><p>Últimos 7 días: <b>${m(tw)}</b> frente a ${m(lw)} ${df===null?'':`(<b class="${df>0?'a':'n'}">${df>0?'+':''}${df}%</b>)`}</p>${tt&&pc>0?`<p class="k">Los ${dn[mi]} gastas ${pc}% más que tu promedio por día de la semana.</p>`:''}${tw?`<p class="k">Mayor fuga de la semana: ${top[0]} (${m(top[1])}).</p>`:''}<button class="sm" data-a="wa" data-i="w">${ic('send')} Compartir por WhatsApp</button></div>`}
function topSpend(e,t){const g={};e.forEach(x=>{const k=keyOf(x.desc)||norm(x.desc);(g[k]??={d:x.desc,s:0,n:0});g[k].s+=x.amt;g[k].n++});const top=Object.values(g).sort((a,b)=>b.s-a.s).slice(0,5);
 return `<div class="pn"><h3>Dónde se va tu dinero</h3>${top.map(x=>`<div class="row"><span class="grow ell">${esc(x.d)} <span class="k">×${x.n}</span></span><span class="r">${m(x.s)}</span></div><div class="bar" style="margin-top:-4px"><i style="width:${pct(x.s,top[0].s)}%;background:var(--ac)"></i></div>`).join('')||`<div class="empty">Sin gastos este mes.</div>`}${t?`<p class="k">Total del mes: ${m(t)}</p>`:''}</div>`}
function subs(){const g={};exp().forEach(t=>{const k=keyOf(t.desc);if(k)(g[k]??=[]).push(t)});
 const r=Object.values(g).filter(a=>{if(a.length<2)return false;const d=a.map(t=>new Date(t.date.slice(0,10)+'T12:00')).sort((x,y)=>x-y);return d.slice(1).every((x,i)=>{const n=(x-d[i])/864e5;return n>=25&&n<=35})});
 const known=new Set(S.rec.map(x=>keyOf(x.desc)));
 return `<div class="pn"><h3>Posibles suscripciones</h3>${r.map(a=>{const avg=sum(a)/a.length,k=keyOf(a[0].desc);return `<div class="row"><span class="grow ell">${esc(a[0].desc)}</span><b class="i amt">~${money(avg)}/mes</b>${known.has(k)?'<span class="tag">fijo</span>':`<button class="sm" data-a="subFix" data-i="${a[a.length-1].id}">Hacer fijo</button>`}</div>`}).join('')||'<p class="k">Sin cobros recurrentes detectados (se necesitan 2 cobros con ~1 mes de diferencia).</p>'}</div>`}

/* ---------- subsecciones de Planear ---------- */
function avgIncome(){const mo=thisMonth(),avg=[1,2,3].map(k=>incSum(monthAdd(mo,-k))).filter(Boolean);return avg.length?avg.reduce((a,b)=>a+b)/avg.length:incSum(mo)}
function budView(){const mo=thisMonth(),e=exp(mo),t=sum(e),B=S.budget;
 const line=(lbl,spent,lim,k)=>`<div class="row"><span class="grow">${lbl}</span><span class="r">${m(spent)} <span class="k">/ ${lim?m(lim):'sin tope'}</span></span></div>${lim?`<div class="bar"><i class="${barCls(pct(spent,lim))}" style="width:${Math.min(100,pct(spent,lim))}%"></i></div><p class="k" style="margin:0 0 4px">${spent<=lim?`Quedan ${m(lim-spent)}`:`Te pasaste por ${m(spent-lim)}`}${k==='total'&&spent<=lim?` · ${m((lim-spent)/(daysIn(mo)-new Date().getDate()+1))} por día`:''}</p>`:''}`;
 return `<h3>${monthName(mo)}</h3>${line('<b>Total del mes</b>',t,B.total,'total')}${Object.keys(LBL).map(k=>line(`${EMO[k]} ${LBL[k]}`,sum(e.filter(x=>x.cls===k)),B[k],k)).join('')}`}
const P={
bud(){const mo=thisMonth(),B=S.budget,ai=avgIncome();
 return `<div class="pn" id="budv">${budView()}</div>
<div class="pn"><h3>Topes mensuales</h3><p class="k">Deja en 0 lo que no quieras limitar. El total también calcula cuánto puedes gastar cada día.</p><div class="f">${fld('Total del mes',`<input inputmode="decimal" data-ch="bud" data-i="total" value="${B.total||''}" placeholder="0">`)}${Object.keys(LBL).map(k=>fld(LBL[k],`<input inputmode="decimal" data-ch="bud" data-i="${k}" value="${B[k]||''}" placeholder="0">`)).join('')}</div>
${ai?`<button data-a="budSug">Sugerir con regla 50/30/20</button> <span class="k">a partir de tu ingreso promedio (${m(ai)})</span>`:'<p class="k">Registra ingresos y te sugeriremos un presupuesto.</p>'}</div>`},
cards(){return `<p><button class="p" data-a="cardForm">${ic('plus')} Agregar tarjeta</button></p>`+(S.cards.map(c=>{const d=Math.max(0,cdebt(c)),dc=daysTo(c.cut),dd=daysTo(c.due),u=pct(d,c.limit);
 return `<div class="pn"><h3><span>${ic('card')} ${esc(c.name)}</span><span class="tag">${c.rate}% anual</span></h3><div class="sum3"><div><span class="k">Deuda</span><b class="i">${m(d)}</b></div><div><span class="k">Disponible</span><b>${m(Math.max(0,c.limit-d))}</b></div><div><span class="k">Uso</span><b class="${u>70?'a':u>30?'w':'n'}">${u}%</b></div></div><div class="bar"><i class="${u>70?'a':u>30?'w':''}" style="width:${Math.min(100,u)}%"></i></div>
<div class="row nb"><span>Interés mensual si no pagas</span>${m(d*c.rate/1200)}</div><div class="row"><span>Corte (día ${c.cut})</span><b class="${colDays(dc)}">${dc?'en '+plural(dc,'día'):'hoy'}</b></div><div class="row"><span>Pago límite (día ${c.due})</span><b class="${d>0?colDays(dd):''}">${dd?'en '+plural(dd,'día'):'hoy'}</b></div>
<div class="btns">${d>0?`<button class="p sm" data-a="payCard" data-i="${c.id}">Registrar pago</button>`:''}<button class="sm" data-a="cardForm" data-i="${c.id}">Editar</button><button class="sm danger" data-a="delCard" data-i="${c.id}">Eliminar</button></div>${u>30?'<p class="k">Mantener el uso por debajo del 30% ayuda a tu historial crediticio.</p>':''}</div>`}).join('')||`<div class="pn empty">${ic('card')}Agrega una tarjeta para ver fechas de corte, deuda e intereses.</div>`)},
goals(){return `<p><button class="p" data-a="goalForm">${ic('plus')} Nueva meta</button></p>`+(S.goals.map(g=>{const p=pct(g.s,g.t),done=g.s>=g.t,days=g.due?Math.round((new Date(g.due+'T12:00')-new Date(today()+'T12:00'))/864e5):null,months=days!==null?Math.max(1,Math.ceil(days/30.4)):0;
 return `<div class="pn"><h3><span>${done?'🎉 ':''}${esc(g.n)}</span><span class="k">${p}%</span></h3><div class="row nb"><span>${m(g.s)} <span class="k">de ${m(g.t)}</span></span>${done?'<b class="n">¡Lograda!</b>':`<span class="k">faltan ${m(g.t-g.s)}</span>`}</div><div class="bar"><i style="width:${Math.min(100,p)}%"></i></div>
${g.due&&!done?`<p class="k">${days<0?`La fecha (${g.due}) ya pasó.`:`Fecha: ${g.due} · aparta <b class="amt">${money((g.t-g.s)/months)}</b> al mes (${plural(months,'mes','meses')}).`}</p>`:''}<div class="btns"><button class="sm p" data-a="abonar" data-i="${g.id}">Abonar</button>${g.s>0?`<button class="sm" data-a="retirar" data-i="${g.id}">Retirar</button>`:''}<button class="sm" data-a="goalForm" data-i="${g.id}">Editar</button><button class="sm danger" data-a="delGoal" data-i="${g.id}">Eliminar</button></div></div>`}).join('')||`<div class="pn empty">${ic('target')}Crea una meta: un viaje, un fondo de emergencia, una compu…</div>`)+'<p class="k">Las metas son apartados: abonar no descuenta de tu liquidez.</p>'},
rec(){const fe=sum(S.rec.filter(r=>r.type==='exp')),fi=sum(S.rec.filter(r=>r.type==='inc'));
 return `<p><button class="p" data-a="recForm">${ic('plus')} Agregar fijo</button></p><div class="pn"><div class="sum3"><div><span class="k">Ingresos fijos</span><b class="n">${m(fi)}</b></div><div><span class="k">Gastos fijos</span><b class="a">${m(fe)}</b></div><div><span class="k">Libre</span><b>${m(fi-fe)}</b></div></div></div>
<div class="pn">${S.rec.slice().sort((a,b)=>a.day-b.day).map(r=>{const done=recDone(r),due=recDay(r)<=new Date().getDate();return `<div class="row"><span class="grow"><b>${esc(r.desc)}</b><br><span class="k">Día ${r.day} · ${r.type==='exp'?LBL[r.cls]+' · '+r.pay:'Ingreso'} · ${done?'<span class="n">✓ registrado este mes</span>':due?'<span class="a">pendiente</span>':`en ${plural(recDay(r)-new Date().getDate(),'día')}`}</span></span><span class="r"><b class="amt ${r.type==='inc'?'n':''}">${money(r.amt)}</b><br>${done?'':`<button class="sm p" data-a="recDo" data-i="${r.id}">Registrar</button> `}<button class="sm" data-a="recForm" data-i="${r.id}">Editar</button></span></div>`}).join('')||`<div class="empty">${ic('list')}Renta, sueldo, internet, suscripciones… Agrégalos una vez y te recordaremos registrarlos cada mes.</div>`}</div>`},
tools(){return `<div class="g2"><div class="pn"><h3>Gastos hormiga anualizados</h3><div class="f">${fld('Gasto diario','<input id="ha" inputmode="decimal" value="45" data-c="sim">')}${fld('Días por semana','<input id="hd" type="number" min="1" max="7" value="5" data-c="sim">')}</div><div id="ho"></div></div>
<div class="pn"><h3>Interés compuesto</h3><div class="f">${fld('Capital inicial','<input id="c0" inputmode="decimal" value="0" data-c="sim">')}${fld('Aporte mensual','<input id="cm" inputmode="decimal" value="500" data-c="sim">')}${fld('Rendimiento anual %','<input id="ci" type="number" value="10" step="0.1" min="0" data-c="sim">')}</div><div id="co"></div></div></div>
<div class="pn"><h3>Reto de 52 semanas</h3><p class="k">La semana N ahorras N × tu base. Toca cada semana que cumplas.</p>${fld('Base semanal',`<input id="cb" inputmode="decimal" value="${S.chBase}" data-c="cb" style="max-width:200px">`)}<div id="chl"></div></div>
<div class="pn"><h3>Mercado y cripto</h3><div id="mk"><p class="k">Por privacidad, los precios solo se consultan cuando lo pides.</p></div><p class="k">Datos de CoinGecko. Consultarlo expone tu IP a ese servicio; tus finanzas nunca se envían. <button class="sm" data-a="mkr">Consultar precios</button></p></div>`}};

/* ---------- gráficas ---------- */
function drawCharts(){charts.forEach(c=>c.destroy());charts=[];if(!window.Chart)return;const cs=getComputedStyle(document.documentElement),g=k=>cs.getPropertyValue('--'+k).trim(),mo=hm,e=exp(mo),ks=Object.keys(LBL);
 Chart.defaults.color=g('mu');Chart.defaults.font.family='system-ui,sans-serif';Chart.defaults.borderColor=g('ln');Chart.defaults.animation=matchMedia('(prefers-reduced-motion: reduce)').matches?false:{duration:500};
 const tip={callbacks:{label:c=>`${c.dataset.label||c.label}: ${S.hide?'•••':money(c.parsed.y??c.parsed)}`}},tick={callback:v=>S.hide?'':new Intl.NumberFormat(LOC[cur()],{notation:'compact'}).format(v)};
 const c1=$('#ch1');if(c1)charts.push(new Chart(c1,{type:'doughnut',data:{labels:ks.map(k=>LBL[k]),datasets:[{data:ks.map(k=>sum(e.filter(t=>t.cls===k))),backgroundColor:[g('ok'),g('bad'),g('ac'),g('mu')],borderColor:g('pn'),borderWidth:3}]},options:{maintainAspectRatio:false,cutout:'62%',plugins:{legend:{display:false},tooltip:tip}}}));
 const n=daysIn(mo),now=mo===thisMonth(),el=now?new Date().getDate():n,pm=monthAdd(mo,-1),cum=(p,len)=>{let a=0;return Array.from({length:len},(_,k)=>a+=sum(exp(`${p}-${pad(k+1)}`)))};
 const c3=$('#ch3');if(c3){const ds3=[{label:monthName(mo),data:cum(mo,el),borderColor:g('bad'),backgroundColor:'transparent',tension:.25,pointRadius:0,borderWidth:3},{label:monthName(pm),data:cum(pm,Math.min(n,daysIn(pm))),borderColor:g('mu'),borderDash:[5,5],tension:.25,pointRadius:0,borderWidth:2}];
  if(S.budget.total)ds3.push({label:'Presupuesto',data:Array.from({length:n},(_,k)=>S.budget.total*(k+1)/n),borderColor:g('ok'),pointRadius:0,borderWidth:1.5,borderDash:[2,4]});
  charts.push(new Chart(c3,{type:'line',data:{labels:Array.from({length:n},(_,k)=>k+1),datasets:ds3},options:{maintainAspectRatio:false,interaction:{mode:'index',intersect:false},elements:{line:{cubicInterpolationMode:'monotone'}},plugins:{tooltip:tip,legend:{labels:{usePointStyle:true,pointStyle:'line'}}},scales:{y:{beginAtZero:true,ticks:tick},x:{grid:{display:false}}}}}))}
 const ms=[...Array(6)].map((_,i)=>monthAdd(mo,i-5)),c2=$('#ch2');
 if(c2)charts.push(new Chart(c2,{type:'bar',data:{labels:ms.map(x=>new Date(x+'-15T12:00').toLocaleDateString('es',{month:'short'})),datasets:[{label:'Ingresos',data:ms.map(incSum),backgroundColor:g('ok'),borderRadius:6},{label:'Gastos',data:ms.map(p=>sum(exp(p))),backgroundColor:g('bad'),borderRadius:6}]},options:{maintainAspectRatio:false,plugins:{tooltip:tip,legend:{labels:{boxWidth:12}}},scales:{y:{beginAtZero:true,ticks:tick},x:{grid:{display:false}}}}}))}

/* ---------- simuladores ---------- */
function sim(){if(!$('#ha'))return;const a=parseAmount($('#ha').value)||0,dw=Math.min(7,Math.max(1,+$('#hd').value||1)),y=a*dw*52,fv=(c,r,mo)=>r?c*((1+r)**mo-1)/r*(1+r):c*mo;
 $('#ho').innerHTML=`<div class="row nb"><span>Al mes</span><b class="amt">${money(y/12)}</b></div><div class="row"><span>Al año</span><b class="num a amt">${money(y)}</b></div><div class="row"><span>Invertido 10 años al 10%</span><b class="n amt">${money(fv(y/12,.1/12,120))}</b></div>`;
 const c0=parseAmount($('#c0').value)||0,c=parseAmount($('#cm').value)||0,r=Math.max(0,+$('#ci').value||0)/1200;
 $('#co').innerHTML=`<div class="row nb k"><span>Plazo</span><span>Aportado · Total</span></div>`+[1,5,10,20].map(y=>{const mo=y*12,v=c0*(1+r)**mo+fv(c,r,mo),ap=c0+c*mo;return `<div class="row"><span>${plural(y,'año')}</span><span class="r"><span class="k amt">${money(ap)}</span> · <b class="n amt">${money(v)}</b></span></div>`}).join('')}
function chal(){const b=S.chBase,el=$('#chl');if(!el)return;el.innerHTML=`<p>Ahorrado: <b class="n amt">${money(S.ch.reduce((s,w)=>s+w*b,0))}</b> de ${m(b*1378)} · ${plural(S.ch.length,'semana')}</p><div class="bar"><i style="width:${pct(S.ch.reduce((s,w)=>s+w,0),1378)}%"></i></div><div class="wk" style="margin-top:10px">${Array.from({length:52},(_,i)=>`<button data-a="togW" data-i="${i+1}" aria-pressed="${S.ch.includes(i+1)}" aria-label="Semana ${i+1}">${i+1}</button>`).join('')}</div>`}
const MK_OK=['mxn','usd','eur','ars','clp','brl'];
async function mkt(){const el=$('#mk');if(!el)return;const c=MK_OK.includes(cur().toLowerCase())?cur().toLowerCase():'usd',fm=v=>new Intl.NumberFormat(LOC[cur()],{style:'currency',currency:c.toUpperCase()}).format(v);let ca;try{ca=JSON.parse(localStorage.getItem('pmm_mk'))}catch{}ca=ca&&ca.c===c?ca:null;
 const show=(d,msg)=>{el.innerHTML=`<p class="k">${msg}${c!==cur().toLowerCase()?` · ${cur()} no está disponible, se muestra en USD`:''}</p>`+(d?[['bitcoin','Bitcoin'],['ethereum','Ethereum'],['solana','Solana'],['tether','Dólar (USDT)']].map(([id,n])=>{const x=d[id];if(!x)return'';const ch=x[c+'_24h_change']||0;return `<div class="row"><span>${n}</span><span><b class="amt">${fm(x[c])}</b> <span class="${ch>=0?'n':'a'}">${ch>=0?'▲':'▼'} ${Math.abs(ch).toFixed(2)}%</span></span></div>`}).join(''):'')};
 show(ca&&ca.d,ca?'Último dato guardado; actualizando…':'Cargando…');
 try{const r=await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=${c}&include_24hr_change=true`);if(!r.ok)throw 0;const d=await r.json();try{localStorage.setItem('pmm_mk',JSON.stringify({c,d}))}catch{}show(d,'Actualizado '+new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'}))}
 catch{show(ca&&ca.d,ca?'Sin conexión: se muestra el último dato guardado.':'Sin conexión: precios no disponibles por ahora.')}}
const AFTER={stats:drawCharts,plan:()=>{if(PL==='tools'){sim();chal()}}};

/* ---------- render ---------- */
const mq=matchMedia('(prefers-color-scheme: dark)'),lum=h=>{const x=h.slice(1);return parseInt(x.slice(0,2),16)*.3+parseInt(x.slice(2,4),16)*.59+parseInt(x.slice(4,6),16)*.11};
function applyTheme(){const t=S.theme===AUTO?THEMES[mq.matches?'Verde Financiero':'Verde Claro']:THEMES[S.theme]||THEMES['Verde Financiero'],r=document.documentElement,st=r.style,dark=lum(t[0])<128;
 ['bg','pn','ink','mu','ac','ac2','ln'].forEach((k,i)=>st.setProperty('--'+k,t[i]));
 Object.entries(dark?{ok:'#5fcf9a',bad:'#f07a6a',wr:'#e6c14f',hmt:'#10211b'}:{ok:'#1b7a52',bad:'#c0392b',wr:'#9a6a0c',hmt:'#ffffff'}).forEach(([k,v])=>st.setProperty('--'+k,v));
 st.setProperty('--on-ac',lum(t[4])>140?'#141414':'#ffffff');st.colorScheme=dark?'dark':'light';st.fontSize=S.fs+'px';
 document.body.classList.toggle('blur',S.hide);document.body.classList.toggle('dense',S.dense);$('meta[name=theme-color]').content=t[0]}
function chrome(){$('#top').innerHTML=`<span class="brand"><img src="icon.svg" alt="">Porte-Monnaie Malin</span><button class="ic" data-a="eye" aria-pressed="${S.hide}" aria-label="${S.hide?'Mostrar':'Ocultar'} saldos" title="Ocultar saldos">${ic(S.hide?'eyeoff':'eye')}</button><button class="ic ${tab==='set'?'i':''}" data-a="go" data-i="set" aria-label="Ajustes" title="Ajustes">${ic('set')}</button>`;
 $('#nav').innerHTML=TABS.map(([k,l,i])=>k==='add'?`<button class="add" data-a="newTx" data-i="exp" aria-label="Nuevo movimiento" title="Nuevo movimiento (N)"><b>${ic('plus')}</b><span>Nuevo movimiento</span></button>`:`<button data-a="go" data-i="${k}" class="${tab===k?'on':''}" ${tab===k?'aria-current="page"':''}>${ic(i)}<span>${l}</span></button>`).join('')}
function render(){applyTheme();if(!S.profile){$('#top').innerHTML=$('#nav').innerHTML=$('#app').innerHTML='';return tour()}
 charts.forEach(c=>c.destroy());charts=[];chrome();$('#app').innerHTML=V[tab]();AFTER[tab]?.()}
function go(t){if(!ROUTES.includes(t))t='home';if(t!==tab)fb='';tab=t;if(location.hash.slice(1)!==t)history.pushState(null,'','#'+t);render();scrollTo(0,0)}

/* ---------- bienvenida ---------- */
const TOUR=[['🪙','Tu monedero inteligente','Anota gastos en segundos, mira a dónde se va tu dinero y planea tus metas.'],['🔒','Tus datos, tu dispositivo','Todo se guarda solo en este navegador. Nada viaja a ningún servidor.'],['⚡','Escribe como hablas','«45 café» o «$320 gasolina ayer»: el monto, la fecha y la categoría se completan solos.'],['📊','Diagnóstico y planes','Score diario, presupuesto, gastos fijos, tarjetas, metas y reportes en PDF.']];
function tour(){if(S.tourDone)return onboard();const[e,t,d]=TOUR[ts];modal(`<div class="tour"><div class="em" aria-hidden="true">${e}</div><h3 id="dlgT">${t}</h3><p>${d}</p><div class="dots" aria-hidden="true">${TOUR.map((_,i)=>`<i class="${i===ts?'on':''}"></i>`).join('')}</div><p class="k">${ts+1} de ${TOUR.length}</p><div class="btns" style="justify-content:space-between">${ts?'<button data-a="tb">Atrás</button>':'<button class="ghost" data-a="tskip">Saltar</button>'}<button class="p" data-a="tn" autofocus>${ts<TOUR.length-1?'Siguiente':'Empezar'}</button></div></div>`,{locked:true})}
function onboard(){modal(`<form data-f="enter" novalidate>${head('Configura tu monedero',false)}${fld('¿Cómo te llamamos?','<input id="pn" maxlength="30" autocomplete="nickname" placeholder="Tu nombre o apodo" autofocus>')}<div class="sp"></div><div class="f">${fld('Moneda',`<select id="pc">${opts(CURS.map(c=>[c,c]),'MXN')}</select>`)}${fld('¿Cuánto dinero tienes hoy?','<input id="p0" inputmode="decimal" placeholder="Opcional">')}</div><p class="k">El saldo inicial (efectivo + débito) se registra como tu primer ingreso para que tus cuentas cuadren.</p><div id="perr" class="k a" role="alert"></div><button class="p" style="width:100%">Entrar</button></form><p class="k" style="text-align:center">¿Ya la usabas en otro dispositivo? <label class="lnk" style="display:inline;cursor:pointer">Restaurar respaldo<input type="file" accept=".json,application/json" data-ch="imp" hidden></label></p>`,{locked:true})}

/* ---------- hoja de movimiento ---------- */
function openTx(type='exp',id=null,pre={}){const t=id?S.tx.find(x=>x.id===id):null;if(id&&!t)return;type=t?t.type:type;if(type==='pay'&&!S.cards.length)return toast('Primero agrega una tarjeta'),go('plan');
 SH={type,id:t?.id||null};const v={amt:'',desc:'',cls:'auto',pay:S.lastPay,card:S.cards.some(c=>c.id===S.lastCard)?S.lastCard:S.cards[0]?.id||'',date:nowLocal(),note:'',cat:ICAT[0],...(t||{}),...pre};
 if(type==='pay'&&!t&&!pre.amt){const c=S.cards.find(c=>c.id===v.card);v.amt=c?Math.max(0,cdebt(c))||'':''}
 const cardSel=`<select id="xc" ${type==='pay'?'data-ch="xcp"':''}>${opts(S.cards.map(c=>[c.id,c.name]),v.card)||'<option value="">Sin tarjetas</option>'}</select>`;
 const segs=[['exp','Gasto'],['inc','Ingreso'],...(S.cards.length?[['pay','Pago tarjeta']]:[])];
 modal(`<form data-f="save" novalidate>${head(t?'Editar movimiento':'Nuevo movimiento')}${t?'':`<div class="seg ${type}" role="tablist">${segs.map(([k,l])=>`<button type="button" role="tab" aria-selected="${k===type}" class="${k===type?'on':''}" data-a="shType" data-i="${k}">${l}</button>`).join('')}</div>`}
<input id="xa" class="amtin ${type==='inc'?'n':''}" inputmode="decimal" autocomplete="off" placeholder="0.00" value="${esc(v.amt)}" aria-label="Monto" ${t||v.desc?'':'autofocus'} enterkeyhint="next">
${type==='pay'?`<div class="sp"></div>${fld('Tarjeta',cardSel)}<p class="k" id="xdet">Deuda actual: ${m(Math.max(0,cdebt(S.cards.find(c=>c.id===v.card)||{id:''})))}</p>`:
 `<div class="sp"></div>${fld(type==='exp'?'¿En qué?':'Concepto',`<input id="xd" data-c="xd" maxlength="120" value="${esc(v.desc)}" placeholder="${type==='exp'?'Ej. despensa, café, gasolina':'Ej. quincena, venta'}" list="dlx" autocomplete="off" ${!t&&v.desc?'autofocus':''}>`)}<datalist id="dlx">${suggest(type)}</datalist><div class="det k" id="xdet"></div>
 <div class="f">${type==='exp'?fld('Categoría',`<select id="xk" data-ch="xk">${opts([['auto','Automática'],...Object.entries(LBL)],v.cls)}</select>`)+fld('Pago',`<select id="xp" data-ch="xp">${opts(PAYS.map(p=>[p,p]),v.pay)}</select>`)+`<span id="xcw" ${v.pay==='Crédito'?'':'hidden'}>${fld('Tarjeta',cardSel)}</span>`:fld('Categoría',`<select id="xic">${opts([...new Set([...ICAT,v.cat])].filter(Boolean).map(c=>[c,c]),v.cat)}</select>`)}</div>`}
${fld('Fecha y hora',`<input id="xt" type="datetime-local" max="${nowLocal()}" value="${esc(v.date)}">`)}
${type==='pay'?'':`<details ${v.note?'open':''}><summary>Nota o ticket</summary><input id="xn" maxlength="200" value="${esc(v.note)}" aria-label="Nota"></details>`}
<div id="xerr" role="alert"></div><div class="btns end" style="margin-top:12px">${t?`<button type="button" class="danger" data-a="delTx" data-i="${t.id}" style="margin-right:auto">Eliminar</button><button type="button" data-a="dupTx" data-i="${t.id}">Duplicar hoy</button>`:''}<button class="p" style="min-width:120px">${t?'Guardar':type==='exp'?'Anotar gasto':type==='inc'?'Registrar ingreso':'Registrar pago'}</button></div></form>`);
 detect()}
function detect(){const el=$('#xdet'),d=$('#xd');if(!el||!d)return;const v=d.value.trim();if(!v)return el.innerHTML='';const sp=smart(v),ks=$('#xk'),parts=[];
 if(ks&&ks.value==='auto'){const c=classify(v);parts.push(`<span class="tag ${c}">${EMO[c]} ${LBL[c]}</span> detectado`)}
 if(!(parseAmount($('#xa').value)>0)&&sp.amt>0)parts.push(`monto: <b>${money(sp.amt)}</b>`);el.innerHTML=parts.join(' · ')}
function saveTx(){const{type,id}=SH,old=id&&S.tx.find(x=>x.id===id),err=(h,el)=>{$('#xerr').innerHTML=`<div class="msg bad" style="margin-top:10px"><span>${h}</span></div>`;if(el){el.setAttribute('aria-invalid','true');el.focus()}};
 let amt=parseAmount($('#xa').value),desc=($('#xd')?.value||'').trim();
 if(type!=='pay'&&!(amt>0)&&desc){const sp=smart(desc);if(sp.amt>0){amt=sp.amt;desc=sp.desc||desc}}
 if(!(amt>0))return err('Escribe un monto mayor a cero.',$('#xa'));
 if(type!=='pay'&&!desc)return err(type==='exp'?'¿En qué gastaste? Escribe una descripción.':'Escribe el concepto del ingreso.',$('#xd'));
 const date=$('#xt').value;if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(date))return err('Elige fecha y hora.',$('#xt'));if(date>nowLocal())return err('Esa fecha y hora aún no llegan.',$('#xt'));
 const note=($('#xn')?.value||'').trim();let t;
 if(type==='exp'){const ks=$('#xk').value,auto=classify(desc),cls=ks==='auto'?auto:ks,pay=$('#xp').value,card=pay==='Crédito'?$('#xc').value:'';if(pay==='Crédito'&&!card)return err('Primero agrega una tarjeta en Planear → Tarjetas.');
  if(ks!=='auto'&&ks!==auto)learn(desc,ks);t={type,amt,desc,cls,pay,card,cat:''}}
 else if(type==='inc')t={type,amt,desc,cls:'otro',pay:'Efectivo',card:'',cat:$('#xic').value};
 else{const card=$('#xc').value;if(!card)return err('Elige una tarjeta.');t={type,amt,desc:'Pago '+cardName(card),cls:'otro',pay:'Débito',card,cat:''}}
 Object.assign(t,{id:old?old.id:uid(),date,note,late:old&&old.date===date?old.late:date.slice(0,10)<today()});
 const list=old?S.tx.map(x=>x.id===old.id?t:x):[...S.tx,t],e=ledgerError(list);
 if(e)return err(esc(e)+(/^Fondos/.test(e)&&type!=='inc'&&!old?' <button type="button" class="sm" data-a="shType" data-i="inc">Registrar un ingreso</button>':''));
 S.tx=list;if(type==='exp'){S.lastPay=t.pay;if(t.card)S.lastCard=t.card}save();modal();
 if(type==='exp'&&!old)fb=feedback(t);render();
 toast(old?'Cambios guardados':type==='exp'?'Gasto anotado':type==='inc'?'Ingreso registrado':'Pago registrado',old?null:{label:'Deshacer',fn:()=>removeTx(t.id,true)})}
function removeTx(id,silent){const t=S.tx.find(x=>x.id===id);if(!t)return;const l=S.tx.filter(x=>x.id!==id),e=ledgerError(l);if(e)return toast('No se puede eliminar: '+e);S.tx=l;fb='';save();modal();render();if(!silent)toast('Movimiento eliminado',{label:'Deshacer',fn:()=>{if(!ledgerError([...S.tx,t])){S.tx.push(t);save();render();toast('Restaurado')}}});else toast('Deshecho')}

/* ---------- formularios de Planear ---------- */
function cardForm(id){const c=S.cards.find(x=>x.id===id)||{name:'',limit:'',rate:'',cut:'',due:''};SH={id:id||null};
 modal(`<form data-f="saveCard" novalidate>${head(id?'Editar tarjeta':'Nueva tarjeta')}<div class="f">${fld('Nombre',`<input id="cn" maxlength="40" value="${esc(c.name)}" placeholder="Ej. Nu, BBVA Azul" autofocus>`,'full')}${fld('Límite de crédito',`<input id="cl" inputmode="decimal" value="${esc(c.limit)}">`)}${fld('Tasa anual %',`<input id="cr" type="number" step="0.1" min="0" value="${esc(c.rate)}">`)}${fld('Día de corte',`<input id="cc" type="number" min="1" max="31" value="${esc(c.cut)}">`)}${fld('Día límite de pago',`<input id="cd" type="number" min="1" max="31" value="${esc(c.due)}">`)}</div><div id="xerr" role="alert"></div><div class="btns end"><button type="button" data-a="mclose">Cancelar</button><button class="p">Guardar</button></div></form>`)}
function goalForm(id){const g=S.goals.find(x=>x.id===id)||{n:'',t:'',due:''};SH={id:id||null};
 modal(`<form data-f="saveGoal" novalidate>${head(id?'Editar meta':'Nueva meta')}<div class="f">${fld('Meta',`<input id="gn" maxlength="40" value="${esc(g.n)}" placeholder="Fondo de emergencia" autofocus>`,'full')}${fld('Objetivo',`<input id="gt" inputmode="decimal" value="${esc(g.t)}">`)}${fld('Fecha (opcional)',`<input id="gd" type="date" min="${today()}" value="${esc(g.due)}">`)}</div><div id="xerr" role="alert"></div><div class="btns end"><button type="button" data-a="mclose">Cancelar</button><button class="p">Guardar</button></div></form>`)}
function recForm(id,pre={}){const r={type:'exp',desc:'',amt:'',day:new Date().getDate(),cls:'need',pay:'Débito',card:S.cards[0]?.id||'',cat:ICAT[0],...(S.rec.find(x=>x.id===id)||pre)};SH={id:id||null};
 modal(`<form data-f="saveRec" novalidate>${head(id?'Editar fijo':'Nuevo gasto o ingreso fijo')}<div class="f">${fld('Tipo',`<select id="rt" data-ch="rt">${opts([['exp','Gasto fijo'],['inc','Ingreso fijo']],r.type)}</select>`)}${fld('Día del mes',`<input id="rd" type="number" min="1" max="31" value="${r.day}">`)}${fld('Concepto',`<input id="rn" maxlength="60" value="${esc(r.desc)}" placeholder="Renta, sueldo, Netflix…" autofocus>`,'full')}${fld('Monto',`<input id="ra" inputmode="decimal" value="${esc(r.amt)}">`)}
<span class="re" ${r.type==='exp'?'':'hidden'}>${fld('Categoría',`<select id="rk">${opts(Object.entries(LBL),r.cls)}</select>`)}</span><span class="re" ${r.type==='exp'?'':'hidden'}>${fld('Pago',`<select id="rp" data-ch="rp">${opts(PAYS.map(p=>[p,p]),r.pay)}</select>`)}</span><span id="rcw" ${r.type==='exp'&&r.pay==='Crédito'?'':'hidden'}>${fld('Tarjeta',`<select id="rc">${opts(S.cards.map(c=>[c.id,c.name]),r.card)||'<option value="">Sin tarjetas</option>'}</select>`)}</span><span class="ri" ${r.type==='inc'?'':'hidden'}>${fld('Categoría',`<select id="ric">${opts(ICAT.map(c=>[c,c]),r.cat)}</select>`)}</span></div>
<div id="xerr" role="alert"></div><div class="btns end">${id?`<button type="button" class="danger" data-a="delRec" data-i="${id}" style="margin-right:auto">Eliminar</button>`:''}<button type="button" data-a="mclose">Cancelar</button><button class="p">Guardar</button></div></form>`)}
const formErr=(h,el)=>{$('#xerr').innerHTML=`<div class="msg bad"><span>${h}</span></div>`;el?.focus()};
function recRegister(r){const mo=thisMonth(),dd=`${mo}-${pad(recDay(r))}T09:00`,date=dd<=nowLocal()?dd:nowLocal();
 const t={id:uid(),type:r.type,amt:r.amt,desc:r.desc,cls:r.type==='exp'?r.cls:'otro',pay:r.type==='exp'?r.pay:'Efectivo',card:r.type==='exp'&&r.pay==='Crédito'?r.card:'',date,note:'Fijo mensual',cat:r.type==='inc'?r.cat:'',late:false};
 if(t.pay==='Crédito'&&!S.cards.some(c=>c.id===t.card))return toast('La tarjeta de este fijo ya no existe; edítalo');
 if(ledgerError([...S.tx,t]))t.date=nowLocal();const e=ledgerError([...S.tx,t]);if(e)return toast(e);S.tx.push(t);r.last=mo;save();render();toast(`${r.desc} registrado`,{label:'Deshacer',fn:()=>{r.last='';removeTx(t.id,true)}})}

/* ---------- PDF y CSV ---------- */
function pdf(){if(!window.jspdf)return toast('El generador de PDF no cargó; recarga la página');const{jsPDF}=window.jspdf,p=new jsPDF({unit:'mm',format:'a4'}),W=210,H=297,mo=hm,cl=s=>String(s).replace(/[^\x20-\xFF]/g,'').trim();
 const nf=new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),f=n=>(n<0?'-':'')+nf.format(Math.abs(n))+' '+cur(),fit=(s,w)=>{s=cl(s);if(p.getTextWidth(s)<=w)return s;while(s&&p.getTextWidth(s+'...')>w)s=s.slice(0,-1);return s+'...'};
 const e=exp(mo),i=incSum(mo),tot=sum(e),L=S.tx.filter(t=>t.date.startsWith(mo)).sort(byDate),ink=[30,38,34],mu=[110,125,118];
 p.setFillColor(14,39,33);p.rect(0,0,W,36,'F');p.setTextColor(217,169,63);p.setFont('times','bolditalic');p.setFontSize(22);p.text('Porte-Monnaie Malin',14,17);
 p.setFont('helvetica','normal');p.setFontSize(10);p.setTextColor(238,243,236);p.text(cl(`Estado de cuenta de ${monthName(mo)} · ${S.profile.name}`).replace(/·/g,'-'),14,27);p.text(cl('Generado '+today()),W-14,27,{align:'right'});
 let y=48;const box=(x,lbl,val,c)=>{p.setDrawColor(220);p.setFillColor(246,248,247);p.roundedRect(x,y,43,22,3,3,'FD');p.setFontSize(8);p.setTextColor(...mu);p.text(lbl,x+4,y+7);p.setFontSize(11);p.setTextColor(...c);p.setFont('helvetica','bold');p.text(fit(val,36),x+4,y+16);p.setFont('helvetica','normal')};
 box(14,'Ingresos',f(i),[27,122,82]);box(60,'Gastos',f(tot),[192,57,43]);box(106,'Ahorro',f(i-tot),i-tot>=0?[27,122,82]:[192,57,43]);box(152,'Tasa de ahorro',i?pct(i-tot,i)+'%':'-',ink);y+=34;
 p.setTextColor(...ink);p.setFont('helvetica','bold');p.setFontSize(12);p.text('Desglose por categoria',14,y);y+=8;p.setFont('helvetica','normal');p.setFontSize(10);
 const cc={need:[27,122,82],ant:[192,57,43],inv:[200,150,40],otro:[150,160,155]};
 Object.entries(LBL).forEach(([k,v])=>{const s=sum(e.filter(t=>t.cls===k)),pc=tot?s/tot:0;p.setTextColor(...ink);p.text(cl(v),14,y);p.setFillColor(235,238,236);p.rect(45,y-3.5,90,4.5,'F');p.setFillColor(...cc[k]);p.rect(45,y-3.5,Math.max(.4,90*pc),4.5,'F');p.text(`${f(s)} (${Math.round(pc*100)}%)`,W-14,y,{align:'right'});if(S.budget[k]){p.setFontSize(8);p.setTextColor(...mu);p.text(`tope ${f(S.budget[k])}`,137,y);p.setFontSize(10)}y+=8});
 if(S.cards.length){y+=4;p.setFont('helvetica','bold');p.setFontSize(12);p.setTextColor(...ink);p.text('Tarjetas',14,y);y+=8;p.setFont('helvetica','normal');p.setFontSize(10);S.cards.forEach(c=>{const d=Math.max(0,cdebt(c));p.text(fit(c.name,80),14,y);p.text(`Deuda ${f(d)} de ${f(c.limit)} (${pct(d,c.limit)}%)`,W-14,y,{align:'right'});y+=7})}
 y+=6;const th=()=>{p.setFillColor(14,39,33);p.rect(14,y-5,W-28,8,'F');p.setTextColor(255);p.setFont('helvetica','bold');p.setFontSize(9);p.text('Fecha',16,y);p.text('Descripcion',42,y);p.text('Categoria',118,y);p.text('Monto',W-16,y,{align:'right'});p.setFont('helvetica','normal');y+=8};
 p.setFont('helvetica','bold');p.setFontSize(12);p.setTextColor(...ink);p.text(`Movimientos (${L.length})`,14,y);y+=9;th();
 L.forEach((t,k)=>{if(y>H-20){p.addPage();y=20;th()}if(k%2){p.setFillColor(244,246,245);p.rect(14,y-4.5,W-28,6.5,'F')}p.setFontSize(9);p.setTextColor(...ink);p.text(t.date.slice(0,10)+' '+t.date.slice(11,16),16,y);p.text(fit(t.desc,72),42,y);p.setTextColor(...mu);p.text(fit(t.type==='exp'?`${LBL[t.cls]} · ${t.pay}`.replace('·','-'):t.type==='inc'?'Ingreso':'Pago tarjeta',40),118,y);
  p.setTextColor(...(t.type==='inc'?[27,122,82]:ink));p.text((t.type==='inc'?'+':'-')+f(t.amt),W-16,y,{align:'right'});y+=6.5});
 if(!L.length){p.setTextColor(...mu);p.text('Sin movimientos este mes.',16,y)}
 const np=p.getNumberOfPages();for(let k=1;k<=np;k++){p.setPage(k);p.setFontSize(8);p.setTextColor(...mu);p.text('Porte-Monnaie Malin - generado localmente en tu dispositivo',14,H-8);p.text(`Pagina ${k} de ${np}`,W-14,H-8,{align:'right'})}
 p.save(`estado-${mo}.pdf`)}
function download(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2e3)}
function csv(L,name){const q=v=>{let s=String(v??'');if(/^[=+\-@\t\r]/.test(s)&&!/^-?\d+(\.\d+)?$/.test(s))s="'"+s;return /[",\n;]/.test(s)?`"${s.replace(/"/g,'""')}"`:s};
 const rows=[['fecha','hora','tipo','descripcion','categoria','metodo','tarjeta','monto','nota'],...L.map(t=>[t.date.slice(0,10),t.date.slice(11,16),{exp:'gasto',inc:'ingreso',pay:'pago tarjeta'}[t.type],t.desc,t.type==='exp'?LBL[t.cls]:t.cat,t.type==='inc'?'':t.pay,cardName(t.card),(t.type==='inc'?'':'-')+t.amt.toFixed(2),t.note])];
 download(name,'\ufeff'+rows.map(r=>r.map(q).join(',')).join('\r\n'),'text/csv;charset=utf-8');toast(`${plural(L.length,'movimiento')} exportados`)}

/* ---------- acciones ---------- */
const A={
go(i,el){if(el?.dataset.p)PL=el.dataset.p;go(i)},
tn(){ts<TOUR.length-1?(ts++,tour()):A.tskip()},tb(){ts--;tour()},tskip(){S.tourDone=true;save();onboard()},
eye(){S.hide=!S.hide;save();render()},mclose(){modal()},askY(){answer(true)},askN(){answer(false)},
toastAct(){const f=toastFn;toastFn=null;$('#toast').innerHTML='';f?.()},
reload(){location.reload()},
newTx(i){openTx(i||'exp')},edit(i){openTx(null,i)},
shType(i){openTx(i,null,{amt:$('#xa')?.value||'',desc:$('#xd')?.value||''})},
delTx(i){removeTx(i)},
dupTx(i){const t=S.tx.find(x=>x.id===i);if(!t)return;modal();openTx(t.type,null,{amt:String(t.amt),desc:t.desc,cls:t.cls,pay:t.pay,card:t.card,cat:t.cat,note:t.note})},
close(){const d=today(),s=sm(exp(d)),sc=score(d);modal(`${head('Cierre del día')}<div class="row nb" style="align-items:center"><div><div class="k">Gastado hoy</div><div class="num">${m(s.t)}</div></div>${ring(sc,scc(sc))}</div><div class="sum3"><div><span class="k">🧺 Necesario</span><b>${s.need}%</b></div><div><span class="k">🐜 Hormiga</span><b>${s.ant}%</b></div><div><span class="k">📈 Inversión</span><b>${s.inv}%</b></div></div><div class="msg"><span>💡 ${rec(s,sc)}</span></div><div class="btns end"><button data-a="mclose">Cerrar</button><button class="p" data-a="wa" data-i="d">${ic('send')} WhatsApp</button></div>`)},
wa(k){open('https://api.whatsapp.com/send?text='+encodeURIComponent(waText(k)),'_blank','noopener')},
day(d){const L=sorted(S.tx.filter(t=>t.date.startsWith(d)));modal(`${head(dayLabel(d).replace(/^./,c=>c.toUpperCase()))}${L.length?`<p class="k">Gasto del día: ${m(sum(L.filter(t=>t.type==='exp')))}</p>`+txList(L):`<div class="empty">Sin movimientos este día.</div>`}${d<=today()?`<p><button class="sm" data-a="newOn" data-i="${d}">${ic('plus')} Agregar gasto en este día</button></p>`:''}`)},
newOn(d){openTx('exp',null,{date:d===today()?nowLocal():d+'T12:00'})},
hmMo(i){hm=monthAdd(hm,+i);render()},
mfMo(i){MF.mo=i==='all'?'all':MF.mo==='all'?thisMonth():monthAdd(MF.mo,+i);MF.lim=120;render()},
more(){MF.lim+=120;$('#lst').innerHTML=movList()},
csv(){csv(movFiltered(),`movimientos-${MF.mo==='all'?'todo':MF.mo}.csv`)},csvAll(){csv(sorted(S.tx),`movimientos-${today()}.csv`)},
pdf,
pl(i){PL=i;render()},
cardForm(i){cardForm(i)},goalForm(i){goalForm(i)},recForm(i){recForm(i)},
async payCard(i){const c=S.cards.find(x=>x.id===i);if(!c)return;openTx('pay',null,{card:i,amt:String(Math.max(0,Math.round(cdebt(c)*100)/100)||'')})},
async delCard(i){const c=S.cards.find(x=>x.id===i);if(cdebt(c)>.005)return toast('Salda la deuda antes de eliminarla');if(await ask(`Se eliminará <b>${esc(c.name)}</b>. Sus movimientos se conservan.`,{ok:'Eliminar',danger:true})){S.cards=S.cards.filter(x=>x.id!==i);save();render()}},
togW(i){i=+i;S.ch=S.ch.includes(i)?S.ch.filter(x=>x!==i):[...S.ch,i];save();chal()},
async abonar(i){const g=S.goals.find(x=>x.id===i),a=await askAmount(`Abonar a «${esc(g.n)}»`,{hint:`Faltan ${money(Math.max(0,g.t-g.s))}`});if(a>0){g.s=Math.round((g.s+a)*100)/100;save();render();toast(g.s>=g.t?'🎉 ¡Meta lograda!':'Abono guardado')}},
async retirar(i){const g=S.goals.find(x=>x.id===i),a=await askAmount(`Retirar de «${esc(g.n)}»`,{hint:`Disponible ${money(g.s)}`});if(a>0){g.s=Math.max(0,Math.round((g.s-a)*100)/100);save();render()}},
async delGoal(i){const g=S.goals.find(x=>x.id===i);if(await ask(`Se eliminará la meta <b>${esc(g.n)}</b>.`,{ok:'Eliminar',danger:true})){S.goals=S.goals.filter(x=>x.id!==i);save();render()}},
recDo(i){const r=S.rec.find(x=>x.id===i);if(r)recRegister(r)},
recSkip(i){const r=S.rec.find(x=>x.id===i);if(!r)return;r.last=thisMonth();save();render();toast('Omitido este mes',{label:'Deshacer',fn:()=>{r.last='';save();render()}})},
async delRec(i){const r=S.rec.find(x=>x.id===i);if(await ask(`Se eliminará el fijo <b>${esc(r.desc)}</b>. Lo ya registrado se conserva.`,{ok:'Eliminar',danger:true})){S.rec=S.rec.filter(x=>x.id!==i);save();render()}},
subFix(i){const t=S.tx.find(x=>x.id===i);if(t){PL='rec';go('plan');recForm(null,{type:'exp',desc:t.desc,amt:t.amt,day:+t.date.slice(8,10),cls:t.cls,pay:t.pay,card:t.card})}},
budSug(){const ai=avgIncome(),r=v=>Math.round(v);
 S.budget={total:r(ai*.8),need:r(ai*.5),ant:r(ai*.1),inv:r(ai*.1),otro:r(ai*.1)};save();render();toast('Presupuesto sugerido: 50% necesidades, 30% gustos e inversión, 20% ahorro')},
mkr(){mkt()},
async notif(){if(!('Notification'in window))return toast('Tu navegador no soporta notificaciones');S.notif=(await Notification.requestPermission())==='granted';save();render();if(S.notif)notify('Listo: te avisaremos a las '+S.h1+' y '+S.h2+'.')},
backup(){S.lastBk=today();save();download(`porte-monnaie-malin-${today()}.json`,JSON.stringify(S,null,1),'application/json');if(tab==='home'||tab==='set')render();toast('Respaldo descargado')},
async install(){if(!installEv)return;installEv.prompt();await installEv.userChoice;installEv=null;render()},
async wipe(){if(!await ask('Se borrarán <b>todos</b> tus datos de este dispositivo. Esto no se puede deshacer. Te recomendamos descargar un respaldo primero.',{title:'Borrar todo',ok:'Borrar todo',danger:true}))return;S=structuredClone(D);try{[K,...OLD_KEYS,'pmm_mk'].forEach(k=>localStorage.removeItem(k))}catch{}idb('del');tab='home';ts=0;history.replaceState(null,'','#home');render()}};
/* formularios (Enter envía) */
const F={
quick(){const v=$('#qa').value.trim();if(!v)return $('#qa').focus();const sp=smart(v);if(!(sp.amt>0))return openTx('exp',null,{desc:v});
 const desc=sp.desc||'Gasto',cls=classify(desc);let pay=S.lastPay,card='';if(pay==='Crédito'){card=S.cards.some(c=>c.id===S.lastCard)?S.lastCard:'';if(!card)pay='Efectivo'}
 const t={id:uid(),type:'exp',amt:sp.amt,desc,cls,pay,card,date:sp.dd?addDays(today(),-sp.dd)+nowLocal().slice(10):nowLocal(),note:'',cat:'',late:!!sp.dd},e=ledgerError([...S.tx,t]);
 if(e){fb=`<div class="msg bad"><span>${esc(e)}</span>${/^Fondos/.test(e)?'<button class="sm" data-a="newTx" data-i="inc">Registrar un ingreso</button>':''}</div>`;$('#fb').innerHTML=fb;return}
 S.tx.push(t);save();fb=feedback(t);render();$('#qa').focus();toast(`${money(t.amt)} · ${LBL[cls]}`,{label:'Deshacer',fn:()=>removeTx(t.id,true)})},
save:saveTx,
enter(){const n=$('#pn').value.trim(),c=$('#pc').value,a=$('#p0').value.trim();if(!n){$('#perr').textContent='Escribe un nombre o apodo.';return $('#pn').focus()}
 S.profile={name:n,cur:c};const v=a?parseAmount(a):0;if(a&&!(v>=0)){S.profile=null;$('#perr').textContent='El saldo inicial no es un número válido.';return $('#p0').focus()}
 if(v>0)S.tx.push({id:uid(),type:'inc',amt:v,desc:OPENING,cls:'otro',pay:'Efectivo',card:'',date:thisMonth()+'-01T00:00',note:'No cuenta como ingreso del mes',cat:OPENING,late:false});save();modal();go('home');toast(`¡Bienvenido, ${n}!`)},
askAmt(){const v=parseAmount($('#aa').value);if(!(v>0)){$('#aerr').textContent='Escribe un monto mayor a cero.';return $('#aa').focus()}answer(v)},
saveCard(){const n=$('#cn').value.trim(),l=parseAmount($('#cl').value),cl=x=>Math.min(31,Math.max(1,Math.round(+x)||1));if(!n)return formErr('Escribe el nombre.',$('#cn'));if(!(l>0))return formErr('Escribe el límite de crédito.',$('#cl'));
 const c={id:SH.id||uid(),name:n,limit:l,rate:Math.max(0,+$('#cr').value||0),cut:cl($('#cc').value),due:cl($('#cd').value)},prev=S.cards;S.cards=SH.id?S.cards.map(x=>x.id===c.id?c:x):[...S.cards,c];
 if(SH.id){const e=ledgerError(S.tx);if(e){S.cards=prev;return formErr(esc(e))}}save();modal();render();toast('Tarjeta guardada')},
saveGoal(){const n=$('#gn').value.trim(),t=parseAmount($('#gt').value),d=$('#gd').value;if(!n)return formErr('Escribe el nombre de la meta.',$('#gn'));if(!(t>0))return formErr('Escribe el objetivo.',$('#gt'));
 if(SH.id)Object.assign(S.goals.find(g=>g.id===SH.id),{n,t,due:d});else S.goals.push({id:uid(),n,t,s:0,due:d});save();modal();render()},
saveRec(){const type=$('#rt').value,desc=$('#rn').value.trim(),amt=parseAmount($('#ra').value),day=Math.min(31,Math.max(1,Math.round(+$('#rd').value)||1)),pay=$('#rp').value;
 if(!desc)return formErr('Escribe el concepto.',$('#rn'));if(!(amt>0))return formErr('Escribe el monto.',$('#ra'));if(type==='exp'&&pay==='Crédito'&&!$('#rc').value)return formErr('Agrega primero una tarjeta.');
 const old=S.rec.find(x=>x.id===SH.id),r={id:SH.id||uid(),type,desc,amt,day,cls:$('#rk').value,pay,card:pay==='Crédito'?$('#rc').value:'',cat:$('#ric').value,last:old?old.last:(day<=new Date().getDate()&&S.tx.some(t=>t.date.startsWith(thisMonth())&&norm(t.desc)===norm(desc))?thisMonth():'')};
 S.rec=old?S.rec.map(x=>x.id===r.id?r:x):[...S.rec,r];save();modal();PL='rec';go('plan');toast('Fijo guardado')}};
/* cambios en campos */
const C={
qa(el){const h=$('#qh'),v=el.value.trim();if(!v)return h.innerHTML='Escribe monto y concepto; la categoría se detecta sola. <button class="lnk" data-a="newTx" data-i="exp">Más detalles</button>';const sp=smart(v),c=classify(sp.desc||v);
 h.innerHTML=sp.amt>0?`→ <b>${money(sp.amt)}</b> · <span class="tag ${c}">${EMO[c]} ${LBL[c]}</span> · ${S.lastPay==='Crédito'&&S.cards.some(x=>x.id===S.lastCard)?esc(cardName(S.lastCard)):S.lastPay==='Crédito'?'Efectivo':S.lastPay}${sp.dd?` · ${sp.dd===1?'ayer':'antier'}`:''} <span class="k">(Enter para anotar)</span>`:'Agrega el monto, p. ej. «45 café». Sin monto se abre el formulario.'},
xd:detect,
q(el){MF.q=el.value;MF.lim=120;$('#lst').innerHTML=movList()},
fs(el){S.fs=+el.value;save();applyTheme();const v=$('#fsv');if(v)v.textContent=S.fs+'px'},
name(el){const v=el.value.trim();if(v){S.profile.name=v.slice(0,30);save()}},
sim,cb(el){const v=parseAmount(el.value);if(v>0){S.chBase=v;save();chal()}}};
const CH={
ft(el){MF.type=el.value;$('#lst').innerHTML=movList()},fc(el){MF.cls=el.value;if(el.value!=='all')MF.type='exp';render()},
xk:detect,xp(el){$('#xcw').hidden=el.value!=='Crédito'},
xcp(el){const c=S.cards.find(x=>x.id===el.value);$('#xa').value=c?Math.max(0,Math.round(cdebt(c)*100)/100)||'':'';$('#xdet').innerHTML=`Deuda actual: ${m(Math.max(0,c?cdebt(c):0))}`},
rt(el){const e=el.value==='exp';document.querySelectorAll('.re').forEach(x=>x.hidden=!e);document.querySelectorAll('.ri').forEach(x=>x.hidden=e);$('#rcw').hidden=!(e&&$('#rp').value==='Crédito')},
rp(el){$('#rcw').hidden=el.value!=='Crédito'},
bud(el){const v=parseAmount(el.value);S.budget[el.dataset.i]=v>0?v:0;save();$('#budv').innerHTML=budView()},
theme(el){S.theme=el.value;save();render()},dense(el){S.dense=el.checked;save();applyTheme()},hide(el){S.hide=el.checked;save();render()},
cur(el){S.profile.cur=el.value;save();render()},
h1(el){S.h1=el.value||S.h1;save()},h2(el){S.h2=el.value||S.h2;save()},
imp(el){const f=el.files[0];el.value='';if(!f)return;f.text().then(async t=>{let o;try{o=JSON.parse(t)}catch{throw 0}const n=sane(o);if(!n.profile)throw 0;
 const had=!!S.profile;if(had&&!await ask(`Se reemplazarán tus datos actuales por la copia de <b>${esc(n.profile.name)}</b> (${plural(n.tx.length,'movimiento')}).`,{title:'Restaurar respaldo',ok:'Restaurar'}))return;
 n.tourDone=true;S=n;save();modal();go('home');toast('Respaldo restaurado')}).catch(()=>toast('Ese archivo no es un respaldo válido'))}};

document.addEventListener('click',e=>{if(e.target.classList.contains('ov')&&!lock)return modal();const el=e.target.closest('[data-a]');if(el&&!el.disabled){const f=A[el.dataset.a];if(f){e.preventDefault();f(el.dataset.i,el,e)}}});
document.addEventListener('submit',e=>{const f=F[e.target.dataset.f];if(f){e.preventDefault();f()}});
document.addEventListener('input',e=>{const el=e.target.closest('[data-c]');if(el)C[el.dataset.c]?.(el);if(e.target.getAttribute('aria-invalid'))e.target.removeAttribute('aria-invalid')});
document.addEventListener('change',e=>{const el=e.target.closest('[data-ch]');if(el)CH[el.dataset.ch]?.(el)});
addEventListener('keydown',e=>{const box=$('#modal .pn');
 if(box){if(e.key==='Escape'&&!lock)return modal();if(e.key==='Tab'){const f=[...box.querySelectorAll('button,input,select,textarea,summary,[href]')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}return}
 if(!S.profile||e.ctrlKey||e.metaKey||e.altKey||/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName))return;
 if(e.key==='n'||e.key==='N'){e.preventDefault();openTx('exp')}else if(e.key==='/'){e.preventDefault();if(tab!=='movs')go('movs');$('#q')?.focus()}});
addEventListener('hashchange',()=>{const t=location.hash.slice(1);if(S.profile&&t!==tab&&ROUTES.includes(t)){modal();go(t)}});
addEventListener('storage',e=>{if(e.key===K&&e.newValue&&!$('#modal').innerHTML){try{S=sane(JSON.parse(e.newValue));render()}catch{}}});
mq.addEventListener?.('change',()=>{if(S.theme===AUTO)render()});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEv=e;if(tab==='set')render()});

/* ---------- avisos programados (con la app abierta) ---------- */
async function notify(body){try{const r=await navigator.serviceWorker?.getRegistration();if(r){await r.showNotification('Porte-Monnaie Malin',{body,icon:'icon-192.png',badge:'icon-192.png',tag:'pmm-resumen'});return}}catch{}try{new Notification('Porte-Monnaie Malin',{body})}catch{}}
setInterval(()=>{if(!S.profile)return;const d=new Date(),t=`${pad(d.getHours())}:${pad(d.getMinutes())}`,k=today()+t;if((t===S.h1||t===S.h2)&&S.last!==k){S.last=k;save();const s=sm(exp(today())),txt=`${t===S.h2?'Cierre diario':'Resumen de medio día'}: gastaste ${money(s.t)} · hormiga ${s.ant}% · score ${score(today())}`;
 toast(txt,{label:'Ver',fn:A.close});if(S.notif&&window.Notification?.permission==='granted')notify(txt)}},20000);

/* ---------- arranque ---------- */
(async()=>{let r;try{r=localStorage.getItem(K)||OLD_KEYS.map(k=>localStorage.getItem(k)).find(Boolean)}catch{}r=r||await idb('get');if(r)try{S=sane(JSON.parse(r));save()}catch{}
 navigator.storage?.persist?.().catch(()=>{});
 if('serviceWorker'in navigator&&location.protocol!=='file:'){const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.register('sw.js').catch(()=>{});navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had){updReady=true;if(tab==='home'&&!$('#modal').innerHTML)render();toast('Nueva versión disponible',{label:'Actualizar',fn:()=>location.reload()})}})}
 const h=location.hash.slice(1);tab=ROUTES.includes(h)?h:'home';render()})();
