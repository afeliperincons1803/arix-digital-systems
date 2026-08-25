# ARIX DIGITAL SYSTEMS — Sitio web estático

> **Tu negocio. Un solo sistema.**
> Web · E-commerce · Automatización · Sistemas · IA · Contenido
> Fundador: **Andrés Rincón**

Sitio web comercial **100% estático** (HTML + CSS + JavaScript). No necesita servidor, backend ni base de datos. Se puede publicar gratis en **GitHub Pages**, Cloudflare Pages, Netlify o Vercel.

---

## 📁 Estructura del proyecto

```
arix-digital-systems/
├── index.html          Página principal (hero, servicios, planes, proceso, FAQ)
├── plan.html           Detalle dinámico de un plan (?service=web&plan=pro)
├── cotizar.html        Cotizador por pasos → mensaje a WhatsApp
├── contacto.html       Formulario de contacto → mensaje a WhatsApp
├── links.html          Link en bio (para Instagram, TikTok, etc.)
├── 404.html            Página de error
├── README.md           Este archivo
└── assets/
    ├── css/
    │   └── styles.css   Todos los estilos (un solo sistema visual)
    ├── js/
    │   ├── app.js       CONFIG central, navbar, partículas, iconos, utilidades
    │   ├── plans.js     TODOS los precios y datos (fuente única de verdad)
    │   └── quote.js     Lógica de plan.html y cotizar.html
    └── img/
        └── logo-arix.png  ← COLOCA AQUÍ TU LOGO
```

---

## 🌐 PUBLICAR EN NETLIFY (recomendado — link siempre activo, gratis)

El sitio es estático: **no necesitas dejar el PC prendido**. Netlify lo mantiene online 24/7 gratis.

