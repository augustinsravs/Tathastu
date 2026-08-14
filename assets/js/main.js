/* ============================================================
   Tathastu Sustainables — site scripts
   ============================================================ */

/* ------------------------------------------------------------
   ▼▼▼  EDIT YOUR BUSINESS DETAILS HERE  ▼▼▼
   This single block drives WhatsApp links, phone links and email
   across every page. Change it once — it updates everywhere.
   ------------------------------------------------------------ */
const SITE = {
  brand: "Tathastu",
  tagline: "From Nature's Bounty to Your Table",

  // Owner's WhatsApp number — country code + number, DIGITS ONLY (no +, no spaces)
  // India example: 91 followed by the 10-digit mobile.
  whatsapp: "919704149595",

  // Shown on the site as readable text
  phoneDisplay: "+91 97041 49595",
  ownerName: "Tathastu",

  email: "tathastu.com@gmail.com",

  address: {
    line1: "Tathastu Sustainables",
    line2: "4MJV+WC4, Balakrishnapuram",
    city: "Ichchapuram",
    state: "Andhra Pradesh",
    pin: "532312",
  },

  socials: {
    whatsapp: "", // auto-built from `whatsapp` above if left empty
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
};
/* ------------------------------------------------------------
   ▲▲▲  END OF EDITABLE BUSINESS DETAILS  ▲▲▲
   ------------------------------------------------------------ */

const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/* ============================================================
   1. Image fallbacks
   Any <img> that fails to load (because you haven't dropped the
   real photo into /images yet) is replaced by a generated
   forest-green leaf placeholder carrying the same label.
   Drop a real file at the same path and it just works.
   ============================================================ */
function leafPlaceholder(label, seed = 0) {
  const greens = [
    ["#1b4332", "#2d6a4f"],
    ["#14452f", "#40916c"],
    ["#2d6a4f", "#52b788"],
    ["#0b2e20", "#1b4332"],
    ["#40916c", "#95d5b2"],
  ];
  const [a, b] = greens[Math.abs(seed) % greens.length];
  const txt = String(label || "Tathastu").slice(0, 34);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <path d="M30 6c14 8 20 22 14 36-14 6-28 0-34-14C4 14 16 -2 30 6z" fill="rgba(255,255,255,.05)"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#p)"/>
  <g transform="translate(400 258)" opacity=".9">
    <path d="M0-92C58-52 78 22 40 78-24 96-78 52-84-14-58-70-8-90 0-92z" fill="rgba(255,255,255,.14)"/>
    <path d="M0-88C-6-30-14 22-34 74" stroke="rgba(255,255,255,.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-4-52 34-40M-10-18 26 2M-18 16 8 42" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <text x="400" y="424" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="rgba(255,255,255,.95)">${txt.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>
  <text x="400" y="462" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" letter-spacing="4" fill="rgba(255,255,255,.55)">Tathastu Sustainables</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll("img[data-label]").forEach((img, i) => {
    if (img.dataset.fbBound) return;
    img.dataset.fbBound = "1";
    const swap = () => {
      if (img.dataset.fbDone) return;
      img.dataset.fbDone = "1";
      img.src = leafPlaceholder(img.dataset.label, img.dataset.seed || i);
    };
    img.addEventListener("error", swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  // Background images (hero / banners) declared via data-bg
  root.querySelectorAll("[data-bg]").forEach((el, i) => {
    const url = el.dataset.bg;
    const label = el.dataset.label || "Tathastu";
    const probe = new Image();
    probe.onload = () => { el.style.backgroundImage = `url("${url}")`; };
    probe.onerror = () => { el.style.backgroundImage = `url("${leafPlaceholder(label, i + 3)}")`; };
    probe.src = url;
  });
}

/* ============================================================
   2. Header: sticky shadow, mobile drawer, sub-nav toggles
   ============================================================ */
function initHeader() {
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const backdrop = document.querySelector(".nav-backdrop");

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const closeNav = () => {
    nav?.classList.remove("open");
    burger?.classList.remove("open");
    backdrop?.classList.remove("show");
    document.body.style.overflow = "";
  };

  burger?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    backdrop?.classList.toggle("show", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  backdrop?.addEventListener("click", closeNav);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeNav());

  // On mobile, tapping a parent with a sub-menu expands it instead of navigating
  document.querySelectorAll(".nav-item.has-sub > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        a.parentElement.classList.toggle("expanded");
      }
    });
  });

  // Close the drawer when a real link is used
  document.querySelectorAll(".nav a:not(.has-sub > a)").forEach((a) =>
    a.addEventListener("click", () => window.innerWidth <= 900 && closeNav())
  );
}

/* ============================================================
   3. Fill business details into the markup
   ============================================================ */
