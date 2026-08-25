/* ============================================================
   ARIX DIGITAL SYSTEMS — app.js
   Núcleo compartido por TODAS las páginas.
   ------------------------------------------------------------
   Contiene:
   - CONFIG central (WhatsApp, web, redes)  ← EDITAR AQUÍ
   - Iconos SVG inline (marca coherente)
   - Navbar sticky + menú móvil
   - Fondo de partículas (red de nodos)
   - Reveal al scroll + contadores
   - FAQ acordeón (si existe)
   - Manejo de redes ("Próximamente" si están vacías)
   - Utilidades: toast, año, "Mi proyecto" (localStorage)
   ============================================================ */

/* ============================================================
   1. CONFIGURACIÓN CENTRAL  —  COMPLETA ESTOS DATOS
   ------------------------------------------------------------
   whatsapp: número en formato internacional SIN + ni espacios.
             Ej. Colombia: "573001234567"
   Si una red social queda como "" (vacía), el botón mostrará
   "Próximamente" y NO abrirá un link roto.
   ============================================================ */
const CONFIG = {
  whatsapp: "573203778133",              // ← TU NÚMERO DE WHATSAPP (Colombia +57)
  website:  "",                           // ← Ej. "https://arix-digital.com" (opcional)
  email:    "",                           // ← Ej. "contacto@arixdigital.com" (opcional)
  socials: {
    instagram: "",                        // ← Ej. "https://instagram.com/arix"
    tiktok:    "",
    youtube:   "",
    facebook:  "",
    linkedin:  ""
  }
};

/* Marca (constantes de texto reutilizables) */
const BRAND = {
  name: "ARIX DIGITAL SYSTEMS",
  short: "ARIX",
  slogan: "Tu negocio. Un solo sistema.",
  tagline: "Diseñamos, conectamos y automatizamos negocios."
};

/* ============================================================
   2. ICONOS SVG INLINE (ligeros, sin librerías externas)
   ============================================================ */
const ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 3c.3 2.2 1.6 3.7 3.7 3.9v2.4c-1.3.1-2.5-.3-3.7-1v5.9c0 3.3-2.4 5.8-5.6 5.8A5.6 5.6 0 0 1 5 14.2c.2-2.9 2.6-5 5.5-4.8v2.6a2.9 2.9 0 0 0-3 2.9 2.9 2.9 0 0 0 5.8.1V3H16z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.7 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22.3 12 27 27 0 0 0 22 8.2zM10 15V9l5.2 3L10 15z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.7c0-.4.3-.7.7-.7z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.9 8H4V20h2.9V8zM5.4 3.5A1.7 1.7 0 1 0 5.4 7a1.7 1.7 0 0 0 0-3.5zM20 20h-2.9v-5.9c0-1.4-.5-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.3-.1.6-.1.9V20H10.5V8h2.8v1.6c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V20z"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 9l1-4h16l1 4M4 9v10h16V9M9 13h6"/></svg>',
  catalog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 2 4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4zM4 6h16M9 10a3 3 0 0 0 6 0"/></svg>',
  booking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M9 14l2 2 4-4"/></svg>',
  systems: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  automation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 13h.01M15 13h.01M2 12h3M19 12h3"/></svg>',
  delivery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 3.5a3 3 0 0 1 0 5.8M18 14a6 6 0 0 1 3 5"/></svg>',
  branding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3l2.5 5 5.5.8-4 4 1 5.4L12 15.8 6.5 18.2l1-5.4-4-4L9 8z"/></svg>',
  content: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>'
};

/* ============================================================
   3. HELPERS DE ENLACES (WhatsApp / redes)
   ============================================================ */
/** Devuelve la URL de WhatsApp con mensaje opcional, o null si no hay número. */
function waLink(message){
  const num = (CONFIG.whatsapp || "").replace(/[^0-9]/g, "");
  if (!num || CONFIG.whatsapp.includes("X")) return null; // aún sin configurar
  const base = "https://wa.me/" + num;
  return message ? base + "?text=" + encodeURIComponent(message) : base;
}

/* ============================================================
   INICIALIZACIÓN GENERAL (al cargar el DOM)
   ============================================================ */
