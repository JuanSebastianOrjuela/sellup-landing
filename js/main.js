/* =========================================================
   $ELL UP — main.js
   Config, WhatsApp helpers, carousels, accordion, form, tracking.
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURACIÓN GLOBAL — edita aquí los datos del negocio
   --------------------------------------------------------- */
const WHATSAPP_NUMBER = "573195461334";

const SITE_CONFIG = {
  whatsapp: WHATSAPP_NUMBER,
  email: "PENDIENTE",
  instagram: "PENDIENTE",
  facebook: "PENDIENTE",
  linkedin: "PENDIENTE",
  basicPrice: 600000,
  basicDeferredTotal: 720000,
  basicInstallment: 240000,
  googleBusinessPrice: 50000,
  proPriceFrom: 1200000,
  professionalPrice: 700000
};

/* Formato de precios en pesos colombianos: COP $600.000 */
function formatCOP(value){
  const formatted = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value);
  return `COP $${formatted}`;
}

/* ---------------------------------------------------------
   2. TRACKING (listo para GA4 / Meta Pixel / GTM)
   --------------------------------------------------------- */
function trackEvent(eventName, eventData = {}){
  // TODO: reemplazar por integraciones reales, por ejemplo:
  // gtag('event', eventName, eventData);
  // fbq('trackCustom', eventName, eventData);
  console.log(`[trackEvent] ${eventName}`, eventData);
}

/* ---------------------------------------------------------
   3. WHATSAPP HELPERS
   --------------------------------------------------------- */
function buildWhatsappUrl(message){
  const encoded = encodeURIComponent(message || "Hola, quiero más información sobre SellUp.");
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encoded}`;
}

function wireWhatsappButtons(){
  document.querySelectorAll("[data-wsp-msg]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const msg = el.getAttribute("data-wsp-msg");
      const track = el.getAttribute("data-track");
      if(track) trackEvent(track, { source: el.textContent.trim().slice(0, 40) });
      window.open(buildWhatsappUrl(msg), "_blank", "noopener");
    });
  });
}

/* ---------------------------------------------------------
   4. SUCCESS CASES & TESTIMONIALS (arreglos editables)
   No inventar resultados: mientras estén vacíos, se muestran
   como tarjetas "Próximamente".
   --------------------------------------------------------- */
const SUCCESS_CASES = [
  // Ejemplo de cómo agregar un caso real más adelante:
  // {
  //   name: "Panadería El Trigal",
  //   before: "Sin presencia digital, solo boca a boca.",
  //   after: "Landing page + WhatsApp integrado.",
  //   goal: "Aumentar pedidos para eventos.",
  //   solution: "Landing page + Google Business.",
  //   result: "Próximamente"
  // }
];

const TESTIMONIALS = [
  // Ejemplo de cómo agregar un testimonio real más adelante:
  // { name: "Nombre del cliente", business: "Nombre del negocio", quote: "Texto del testimonio." }
];

function renderSuccessCases(){
  const grid = document.getElementById("casesGrid");
  if(!grid) return;

  if(SUCCESS_CASES.length === 0){
    grid.innerHTML = "";
    for(let i = 0; i < 3; i++){
      grid.innerHTML += `
        <div class="case-card">
          <span class="case-badge">Próximamente</span>
          <i data-lucide="image" class="case-ic" aria-hidden="true"></i>
          <p>Estamos preparando este caso de transformación.</p>
        </div>`;
    }
    return;
  }

  grid.innerHTML = SUCCESS_CASES.map(c => `
    <div class="case-card">
      <span class="case-badge">${c.result === "Próximamente" ? "Próximamente" : "Resultado"}</span>
      <h3>${c.name}</h3>
      <p><strong>Objetivo:</strong> ${c.goal}</p>
      <p><strong>Solución:</strong> ${c.solution}</p>
      <p><strong>Resultado:</strong> ${c.result}</p>
    </div>
  `).join("");
}

function renderTestimonials(){
  const grid = document.getElementById("testimonialsGrid");
  if(!grid) return;

  if(TESTIMONIALS.length === 0){
    grid.innerHTML = `
      <div class="testimonial-card">
        <div class="testimonial-avatar"><i data-lucide="user-round" aria-hidden="true"></i></div>
        <p>Tu historia podría aparecer aquí.</p>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-avatar"><i data-lucide="quote" aria-hidden="true"></i></div>
        <p>Muy pronto conocerás las historias de los primeros negocios y profesionales que crecen con SellUp.</p>
      </div>`;
    return;
  }

  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-avatar"><i data-lucide="user-round" aria-hidden="true"></i></div>
      <div>
        <p>&ldquo;${t.quote}&rdquo;</p>
        <strong>${t.name}</strong> — ${t.business}
      </div>
    </div>
  `).join("");
}