function initSiteDetails() {
  const waHref = SITE.socials.whatsapp || waLink(
    `Hello ${SITE.brand}! I found you on your website and I'd like to know more about your leaf products.`
  );

  document.querySelectorAll("[data-wa]").forEach((el) => {
    const msg = el.dataset.wa;
    el.href = msg ? waLink(msg) : waHref;
    el.target = "_blank";
    el.rel = "noopener";
  });

  const map = {
    "brand": SITE.brand,
    "tagline": SITE.tagline,
    "phone": SITE.phoneDisplay,
    "owner": SITE.ownerName,
    "email": SITE.email,
    "addr1": SITE.address.line1,
    "addr2": SITE.address.line2,
    "city": SITE.address.city,
    "state": SITE.address.state,
    "pin": SITE.address.pin,
    "year": String(new Date().getFullYear()),
  };
  document.querySelectorAll("[data-site]").forEach((el) => {
    const v = map[el.dataset.site];
    if (v !== undefined) el.textContent = v;
  });

  document.querySelectorAll('[data-href="tel"]').forEach((a) => {
    a.href = "tel:" + SITE.phoneDisplay.replace(/\s/g, "");
  });
  document.querySelectorAll('[data-href="mail"]').forEach((a) => {
    a.href = "mailto:" + SITE.email;
  });

  document.querySelectorAll("[data-social]").forEach((a) => {
    const key = a.dataset.social;
    if (key === "whatsapp") { a.href = waHref; return; }
    if (SITE.socials[key]) a.href = SITE.socials[key];
  });
}

/* ============================================================
   4. Reveal-on-scroll
   ============================================================ */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), i * 70);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ============================================================
   5. Product category filter (products page)
   ============================================================ */
function initProductTabs() {
  const tabs = document.querySelectorAll(".cat-tabs button");
  if (!tabs.length) return;
  const groups = document.querySelectorAll(".product-group");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.cat;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      groups.forEach((g) => {
        const show = target === "all" || g.dataset.cat === target;
        g.style.display = show ? "" : "none";
      });
      if (target !== "all") {
        document.querySelector(`.product-group[data-cat="${target}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
   6. Gallery lightbox
   ============================================================ */
function initLightbox() {
  const figs = [...document.querySelectorAll(".gal")];
  const box = document.querySelector(".lightbox");
  if (!figs.length || !box) return;

  const imgEl = box.querySelector("img");
  const capEl = box.querySelector(".lb-cap");
  let idx = 0;

  const show = (i) => {
    idx = (i + figs.length) % figs.length;
    const f = figs[idx];
    const src = f.querySelector("img").src;
    imgEl.src = src;
    capEl.textContent = f.querySelector("figcaption")?.innerText.replace(/\n/g, " — ") || "";
  };

  figs.forEach((f, i) =>
    f.addEventListener("click", () => {
      show(i);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    })
  );

  const close = () => {
    box.classList.remove("open");
    document.body.style.overflow = "";
  };

  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-nav.prev").addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
  box.querySelector(".lb-nav.next").addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* ============================================================
   7. Contact form → WhatsApp
   Builds a pre-filled WhatsApp message to the owner. No server,
   no backend, nothing stored — it opens WhatsApp with the text.
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const setError = (name, on) =>
    form.querySelector(`[name="${name}"]`)?.closest(".field")?.classList.toggle("error", on);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());

    let ok = true;
    const name = (d.name || "").trim();
    const mobile = (d.mobile || "").replace(/\D/g, "");
    const location = (d.location || "").trim();
    const product = d.product || "";

    if (name.length < 2) { setError("name", true); ok = false; } else setError("name", false);
    if (mobile.length < 10) { setError("mobile", true); ok = false; } else setError("mobile", false);
    if (!location) { setError("location", true); ok = false; } else setError("location", false);
    if (!product) { setError("product", true); ok = false; } else setError("product", false);

    if (!ok) {
      form.querySelector(".field.error input, .field.error select")?.focus();
      return;
    }

    const lines = [
      `*New enquiry — ${SITE.brand}*`,
      "",
      `*Name:* ${name}`,
      `*Mobile:* ${d.code || "+91"} ${mobile}`,
      `*Location:* ${location}`,
      `*Interested in:* ${product}`,
      d.quantity?.trim() ? `*Quantity:* ${d.quantity.trim()}` : null,
      d.when?.trim() ? `*Needed by:* ${d.when.trim()}` : null,
      d.message?.trim() ? `*Message:* ${d.message.trim()}` : null,
      "",
      "Sent from the website contact form.",
    ].filter((l) => l !== null);

    const status = form.querySelector(".form-status");
    if (status) {
      status.hidden = false;
      status.textContent = "Opening WhatsApp with your enquiry…";
    }
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  // Clear the error state as soon as the user starts fixing it
  form.querySelectorAll("input, select, textarea").forEach((el) =>
    el.addEventListener("input", () => el.closest(".field")?.classList.remove("error"))
  );
}

/* ============================================================
   8. Per-product "Enquire" buttons
   ============================================================ */
function initProductEnquiry() {
  document.querySelectorAll("[data-enquire]").forEach((btn) => {
    const item = btn.dataset.enquire;
    btn.href = waLink(
      `Hello ${SITE.brand}! I'm interested in *${item}*. Please share the price, minimum order quantity and delivery details.`
    );
    btn.target = "_blank";
    btn.rel = "noopener";
  });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  attachImageFallbacks();
  initHeader();
  initSiteDetails();
  initReveal();
  initProductTabs();
  initLightbox();
  initContactForm();
  initProductEnquiry();

  // Mark the current page in the nav
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item > a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href === here) a.parentElement.classList.add("active");
  });
});