document.addEventListener("DOMContentLoaded", function(){
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Navbar sticky + hamburguesa ---------- */
  const nav = $("#nav");
  if (nav){
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive:true }); onScroll();
    const burger = $("#hamburger"), links = $("#navLinks");
    if (burger && links){
      const closeMenu = () => { links.classList.remove("open"); burger.classList.remove("active"); burger.setAttribute("aria-expanded","false"); };
      burger.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        burger.classList.toggle("active", open);
        burger.setAttribute("aria-expanded", open);
      });
      $$("#navLinks a").forEach(a => a.addEventListener("click", closeMenu));
    }
  }

  /* ---------- Reveal al scroll (compartido, expuesto global) ----------
     Se re-anima CADA vez que el elemento entra al viewport. Si sale
     (por arriba o por abajo) se re-oculta, de modo que al volver a
     entrar —subiendo o bajando, las veces que sea— la animación se
     repite. Respeta prefers-reduced-motion (deja todo visible fijo).   */
  if (reduceMotion){
    $$(".reveal").forEach(el => el.classList.add("visible"));
    window.__arixReveal = { observe: function(el){ el.classList.add("visible"); } };
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { e.target.classList.toggle("visible", e.isIntersecting); });
    }, { threshold:0.12, rootMargin:"0px 0px -60px 0px" });
    window.__arixReveal = io; // para elementos creados dinámicamente
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---------- Contadores animados ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      if (reduceMotion){ el.textContent = target + suffix; cio.unobserve(el); return; }
      let cur = 0; const step = Math.max(1, target/60);
      const tick = () => { cur += step; if (cur >= target){ el.textContent = target + suffix; } else { el.textContent = Math.floor(cur) + suffix; requestAnimationFrame(tick); } };
      tick(); cio.unobserve(el);
    });
  }, { threshold:0.5 });
  $$("[data-count]").forEach(c => cio.observe(c));

  /* ---------- Partículas de fondo (red de nodos) ---------- */
  const canvas = $("#particles");
  if (canvas && !reduceMotion){
    const ctx = canvas.getContext("2d");
    let w, h, nodes = [];
    const COUNT = () => Math.min(70, Math.floor(window.innerWidth/22));
    function resize(){
      w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
      nodes = Array.from({length: COUNT()}, () => ({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-.5)*0.35, vy:(Math.random()-.5)*0.35 }));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<nodes.length;i++){
        const a = nodes[i]; a.x += a.vx; a.y += a.vy;
        if (a.x<0||a.x>w) a.vx*=-1; if (a.y<0||a.y>h) a.vy*=-1;
        for (let j=i+1;j<nodes.length;j++){
          const b = nodes[j], dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
          if (d < 130){ ctx.strokeStyle = "rgba(22,200,229," + (0.14*(1-d/130)) + ")"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
        ctx.fillStyle = "rgba(40,229,127,.6)"; ctx.beginPath(); ctx.arc(a.x,a.y,1.6,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize, { passive:true }); resize(); draw();
  }

  /* ---------- FAQ acordeón (si el contenedor existe) ---------- */
  const faqList = $("#faqList");
  if (faqList && typeof FAQS !== "undefined"){
    FAQS.forEach(([q,a]) => {
      const item = document.createElement("div");
      item.className = "faq-item reveal";
      item.innerHTML = `<button class="faq-q" aria-expanded="false"><span>${q}</span><span class="ic" aria-hidden="true">+</span></button><div class="faq-a"><p>${a}</p></div>`;
      faqList.appendChild(item); window.__arixReveal.observe(item);
      const btn = item.querySelector(".faq-q"), ans = item.querySelector(".faq-a");
      btn.addEventListener("click", () => {
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
        ans.style.maxHeight = open ? ans.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- Botones/íconos de WhatsApp ---------- */
  $$("[data-wa]").forEach(el => {
    const url = waLink(el.dataset.waMsg || "");
    if (url){ el.setAttribute("href", url); el.setAttribute("target","_blank"); el.setAttribute("rel","noopener"); }
    else {
      el.setAttribute("href", "#");
      el.addEventListener("click", (e) => { e.preventDefault(); showToast("WhatsApp: pronto disponible. Configúralo en CONFIG."); });
    }
  });

  /* ---------- Redes sociales: rellenar o marcar "Próximamente" ---------- */
  $$("[data-social]").forEach(el => {
    const key = el.dataset.social;
    const url = CONFIG.socials[key];
    if (url && url.trim() !== ""){
      el.setAttribute("href", url); el.setAttribute("target","_blank"); el.setAttribute("rel","noopener");
      el.classList.remove("soon");
    } else {
      el.setAttribute("href", "#"); el.classList.add("soon"); el.setAttribute("aria-disabled","true");
      el.addEventListener("click", (e) => { e.preventDefault(); showToast(capitalize(key) + ": próximamente disponible."); });
    }
  });

  /* ---------- Inyectar iconos SVG donde se pidan ---------- */
  $$("[data-icon]").forEach(el => { const k = el.dataset.icon; if (ICONS[k]) el.innerHTML = ICONS[k]; });

  /* ---------- Año dinámico ---------- */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
});

/* ============================================================
   UTILIDADES GLOBALES (usadas por varias páginas)
   ============================================================ */
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

/** Toast/aviso flotante temporal */
let __toastTimer;
function showToast(msg){
  let toast = document.getElementById("toast");
  if (!toast){ toast = document.createElement("div"); toast.id = "toast"; toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(__toastTimer);
  __toastTimer = setTimeout(() => toast.classList.remove("show"), 3800);
}

/* ============================================================
   "MI PROYECTO" (localStorage) — selección temporal del usuario
   Guardamos solo: servicio, plan, extras y valor estimado.
   NO se guardan datos sensibles.
   ------------------------------------------------------------
   [ESCALABILIDAD FUTURA] Aquí se podría sincronizar con:
   - un backend (API REST)
   - Supabase / Firebase
   - un CRM
   Por ahora todo es local y estático.
   ============================================================ */
const PROJECT_KEY = "arix_project";

function saveProject(data){
  try { localStorage.setItem(PROJECT_KEY, JSON.stringify(data)); } catch(e){ /* almacenamiento no disponible */ }
}
function loadProject(){
  try { return JSON.parse(localStorage.getItem(PROJECT_KEY)) || null; } catch(e){ return null; }
}
function clearProject(){
  try { localStorage.removeItem(PROJECT_KEY); } catch(e){}
}