### Forma A — Arrastrar la carpeta (la más rápida, 3 minutos)
1. Entra a [app.netlify.com](https://app.netlify.com) y crea una cuenta (con Google/GitHub).
2. Clic en **Add new site → Deploy manually**.
3. **Arrastra la carpeta `arix-digital-systems`** completa a la zona de subida.
4. En segundos queda online, ej.: `https://TU-NOMBRE.netlify.app`.
5. En *Site settings → Change site name* puedes cambiarlo a algo como `arix-digital`.

> Para actualizar: vuelves a arrastrar la carpeta. Simple, pero manual.

### Forma B — Con GitHub (para ir cambiando desde el código, auto-publica) ⭐
Esta es la que quieres para editar y que se actualice solo:
1. Sube el proyecto a un repositorio de GitHub (ver Sección 1 más abajo).
2. En Netlify: **Add new site → Import an existing project → GitHub** → elige tu repo.
3. Build command: **(vacío)** · Publish directory: **`.`** (o `arix-digital-systems` si subiste la carpeta padre).
4. Clic en **Deploy**. Queda online.
5. **A partir de ahí, cada vez que cambies un archivo y hagas `git push`, Netlify actualiza el sitio solo en ~30 segundos.** Ese es tu flujo de cambios continuo.

### ¿"SSH" para cambiar cosas?
Netlify no se edita por SSH (no es un servidor con acceso de shell). Se cambia de 3 formas:
- **Git push** (Forma B) — editas archivos en tu PC → `git push` → se publica solo. *(La mejor.)*
- **Netlify CLI** — instalas `npm i -g netlify-cli` y usas `netlify deploy --prod` desde la carpeta.
- **Arrastrar** la carpeta de nuevo (Forma A).
El `netlify.toml` de este proyecto ya deja la configuración lista; no tienes que tocar nada.

---

## 💰 Dominio propio (costos bajos para empezar)

Con un dominio tu link se ve profesional (`https://arixdigital.com`) y lo conectas gratis a Netlify.

| Opción | Costo aprox./año | Nota |
|---|---|---|
| `.site` / `.online` / `.store` | **US$1–5 el 1er año** (~$4.000–$20.000 COP) | Baratísimo para arrancar; sube al renovar |
| `.com` | **US$9–13** (~$40.000–$55.000 COP) | El más profesional y recomendado |
| `.co` (Colombia) | **US$20–30** (~$85.000–$125.000 COP) | Identidad colombiana |

**Dónde comprarlo barato:** [Cloudflare](https://www.cloudflare.com/products/registrar/) (vende al costo, sin sobreprecio), [Namecheap](https://www.namecheap.com) o [Porkbun](https://porkbun.com).

**Conectarlo a Netlify:** *Site settings → Domain management → Add custom domain* → sigues las instrucciones (apuntar DNS). Netlify da **HTTPS gratis** automáticamente.

> Recomendación para empezar con poco: un `.com` en Cloudflare (~$45.000 COP/año) o un `.site`/`.online` de promo el primer año.

---

## 🤖 IA en WhatsApp
Para automatizar respuestas y captura de datos en WhatsApp, revisa el archivo
**`AUTOMATIZACION-WHATSAPP-IA.md`** (incluye la base de conocimiento lista para pegar en un bot).

---

## 🚀 1. Cómo crear el repositorio en GitHub

1. Entra a [github.com](https://github.com) e inicia sesión.
2. Haz clic en **New repository** (botón verde).
3. Nombre sugerido: `arix-digital-systems`.
4. Déjalo **Public** y haz clic en **Create repository**.

## 📤 2. Cómo subir los archivos

**Opción fácil (sin comandos):**
1. En tu repositorio recién creado, haz clic en **Add file → Upload files**.
2. Arrastra **todo el contenido** de la carpeta `arix-digital-systems` (incluida la carpeta `assets`).
3. Escribe un mensaje (ej. "primer commit") y haz clic en **Commit changes**.

**Opción con Git (terminal):**
```bash
git init
git add .
git commit -m "ARIX Digital Systems - sitio estático"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/arix-digital-systems.git
git push -u origin main
```

## 🌐 3. Cómo activar GitHub Pages

1. En tu repositorio ve a **Settings** (Configuración).
2. En el menú lateral entra a **Pages**.
3. En **Source** elige la rama **main** y la carpeta **/ (root)**.
4. Haz clic en **Save**.
5. Espera 1–2 minutos. Tu sitio quedará en:
   `https://TU-USUARIO.github.io/arix-digital-systems/`

> El archivo `404.html` funcionará automáticamente en GitHub Pages.

---

## 🖼️ 4. Cómo cambiar el logo

1. Guarda tu logo como **`logo-arix.png`**.
2. Colócalo en la carpeta **`assets/img/`** (reemplaza el existente).
3. Recomendado: fondo transparente, formato PNG, mínimo 512×512 px.

Si el logo no está, el sitio muestra automáticamente un respaldo con las letras **"AR"** — no se rompe nada.

---

## 📱 5. Cómo cambiar el WhatsApp

Abre **`assets/js/app.js`** y edita la constante `CONFIG` (está arriba del archivo):

```js
const CONFIG = {
  whatsapp: "57XXXXXXXXXX",   // ← pon tu número aquí
  ...
};
```

- Formato internacional **sin +, sin espacios, sin guiones**.
- Ejemplo Colombia: `"573001234567"`.
- **Se cambia una sola vez** y funciona en TODAS las páginas (botón flotante, contacto, cotizador, links, planes).

Mientras el número tenga `X`, los botones de WhatsApp muestran un aviso en lugar de abrir un enlace roto.

---

## 📸 6–8. Cómo agregar Instagram, TikTok, YouTube (y Facebook / LinkedIn)

En el mismo **`assets/js/app.js`**, dentro de `CONFIG.socials`:

```js
socials: {
  instagram: "",   // ← ej. "https://instagram.com/arix"
  tiktok:    "",   // ← ej. "https://tiktok.com/@arix"
  youtube:   "",   // ← ej. "https://youtube.com/@arix"
  facebook:  "",
  linkedin:  ""
}
```

- Si dejas una red **vacía** (`""`), su botón mostrará automáticamente **"Próximamente"** y no abrirá un enlace roto.
- En cuanto pongas la URL, el ícono se vuelve un enlace real en todas las páginas.

---

## 💲 9. Cómo actualizar precios

**Todos los precios están centralizados en un solo archivo:** `assets/js/plans.js`.

Ejemplo — cambiar el precio de *Web Pro*:

```js
pro: {
  name: "Web Pro",
  price: 1200000,   // ← cambia solo este número
  ...
}
```

- Usa **números sin puntos** (ej. `1200000`, no `1.200.000`). El sitio los formatea solo como `$1.200.000 COP`.
- Si un plan es "Desde ..." o "personalizado", escribe el texto entre comillas:
  `price: "Desde $2.000.000 COP"`.
- Los **extras** están en la constante `EXTRAS` del mismo archivo.
- El mantenimiento está en `CARE_PLANS`.

El cambio se refleja automáticamente en `index.html`, `plan.html` y `cotizar.html`. **No hay que editar precios en varios lugares.**

---

## 🧩 10. Cómo actualizar servicios

También en `assets/js/plans.js`, dentro del objeto `PLANS`. Cada servicio tiene esta forma:

```js
web: {
  label: "Páginas Web",
  tag: "WEB",
  icon: "web",
  intro: "Descripción corta...",
  forWho: "Para quién es...",
  plans: {
    start:  { name, price, time, desc, includes:[...], benefits:[...] },
    pro:    { name, price, badge:"Más elegido", ... },
    custom: { name, price, ... }
  }
}
```

- Para **añadir un servicio nuevo**, copia un bloque existente y cambia sus datos.
- El campo `icon` usa los iconos definidos en `app.js` (objeto `ICONS`).
- Todo lo demás (tarjetas, botones, página de detalle) se genera solo.

---

## 🎨 Identidad visual

- Paleta: azul marino `#041426`, azul `#1167D8`, cyan `#16C8E5`, turquesa `#08C9B0`, verde `#13D77A`.
- Degradados principales: **verde → cyan → azul**.
- Todos los estilos están en `assets/css/styles.css` (un único sistema visual compartido).

---

## ✅ Notas importantes

- **No incluye secretos ni API Keys.** Todo es frontend público.
- **No guarda datos sensibles.** `localStorage` solo almacena la selección temporal del plan/extras.
- **Accesible y responsive:** funciona de 320px a 1920px, respeta `prefers-reduced-motion`.

### 🔮 Escalabilidad futura (todavía NO implementado)
El código está preparado para, más adelante, añadir:
backend / API · Supabase o Firebase · base de datos · panel administrativo · pagos · autenticación · envío de emails · CRM.
Busca los comentarios `[ESCALABILIDAD FUTURA]` en `app.js`.

---

**ARIX Digital Systems — Andrés Rincón**
*Empieza con lo que necesitas hoy. Escala cuando tu negocio lo necesite.*
