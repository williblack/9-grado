/* =====================================================================
   MOTOR BERNAL V5  ·  Tecnología e Informática · Prof. William Fdo Bernal
   ---------------------------------------------------------------------
   Este archivo se sube UNA SOLA VEZ a la raíz de cada grado:
       /10-grado/motor-bernal-v5.js
   Cada clase (periodo-X/semana-XX/index.html) lo carga con:
       <script src="../../motor-bernal-v5.js"></script>
   Solo edita, si quieres, el bloque DEFAULTS de aquí abajo.
   ===================================================================== */

/* ====== ✏️ TUS DATOS FIJOS (se usan en todas las clases) ====== */
var DEFAULTS = {
  area: "Tecnología e Informática",
  colegio: "Colegio Santa Mariana de Jesús",
  profesor: "Prof. William Fdo Bernal",
  anioLectivo: "2026-2027",
  duracionMin: 45,
  correoProfesor: "",        // ej: profe@colegio.edu.co  (recibe las hojas en PDF)
  whatsappProfesor: ""       // ej: 573001234567  (con indicativo, sin +)
};

/* ====== 🎨 ESTILOS VISUALES (la IA elige uno según el tema) ====== */
var TEMAS_BERNAL = {
  galaxia:     {acc:"#6d28d9", acc2:"#db2777", acc3:"#f59e0b", font:"Nunito",        titulo:"Nunito",        hero:"gradiente", fondo:"manchas",    rad:22},
  oceano:      {acc:"#0369a1", acc2:"#06b6d4", acc3:"#22d3ee", font:"Poppins",       titulo:"Poppins",       hero:"diagonal",  fondo:"manchas",    rad:18},
  selva:       {acc:"#15803d", acc2:"#65a30d", acc3:"#facc15", font:"Nunito",        titulo:"Fredoka",       hero:"claro",     fondo:"puntos",     rad:26},
  atardecer:   {acc:"#ea580c", acc2:"#e11d48", acc3:"#fbbf24", font:"Poppins",       titulo:"Poppins",       hero:"gradiente", fondo:"diagonal",   rad:20},
  circuito:    {acc:"#059669", acc2:"#0891b2", acc3:"#a3e635", font:"Nunito",        titulo:"Space Grotesk", hero:"oscuro",    fondo:"cuadricula", rad:12},
  cuaderno:    {acc:"#1d4ed8", acc2:"#dc2626", acc3:"#0ea5e9", font:"Nunito",        titulo:"Nunito",        hero:"claro",     fondo:"renglones",  rad:14},
  hojacalculo: {acc:"#107c41", acc2:"#0f766e", acc3:"#84cc16", font:"Poppins",       titulo:"Poppins",       hero:"claro",     fondo:"cuadricula", rad:10},
  arcoiris:    {acc:"#8b5cf6", acc2:"#ec4899", acc3:"#f59e0b", font:"Nunito",        titulo:"Fredoka",       hero:"gradiente", fondo:"puntos",     rad:30},
  robot:       {acc:"#334155", acc2:"#eab308", acc3:"#0ea5e9", font:"Nunito",        titulo:"Space Grotesk", hero:"oscuro",    fondo:"puntos",     rad:14},
  coral:       {acc:"#db2777", acc2:"#0d9488", acc3:"#f97316", font:"Poppins",       titulo:"Poppins",       hero:"diagonal",  fondo:"manchas",    rad:24},
  medianoche:  {acc:"#1e3a8a", acc2:"#ca8a04", acc3:"#7c3aed", font:"Poppins",       titulo:"Poppins",       hero:"oscuro",    fondo:"diagonal",   rad:18},
  volcan:      {acc:"#b91c1c", acc2:"#ea580c", acc3:"#facc15", font:"Nunito",        titulo:"Space Grotesk", hero:"gradiente", fondo:"cuadricula", rad:16}
};
var PALABRAS_BERNAL = [
  [/redes sociales|ciudadan|ciberacoso|ciberseguridad|privacidad|huella digital|netiqueta|grooming/i, "coral"],
  [/excel|hoja(s)? de c[aá]lculo|f[oó]rmula|celda|tabla din[aá]mica|gr[aá]fic[oa]s? estad/i, "hojacalculo"],
  [/word|procesador de texto|documento|escritura|ortograf|formato de texto/i, "cuaderno"],
  [/program|c[oó]digo|scratch|python|algoritm|html|css|pseudoc[oó]digo|app inventor|pensamiento computacional/i, "circuito"],
  [/robot|inteligencia artificial|\bia\b|machine|arduino|sensor|automatiz/i, "robot"],
  [/internet|red(es)? de|wifi|la nube|navegador|correo electr|buscador/i, "oceano"],
  [/ambient|reciclaj|energ[ií]a|sostenib|basura electr|ecolog/i, "selva"],
  [/dise[nñ]o|canva|paint|dibuj|imagen|color|presentaci|power ?point|video|animaci/i, "atardecer"],
  [/historia|evoluci[oó]n|generaciones|l[ií]nea de tiempo|inventos|pioneros/i, "medianoche"],
  [/hardware|computador|partes del|perif[eé]ric|teclado|mouse|rat[oó]n|cpu|procesador/i, "volcan"]
];
function elegirTemaBernal(C){
  var q = new URLSearchParams(location.search).get("tema");
  if(q && TEMAS_BERNAL[q]) return q;
  var e = String(C.estilo || "auto").toLowerCase().replace(/\s|-/g,"");
  if(TEMAS_BERNAL[e]) return e;
  var nombres = Object.keys(TEMAS_BERNAL);
  var semilla = (C.tema || "") + "|" + (C.grado || "") + "|" + (C.semana || "");
  var h = 0; for(var i=0;i<semilla.length;i++){ h = (h*31 + semilla.charCodeAt(i)) >>> 0; }
  if(e === "aleatorio" || e === "sorpresa") return nombres[h % nombres.length];
  for(var j=0;j<PALABRAS_BERNAL.length;j++){ if(PALABRAS_BERNAL[j][0].test(C.tema || "")) return PALABRAS_BERNAL[j][1]; }
  if((parseInt(C.grado,10)||6) <= 3) return "arcoiris";
  return nombres[h % nombres.length];
}
function aplicarEstilo(C){
  var nombre = elegirTemaBernal(C), T = TEMAS_BERNAL[nombre], r = document.documentElement.style;
  var acc = C.colorPrincipal || T.acc; C.colorPrincipal = acc; C.estiloAplicado = nombre;
  r.setProperty("--acc", acc); r.setProperty("--acc2", T.acc2); r.setProperty("--acc3", T.acc3);
  r.setProperty("--font", "'" + T.font + "'"); r.setProperty("--font-titulo", "'" + T.titulo + "'"); r.setProperty("--rad", T.rad + "px");
  document.body.classList.add("hero-" + T.hero, "fondo-" + T.fondo, "estilo-" + nombre);
}

