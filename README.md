# $ELL UP — Landing Page

Sitio estático (HTML + CSS + JavaScript vanilla, sin frameworks) para la marca SellUp. Este README está escrito para alguien sin experiencia técnica.

## Estructura del proyecto

```
/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/images/sellup-logo.svg   ← logo provisional, ver nota abajo
├── assets/images/sellup-icon.svg   ← ícono para favicon
├── robots.txt
├── sitemap.xml
└── README.md
```

## 1. Cómo abrir el proyecto

No necesitas instalar nada. Haz doble clic en `index.html` y se abre en tu navegador. Para editar el código, usa Visual Studio Code (gratis, en [code.visualstudio.com](https://code.visualstudio.com)) y la extensión **Live Server** para ver los cambios en tiempo real.

## 2. Cómo cambiar el logo

⚠️ **Importante:** el logo actual (`assets/images/sellup-logo.svg`) es una reconstrucción provisional hecha en código, porque no se recibió el archivo original del logo por separado (solo apareció dentro de una captura de pantalla). Reemplázalo por el archivo real en cuanto lo tengas:

1. Guarda tu logo definitivo (idealmente `.svg` o `.png` con fondo transparente) en `assets/images/`.
2. Reemplaza `sellup-logo.png` (o el nombre que uses) en dos lugares de `index.html`:
   - Dentro de `<header>` (`<img src="assets/images/...">`)
   - Dentro de `<footer>`

## 3. Cómo cambiar el número de WhatsApp

Abre `js/main.js` y edita la primera línea:

```javascript
const WHATSAPP_NUMBER = "573134418877";
```

Cambia el número completo con código de país, sin signos ni espacios (ej. `573001234567`).

## 4. Cómo cambiar los precios

En `js/main.js`, dentro del objeto `SITE_CONFIG`:

```javascript
const SITE_CONFIG = {
  basicPrice: 600000,
  basicDeferredTotal: 720000,
  basicInstallment: 240000,
  googleBusinessPrice: 50000,
  proPriceFrom: 1200000,
  professionalPrice: 700000
};
```

Los precios se muestran automáticamente con formato colombiano (`COP $600.000`) gracias a `Intl.NumberFormat`. Si cambias un precio aquí, también actualiza el texto correspondiente en `index.html` donde aparece escrito (busca `data-price="600000"` como referencia — esos números deben coincidir).

## 5. Cómo editar los textos

Casi todo el texto vive directamente en `index.html`, organizado por secciones con comentarios como `<!-- ============ HERO ============ -->`. Busca el texto que quieres cambiar con `Ctrl+F` y edítalo directamente.

Las excepciones son las **Preguntas Frecuentes**, los **Servicios** y el **menú de "servicios extra"**, que viven como listas editables en `js/main.js` (`FAQ_ITEMS`, `SERVICES`, `SERVICES_EXTRA`).

## 6. Cómo agregar un caso de éxito

En `js/main.js`, busca el arreglo `SUCCESS_CASES` y agrega un objeto así:

```javascript
const SUCCESS_CASES = [
  {
    name: "Panadería El Trigal",
    before: "Sin presencia digital, solo boca a boca.",
    after: "Landing page + WhatsApp integrado.",
    goal: "Aumentar pedidos para eventos.",
    solution: "Landing page + Google Business.",
    result: "30 pedidos nuevos en el primer mes."
  }
];
```

En cuanto agregues al menos un caso real, la sección deja de mostrar automáticamente las tarjetas "Próximamente".

## 7. Cómo agregar un testimonio

Similar al paso anterior, en el arreglo `TESTIMONIALS`:

```javascript
const TESTIMONIALS = [
  { name: "Juan Pérez", business: "Ferretería Central", quote: "Desde la landing page recibimos más pedidos por WhatsApp." }
];
```

## 8. Cómo conectar Google Analytics 4

1. Crea tu propiedad en [analytics.google.com](https://analytics.google.com) y copia tu ID de medición (`G-XXXXXXX`).
2. Agrega el script de Google en el `<head>` de `index.html` (Google te da el código exacto al crear la propiedad).
3. En `js/main.js`, dentro de la función `trackEvent`, descomenta y ajusta:
   ```javascript
   gtag('event', eventName, eventData);
   ```

## 9. Cómo conectar Meta Pixel

1. Crea tu píxel en [business.facebook.com/events_manager](https://business.facebook.com/events_manager).
2. Agrega el script base de Meta Pixel en el `<head>` de `index.html`.
3. En `js/main.js`, dentro de `trackEvent`, descomenta:
   ```javascript
   fbq('trackCustom', eventName, eventData);
   ```

## 10. Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todos estos archivos (manteniendo la estructura de carpetas).
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. En unos minutos tu sitio estará en `https://tu-usuario.github.io/nombre-del-repo/`.

## 11. Cómo conectar un dominio personalizado

- **GitHub Pages:** en Settings → Pages, agrega tu dominio en "Custom domain" y configura un registro `CNAME` en tu proveedor de dominio apuntando a `tu-usuario.github.io`.
- **Netlify / Vercel / Hostinger:** cada plataforma tiene una sección de "Dominios" donde agregas tu dominio y te indican los registros DNS exactos a configurar.

También actualiza `https://sellup.co/` por tu dominio real en: `index.html` (`canonical`, Open Graph, JSON-LD), `robots.txt` y `sitemap.xml`.

## 12. Datos pendientes por definir

Antes de publicar el sitio en producción, reemplaza estos valores marcados como `"PENDIENTE"`:

- [ ] **Logo definitivo** en alta resolución (actualmente es una reconstrucción provisional en SVG).
- [ ] **Correo electrónico** de contacto (`SITE_CONFIG.email` en `js/main.js`, y el footer).
- [ ] **Instagram, Facebook y LinkedIn** (mismos lugares).
- [ ] **Fotografías reales** de negocios/profesionales para reemplazar los mockups ilustrativos del Hero y el ícono de la sección "Profesionales".
- [ ] **Primeros casos de éxito y testimonios reales** (arreglos `SUCCESS_CASES` y `TESTIMONIALS` en `js/main.js`).
- [ ] Confirmar el **dominio real** para reemplazar `sellup.co` en SEO/canonical/sitemap.
- [ ] IDs reales de **Google Analytics 4 / Meta Pixel / GTM**.
