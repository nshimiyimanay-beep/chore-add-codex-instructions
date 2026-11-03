/* ISO MEGA Website CMS content adapter.
 * Pages CMS saves validated JSON to GitHub; this public website only reads it.
 * No tokens, passwords, admin APIs, or private data are exposed here.
 * The existing static HTML remains a fallback when fetch is unavailable.
 */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const create = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = String(text ?? "");
    return el;
  };
  const set = (selector, value) => {
    const el = $(selector);
    if (el && typeof value === "string") el.textContent = value;
  };
  const safeImage = (input) => {
    if (typeof input !== "string" || !input.trim()) return "";
    try {
      const normalized = input.trim().replace(/^\/+/, "");
      const url = /^https?:\/\//i.test(input) ? new URL(input) : new URL("./" + normalized, document.baseURI);
      if (!["https:", "http:"].includes(url.protocol)) return "";
      return url.href;
    } catch { return ""; }
  };
  const imageBg = (image) => image ? 'url("' + image.replace(/["\\\n\r]/g, "") + '")' : "";
  const fetchJSON = async path => {
    const response = await fetch(new URL("./" + path, document.baseURI), { cache: "no-cache" });
    if (!response.ok) throw Error(path + ": HTTP " + response.status);
    return response.json();
  };

  const applySite = data => {
    if (!data || typeof data !== "object") return;
    const hero = data.hero || {}, about = data.about || {}, contact = data.contact || {}, seo = data.seo || {};
    set("[data-content='hero-first']", hero.headingFirst);
    set("[data-content='hero-second']", hero.headingSecond);
    set("[data-content='hero-tagline-1']", hero.taglineFirst);
    set("[data-content='hero-tagline-2']", hero.taglineSecond);
    set("[data-content='hero-cta-1']", hero.ctaPrimary);
    set("[data-content='hero-cta-2']", hero.ctaSecondary);
    set("[data-content='about-first']", about.headingFirst);
    set("[data-content='about-second']", about.headingSecond);
    set("[data-content='about-lead']", about.lead);
    set("[data-content='about-body']", about.body);
    set("[data-content='contact-address']", contact.address);
    set("[data-content='contact-phone-1']", contact.phonePrimary);
    set("[data-content='contact-phone-2']", contact.phoneSecondary);
    set("[data-content='contact-email']", contact.email);
    if (typeof contact.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      const mail = "mailto:" + contact.email;
      const emailLink = $("[data-content='contact-email']");
      const cta = $("[data-content='contact-email-cta']");
      if (emailLink) emailLink.href = mail;
      if (cta) cta.href = mail + "?subject=Project%20enquiry%20-%20ISO%20MEGA";
    }
    for (const [n, key] of [[1,"phonePrimary"], [2,"phoneSecondary"]]) {
      const link = $("[data-content='contact-phone-" + n + "']");
      const phone = contact[key];
      if (link && typeof phone === "string" && /^\+?[\d\s()-]{7,24}$/.test(phone)) link.href = "tel:" + phone.replace(/[^\d+]/g, "");
    }
    if (typeof seo.title === "string") document.title = seo.title;
    const meta = $('meta[name="description"]');
    if (meta && typeof seo.description === "string") meta.content = seo.description;
    const bg = safeImage(hero.backgroundImage);
    if (bg && $(".hero-photo")) {
      // Keep the approved dark overlay; replace only the underlying photograph.
      $(".hero-photo").style.backgroundImage = "linear-gradient(90deg,#081625 0%,#091b2df5 33%,#0a2338aa 57%,#07172662 100%)," + imageBg(bg);
    }
  };

  const applyServices = items => {
    const grid = $(".service-grid");
    if (!grid || !Array.isArray(items)) return;
    const visible = items.filter(s => s && s.visible !== false && typeof s.title === "string" && s.title.trim());
    if (!visible.length) return;
    const fragment = document.createDocumentFragment();
    visible.forEach((s, idx) => {
      const card = create("article","service-card service-" + ["one","two","three","four","five","six"][idx % 6]);
      const photo = create("div","service-photo");
      const image = safeImage(s.image);
      if (image) photo.style.backgroundImage = imageBg(image);
      card.append(photo,create("div","service-shade"));
      const inner = create("div","service-content");
      const number = create("div","service-number", s.number || String(idx + 1).padStart(2,"0") + " ");
      const arrow = create("span", "", "↗");number.append(document.createTextNode(" "),arrow);
      inner.append(number,create("div","service-icon", ["◉","▤","⌘","✎","◎","⚙"][idx % 6]),create("h3","",s.title),create("p","",s.description || ""));
      const link = create("a","", "Discuss a project ↗");
      link.href="#contact";link.setAttribute("aria-label","Enquire about " + s.title);
      inner.append(link);card.append(inner);fragment.append(card);
    });
    grid.replaceChildren(fragment);
  };

  const applyTeam = items => {
    const grid = $(".team-grid");
    if (!grid || !Array.isArray(items)) return;
    const visible = items.filter(p => p && p.visible !== false && p.name);
    const fragment = document.createDocumentFragment();
    for (const person of visible) {
      const card = create("div");
      const photo = safeImage(person.photo);
      if (photo) {
        const img = create("img","team-photo");
        img.src=photo;img.alt="Portrait of " + person.name;img.loading="lazy";
        card.append(img);
      } else card.append(create("span","team-initial",person.initials || String(person.name).split(/\s+/).map(x=>x[0]).slice(0,2).join("")));
      card.append(create("strong","",person.name),create("small","",person.role || ""));
      fragment.append(card);
    }
    grid.replaceChildren(fragment);
  };
  const applyClients = items => {
    const grid = $(".client-grid");
    if (!grid || !Array.isArray(items)) return;
    grid.replaceChildren(...items.filter(x => x && x.visible !== false && x.name).map(x => create("span","",x.name)));
  };
  const applyPortfolio = items => {
    const section = $("#portfolio"), grid = $(".portfolio-grid");
    if (!section || !grid || !Array.isArray(items)) return;
    const visible = items.filter(p => p && p.published === true && p.title);
    if (!visible.length) return;
    for (const p of visible) {
      const card = create("article","portfolio-card");
      const cover = create("div","portfolio-photo");
      const photo = safeImage(p.image);
      if (photo) cover.style.backgroundImage=imageBg(photo);
      else cover.append(create("span","", "PROJECT"));
      const details = create("div","portfolio-details");
      details.append(create("small","",p.category || "ISO MEGA PROJECT"),create("h3","",p.title),create("p","",p.summary || ""));
      card.append(cover,details);grid.append(card);
    }
    section.hidden = false;
    const nav = $(".main-nav");
    if (nav && !nav.querySelector('a[href="#portfolio"]')) {
      const anchor = create("a","", "Portfolio");anchor.href="#portfolio";
      const services = nav.querySelector('a[href="#services"]');
      if (services) services.after(anchor);
      else nav.prepend(anchor);
      anchor.addEventListener("click",() => {
        nav.classList.remove("is-open");
        const toggle=$(".menu-toggle");
        if(toggle) toggle.setAttribute("aria-expanded","false");
      });
    }
  };

  const load = async (path, handler) => {
    try { handler(await fetchJSON(path)); }
    catch (err) { console.warn("Using default website content for",path,err.message); }
  };
  document.addEventListener("DOMContentLoaded", () => {
    load("content/site.json",applySite);
    load("content/services.json",applyServices);
    load("content/team.json",applyTeam);
    load("content/clients.json",applyClients);
    load("content/projects/index.json",applyPortfolio);
  });
})();