var CLASE_BERNAL = (typeof CLASE !== 'undefined') ? CLASE : window.CLASE;
(function(){
  if(!CLASE_BERNAL){ document.body.innerHTML = '<p style="font:18px sans-serif;padding:40px">⚠️ Falta el bloque <b>const CLASE = {...}</b> en este index.html.</p>'; return; }
  // Fuentes y librerías
  var l = document.createElement("link"); l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;600;700;800&family=Fredoka:wght@500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;600&display=swap";
  document.head.appendChild(l);
  if(!document.querySelector('meta[name="viewport"]')){ var m = document.createElement("meta"); m.name = "viewport"; m.content = "width=device-width, initial-scale=1.0"; document.head.appendChild(m); }
  [["https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js", function(){ if(window.__bernalGraficar) window.__bernalGraficar(); }],
   ["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"],
   ["https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"]].forEach(function(x){
     var s = document.createElement("script"); s.src = x[0]; s.async = true; if(x[1]) s.onload = x[1]; document.head.appendChild(s); });
  var st = document.createElement("style"); st.textContent = "\n:root{\n  --acc:#6d28d9; --acc2:#db2777; --acc3:#f59e0b; --acc-soft:color-mix(in srgb,var(--acc) 13%,transparent); --font:'Nunito';\n  --ok:#059669; --ok-soft:rgba(5,150,105,.12); --bad:#dc2626; --bad-soft:rgba(220,38,38,.12);\n  --warn:#d97706; --info:#0284c7;\n  --bg:color-mix(in srgb,var(--acc) 7%,#f7f7fb); --card:rgba(255,255,255,.74); --solid:#ffffff; --line:rgba(30,20,70,.10);\n  --txt:#1e1b3a; --muted:#5d5878; --shadow:0 14px 34px -16px rgba(49,23,110,.35);\n  --fs:17px; --rad:22px;\n}\n:root[data-theme=\"dark\"]{--bg:color-mix(in srgb,var(--acc) 10%,#0b0a14);--card:rgba(32,28,60,.74);--solid:#1a1730;--line:rgba(255,255,255,.10);--txt:#efeaff;--muted:#aba5c9;--shadow:0 14px 34px -16px rgba(0,0,0,.7)}\n@media (prefers-color-scheme: dark){:root:not([data-theme=\"light\"]){--bg:color-mix(in srgb,var(--acc) 10%,#0b0a14);--card:rgba(32,28,60,.74);--solid:#1a1730;--line:rgba(255,255,255,.10);--txt:#efeaff;--muted:#aba5c9;--shadow:0 14px 34px -16px rgba(0,0,0,.7)}}\n*{box-sizing:border-box}\nhtml{scroll-behavior:smooth;font-size:var(--fs)}\nbody{margin:0;font-family:var(--font),'Nunito',system-ui,sans-serif;color:var(--txt);background:var(--bg);line-height:1.6;overflow-x:hidden;\n  background-image:radial-gradient(900px 500px at 5% -5%,color-mix(in srgb,var(--acc) 22%,transparent),transparent 60%),radial-gradient(800px 500px at 100% 10%,color-mix(in srgb,var(--acc2) 16%,transparent),transparent 60%),radial-gradient(700px 500px at 50% 110%,color-mix(in srgb,var(--acc3) 14%,transparent),transparent 60%);background-attachment:fixed}\nbody.nivel-inicial{--fs:20px;--rad:28px} body.nivel-primaria{--fs:18.5px;--rad:26px}\na{color:var(--acc)}\n.wrap{max-width:1100px;margin:0 auto;padding:0 16px}\n#progreso{position:fixed;top:0;left:0;height:4px;width:0;background:linear-gradient(90deg,var(--acc),var(--acc2),var(--acc3));z-index:100;transition:width .1s}\n.navbar{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;padding:16px 0 4px}\n.btn{display:inline-flex;align-items:center;gap:8px;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:.86rem;padding:10px 16px;border-radius:14px;color:#fff;background:var(--acc);text-decoration:none;box-shadow:0 6px 16px -8px rgba(0,0,0,.4);transition:all .3s}\n.btn:hover{transform:translateY(-2px) scale(1.04);filter:brightness(1.08)}\n.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}\n.btn.dark{background:rgba(30,27,58,.85);backdrop-filter:blur(8px)} .btn.purple{background:var(--acc)} .btn.green{background:var(--ok)}\n.btn.red{background:var(--bad)} .btn.blue{background:var(--info)} .btn.wa{background:#16a34a} .btn.amber{background:var(--warn)}\n.btn.ghost{background:var(--acc-soft);color:var(--acc);box-shadow:none}\n.btn.sm{padding:7px 12px;font-size:.78rem;border-radius:11px}\n.toast{position:fixed;top:22px;right:22px;z-index:200;background:rgba(15,12,30,.9);color:#fff;padding:12px 18px;border-radius:14px;box-shadow:var(--shadow);backdrop-filter:blur(8px);transform:translateY(-20px);opacity:0;pointer-events:none;transition:all .3s;max-width:320px;font-weight:700}\n.toast.on{transform:none;opacity:1}\n/* HERO */\n.hero{margin:10px 0 18px;padding:34px 30px;border-radius:32px;color:#fff;position:relative;overflow:hidden;\n  background:linear-gradient(135deg,var(--acc),color-mix(in srgb,var(--acc) 50%,var(--acc2)) 60%,var(--acc3) 135%);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--acc) 80%,black)}\n.hero::after{content:\"\";position:absolute;width:420px;height:420px;border-radius:50%;right:-120px;top:-160px;background:rgba(255,255,255,.12)}\n.hero .emoji{font-size:3.2rem;line-height:1;animation:flota 4s ease-in-out infinite;display:inline-block}\n@keyframes flota{50%{transform:translateY(-8px) rotate(-4deg)}}\n.hero h1{font-size:clamp(1.8rem,4.6vw,3rem);line-height:1.12;margin:10px 0 8px;font-weight:900;letter-spacing:-.02em;position:relative;z-index:1}\n.hero .sub{opacity:.92;font-weight:700;position:relative;z-index:1}\n.chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0;position:relative;z-index:1}\n.chip{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.35);padding:5px 12px;border-radius:999px;font-size:.78rem;font-weight:800;backdrop-filter:blur(6px)}\n.glass-w{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(12px);border-radius:22px;padding:16px 20px;margin-top:12px;position:relative;z-index:1}\n.glass-w b{display:block;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;opacity:.85;margin-bottom:2px}\n.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n/* NAV SECCIONES */\n.secnav{position:sticky;top:6px;z-index:50;margin:0 0 18px;padding:8px;border-radius:18px;background:var(--card);backdrop-filter:blur(14px);border:1px solid var(--line);box-shadow:var(--shadow);display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin}\n.secnav a{white-space:nowrap;text-decoration:none;color:var(--muted);font-weight:800;font-size:.8rem;padding:7px 12px;border-radius:12px;transition:all .25s}\n.secnav a:hover{background:var(--acc-soft);color:var(--acc)} .secnav a.act{background:var(--acc);color:#fff}\n/* CARDS */\nsection.sec{scroll-margin-top:80px;margin-bottom:26px}\n.card{background:var(--card);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:var(--rad);box-shadow:var(--shadow);padding:26px}\n.sec-head{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:14px}\n.sec-head h2{margin:0;font-size:1.45rem;font-weight:900;letter-spacing:-.01em;flex:1 1 260px}\n.badge{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;font-weight:900;letter-spacing:.05em;text-transform:uppercase;padding:6px 12px;border-radius:999px;color:#fff}\n.b-cuaderno{background:#2563eb}.b-pc{background:#7c3aed}.b-sala{background:#0891b2}.b-inv{background:#d97706}.b-tarea{background:#db2777}.b-quiz{background:#16a34a}.b-hoja{background:#0f172a}.b-video{background:#dc2626}.b-ruta{background:#475569}.b-doc{background:#78350f}\n:root[data-theme=\"dark\"] .b-hoja{background:#334155}\n.muted{color:var(--muted)}\n.sub-card{background:var(--solid);border:1px solid var(--line);border-radius:18px;padding:18px;margin-top:14px}\nh3{margin:0 0 8px;font-size:1.12rem;font-weight:900}\n/* RUTA / TIMER */\n.gancho{font-size:1.15rem;font-weight:800;padding:18px 20px;border-radius:18px;background:linear-gradient(135deg,var(--acc-soft),rgba(219,39,119,.10));border-left:6px solid var(--acc)}\n.ruta{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:14px}\n.etapa{padding:14px;border-radius:16px;border:2px solid var(--line);background:var(--solid);transition:all .3s}\n.etapa.act{border-color:var(--acc);box-shadow:0 0 0 4px var(--acc-soft);transform:translateY(-3px)}\n.etapa.hecha{opacity:.55}\n.etapa .min{font-size:.72rem;font-weight:900;color:var(--acc);text-transform:uppercase}\n.timer{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px}\n.timer .reloj{font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:600;padding:4px 16px;border-radius:14px;background:var(--solid);border:1px solid var(--line)}\n.barra{height:10px;border-radius:99px;background:var(--line);overflow:hidden;flex:1 1 200px}\n.barra i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--ok),var(--warn),var(--bad));transition:width .5s}\n/* VIDEO */\n.video-box{position:relative;padding-top:56.25%;border-radius:18px;overflow:hidden;background:#000}\n.video-box iframe,.video-box video{position:absolute;inset:0;width:100%;height:100%;border:0}\n.video-vacio{border:3px dashed var(--line);border-radius:18px;padding:34px;text-align:center;color:var(--muted)}\n.video-vacio .ic{font-size:2.6rem}\n/* CUADERNO */\n.bloque{margin-top:16px;padding:20px;border-radius:18px;background:var(--solid);border:1px solid var(--line);position:relative}\n.bloque-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}\n.punto{display:flex;gap:12px;padding:10px 0;border-bottom:1px dashed var(--line)} .punto:last-of-type{border:0}\n.punto .ic{font-size:1.5rem;line-height:1.3} .punto b{color:var(--acc)}\ndetails.amp{margin-top:10px;border-radius:14px;background:var(--acc-soft);padding:0 14px}\ndetails.amp summary{cursor:pointer;font-weight:800;padding:10px 0;color:var(--acc);list-style:none}\ndetails.amp summary::before{content:\"\ud83d\udcd6 \";} details.amp[open]{padding-bottom:12px}\n.conexion{display:flex;gap:10px;align-items:flex-start;padding:14px 16px;border-radius:16px;background:rgba(2,132,199,.10);border:1px solid rgba(2,132,199,.25);font-weight:700}\n.glosario{display:flex;flex-wrap:wrap;gap:8px}\n.term{position:relative;cursor:help;padding:7px 13px;border-radius:12px;background:var(--solid);border:1px solid var(--line);font-weight:800;font-size:.86rem;transition:all .25s}\n.term:hover,.term:focus{background:var(--acc);color:#fff}\n.term .def{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%) scale(.9);opacity:0;pointer-events:none;width:230px;background:rgba(15,12,30,.95);color:#fff;font-weight:600;font-size:.8rem;padding:10px 12px;border-radius:12px;transition:all .2s;z-index:10}\n.term:hover .def,.term:focus .def{opacity:1;transform:translateX(-50%) scale(1)}\n.sabias{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}\n.sabias div{padding:14px;border-radius:16px;background:linear-gradient(135deg,rgba(245,158,11,.14),rgba(219,39,119,.08));border:1px solid rgba(245,158,11,.3);font-weight:700;font-size:.92rem}\n/* FLIP */\n.grid-flip{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}\n.flip{perspective:1000px;height:200px;cursor:pointer}\n.flip-in{position:relative;width:100%;height:100%;transition:transform .7s cubic-bezier(.3,1.4,.5,1);transform-style:preserve-3d}\n.flip.on .flip-in{transform:rotateY(180deg)}\n.flip:hover .flip-in{box-shadow:var(--shadow)}\n.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}\n.front{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff}\n.front .ic{font-size:2.6rem} .front b{font-size:1.2rem;font-weight:900} .front small{opacity:.8;font-weight:700}\n.back{background:var(--solid);border:2px solid var(--acc);transform:rotateY(180deg);font-weight:700;font-size:.9rem}\n/* TABS */\n.tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}\n.tab{border:2px solid var(--line);background:var(--solid);color:var(--txt);font:inherit;font-weight:800;padding:9px 14px;border-radius:14px;cursor:pointer;transition:all .25s}\n.tab:hover{border-color:var(--acc);transform:translateY(-2px)} .tab.on{background:var(--acc);color:#fff;border-color:var(--acc)}\n.panel{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;animation:aparece .4s}\n.panel > div{padding:14px;border-radius:16px;background:var(--solid);border:1px solid var(--line)}\n.panel h4{margin:0 0 6px;font-size:.95rem} .panel ul{margin:0;padding-left:18px}\n.panel > div:nth-child(1) h4{color:var(--info)} .panel > div:nth-child(2) h4{color:var(--ok)} .panel > div:nth-child(3) h4{color:var(--bad)}\n@keyframes aparece{from{opacity:0;transform:translateY(8px)}}\n/* DATA LAB */\n.lab{display:grid;grid-template-columns:minmax(240px,1fr) 1.4fr;gap:18px;align-items:center}\n.slider{margin:8px 0}\n.slider label{display:flex;justify-content:space-between;font-weight:800;font-size:.88rem}\n.slider input{width:100%;accent-color:var(--acc)}\n.chart-box{position:relative;height:300px;background:var(--solid);border-radius:18px;padding:12px;border:1px solid var(--line)}\n/* CLASIFICADOR */\n.clas-item{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:12px 14px;border-radius:14px;background:var(--solid);border:2px solid var(--line);margin-bottom:8px;transition:all .3s}\n.clas-item.ok{border-color:var(--ok);background:var(--ok-soft)} .clas-item.bad{border-color:var(--bad);background:var(--bad-soft);animation:vibra .4s}\n.clas-item .ops{display:flex;gap:6px}\n@keyframes vibra{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}\n.marcador{font-weight:900;font-size:1.05rem;padding:10px 14px;border-radius:14px;background:var(--acc-soft);display:inline-block;margin-top:6px}\n/* TIMELINE */\n.tl{display:flex;gap:0;overflow-x:auto;padding:30px 4px 10px;position:relative;scroll-snap-type:x mandatory}\n.hito{flex:0 0 150px;text-align:center;position:relative;scroll-snap-align:start;cursor:pointer}\n.hito::before{content:\"\";position:absolute;top:21px;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--acc),var(--acc2))}\n.hito .pt{position:relative;width:46px;height:46px;border-radius:50%;margin:0 auto;background:var(--solid);border:4px solid var(--acc);display:grid;place-items:center;font-weight:900;font-size:.7rem;transition:all .3s;z-index:1}\n.hito:hover .pt,.hito.on .pt{background:var(--acc);color:#fff;transform:scale(1.18)}\n.hito .an{font-weight:900;margin-top:6px} .hito .ti{font-size:.82rem;font-weight:700;color:var(--muted)}\n.tl-detalle{margin-top:6px;padding:14px 18px;border-radius:16px;background:var(--solid);border-left:6px solid var(--acc);min-height:54px;font-weight:700;animation:aparece .4s}\n/* RETO */\n.pasos{counter-reset:p;list-style:none;padding:0;margin:0}\n.pasos li{counter-increment:p;display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:14px;background:var(--solid);border:1px solid var(--line);margin-bottom:8px;cursor:pointer;transition:all .25s}\n.pasos li::before{content:counter(p);flex:0 0 34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#0891b2;color:#fff;font-weight:900}\n.pasos li.hecho{opacity:.6;text-decoration:line-through} .pasos li.hecho::before{content:\"\u2713\";background:var(--ok)}\n.prompt-box{position:relative;font-family:'JetBrains Mono',monospace;font-size:.84rem;background:#0f0c1d;color:#c4f1d4;padding:18px;padding-top:44px;border-radius:16px;white-space:pre-wrap;line-height:1.55}\n.prompt-box .btn{position:absolute;top:8px;right:8px}\n.prompt-box .lbl{position:absolute;top:12px;left:16px;color:#8b87a8;font-size:.72rem}\n.check{display:flex;gap:10px;align-items:center;padding:8px 4px;cursor:pointer;font-weight:700}\n.check input{width:20px;height:20px;accent-color:var(--ok)}\n.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n.two>*,.hero-grid>*,.lab>*,.panel>*{min-width:0}\n.pasos li span,.prompt-box,.check,.punto div{overflow-wrap:anywhere}\n/* QUIZ */\n.q{padding:18px;border-radius:18px;background:var(--solid);border:2px solid var(--line);margin-bottom:12px;transition:all .3s}\n.q.ok{border-color:var(--ok)} .q.bad{border-color:var(--bad);animation:vibra .4s}\n.q .num{font-size:.72rem;font-weight:900;color:var(--acc);text-transform:uppercase}\n.q .opts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}\n.opt{text-align:left;font:inherit;font-weight:700;padding:11px 14px;border-radius:12px;border:2px solid var(--line);background:transparent;color:var(--txt);cursor:pointer;transition:all .2s}\n.opt:hover:not(:disabled){border-color:var(--acc);background:var(--acc-soft);transform:translateY(-2px)}\n.opt.ok{background:var(--ok);border-color:var(--ok);color:#fff} .opt.bad{background:var(--bad);border-color:var(--bad);color:#fff}\n.opt:disabled{cursor:default}\n.expl{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--acc-soft);font-weight:700;font-size:.9rem}\n.resultado{text-align:center;padding:24px;border-radius:20px;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff}\n.resultado .big{font-size:3rem;font-weight:900}\n/* INVESTIGACION / TAREA */\n.lista-num{padding-left:22px} .lista-num li{margin-bottom:8px;font-weight:700}\n.papel{position:relative;background:#fffef6;color:#1e1b3a;border-radius:10px;padding:20px 22px 20px 64px;box-shadow:var(--shadow);background-image:repeating-linear-gradient(transparent 0 33px,#bfd4f2 33px 34px);line-height:34px}\n.papel::before{content:\"\";position:absolute;left:46px;top:0;bottom:0;width:2px;background:#f19ab5}\n.renglon{height:34px}\n.flecha-izq{display:inline-flex;align-items:center;gap:10px;font-weight:900;color:#db2777;font-size:1.05rem;padding:10px 16px;border-radius:14px;background:rgba(219,39,119,.1);margin-bottom:12px}\n.flecha-izq .fl{font-size:2rem;display:inline-block;animation:izq 1s ease-in-out infinite}\n@keyframes izq{50%{transform:translateX(-14px)}}\n.rubrica li{margin-bottom:6px;font-weight:700}\n/* HOJA */\n.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}\n.campo label{display:block;font-size:.76rem;font-weight:900;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin-bottom:4px}\n.campo input,.campo select,.campo textarea{width:100%;font:inherit;font-size:.95rem;padding:11px 13px;border-radius:12px;border:2px solid var(--line);background:var(--solid);color:var(--txt);transition:border .2s}\n.campo input:focus,.campo select:focus,.campo textarea:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 4px var(--acc-soft)}\n.campo.err input{border-color:var(--bad);animation:vibra .4s}\n.campo.full{grid-column:1/-1}\n.preg{margin-top:14px}\n.preg label{font-size:.95rem;text-transform:none;letter-spacing:0;color:var(--txt);font-weight:800}\n.estrellas{display:flex;gap:6px;font-size:2rem}\n.estrellas button{background:none;border:0;cursor:pointer;filter:grayscale(1) opacity(.4);transition:all .2s;font-size:inherit;padding:0}\n.estrellas button.on{filter:none;transform:scale(1.1)}\n.resumen{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-top:14px}\n.resumen div{padding:14px;border-radius:14px;background:var(--acc-soft);text-align:center;font-weight:800}\n.resumen b{display:block;font-size:1.5rem;color:var(--acc)}\n.acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}\n.guardado{font-size:.8rem;font-weight:800;color:var(--ok);opacity:0;transition:opacity .3s}\n.guardado.on{opacity:1}\n.aviso{font-size:.84rem;padding:12px 14px;border-radius:12px;background:rgba(2,132,199,.10);margin-top:14px;font-weight:600}\n/* DOCENTE */\n.docente{border:3px dashed #b45309}\n/* FOOTER / FLOAT */\nfooter{margin:40px 0 0;padding:28px 16px;text-align:center;background:#0f0c1d;color:#e8e4ff;font-weight:800}\nfooter small{display:block;opacity:.6;font-weight:600;margin-top:4px}\n.flotante{position:fixed;right:14px;bottom:14px;display:flex;flex-direction:column;gap:8px;z-index:60}\n.flotante button{width:44px;height:44px;border-radius:14px;border:1px solid var(--line);background:var(--card);backdrop-filter:blur(10px);color:var(--txt);font-size:1.05rem;font-weight:900;cursor:pointer;box-shadow:var(--shadow);transition:all .25s}\n.flotante button:hover{transform:scale(1.1);background:var(--acc);color:#fff}\n.modal{position:fixed;inset:0;background:rgba(10,8,20,.6);backdrop-filter:blur(6px);display:none;place-items:center;z-index:150;padding:16px}\n.modal.on{display:grid}\n.modal .card{max-width:340px;text-align:center;background:var(--solid)}\n#qr{display:grid;place-items:center;margin:14px 0;background:#fff;padding:12px;border-radius:14px}\n.leer{background:var(--acc-soft);color:var(--acc);border:0;border-radius:10px;padding:6px 10px;font:inherit;font-weight:800;font-size:.78rem;cursor:pointer}\n.leer:hover{background:var(--acc);color:#fff}\n#confeti{position:fixed;inset:0;pointer-events:none;z-index:300}\n#hojaImpresion{display:none}\n@media (max-width:760px){\n  .hero{padding:26px 20px;border-radius:24px} .hero-grid,.two,.lab{grid-template-columns:1fr} .q .opts{grid-template-columns:1fr}\n  .card{padding:18px} .navbar{justify-content:center} .flotante{right:8px;bottom:8px}\n}\n/* IMPRESI\u00d3N: solo la hoja de respuestas */\n@media print{\n  body{background:#fff!important;color:#000}\n  body > *:not(#hojaImpresion){display:none!important}\n  #hojaImpresion{display:block!important;font-family:Arial,sans-serif;font-size:11pt;color:#000}\n  #hojaImpresion h1{font-size:15pt;margin:0} #hojaImpresion h2{font-size:12pt;border-bottom:2px solid #000;margin:14px 0 6px;padding-bottom:2px}\n  #hojaImpresion table{width:100%;border-collapse:collapse} #hojaImpresion td{border:1px solid #555;padding:4px 6px;font-size:10pt}\n  #hojaImpresion .rsp{border:1px solid #999;min-height:40px;padding:6px;white-space:pre-wrap;margin-bottom:6px}\n  #hojaImpresion .firmas{display:flex;justify-content:space-around;margin-top:40px} #hojaImpresion .firmas div{border-top:1px solid #000;width:40%;text-align:center;padding-top:4px}\n}\n\n/* ===== VARIANTES DE ESTILO (elegidas seg\u00fan el tema) ===== */\n.hero h1,.sec-head h2,.front b{font-family:var(--font-titulo,var(--font)),'Nunito',sans-serif}\nbody.fondo-puntos{background-image:radial-gradient(color-mix(in srgb,var(--acc) 22%,transparent) 1.3px,transparent 1.6px);background-size:22px 22px}\nbody.fondo-cuadricula{background-image:linear-gradient(color-mix(in srgb,var(--acc) 10%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--acc) 10%,transparent) 1px,transparent 1px);background-size:28px 28px}\nbody.fondo-renglones{background-image:repeating-linear-gradient(transparent 0 31px,color-mix(in srgb,var(--acc) 13%,transparent) 31px 32px)}\nbody.fondo-diagonal{background-image:repeating-linear-gradient(45deg,color-mix(in srgb,var(--acc) 6%,transparent) 0 14px,transparent 14px 28px)}\nbody.hero-oscuro .hero{background:radial-gradient(600px 300px at 90% 0%,color-mix(in srgb,var(--acc) 45%,transparent),transparent 70%),radial-gradient(500px 300px at 0% 100%,color-mix(in srgb,var(--acc2) 35%,transparent),transparent 70%),#0b1020;border:1px solid color-mix(in srgb,var(--acc) 45%,transparent)}\nbody.hero-oscuro .hero h1{background:linear-gradient(90deg,#fff,color-mix(in srgb,var(--acc) 40%,#fff),var(--acc3));-webkit-background-clip:text;background-clip:text;color:transparent}\nbody.hero-oscuro .hero::after{background:color-mix(in srgb,var(--acc) 18%,transparent)}\nbody.hero-claro .hero{background:var(--solid);color:var(--txt);border:1px solid var(--line);border-left:12px solid var(--acc)}\nbody.hero-claro .hero::after{background:linear-gradient(135deg,color-mix(in srgb,var(--acc) 22%,transparent),color-mix(in srgb,var(--acc2) 18%,transparent))}\nbody.hero-claro .hero h1{color:var(--acc)}\nbody.hero-claro .chip{background:var(--acc-soft);border-color:transparent;color:var(--acc)}\nbody.hero-claro .glass-w{background:var(--acc-soft);border-color:transparent}\nbody.hero-diagonal .hero{background:linear-gradient(115deg,var(--acc) 0 58%,var(--acc2) 58% 80%,var(--acc3) 80%)}\nbody.nivel-inicial .hero h1{font-size:clamp(2rem,6vw,3.4rem)}\n"; document.head.appendChild(st);
  document.body.insertAdjacentHTML("afterbegin", "<div id=\"progreso\"></div>\n<div class=\"wrap\">\n  <div class=\"navbar\">\n    <a href=\"../../../index.html\" class=\"btn dark\">\u2b05 Inicio (Grado)</a>\n    <a href=\"../../index.html\" class=\"btn purple\">\u2b05 Men\u00fa del Periodo</a>\n    <button type=\"button\" class=\"btn green\" onclick=\"copiarEnlace()\">\ud83d\udd17 Copiar enlace</button>\n  </div>\n  <header class=\"hero\" id=\"hero\"></header>\n  <nav class=\"secnav\" id=\"secnav\"></nav>\n  <main id=\"app\"></main>\n</div>\n<footer id=\"footer\"></footer>\n<div class=\"flotante\" aria-label=\"Herramientas\">\n  <button type=\"button\" data-act=\"tema\" title=\"Modo claro / oscuro\">\ud83c\udf13</button>\n  <button type=\"button\" data-act=\"fmas\" title=\"Letra m\u00e1s grande (modo proyector)\">A+</button>\n  <button type=\"button\" data-act=\"fmenos\" title=\"Letra m\u00e1s peque\u00f1a\">A\u2212</button>\n  <button type=\"button\" data-act=\"qr\" title=\"Abrir en el celular (QR)\">\ud83d\udcf1</button>\n  <button type=\"button\" data-act=\"arriba\" title=\"Volver arriba\">\u2b06</button>\n</div>\n<div class=\"modal\" id=\"modalQR\"><div class=\"card\"><h3>\ud83d\udcf1 Abre esta clase en tu celular</h3><p class=\"muted\">Escanea el c\u00f3digo con la c\u00e1mara.</p><div id=\"qr\"></div><button type=\"button\" class=\"btn\" data-act=\"cerrarqr\">Cerrar</button></div></div>\n<div class=\"toast\" id=\"toastCopiado\">Enlace copiado \u2705</div>\n<canvas id=\"confeti\"></canvas>\n<div id=\"hojaImpresion\"></div>");
})();