/* ---------------------------------------------------------
   5. SERVICIOS — carrusel automático + expandible
   --------------------------------------------------------- */
const SERVICES = [
  { icon: "layout-template", title: "Landing pages para negocios", desc: "Diseño claro, rápido y orientado a convertir visitas en clientes reales.", pro: false },
  { icon: "briefcase", title: "Landing pages para profesionales", desc: "Páginas para abogados, contadores, psicólogos, médicos, consultores y freelancers.", pro: false },
  { icon: "linkedin", title: "Mejoramiento de LinkedIn", desc: "Optimizamos tu perfil para que te encuentren, confíen y te elijan.", pro: false },
  { icon: "badge-check", title: "Marca personal", desc: "Creamos una imagen profesional que refleja tu valor, experiencia y credibilidad.", pro: false },
  { icon: "bot", title: "Chatbots para ventas", desc: "Automatizamos conversaciones y acompañamos a los clientes en WhatsApp o Instagram.", pro: false },
  { icon: "search-check", title: "Análisis de competencia", desc: "Estudiamos fortalezas, debilidades, posicionamiento y oportunidades del mercado.", pro: true },
  { icon: "tags", title: "Análisis de precios", desc: "Comparamos el mercado para apoyar decisiones de precio más competitivas y rentables.", pro: true },
  { icon: "gauge", title: "Dashboard de mando", desc: "Centralizamos indicadores comerciales para facilitar la toma de decisiones.", pro: true },
];

const HERO_METRICS = [
  { value: "+40%", label: "Más oportunidades de contacto" },
  { value: "7 días", label: "Para lanzar la primera versión" },
  { value: "100%", label: "Diseño adaptado a tu negocio" },
];

const SERVICES_EXTRA = [
  { icon: "pencil-line", title: "Estrategia de contenido" },
  { icon: "megaphone", title: "Publicidad digital" },
  { icon: "funnel", title: "Embudos de ventas" },
  { icon: "cog", title: "Automatización" },
  { icon: "send", title: "Email marketing" },
  { icon: "map-pin", title: "SEO local" },
  { icon: "users-round", title: "CRM y seguimiento de prospectos" },
];

function serviceCardHTML(s){
  return `
    <article class="service-card${s.pro ? " is-pro" : ""}">
      <div class="service-ic"><i data-lucide="${s.icon}" aria-hidden="true"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`;
}

function renderServicesCarousel(){
  const track = document.getElementById("servicesTrack");
  if(!track) return;
  const cardsHTML = SERVICES.map(serviceCardHTML).join("");
  track.innerHTML = cardsHTML + cardsHTML;
}

function renderHeroMetrics(){
  const host = document.getElementById("heroMetrics");
  if(!host) return;
  host.innerHTML = HERO_METRICS.map(metric => `
    <div class="metric-card">
      <strong>${metric.value}</strong>
      <span>${metric.label}</span>
    </div>
  `).join("");
}

function wireServicesExpand(){
  const btn = document.getElementById("toggleServices");
  if(!btn) return;

  const moreGrid = document.createElement("div");
  moreGrid.className = "services-more-grid";
  moreGrid.id = "servicesMoreGrid";
  moreGrid.innerHTML = SERVICES_EXTRA.map(s => `
    <div class="service-more-item"><i data-lucide="${s.icon}" aria-hidden="true"></i> ${s.title}</div>
  `).join("");
  btn.closest(".services-expand-wrap").insertAdjacentElement("afterend", moreGrid);
  hydrateIcons(moreGrid);

  btn.addEventListener("click", () => {
    const isOpen = moreGrid.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
    btn.innerHTML = isOpen
      ? `Ver menos servicios <i data-lucide="chevron-up" aria-hidden="true"></i>`
      : `Ver todos los servicios <i data-lucide="chevron-down" aria-hidden="true"></i>`;
    hydrateIcons(btn);
    if(isOpen) trackEvent("expand_services");
  });
}

