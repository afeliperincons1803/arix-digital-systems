/* ============================================================
   ARIX DIGITAL SYSTEMS — quote.js
   Lógica de:
   - plan.html  (detalle dinámico de plan + extras + valor)
   - cotizar.html (flujo por pasos + resumen + WhatsApp)
   Depende de plans.js (PLANS, EXTRAS, getPlan, formatCOP) y
   app.js (CONFIG, waLink, saveProject/loadProject, showToast).
   ============================================================ */
(function(){
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const qs = new URLSearchParams(location.search);

  /* Calcula el costo total de una lista de claves de extras */
  function extrasTotal(keys){
    return keys.reduce((sum, k) => sum + (EXTRAS[k] ? EXTRAS[k].price : 0), 0);
  }

  /* Ícono de check (para el checklist rediseñado) */
  const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>';

  /* Etiqueta de precio legible para un extra */
  function extraPriceLabel(ex){
    if (ex.perUnit)  return ex.note;                                   // "desde $8.000 por producto"
    if (ex.perMonth) return formatCOP(ex.price) + "/mes";
    if (ex.from)     return "Desde " + formatCOP(ex.price);
    return formatCOP(ex.price);
  }

  /**
   * Renderiza el checklist de extras AGRUPADO por categoría dentro de `container`.
   * selected = array de claves ya marcadas. onChange(keys) se llama en cada cambio.
   */
  function renderChecklist(container, selected, onChange){
    selected = selected || [];
    container.innerHTML = "";
    const groups = document.createElement("div");
    groups.className = "ext-groups";

    EXTRA_CATEGORIES.forEach(cat => {
      const keys = Object.keys(EXTRAS).filter(k => EXTRAS[k].cat === cat.key);
      if (!keys.length) return;
      const group = document.createElement("div");
      group.className = "ext-group";
      group.innerHTML = `<div class="ext-group-title"><span class="g-ic">${cat.icon}</span> ${cat.label}</div>`;
      const list = document.createElement("div");
      list.className = "ext-list";

      keys.forEach(key => {
        const ex = EXTRAS[key];
        const isOn = selected.includes(key);
        const label = document.createElement("label");
        label.className = "ext-item" + (isOn ? " checked" : "");
        label.innerHTML =
          `<input type="checkbox" value="${key}" ${isOn ? "checked" : ""}>` +
          `<span class="ext-check">${CHECK_SVG}</span>` +
          `<span class="ext-icon" aria-hidden="true">${ex.icon || "•"}</span>` +
          `<span class="ext-body"><span class="ext-name">${ex.name}</span><span class="ext-desc">${ex.desc || ""}</span></span>` +
          `<span class="ext-price">${extraPriceLabel(ex)}</span>`;
        list.appendChild(label);
        const cb = label.querySelector("input");
        cb.addEventListener("change", () => {
          label.classList.toggle("checked", cb.checked);
          const keysNow = Array.from(container.querySelectorAll("input:checked")).map(c => c.value);
          onChange(keysNow);
        });
      });

      group.appendChild(list);
      groups.appendChild(group);
    });

    container.appendChild(groups);
  }

  /* Anima un número (COP) de `from` a `to` en el elemento dado */
  function animateEstimate(el, from, to){
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.classList.add("bump"); setTimeout(() => el.classList.remove("bump"), 200);
    if (reduce || from === to){ el.textContent = formatCOP(to); return; }
    const start = performance.now(), dur = 450;
    function frame(now){
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatCOP(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* Construye el mensaje de WhatsApp a partir de la selección */
  function buildWaMessage(sel, contact){
    contact = contact || {};
    const base = getPlan(sel.service, sel.level);
    let priceTxt = base ? (typeof base.price === "number" ? formatCOP(base.price) : base.price) : "Por definir";

    let msg = "Hola ARIX Digital Systems.\n";
    msg += "Estoy interesado en:\n\n";
    msg += "Servicio: " + (base ? base.serviceLabel : "-") + "\n";
    msg += "Plan: " + (base ? base.name : "-") + "\n";
    msg += "Valor base: " + priceTxt + "\n";

    if (sel.extras && sel.extras.length){
      msg += "\nExtras:\n";
      sel.extras.forEach(k => { if (EXTRAS[k]) msg += "• " + EXTRAS[k].name + "\n"; });
    }

    if (typeof base?.price === "number"){
      const est = base.price + extrasTotal(sel.extras || []);
      msg += "\nValor estimado: " + formatCOP(est) + " (orientativo)\n";
    } else {
      msg += "\nValor estimado: requiere cotización personalizada\n";
    }

    if (contact.name)    msg += "\nNombre: " + contact.name;
    if (contact.company) msg += "\nEmpresa: " + contact.company;
    if (contact.email)   msg += "\nEmail: " + contact.email;
    if (contact.message) msg += "\nMensaje: " + contact.message;

    msg += "\n\nQuisiera recibir más información.";
    return msg;
  }
  // Exponer para contacto.html
  window.buildWaMessage = buildWaMessage;

  /* Abre WhatsApp con el mensaje, o avisa si no está configurado */
  function goWhatsApp(sel, contact){
    const url = waLink(buildWaMessage(sel, contact));
    if (url){ window.open(url, "_blank", "noopener"); }
    else { showToast("Configura el número en CONFIG (app.js) para abrir WhatsApp."); }
  }
  window.goWhatsApp = goWhatsApp;

  /* ==========================================================
     A) PÁGINA plan.html
     ========================================================== */
  const planRoot = $("#planDetail");
  if (planRoot){
    const service = qs.get("service") || "web";
    const level   = qs.get("level") || qs.get("plan") || "start"; // acepta ?plan= o ?level=
    const data = getPlan(service, level);

    if (!data){
      planRoot.innerHTML = '<div class="glass" style="padding:2rem;text-align:center;"><h2>Plan no encontrado</h2><p style="color:var(--text-dim);margin:1rem 0;">El plan solicitado no existe.</p><a href="index.html#planes" class="btn btn-primary">Ver planes</a></div>';
    } else {
      renderPlan(data);
    }

    function renderPlan(d){
      const priceTxt = typeof d.price === "number" ? formatCOP(d.price) : d.price;
      const isNumeric = typeof d.price === "number";
      const badge = d.badge ? `<span class="pill" style="border-color:rgba(40,229,127,.5);color:var(--green);">${d.badge}</span>` : "";

      // Título de la página
      document.title = d.serviceLabel + " " + d.name + " | ARIX Digital Systems";

      planRoot.innerHTML = `
        <div class="plan-main">
          <span class="eyebrow">${d.tag} · ${d.serviceLabel}</span>
          <h1 class="section-title" style="margin:.4rem 0;">${d.name} ${badge}</h1>
          <p class="section-sub" style="margin:.2rem 0 0;max-width:640px;">${d.desc}</p>
          <div class="price-big">${priceTxt}</div>
          <p style="color:var(--text-dim);font-size:.88rem;">⏱ Tiempo estimado: ${d.time || "Según alcance"}</p>

          <div class="info-block">
            <h3><span data-icon-inline="check"></span>¿Qué incluye?</h3>
            <ul class="info-list">${d.includes.map(i => `<li>${i}</li>`).join("")}</ul>
          </div>

          <div class="info-block">
            <h3>Beneficios</h3>
            <ul class="info-list">${(d.benefits||[]).map(b => `<li>${b}</li>`).join("")}</ul>
          </div>

          <div class="info-block">
            <h3>¿Para quién es?</h3>
            <p style="color:var(--text-dim);">${PLANS[d.service].forWho}</p>
          </div>

          ${d.note ? `<div class="notice" style="margin-top:1.4rem;"><p style="color:var(--text-dim);font-size:.88rem;">${d.note}</p></div>` : ""}

          <div class="info-block" id="personalizeBlock">
            <h3>🧩 Personaliza tu plan</h3>
            <p style="color:var(--text-dim);font-size:.9rem;margin-bottom:1.1rem;">Marca lo que quieras agregar. El valor estimado se actualiza al instante.</p>
            <div id="planExtras"></div>
          </div>

          <div class="info-block">
            <h3>Posibles costos adicionales</h3>
            <ul class="info-list dash">
              <li>Dominio, hosting y licencias</li>
              <li>Pasarelas de pago y comisiones de plataformas</li>
              <li>APIs y servicios de terceros</li>
              <li>Publicidad y producción externa</li>
            </ul>
          </div>
        </div>

        <aside class="plan-side">
          <div class="glass">
            <div class="estimate-panel" style="position:static;margin:0;">
              <div class="estimate-left">
                <span class="estimate-label">Valor estimado</span>
                <span class="estimate-meta" id="planBreakdown">${isNumeric ? "Base <b>" + formatCOP(d.price) + "</b>" : "Cotización personalizada"}</span>
              </div>
              <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:.4rem;">
                <div class="estimate-value" id="planEstimate">${isNumeric ? formatCOP(d.price) : "Personalizada"}</div>
                <span class="estimate-chip" id="planCount" style="display:none;">0 extras</span>
              </div>
            </div>

            <div style="display:grid;gap:.7rem;margin-top:1.4rem;">
              <button class="btn btn-primary btn-block" id="wantPlan">Quiero este proyecto</button>
              <a class="btn btn-ghost btn-block" data-wa data-wa-msg="" id="waPlan">Solicitar por WhatsApp</a>
              <a class="btn btn-ghost btn-block" href="index.html#planes">Volver a planes</a>
            </div>
          </div>
        </aside>
      `;

      // Render extras (checklist agrupado y animado)
      const extrasBox = $("#planExtras");
      const estimateEl = $("#planEstimate");
      const breakdownEl = $("#planBreakdown");
      const countEl = $("#planCount");
      let curExtras = [];
      let lastTotal = isNumeric ? d.price : 0;

      function currentExtras(){ return curExtras; }
      function recalc(){
        const sum = extrasTotal(curExtras);
        // Chip con número de extras
        if (curExtras.length){ countEl.style.display = "inline-flex"; countEl.textContent = "✓ " + curExtras.length + (curExtras.length === 1 ? " extra" : " extras"); }
        else countEl.style.display = "none";
        // Mensaje de WhatsApp actualizado
        const waBtn = $("#waPlan");
        const url = waLink(buildWaMessage({ service:d.service, level:d.level, extras:curExtras }));
        if (url) waBtn.setAttribute("href", url);
        // Valor
        if (!isNumeric){ estimateEl.textContent = "Personalizada"; breakdownEl.innerHTML = curExtras.length ? "Personalizada + " + curExtras.length + " extras" : "Cotización personalizada"; return; }
        const total = d.price + sum;
        breakdownEl.innerHTML = "Base <b>" + formatCOP(d.price) + "</b>" + (sum > 0 ? " + extras <b>" + formatCOP(sum) + "</b>" : "");
        animateEstimate(estimateEl, lastTotal, total);
        lastTotal = total;
      }

      renderChecklist(extrasBox, [], function(keys){ curExtras = keys; recalc(); });

      // Guardar y ir a cotizar
      $("#wantPlan").addEventListener("click", () => {
        const extras = currentExtras();
        const est = isNumeric ? d.price + extrasTotal(extras) : null;
        saveProject({ service:d.service, level:d.level, extras, estimate:est, ts:Date.now() });
        location.href = "cotizar.html?from=plan";
      });

      // WhatsApp directo
      const waBtn = $("#waPlan");
      const initUrl = waLink(buildWaMessage({ service:d.service, level:d.level, extras:[] }));
      if (initUrl){ waBtn.setAttribute("href", initUrl); waBtn.setAttribute("target","_blank"); waBtn.setAttribute("rel","noopener"); }
      else { waBtn.addEventListener("click", (e) => { e.preventDefault(); showToast("Configura el número en CONFIG (app.js)."); }); }

      recalc();
    }
  }

  /* ==========================================================
     B) PÁGINA cotizar.html  (flujo por pasos)
     ========================================================== */
  const wizard = $("#wizard");
  if (wizard){
    // Estado de la selección
    const state = { service:null, level:null, extras:[], contact:{} };

    // Precargar desde localStorage (si viene de un plan)
    const saved = loadProject();
    if (saved && saved.service){ state.service = saved.service; state.level = saved.level; state.extras = saved.extras || []; }

    let step = 1;
    const totalSteps = 5;
    const dots = $$(".step-dot");
    const panels = $$(".step-panel");

    function showStep(n){
      step = Math.max(1, Math.min(totalSteps, n));
      panels.forEach(p => p.classList.toggle("active", +p.dataset.step === step));
      dots.forEach(d => {
        const dn = +d.dataset.step;
        d.classList.toggle("active", dn === step);
        d.classList.toggle("done", dn < step);
      });
      if (step === 2) renderLevels();
      if (step === 3) updateLiveEstimate();
      if (step === 5) renderSummary();
      window.scrollTo({ top: wizard.offsetTop - 90, behavior:"smooth" });
    }

    /* --- Paso 1: Servicio --- */
    const serviceGrid = $("#serviceGrid");
    Object.keys(PLANS).forEach(key => {
      const s = PLANS[key];
      const opt = document.createElement("button");
      opt.className = "option"; opt.type = "button"; opt.dataset.service = key;
      opt.innerHTML = `<div class="o-icon" data-icon="${s.icon}"></div><h4>${s.label}</h4><p>${s.intro}</p>`;
      if (ICONS[s.icon]) opt.querySelector(".o-icon").innerHTML = ICONS[s.icon];
      serviceGrid.appendChild(opt);
      opt.addEventListener("click", () => {
        state.service = key; state.level = null;
        $$("#serviceGrid .option").forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
      });
      if (state.service === key) opt.classList.add("selected");
    });

    /* --- Paso 2: Plan (depende del servicio) --- */
    function renderLevels(){
      const grid = $("#levelGrid");
      if (!state.service){ grid.innerHTML = '<p style="color:var(--text-dim);">Primero elige un servicio.</p>'; return; }
      const svc = PLANS[state.service];
      grid.innerHTML = "";
      ["start","pro","custom"].forEach(lvl => {
        const p = svc.plans[lvl]; if (!p) return;
        const priceTxt = typeof p.price === "number" ? formatCOP(p.price) : p.price;
        const opt = document.createElement("button");
        opt.className = "option" + (state.level === lvl ? " selected" : ""); opt.type = "button"; opt.dataset.level = lvl;
        opt.innerHTML = `<h4>${p.name}${p.badge ? ` · <span style="color:var(--green);font-size:.78rem;">${p.badge}</span>` : ""}</h4><p>${p.desc}</p><div class="o-price">${priceTxt}</div>`;
        grid.appendChild(opt);
        opt.addEventListener("click", () => {
          state.level = lvl;
          $$("#levelGrid .option").forEach(o => o.classList.remove("selected"));
          opt.classList.add("selected");
        });
      });
    }

    /* --- Paso 3: Extras (checklist agrupado + valor estimado en vivo) --- */
    const extrasBox = $("#wizardExtras");
    const liveEstimate = $("#liveEstimate");
    const liveMeta = $("#liveMeta");
    const liveChip = $("#liveChip");
    let liveLast = 0;

    function updateLiveEstimate(){
      const base = getPlan(state.service, state.level);
      const sum = extrasTotal(state.extras);
      if (liveChip){
        if (state.extras.length){ liveChip.style.display = "inline-flex"; liveChip.textContent = "✓ " + state.extras.length + (state.extras.length === 1 ? " extra" : " extras"); }
        else liveChip.style.display = "none";
      }
      if (!base){ if (liveEstimate) liveEstimate.textContent = "—"; if (liveMeta) liveMeta.textContent = "Elige un plan para ver el estimado"; return; }
      if (typeof base.price !== "number"){ if (liveEstimate) liveEstimate.textContent = "Personalizada"; if (liveMeta) liveMeta.innerHTML = base.name + " · cotización personalizada"; return; }
      const total = base.price + sum;
      if (liveMeta) liveMeta.innerHTML = base.name + " · Base <b>" + formatCOP(base.price) + "</b>" + (sum > 0 ? " + <b>" + formatCOP(sum) + "</b>" : "");
      if (liveEstimate){ animateEstimate(liveEstimate, liveLast, total); liveLast = total; }
    }

    renderChecklist(extrasBox, state.extras, function(keys){ state.extras = keys; updateLiveEstimate(); });

    /* --- Paso 5: Resumen --- */
    function renderSummary(){
      // Recoger datos de contacto
      state.contact = {
        name: $("#fName").value.trim(),
        company: $("#fCompany").value.trim(),
        wa: $("#fWa").value.trim(),
        email: $("#fEmail").value.trim(),
        message: $("#fMsg").value.trim()
      };
      const base = getPlan(state.service, state.level);
      const box = $("#summaryBox");
      if (!base){ box.innerHTML = '<p style="color:var(--text-dim);">Completa servicio y plan para ver el resumen.</p>'; return; }

      const isNumeric = typeof base.price === "number";
      const extrasSum = extrasTotal(state.extras);
      const est = isNumeric ? base.price + extrasSum : null;

      let rows = "";
      rows += row("Servicio", base.serviceLabel);
      rows += row("Plan", base.name);
      rows += row("Valor base", isNumeric ? formatCOP(base.price) : base.price);
      if (state.extras.length){
        rows += `<div class="summary-row"><span class="lbl">Extras</span><span>${state.extras.map(k => EXTRAS[k].name).join(", ")}</span></div>`;
        if (extrasSum > 0) rows += row("Suma extras", formatCOP(extrasSum));
      }
      rows += `<div class="summary-row total"><span class="lbl">Valor estimado</span><span class="val">${est != null ? formatCOP(est) : "Cotización personalizada"}</span></div>`;
      box.innerHTML = rows;

      // Guardar selección temporal
      saveProject({ service:state.service, level:state.level, extras:state.extras, estimate:est, ts:Date.now() });
    }
    function row(lbl, val){ return `<div class="summary-row"><span class="lbl">${lbl}</span><span>${val}</span></div>`; }

    /* --- Navegación entre pasos --- */
    wizard.addEventListener("click", (e) => {
      const next = e.target.closest("[data-next]");
      const prev = e.target.closest("[data-prev]");
      if (next){
        // Validaciones mínimas por paso
        if (step === 1 && !state.service){ showToast("Elige un servicio para continuar."); return; }
        if (step === 2 && !state.level){ showToast("Elige un plan para continuar."); return; }
        showStep(step + 1);
      }
      if (prev){ showStep(step - 1); }
    });

    /* --- Botón final: WhatsApp --- */
    $("#sendWa").addEventListener("click", () => {
      renderSummary();
      if (!state.service || !state.level){ showToast("Completa servicio y plan."); return; }
      goWhatsApp({ service:state.service, level:state.level, extras:state.extras }, {
        name: state.contact.name, company: state.contact.company, email: state.contact.email, message: state.contact.message
      });
    });

    /* --- Limpiar selección --- */
    const clearBtn = $("#clearProject");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      clearProject(); state.service = null; state.level = null; state.extras = [];
      $$("#serviceGrid .option, #levelGrid .option").forEach(o => o.classList.remove("selected"));
      liveLast = 0;
      renderChecklist(extrasBox, [], function(keys){ state.extras = keys; updateLiveEstimate(); });
      showToast("Selección limpiada."); showStep(1);
    });

    // Iniciar
    showStep(1);
  }

})();