/* ===================== MOTOR (no modificar) ===================== */

window.copiarEnlace = function(){
  const url = window.location.href;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(()=>toast("Enlace copiado ✅")).catch(()=>alert("No se pudo copiar automáticamente. Copia el enlace desde la barra del navegador."));
  } else { alert("Copia el enlace desde la barra del navegador:\n" + url); }
}
let _tt;
window.toast = function toast(msg, ms){
  const t = document.getElementById('toastCopiado'); if(!t){ alert(msg); return; }
  t.textContent = msg; t.classList.add('on'); clearTimeout(_tt); _tt = setTimeout(()=>t.classList.remove('on'), ms || 2600);
}

if(CLASE_BERNAL) (function(){
  const C = Object.assign({}, DEFAULTS, CLASE_BERNAL || {}), M = C.modulos || {};
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  const arr = x => Array.isArray(x) ? x : (x ? [x] : []);
  const pad = n => String(n).padStart(2,'0');
  const docente = new URLSearchParams(location.search).get('docente') === '1';

  aplicarEstilo(C);
  document.title = C.tema + " | Grado " + C.grado + "° · " + (C.area || "");

  // ---------- NIVEL (1° a 11°) ----------
  const g = parseInt(C.grado, 10) || 6;
  const NIVEL = g <= 3 ? {cls:'nivel-inicial', nombre:'Primaria · ciclo inicial'} :
                g <= 5 ? {cls:'nivel-primaria', nombre:'Primaria'} :
                g <= 9 ? {cls:'nivel-basica', nombre:'Básica secundaria'} :
                         {cls:'nivel-media', nombre:'Media académica'};
  document.body.classList.add(NIVEL.cls);

  // ---------- ESTADO (autoguardado en este navegador) ----------
  const KEY = 'bernal-v5:' + location.pathname + ':' + g + '-' + C.periodo + '-' + C.semana + ':' + (C.tema||'').slice(0,40);
  let S = {datos:{}, resp:{}, quiz:{}, clas:{}, graf:null, checks:{}, estrellas:0};
  try{ const raw = localStorage.getItem(KEY); if(raw) S = Object.assign(S, JSON.parse(raw)); }catch(e){}
  let _sv;
  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
    const el = $('#guardado'); if(el){ el.classList.add('on'); clearTimeout(_sv); _sv = setTimeout(()=>el.classList.remove('on'), 1400); }
    actualizarResumen();
  }

  // ---------- LECTURA EN VOZ ALTA ----------
  function leer(texto){
    if(!('speechSynthesis' in window)){ toast('Tu navegador no permite lectura en voz alta'); return; }
    if(speechSynthesis.speaking){ speechSynthesis.cancel(); return; }
    const u = new SpeechSynthesisUtterance(texto.replace(/\*\*/g,''));
    const v = speechSynthesis.getVoices().find(v => /^es/i.test(v.lang));
    if(v) u.voice = v; u.lang = v ? v.lang : 'es-CO'; u.rate = g <= 5 ? 0.9 : 1;
    speechSynthesis.speak(u);
  }

  // ---------- SECCIONES ----------
  const NAV = [];
  function seccion(id, badgeCls, badge, titulo, cuerpo, extra){
    NAV.push({id, label: badge.split(' ')[0] + ' ' + (t=>t.length>28?t.slice(0,27)+'…':t)(titulo.split(':')[0])});
    return `<section class="sec" id="${id}"><div class="card ${extra||''}">
      <div class="sec-head"><span class="badge ${badgeCls}">${badge}</span><h2>${esc(titulo)}</h2></div>${cuerpo}</div></section>`;
  }

  // HERO
  $('#hero').innerHTML = `
    <span class="emoji">${esc(C.emoji || '💡')}</span>
    <h1>${esc(C.tema)}</h1>
    <div class="sub">${esc(C.colegio)} · ${esc(C.profesor)}</div>
    <div class="chips">
      <span class="chip">🎓 Grado ${g}°</span><span class="chip">📅 Periodo ${esc(C.periodo)}</span>
      <span class="chip">🗓️ Semana ${pad(C.semana)}</span><span class="chip">🧭 ${NIVEL.nombre}</span>
      <span class="chip">⏱️ ${esc(C.duracionMin || 45)} min</span><span class="chip">🛠️ ${esc(C.area)}</span>${C.anioLectivo?`<span class="chip">📆 ${esc(C.anioLectivo)}</span>`:''}
    </div>
    <div class="hero-grid">
      <div class="glass-w"><b>🎯 Objetivo de aprendizaje</b>${fmt(C.objetivo)}</div>
      <div class="glass-w"><b>🏅 Competencia</b>${fmt(C.competencia || '')}</div>
    </div>
    ${C.temaAnterior ? `<div class="glass-w"><b>🔗 Viene de la clase anterior</b>${fmt(C.temaAnterior)}</div>` : ''}`;

  let H = '';

  // DOCENTE
  if(docente && arr(C.notasDocente).length){
    H += seccion('docente','b-doc','👨‍🏫 Solo docente','Notas para el profesor',
      `<ul class="rubrica">${C.notasDocente.map(n=>`<li>${fmt(n)}</li>`).join('')}</ul>`, 'docente');
  }

  // RUTA DE LA CLASE
  if(C.preguntaGancho || arr(C.agenda).length){
    let acc = 0;
    const etapas = arr(C.agenda).map((a,i)=>{ const ini = acc; acc += a.min; return `<div class="etapa" data-ini="${ini}" data-fin="${acc}">
      <div class="min">Min ${ini}–${acc}</div><h3>${esc(a.titulo)}</h3><div class="muted">${fmt(a.texto)}</div></div>`; }).join('');
    H += seccion('ruta','b-ruta','🧭 Ruta de la clase','Comenzamos',
      `${C.preguntaGancho ? `<div class="gancho">❓ ${fmt(C.preguntaGancho)} <button class="leer" data-leer="${esc(C.preguntaGancho)}">🔊 Escuchar</button></div>` : ''}
       ${etapas ? `<div class="ruta">${etapas}</div>
       <div class="timer"><span class="reloj" id="reloj">00:00</span><div class="barra"><i id="barraT"></i></div>
       <button class="btn sm green" data-act="tplay" id="tplay">▶ Iniciar</button><button class="btn sm ghost" data-act="treset">↺ Reiniciar</button></div>` : ''}`);
  }

  // VIDEO
  const videos = arr(typeof C.video === 'string' ? {url:C.video.trim(), titulo:C.videoTitulo||'Video de apoyo', nota:C.videoNota||'Observa el video y anota en tu cuaderno 2 ideas que te llamen la atención.'} : C.video)
      .filter(v => v && (v.url || v.mostrarSiVacio || docente));
  if(videos.length){
    const cuerpo = videos.map(v=>{
      const e = embed(v.url);
      const player = !e ? `<div class="video-vacio"><div class="ic">🎬</div><b>Espacio reservado para video</b><br>
          <span>(Solo lo ve el profe) Pega un enlace de YouTube, Vimeo, Drive o Canva en la línea <code>video: ""</code> del index.html y aparecerá aquí.</span></div>`
        : e.type === 'video' ? `<div class="video-box"><video src="${esc(e.src)}" controls preload="metadata"></video></div>`
        : `<div class="video-box"><iframe src="${esc(e.src)}" title="${esc(v.titulo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
      return `${player}${v.nota ? `<p class="muted" style="margin-bottom:0">📝 ${fmt(v.nota)}</p>` : ''}`;
    }).join('<br>');
    H += seccion('video','b-video','🎬 Video', videos[0].titulo || 'Video de apoyo', cuerpo);
  }

  // CUADERNO
  if(C.cuaderno){
    const cu = C.cuaderno;
    const bloques = arr(cu.bloques).map(b=>{
      const texto = b.titulo + '. ' + arr(b.puntos).map(p=>p.termino + ': ' + p.texto).join('. ');
      return `<div class="bloque"><div class="bloque-top"><h3>${esc(b.icono||'')} ${esc(b.titulo)}</h3>
        <button class="leer" data-leer="${esc(texto)}">🔊 Leer</button></div>
        ${arr(b.puntos).map(p=>`<div class="punto"><span class="ic">${esc(p.icono||'•')}</span><div><b>${esc(p.termino)}:</b> ${fmt(p.texto)}</div></div>`).join('')}
        ${b.ampliacion ? `<details class="amp"><summary>Ampliar explicación (leer, no copiar)</summary>${fmt(b.ampliacion)}</details>` : ''}</div>`;
    }).join('');
    const glos = arr(C.glosario).length ? `<div class="sub-card"><h3>📚 Glosario (pasa el ratón por cada palabra)</h3><div class="glosario">
        ${C.glosario.map(t=>`<span class="term" tabindex="0">${esc(t.termino)}<span class="def">${esc(t.definicion)}</span></span>`).join('')}</div></div>` : '';
    const sab = arr(C.sabiasQue).length ? `<div class="sub-card"><h3>💡 ¿Sabías que…?</h3><div class="sabias">${C.sabiasQue.map(s=>`<div>${fmt(s)}</div>`).join('')}</div></div>` : '';
    H += seccion('cuaderno','b-cuaderno','📝 Copiar al cuaderno','Resumen para el cuaderno',
      `<p class="muted" style="margin-top:0">Escribe en el cuaderno: <b>Fecha</b>, <b>Tema</b> y <b>Propósito</b>. Luego copia cada bloque.</p>
       ${cu.conexion ? `<div class="conexion">🔗 <span>${fmt(cu.conexion)}</span></div>` : ''}${bloques}${glos}${sab}`);
  }

  // MÓDULOS INTERACTIVOS
  let MOD = '';
  if(M.tarjetas){
    MOD += `<div class="sub-card"><h3>🃏 ${esc(M.tarjetas.titulo)}</h3><div class="grid-flip">
      ${arr(M.tarjetas.items).map(t=>`<div class="flip" data-act="flip" tabindex="0"><div class="flip-in">
        <div class="face front"><span class="ic">${esc(t.icono||'❓')}</span><b>${esc(t.frente)}</b><small>Toca para girar ↻</small></div>
        <div class="face back">${fmt(t.reverso)}</div></div></div>`).join('')}</div></div>`;
  }
  if(M.explorador){
    MOD += `<div class="sub-card"><h3>🧭 ${esc(M.explorador.titulo)}</h3><div class="tabs">
      ${arr(M.explorador.items).map((it,i)=>`<button class="tab ${i===0?'on':''}" data-act="tab" data-i="${i}">${esc(it.icono||'')} ${esc(it.nombre)}</button>`).join('')}
      </div><div id="panelExp"></div></div>`;
  }
  if(M.grafica){
    const gr = M.grafica, n = arr(gr.etiquetas).length;
    if(!Array.isArray(S.graf) || S.graf.length !== n) S.graf = new Array(n).fill(0);
    MOD += `<div class="sub-card"><h3>📊 ${esc(gr.titulo)}</h3><p class="muted" style="margin-top:0">${fmt(gr.instruccion||'')}</p>
      <div class="lab"><div>${gr.etiquetas.map((e,i)=>`<div class="slider"><label>${esc(e)} <span id="gv${i}">${S.graf[i]} ${esc(gr.unidad||'')}</span></label>
        <input type="range" min="0" max="${gr.max||10}" step="0.5" value="${S.graf[i]}" data-graf="${i}"></div>`).join('')}
        <div class="marcador" id="gtotal"></div></div>
      <div class="chart-box"><canvas id="grafica"></canvas></div></div></div>`;
  }
  if(M.clasificador){
    const cl = M.clasificador;
    MOD += `<div class="sub-card"><h3>🎯 ${esc(cl.titulo)}</h3><div id="clasList">
      ${arr(cl.items).map((it,i)=>`<div class="clas-item" id="ci${i}"><span>${esc(it.texto)}</span><div class="ops">
        ${cl.categorias.map((c,ci)=>`<button class="btn sm" style="background:var(--acc${ci?ci+1:''})" data-act="clas" data-i="${i}" data-c="${ci}">${esc(c)}</button>`).join('')}</div></div>`).join('')}
      </div><div class="marcador" id="clasScore"></div> <button class="btn sm ghost" data-act="clasreset">↺ Reintentar</button></div>`;
  }
  if(M.linea){
    MOD += `<div class="sub-card"><h3>🕰️ ${esc(M.linea.titulo)}</h3><div class="tl">
      ${arr(M.linea.hitos).map((h,i)=>`<div class="hito ${i===0?'on':''}" data-act="hito" data-i="${i}"><div class="pt">${i+1}</div><div class="an">${esc(h.anio)}</div><div class="ti">${esc(h.titulo)}</div></div>`).join('')}
      </div><div class="tl-detalle" id="tlDet"></div></div>`;
  }
  if(MOD) H += seccion('interactuar','b-pc','💻 Interactuar en el PC','Laboratorio interactivo', MOD);

  // RETO EN SALA
  if(C.reto){
    const r = C.reto;
    H += seccion('reto','b-sala','🖥️ Trabajo en la sala', r.titulo,
      `<p style="margin-top:0;font-weight:700">${fmt(r.descripcion)}</p>
       <div class="two"><div><h3>Pasos (haz clic al terminar cada uno)</h3><ol class="pasos">
         ${arr(r.pasos).map((p,i)=>`<li data-act="paso" data-i="${i}" class="${S.checks['p'+i]?'hecho':''}"><span>${fmt(p)}</span></li>`).join('')}</ol></div>
       <div>${r.prompt ? `<h3>🤖 Prompt para la IA</h3><div class="prompt-box"><span class="lbl">prompt.txt</span><button class="btn sm green" data-act="copiarprompt">📋 Copiar</button>${esc(r.prompt)}</div>` : ''}
         ${arr(r.herramientas).length ? `<h3 style="margin-top:16px">🔗 Herramientas</h3><div class="acciones" style="margin-top:0">${r.herramientas.map(h=>`<a class="btn sm blue" href="${esc(h.url)}" target="_blank" rel="noopener">${esc(h.nombre)} ↗</a>`).join('')}</div>` : ''}
         ${arr(r.requisitos).length ? `<h3 style="margin-top:16px">✅ Lista de chequeo</h3>${r.requisitos.map((q,i)=>`<label class="check"><input type="checkbox" data-req="${i}" ${S.checks['r'+i]?'checked':''}> ${esc(q)}</label>`).join('')}` : ''}
       </div></div>`);
  }

  // QUIZ
  if(arr(C.quiz).length){
    H += seccion('quiz','b-quiz','🧠 Quiz','Pon a prueba lo aprendido',
      `<div id="quizBox">${C.quiz.map((q,i)=>`<div class="q" id="q${i}"><div class="num">Pregunta ${i+1} de ${C.quiz.length}</div>
        <h3>${fmt(q.pregunta)}</h3><div class="opts">${q.opciones.map((o,oi)=>`<button class="opt" data-act="quiz" data-q="${i}" data-o="${oi}">${String.fromCharCode(65+oi)}. ${esc(o)}</button>`).join('')}</div>
        <div class="expl" id="ex${i}" hidden></div></div>`).join('')}</div><div id="quizRes"></div>`);
  }

  // INVESTIGACIÓN
  if(C.investigacion){
    const inv = C.investigacion;
    H += seccion('investigacion','b-inv','🔍 Investigación', inv.titulo,
      `<p style="margin-top:0;font-weight:800">📓 ${fmt(inv.instruccion || 'Resuelve en tu cuaderno:')}</p>
       <ol class="lista-num">${arr(inv.preguntas).map(p=>`<li>${fmt(p)}</li>`).join('')}</ol>
       ${arr(inv.fuentes).length ? `<div class="aviso">🔎 <b>Fuentes sugeridas:</b> ${inv.fuentes.map(esc).join(' · ')}</div>` : ''}`);
  }

  // TAREA
  if(C.tarea){
    const t = C.tarea;
    H += seccion('tarea','b-tarea','📄 Tarea en hoja suelta', t.titulo,
      `${t.indicacion ? `<div class="flecha-izq"><span class="fl">⬅️</span> ${esc(t.indicacion)}</div>` : ''}
       <div class="papel"><b>${fmt(t.instruccion)}</b>${Array.from({length: t.renglones||5}).map(()=>'<div class="renglon"></div>').join('')}</div>
       <div class="two" style="margin-top:16px"><div><h3>📋 Cómo se califica</h3><ul class="rubrica">${arr(t.criterios).map(c=>`<li>${fmt(c)}</li>`).join('')}</ul></div>
       <div><h3>📅 Entrega</h3><p class="marcador">${esc(t.entrega || 'Próxima clase')}</p><p class="muted">Hoja suelta, con nombre completo, grado y fecha.</p></div></div>`);
  }

  // HOJA DE RESPUESTAS
  const grados = Array.from({length:11},(_,i)=>i+1);
  const D = S.datos;
  const hoy = new Date(); const hoyISO = hoy.getFullYear()+'-'+pad(hoy.getMonth()+1)+'-'+pad(hoy.getDate());
  H += seccion('hoja','b-hoja','📤 Hoja de respuestas','Mi hoja de trabajo (PDF)',
    `<p class="muted" style="margin-top:0">Tus respuestas se guardan solas en este computador <span class="guardado" id="guardado">✔ Guardado</span>. Al final descarga tu PDF, imprímelo o envíalo.</p>
     <div class="form-grid">
       <div class="campo full" id="c-nombre"><label>Nombre completo *</label><input data-dato="nombre" value="${esc(D.nombre||'')}" placeholder="Apellidos y nombres"></div>
       <div class="campo"><label>Grado</label><select data-dato="grado">${grados.map(x=>`<option ${String(D.grado||g)===String(x)?'selected':''} value="${x}">${x}°</option>`).join('')}</select></div>
       <div class="campo"><label>Grupo</label><input data-dato="grupo" value="${esc(D.grupo||'')}" placeholder="ej: ${g}-1"></div>
       <div class="campo"><label>Fecha</label><input type="date" data-dato="fecha" value="${esc(D.fecha||hoyISO)}"></div>
       <div class="campo"><label>Periodo</label><input data-dato="periodo" value="${esc(D.periodo||C.periodo)}"></div>
       <div class="campo"><label>Semana</label><input data-dato="semana" value="${esc(D.semana||C.semana)}"></div>
     </div>
     ${arr(C.hoja && C.hoja.preguntas).map((p,i)=>`<div class="campo preg"><label>${i+1}. ${esc(p.texto)}</label>
       <textarea rows="${Math.max(2,(p.lineas||3))}" data-resp="${esc(p.id)}" placeholder="Escribe tu respuesta…">${esc(S.resp[p.id]||'')}</textarea></div>`).join('')}
     <div class="campo preg"><label>⭐ Autoevaluación: ¿qué tanto entendí el tema hoy?</label>
       <div class="estrellas">${[1,2,3,4,5].map(n=>`<button type="button" data-act="estrella" data-n="${n}" class="${S.estrellas>=n?'on':''}" aria-label="${n} estrellas">⭐</button>`).join('')}</div></div>
     <h3 style="margin-top:18px">📈 Resumen automático</h3><div class="resumen" id="resumen"></div>
     <div class="acciones">
       <button class="btn" data-act="pdf">📄 Descargar PDF</button>
       <button class="btn dark" data-act="imprimir">🖨️ Imprimir</button>
       <button class="btn wa" data-act="whatsapp">📲 Compartir / WhatsApp</button>
       <button class="btn blue" data-act="correo">✉️ Enviar por correo</button>
       <button class="btn sm red" data-act="borrar" style="margin-left:auto">🗑️ Borrar mis respuestas</button>
     </div>
     <div class="aviso">💡 En el celular, «Compartir» adjunta el PDF directo a WhatsApp o Gmail. En el computador, el PDF se descarga y se abre WhatsApp Web o tu correo: solo arrastra el archivo al chat o adjúntalo con el clip 📎.</div>`);

  $('#app').innerHTML = H;
  $('#secnav').innerHTML = NAV.map(n=>`<a href="#${n.id}">${esc(n.label)}</a>`).join('');
  $('#footer').innerHTML = `© ${new Date().getFullYear()} | ${esc(C.profesor)} - Área de ${esc(C.area)}<small>${esc(C.colegio)} · Grado ${g}° · Periodo ${esc(C.periodo)} · Semana ${pad(C.semana)}</small>`;

  // ---------- EMBED DE VIDEO ----------
  function embed(url){
    if(!url) return null; let m;
    if((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/))) return {type:'iframe', src:'https://www.youtube-nocookie.com/embed/'+m[1]+'?rel=0'};
    if((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return {type:'iframe', src:'https://player.vimeo.com/video/'+m[1]};
    if((m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/))) return {type:'iframe', src:'https://drive.google.com/file/d/'+m[1]+'/preview'};
    if(/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return {type:'video', src:url};
    return {type:'iframe', src:url};
  }

  // ---------- EXPLORADOR ----------
  function tab(i){
    const it = M.explorador.items[i];
    $$('.tab').forEach((b,j)=>b.classList.toggle('on', j===i));
    $('#panelExp').innerHTML = `<div class="panel">${arr(it.secciones).map(s=>`<div><h4>${esc(s.titulo)}</h4><ul>${arr(s.items).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  if(M.explorador) tab(0);

  // ---------- LÍNEA DE TIEMPO ----------
  function hito(i){
    const h = M.linea.hitos[i];
    $$('.hito').forEach((b,j)=>b.classList.toggle('on', j===i));
    $('#tlDet').innerHTML = `<b>${esc(h.anio)} · ${esc(h.titulo)}:</b> ${fmt(h.texto)}`;
  }
  if(M.linea) hito(0);

  // ---------- DATA LAB ----------
  let chart = null;
  function graficar(){
    const gr = M.grafica; if(!gr) return;
    const total = S.graf.reduce((a,b)=>a+Number(b),0);
    $('#gtotal').textContent = 'Total: ' + total + ' ' + (gr.unidad||'');
    if(!window.Chart) return;
    const acc = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#6d28d9';
    const ds = [{label:'Mi día', data:S.graf.map(Number), backgroundColor:acc, borderRadius:8}];
    if(gr.referencia) ds.push({label:gr.referencia.nombre, data:gr.referencia.valores, backgroundColor:(getComputedStyle(document.documentElement).getPropertyValue('--acc2').trim()||'#059669'), borderRadius:8});
    if(chart){ chart.data.datasets[0].data = ds[0].data; chart.update(); return; }
    const txt = getComputedStyle(document.body).color;
    chart = new Chart($('#grafica'), {type: gr.tipo || 'bar', data:{labels: gr.etiquetas, datasets: ds},
      options:{responsive:true, maintainAspectRatio:false, animation:{duration:700, easing:'easeOutBack'},
        plugins:{legend:{labels:{color:txt, font:{family:'Nunito', weight:'bold'}}}, tooltip:{callbacks:{label:c=>c.dataset.label+': '+c.raw+' '+(gr.unidad||'')}}},
        scales:{x:{ticks:{color:txt}}, y:{beginAtZero:true, suggestedMax:gr.max||10, ticks:{color:txt}}}}});
  }

  // ---------- CLASIFICADOR ----------
  function pintarClas(){
    const cl = M.clasificador; if(!cl) return; let ok = 0, hechos = 0;
    cl.items.forEach((it,i)=>{
      const el = $('#ci'+i); const v = S.clas[i]; el.classList.remove('ok','bad');
      if(v !== undefined){ hechos++; const bien = Number(v) === it.categoria; if(bien) ok++; el.classList.add(bien?'ok':'bad'); }
    });
    $('#clasScore').textContent = `🎯 ${ok} de ${cl.items.length} correctas` + (hechos < cl.items.length ? ` · faltan ${cl.items.length-hechos}` : (ok===cl.items.length?' · ¡Perfecto! 🏆':''));
    return {ok, total: cl.items.length};
  }

  // ---------- QUIZ ----------
  function pintarQuiz(){
    if(!arr(C.quiz).length) return; let ok = 0, resp = 0;
    C.quiz.forEach((q,i)=>{
      const sel = S.quiz[i]; const card = $('#q'+i); const ex = $('#ex'+i);
      card.classList.remove('ok','bad');
      $$('.opt', card).forEach((b,oi)=>{ b.classList.remove('ok','bad'); b.disabled = sel !== undefined;
        if(sel !== undefined){ if(oi === q.correcta) b.classList.add('ok'); else if(oi === Number(sel)) b.classList.add('bad'); }});
      if(sel !== undefined){ resp++; const bien = Number(sel) === q.correcta; if(bien) ok++;
        card.classList.add(bien?'ok':'bad'); ex.hidden = false; ex.innerHTML = (bien?'✅ ¡Correcto! ':'❌ No es correcto. ') + fmt(q.explicacion||''); }
      else { ex.hidden = true; }
    });
    const box = $('#quizRes');
    if(resp === C.quiz.length){
      const nota = (ok / C.quiz.length * 5).toFixed(1);
      box.innerHTML = `<div class="resultado"><div>Tu resultado</div><div class="big">${ok} / ${C.quiz.length}</div>
        <div>Nota: <b>${nota}</b> / 5.0 · ${ok===C.quiz.length?'¡Excelente! 🏆':ok>=C.quiz.length*0.6?'¡Muy bien! 👏':'Repasa el cuaderno y vuelve a intentarlo 💪'}</div>
        <br><button class="btn sm dark" data-act="quizreset">↺ Intentar de nuevo</button></div>`;
    } else box.innerHTML = '';
    return {ok, total: C.quiz.length, resp};
  }

  // ---------- RESUMEN ----------
  function actualizarResumen(){
    const el = $('#resumen'); if(!el) return;
    const q = arr(C.quiz).length ? pintarQuizSilencioso() : null;
    const c = M.clasificador ? {ok: M.clasificador.items.filter((it,i)=>S.clas[i]!==undefined && Number(S.clas[i])===it.categoria).length, total: M.clasificador.items.length} : null;
    const req = C.reto ? arr(C.reto.requisitos).filter((_,i)=>S.checks['r'+i]).length : 0;
    const pr = arr(C.hoja && C.hoja.preguntas); const rr = pr.filter(p=>(S.resp[p.id]||'').trim()).length;
    el.innerHTML = [
      `<div><b>${rr}/${pr.length}</b>Preguntas respondidas</div>`,
      q ? `<div><b>${q.ok}/${q.total}</b>Quiz</div>` : '',
      c ? `<div><b>${c.ok}/${c.total}</b>Clasificador</div>` : '',
      C.reto && arr(C.reto.requisitos).length ? `<div><b>${req}/${C.reto.requisitos.length}</b>Lista de chequeo</div>` : '',
      `<div><b>${'⭐'.repeat(S.estrellas)||'—'}</b>Autoevaluación</div>`].join('');
  }
  function pintarQuizSilencioso(){ let ok=0; C.quiz.forEach((q,i)=>{ if(S.quiz[i]!==undefined && Number(S.quiz[i])===q.correcta) ok++; }); return {ok, total:C.quiz.length}; }

  // ---------- CRONÓMETRO ----------
  let tSeg = 0, tInt = null; const tTotal = (C.duracionMin || arr(C.agenda).reduce((a,b)=>a+b.min,0) || 45) * 60;
  function tPintar(){
    const r = $('#reloj'); if(!r) return;
    r.textContent = pad(Math.floor(tSeg/60)) + ':' + pad(tSeg%60);
    $('#barraT').style.width = Math.min(100, tSeg / tTotal * 100) + '%';
    const min = tSeg / 60;
    $$('.etapa').forEach(e=>{ const a = +e.dataset.ini, b = +e.dataset.fin; e.classList.toggle('act', tInt!==null || tSeg>0 ? (min>=a && min<b) : false); e.classList.toggle('hecha', min>=b); });
  }

  // ---------- CONFETI ----------
  function confeti(){
    const cv = $('#confeti'), ctx = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight;
    const cols = ['#6d28d9','#db2777','#f59e0b','#059669','#0284c7'];
    const P = Array.from({length:160},()=>({x:Math.random()*cv.width, y:-20-Math.random()*cv.height*0.5, r:4+Math.random()*6, c:cols[Math.floor(Math.random()*5)], vy:2+Math.random()*4, vx:-2+Math.random()*4, a:Math.random()*6}));
    let f = 0; (function loop(){ ctx.clearRect(0,0,cv.width,cv.height);
      P.forEach(p=>{ p.y+=p.vy; p.x+=p.vx; p.a+=0.1; ctx.fillStyle=p.c; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a); ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6); ctx.restore(); });
      if(++f < 200) requestAnimationFrame(loop); else ctx.clearRect(0,0,cv.width,cv.height); })();
  }

  // ---------- PDF ----------
  const latin = s => String(s == null ? '' : s).normalize('NFC').replace(/\*\*/g,'')
    .replace(/[‘’]/g,"'").replace(/[“”«»]/g,'"').replace(/[–—]/g,'-').replace(/…/g,'...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g,'').replace(/[ \t]{2,}/g,' ').trim();
  function datosEstudiante(){
    return { nombre:(S.datos.nombre||'').trim(), grado:S.datos.grado||g, grupo:S.datos.grupo||'', fecha:S.datos.fecha||hoyISO,
             periodo:S.datos.periodo||C.periodo, semana:S.datos.semana||C.semana };
  }
  function nombreArchivo(){
    const d = datosEstudiante();
    const n = latin(d.nombre).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_|_$/g,'') || 'Estudiante';
    return `Hoja_G${d.grado}_P${d.periodo}_S${pad(d.semana)}_${n}.pdf`;
  }
  function validar(){
    const d = datosEstudiante();
    if(!d.nombre){ const c = $('#c-nombre'); c.classList.remove('err'); void c.offsetWidth; c.classList.add('err'); c.querySelector('input').focus();
      toast('✏️ Escribe tu nombre completo antes de generar el PDF'); return false; }
    if(!window.jspdf){ toast('⚠️ No se cargó el generador de PDF. Revisa tu conexión a Internet y recarga la página.', 4000); return false; }
    return true;
  }
  function hexRgb(h){ h = h.replace('#',''); if(h.length===3) h = h.split('').map(x=>x+x).join(''); const n = parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function construirPDF(){
    const { jsPDF } = window.jspdf; const doc = new jsPDF({unit:'mm', format:'letter'});
    const W = doc.internal.pageSize.getWidth(), Hh = doc.internal.pageSize.getHeight(), Mg = 16, An = W - 2*Mg;
    const acc = hexRgb((C.colorPrincipal||'#6d28d9')); const d = datosEstudiante(); let y;
    const salto = h => { if(y + h > Hh - 18){ doc.addPage(); y = 18; } };
    const texto = (t, size, style, color, ind) => { doc.setFont('helvetica', style||'normal'); doc.setFontSize(size||10.5); doc.setTextColor.apply(doc, color||[30,30,40]);
      const lines = doc.splitTextToSize(latin(t), An - (ind||0)); lines.forEach(l=>{ salto(size*0.45); doc.text(l, Mg + (ind||0), y); y += size*0.45; }); };
    const titulo = t => { y += 3; salto(12); doc.setFillColor(acc[0],acc[1],acc[2]); doc.roundedRect(Mg, y-5, An, 8, 2, 2, 'F');
      doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(255,255,255); doc.text(latin(t), Mg+3, y+0.6); y += 8; };
    // Encabezado
    doc.setFillColor(acc[0],acc[1],acc[2]); doc.rect(0,0,W,34,'F');
    doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.text(latin(C.colegio), Mg, 11);
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.text(latin(C.area + ' - ' + C.profesor), Mg, 17);
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.splitTextToSize(latin('Hoja de respuestas: ' + C.tema), An).slice(0,2).forEach((l,i)=>doc.text(l, Mg, 24 + i*5.5));
    y = 42;
    // Datos
    doc.setDrawColor(180,180,190); doc.setLineWidth(0.3);
    const filas = [['Estudiante', d.nombre],['Grado / Grupo', d.grado + '°' + (d.grupo ? '  (' + d.grupo + ')' : '')],['Fecha', d.fecha],['Periodo / Semana', 'Periodo ' + d.periodo + '  -  Semana ' + d.semana]];
    filas.forEach(f=>{ doc.rect(Mg, y-4.5, 42, 7); doc.rect(Mg+42, y-4.5, An-42, 7); doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(60,60,70);
      doc.text(latin(f[0]), Mg+2, y); doc.setFont('helvetica','normal'); doc.setTextColor(20,20,30); doc.text(latin(String(f[1])), Mg+44, y); y += 7; });
    y += 2;
    // Respuestas abiertas
    const pr = arr(C.hoja && C.hoja.preguntas);
    if(pr.length){ titulo('1. Respuestas');
      pr.forEach((p,i)=>{ y += 1.5; texto((i+1)+'. '+p.texto, 10, 'bold', [40,30,90]); const r = (S.resp[p.id]||'').trim();
        texto(r || '(sin responder)', 10.5, r?'normal':'italic', r?[20,20,30]:[150,150,160], 4); y += 1; }); }
    // Quiz
    if(arr(C.quiz).length){ const q = pintarQuizSilencioso(); titulo('2. Quiz - ' + q.ok + ' de ' + q.total + ' correctas (nota ' + (q.ok/q.total*5).toFixed(1) + ' / 5.0)');
      C.quiz.forEach((qq,i)=>{ const s = S.quiz[i]; const bien = s!==undefined && Number(s)===qq.correcta;
        texto((i+1)+'. '+qq.pregunta, 9.5, 'bold', [40,30,90]);
        texto('Respuesta: ' + (s===undefined ? '(sin responder)' : qq.opciones[s]) + (s===undefined ? '' : bien ? '   [Correcta]' : '   [Incorrecta - era: ' + qq.opciones[qq.correcta] + ']'), 9.5, 'normal', s===undefined?[150,150,160]:bien?[5,120,80]:[190,30,30], 4); y += 0.8; }); }
    // Clasificador
    if(M.clasificador){ const cl = M.clasificador; const ok = cl.items.filter((it,i)=>S.clas[i]!==undefined && Number(S.clas[i])===it.categoria).length;
      titulo('3. ' + cl.titulo + ' - ' + ok + ' de ' + cl.items.length);
      cl.items.forEach((it,i)=>{ const s = S.clas[i]; texto('- ' + it.texto + ': ' + (s===undefined ? '(sin responder)' : cl.categorias[s] + (Number(s)===it.categoria ? ' (bien)' : ' (revisar)')), 9.5); }); }
    // Data lab
    if(M.grafica){ titulo('4. ' + M.grafica.titulo);
      M.grafica.etiquetas.forEach((e,i)=>texto('- ' + e + ': ' + S.graf[i] + ' ' + (M.grafica.unidad||'') + (M.grafica.referencia ? '  (sugerido: ' + M.grafica.referencia.valores[i] + ')' : ''), 9.5));
      texto('Total: ' + S.graf.reduce((a,b)=>a+Number(b),0) + ' ' + (M.grafica.unidad||''), 9.5, 'bold'); }
    // Reto
    if(C.reto && arr(C.reto.requisitos).length){ titulo('5. Reto en sala: ' + C.reto.titulo);
      C.reto.requisitos.forEach((r,i)=>texto((S.checks['r'+i] ? '[X] ' : '[  ] ') + r, 9.5)); }
    // Autoevaluación
    titulo('Autoevaluación'); texto('Comprensión del tema: ' + S.estrellas + ' de 5 estrellas', 10.5, 'bold');
    // Firmas
    y += 16; salto(20); doc.setDrawColor(60,60,70); doc.line(Mg+6, y, Mg+70, y); doc.line(W-Mg-70, y, W-Mg-6, y);
    doc.setFontSize(9); doc.setTextColor(60,60,70); doc.setFont('helvetica','normal'); doc.text('Firma del estudiante', Mg+22, y+5); doc.text('Revisado por el docente / Nota', W-Mg-60, y+5);
    // Pie
    const n = doc.getNumberOfPages();
    for(let i=1;i<=n;i++){ doc.setPage(i); doc.setFontSize(8); doc.setTextColor(140,140,150);
      doc.text(latin(C.profesor + ' - ' + C.area + ' - Generado: ' + new Date().toLocaleString('es-CO')), Mg, Hh-8); doc.text('Pag. ' + i + ' de ' + n, W-Mg-18, Hh-8); }
    return doc;
  }
  function descargar(blob, nombre){ const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  function resumenTexto(){
    const d = datosEstudiante(); const q = arr(C.quiz).length ? pintarQuizSilencioso() : null;
    return `Hoja de respuestas - ${C.tema}\nEstudiante: ${d.nombre}\nGrado: ${d.grado}° ${d.grupo}\nPeriodo ${d.periodo} - Semana ${d.semana} - ${d.fecha}` + (q ? `\nQuiz: ${q.ok}/${q.total}` : '') + `\n(Adjunto el PDF ${nombreArchivo()})`;
  }
  function imprimir(){
    const d = datosEstudiante(); const q = arr(C.quiz).length ? pintarQuizSilencioso() : null;
    $('#hojaImpresion').innerHTML = `<h1>${esc(C.colegio)}</h1><div>${esc(C.area)} · ${esc(C.profesor)}</div><h2>Hoja de respuestas: ${esc(C.tema)}</h2>
      <table><tr><td><b>Estudiante</b></td><td>${esc(d.nombre)}</td><td><b>Grado</b></td><td>${esc(d.grado)}° ${esc(d.grupo)}</td></tr>
      <tr><td><b>Fecha</b></td><td>${esc(d.fecha)}</td><td><b>Periodo / Semana</b></td><td>${esc(d.periodo)} / ${esc(d.semana)}</td></tr></table>
      <h2>Respuestas</h2>${arr(C.hoja && C.hoja.preguntas).map((p,i)=>`<b>${i+1}. ${esc(p.texto)}</b><div class="rsp">${esc(S.resp[p.id]||'')}</div>`).join('')}
      ${q ? `<h2>Quiz: ${q.ok} de ${q.total} correctas</h2>` : ''}
      ${C.reto && arr(C.reto.requisitos).length ? `<h2>Reto: ${esc(C.reto.titulo)}</h2>${C.reto.requisitos.map((r,i)=>`<div>${S.checks['r'+i]?'☑':'☐'} ${esc(r)}</div>`).join('')}` : ''}
      <h2>Autoevaluación</h2><div>${S.estrellas} de 5 estrellas</div>
      <div class="firmas"><div>Firma del estudiante</div><div>Revisado por el docente / Nota</div></div>`;
    window.print();
  }

  // ---------- EVENTOS ----------
  document.addEventListener('click', async e=>{
    const lb = e.target.closest('[data-leer]'); if(lb){ leer(lb.dataset.leer); return; }
    const t = e.target.closest('[data-act]'); if(!t) return; const a = t.dataset.act;
    if(a==='flip') t.classList.toggle('on');
    else if(a==='tab') tab(+t.dataset.i);
    else if(a==='hito') hito(+t.dataset.i);
    else if(a==='clas'){ S.clas[t.dataset.i] = +t.dataset.c; pintarClas(); save();
      if(Object.keys(S.clas).length === M.clasificador.items.length && pintarClas().ok === M.clasificador.items.length) confeti(); }
    else if(a==='clasreset'){ S.clas = {}; pintarClas(); save(); }
    else if(a==='quiz'){ const qi = +t.dataset.q; if(S.quiz[qi]!==undefined) return; S.quiz[qi] = +t.dataset.o; const r = pintarQuiz(); save();
      if(r.resp === r.total && r.ok >= r.total*0.6) confeti(); }
    else if(a==='quizreset'){ S.quiz = {}; pintarQuiz(); save(); $('#quiz').scrollIntoView(); }
    else if(a==='paso'){ const k = 'p'+t.dataset.i; S.checks[k] = !S.checks[k]; t.classList.toggle('hecho', S.checks[k]); save(); }
    else if(a==='copiarprompt'){ try{ await navigator.clipboard.writeText(C.reto.prompt); toast('Prompt copiado 📋 Pégalo en la IA'); }catch(err){ toast('Selecciona el texto y cópialo con Ctrl+C'); } }
    else if(a==='estrella'){ S.estrellas = +t.dataset.n; $$('.estrellas button').forEach((b,i)=>b.classList.toggle('on', i < S.estrellas)); save(); }
    else if(a==='tplay'){ if(tInt){ clearInterval(tInt); tInt = null; t.textContent = '▶ Continuar'; } else { tInt = setInterval(()=>{ tSeg++; tPintar(); if(tSeg>=tTotal){ clearInterval(tInt); tInt=null; toast('⏰ ¡Tiempo de la clase terminado!'); } }, 1000); t.textContent = '⏸ Pausar'; } tPintar(); }
    else if(a==='treset'){ clearInterval(tInt); tInt = null; tSeg = 0; $('#tplay').textContent = '▶ Iniciar'; tPintar(); }
    else if(a==='pdf'){ if(!validar()) return; descargar(construirPDF().output('blob'), nombreArchivo()); toast('📄 PDF descargado: ' + nombreArchivo(), 3500); }
    else if(a==='imprimir'){ if(!(S.datos.nombre||'').trim()){ validar(); return; } imprimir(); }
    else if(a==='whatsapp'){ if(!validar()) return;
      const blob = construirPDF().output('blob'), nombre = nombreArchivo(); const file = new File([blob], nombre, {type:'application/pdf'});
      if(navigator.canShare && navigator.canShare({files:[file]})){ try{ await navigator.share({files:[file], title:nombre, text:resumenTexto()}); return; }catch(err){ if(err.name==='AbortError') return; } }
      descargar(blob, nombre); const num = String(C.whatsappProfesor||'').replace(/\D/g,'');
      window.open((num ? 'https://wa.me/'+num : 'https://wa.me/') + '?text=' + encodeURIComponent(resumenTexto()), '_blank');
      toast('📎 PDF descargado. Adjúntalo en el chat de WhatsApp con el clip.', 5000); }
    else if(a==='correo'){ if(!validar()) return; descargar(construirPDF().output('blob'), nombreArchivo());
      const d = datosEstudiante();
      location.href = 'mailto:' + encodeURIComponent(C.correoProfesor||'') + '?subject=' + encodeURIComponent('Hoja G'+d.grado+' P'+d.periodo+' S'+d.semana+' - '+d.nombre) + '&body=' + encodeURIComponent(resumenTexto());
      toast('📎 PDF descargado. Adjúntalo al correo antes de enviarlo.', 5000); }
    else if(a==='borrar'){ if(confirm('¿Borrar todas tus respuestas de esta clase en este computador?')){ try{ localStorage.removeItem(KEY); }catch(err){} location.reload(); } }
    else if(a==='tema'){ const r = document.documentElement; const oscuro = r.dataset.theme ? r.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.dataset.theme = oscuro ? 'light' : 'dark'; try{ localStorage.setItem('bernal-tema', r.dataset.theme); }catch(err){} if(chart){ chart.destroy(); chart = null; graficar(); } }
    else if(a==='fmas' || a==='fmenos'){ const cur = parseFloat(getComputedStyle(document.documentElement).fontSize); const nv = Math.min(28, Math.max(13, cur + (a==='fmas'?1.5:-1.5)));
      document.documentElement.style.fontSize = nv + 'px'; }
    else if(a==='arriba') scrollTo({top:0, behavior:'smooth'});
    else if(a==='qr'){ const box = $('#qr'); box.innerHTML = ''; if(window.QRCode) new QRCode(box, {text: location.href, width:210, height:210}); else box.textContent = location.href; $('#modalQR').classList.add('on'); }
    else if(a==='cerrarqr') $('#modalQR').classList.remove('on');
  });
  $('#modalQR').addEventListener('click', e=>{ if(e.target.id==='modalQR') e.target.classList.remove('on'); });
  document.addEventListener('keydown', e=>{ if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('flip')){ e.preventDefault(); e.target.classList.toggle('on'); } if(e.key==='Escape') $('#modalQR').classList.remove('on'); });
  document.addEventListener('input', e=>{
    const t = e.target;
    if(t.dataset.dato !== undefined){ S.datos[t.dataset.dato] = t.value; if(t.dataset.dato==='nombre') $('#c-nombre').classList.remove('err'); save(); }
    else if(t.dataset.resp !== undefined){ S.resp[t.dataset.resp] = t.value; save(); }
    else if(t.dataset.graf !== undefined){ const i = +t.dataset.graf; S.graf[i] = +t.value; $('#gv'+i).textContent = t.value + ' ' + (M.grafica.unidad||''); graficar(); save(); }
  });
  document.addEventListener('change', e=>{ const t = e.target; if(t.dataset.req !== undefined){ S.checks['r'+t.dataset.req] = t.checked; save(); } else if(t.dataset.dato !== undefined){ S.datos[t.dataset.dato] = t.value; save(); } });

  // Progreso + sección activa
  addEventListener('scroll', ()=>{ const h = document.documentElement; $('#progreso').style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%'; }, {passive:true});
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ $$('.secnav a').forEach(a=>{ const on = a.getAttribute('href')==='#'+en.target.id; a.classList.toggle('act', on); if(on) a.scrollIntoView({block:'nearest', inline:'center'}); }); } }), {rootMargin:'-45% 0px -50% 0px'});
    $$('section.sec').forEach(s=>io.observe(s));
  }
  try{ const tm = localStorage.getItem('bernal-tema'); if(tm) document.documentElement.dataset.theme = tm; }catch(e){}

  // Inicializar
  pintarClas(); pintarQuiz(); tPintar(); actualizarResumen();
  if(M.grafica){ window.__bernalGraficar = graficar; if(window.Chart) graficar(); }
})();