/* ---------------------------------------------------------
   6. PREGUNTAS FRECUENTES (acordeón accesible)
   --------------------------------------------------------- */
const FAQ_ITEMS = [
  { q: "¿Qué es una landing page?", a: "Es una página web enfocada en un solo objetivo: convertir a un visitante en cliente potencial, mostrando de forma clara tu oferta y un llamado a la acción." },
  { q: "¿Cuál es la diferencia entre una landing page y una página web tradicional?", a: "Una landing page está diseñada para guiar al visitante hacia una acción concreta (como escribir por WhatsApp), mientras que un sitio tradicional suele tener múltiples secciones sin un objetivo de conversión definido." },
  { q: "¿Qué incluye el diagnóstico gratuito?", a: "Revisamos tu identidad de marca, presencia digital actual, redes sociales, WhatsApp, sitio web, presencia en Google, imágenes, mensajes y posicionamiento frente a tu competencia." },
  { q: "¿Debo tener logo y fotografías?", a: "No es obligatorio. Si no los tienes, te orientamos sobre las mejores opciones para tu presupuesto y etapa actual del negocio." },
  { q: "¿El dominio y el hosting están incluidos?", a: "No. Los planes cubren el diseño, desarrollo y estrategia de tu landing page. El dominio y el hosting se cotizan por separado según tus necesidades." },
  { q: "¿Cuánto demora la entrega?", a: "El Plan Básico se entrega en menos de 7 días, siempre que recibamos a tiempo la información y el material necesario de tu parte." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí. El Plan Básico tiene una opción de pago diferido en 3 cuotas iguales, con un incremento del 20 % sobre el valor de contado." },
  { q: "¿Qué pasa si soy profesional y no tengo un negocio físico?", a: "Tenemos el Plan Profesional, pensado específicamente para abogados, contadores, psicólogos, médicos, consultores, vendedores y freelancers." },
  { q: "¿Google Business garantiza aparecer primero?", a: "No. Google Business mejora tu presencia y facilita que te encuentren, pero ninguna agencia puede garantizar la primera posición en los resultados de búsqueda." },
  { q: "¿SellUp administra mis redes sociales?", a: "No de forma predeterminada. Integramos y conectamos tus redes con tu landing page; la administración continua puede cotizarse como un servicio adicional." },
  { q: "¿Puedo agregar un chatbot más adelante?", a: "Sí. El chatbot para ventas está disponible en el Plan PRO y también puede agregarse posteriormente a un Plan Básico ya entregado." },
  { q: "¿Qué información necesito entregar para comenzar?", a: "Nombre del negocio, logo (si tienes), fotografías, textos o ideas clave, redes sociales actuales y tus datos de contacto para WhatsApp." },
];

function renderFAQ(){
  const wrap = document.getElementById("faqAccordion");
  if(!wrap) return;

  wrap.innerHTML = FAQ_ITEMS.map((item, i) => `
    <div class="accordion-item">
      <button class="accordion-trigger" id="faqTrigger${i}" aria-expanded="false" aria-controls="faqPanel${i}">
        <span>${item.q}</span>
        <i data-lucide="chevron-down" aria-hidden="true"></i>
      </button>
      <div class="accordion-panel" id="faqPanel${i}" role="region" aria-labelledby="faqTrigger${i}">
        <p>${item.a}</p>
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // Cierra los demás paneles (acordeón de un solo elemento abierto)
      wrap.querySelectorAll(".accordion-trigger").forEach(t => {
        if(t !== trigger){
          t.setAttribute("aria-expanded", "false");
          const p = document.getElementById(t.getAttribute("aria-controls"));
          if(p) p.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
    });
  });
}

/* ---------------------------------------------------------
   7. PRECIOS — formato colombiano dinámico
   --------------------------------------------------------- */
function renderPrices(){
  document.querySelectorAll("[data-price]").forEach(el => {
    const value = Number(el.getAttribute("data-price"));
    if(!Number.isNaN(value)){
      const label = el.textContent.replace(/COP\s*\$[\d.,]+/, "").trim();
      el.textContent = label ? `${label} ${formatCOP(value)}` : formatCOP(value);
    }
  });
}

/* ---------------------------------------------------------
   8. HEADER: sticky shadow + resaltar sección visible + menú móvil
   --------------------------------------------------------- */
function wireHeader(){
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  });

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("mobile-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("mobile-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = Array.from(document.querySelectorAll("main section[id], main section"))
    .filter(s => s.id);
  const navLinks = Array.from(mainNav.querySelectorAll("a"));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ---------------------------------------------------------
   9. SCROLL REVEAL
   --------------------------------------------------------- */
function wireReveal(){
  const els = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   10. FORMULARIO DE EVALUACIÓN (modal)
   --------------------------------------------------------- */
function wireEvaluationForm(){
  const overlay = document.getElementById("evalModalOverlay");
  const closeBtn = document.getElementById("evalModalClose");
  const form = document.getElementById("evalForm");
  const errorMsg = document.getElementById("formError");
  const confirm = document.getElementById("formConfirm");
  const confirmGoBtn = document.getElementById("formConfirmGo");
  let pendingUrl = "";
  let lastSubmitTime = 0;

  function openModal(){
    overlay.hidden = false;
    trackEvent("open_evaluation_form");
    document.body.style.overflow = "hidden";
    const firstField = document.getElementById("fName");
    if(firstField) firstField.focus();
  }

  function closeModal(){
    overlay.hidden = true;
    document.body.style.overflow = "";
    form.hidden = false;
    confirm.hidden = true;
    form.reset();
    errorMsg.hidden = true;
  }

  // Cualquier botón puede abrir el modal si se le agrega data-open-eval-form
  document.querySelectorAll("[data-open-eval-form]").forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if(e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && !overlay.hidden) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Protección básica contra envíos accidentales / duplicados
    const now = Date.now();
    if(now - lastSubmitTime < 1500) return;
    lastSubmitTime = now;

    const data = Object.fromEntries(new FormData(form).entries());
    const required = ["name", "business", "city", "type", "whatsapp", "goal"];
    const missing = required.filter(field => !data[field] || !data[field].trim());
    const consentOk = form.querySelector("#fConsent").checked;

    if(missing.length || !consentOk){
      errorMsg.textContent = !consentOk
        ? "Debes aceptar el tratamiento de datos para continuar."
        : "Por favor completa todos los campos obligatorios (*).";
      errorMsg.hidden = false;
      return;
    }
    errorMsg.hidden = true;

    const message = [
      "Hola, quiero solicitar mi evaluación gratuita.",
      `Nombre: ${data.name}`,
      `Negocio/Profesión: ${data.business}`,
      `Ciudad: ${data.city}`,
      `Tipo de negocio: ${data.type}`,
      `WhatsApp: ${data.whatsapp}`,
      data.social ? `Instagram/Sitio actual: ${data.social}` : null,
      `Objetivo principal: ${data.goal}`,
      data.message ? `Mensaje: ${data.message}` : null,
    ].filter(Boolean).join("\n");

    pendingUrl = buildWhatsappUrl(message);
    trackEvent("submit_evaluation_form", { goal: data.goal, city: data.city });

    form.hidden = true;
    confirm.hidden = false;
  });

  confirmGoBtn.addEventListener("click", () => {
    window.open(pendingUrl, "_blank", "noopener");
    closeModal();
  });
}

/* ---------------------------------------------------------
   11. FOOTER — datos de config + copyright dinámico
   --------------------------------------------------------- */
function renderFooter(){
  const email = document.getElementById("footerEmail");
  if(email) email.textContent = SITE_CONFIG.email;

  const copy = document.getElementById("footerCopy");
  if(copy) copy.textContent = `© ${new Date().getFullYear()} SellUp. Todos los derechos reservados.`;
}

/* ---------------------------------------------------------
   12. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  try{
    renderHeroMetrics();
    renderServicesCarousel();
    renderSuccessCases();
    renderTestimonials();
    renderFAQ();
    renderPrices();
    renderFooter();
    wireHeader();
    wireReveal();
    wireEvaluationForm();

    // Los botones dinámicos (WhatsApp) se conectan después de renderizar todo
    wireWhatsappButtons();
    wireServicesExpand();

    hydrateIcons(document);
  } catch(err){
    console.error("SellUp: error inicializando el sitio", err);
  }
});
