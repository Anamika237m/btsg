/* VIEW: turns Model data into HTML */
const View = (() => {
  const M = Model, B = M.brand, C = M.contact;
  const h = (a) => a.join("");
  const eb = (t) => `<div class="eyebrow">${t}</div>`;
  const li = (a) => `<ul class="ticks">${h(a.map(x => `<li>${x}</li>`))}</ul>`;
  const btn = (txt, href, cls = "btn-gold") => `<a class="btn ${cls}" href="${href}">${txt}</a>`;
  const tel = (p) => "tel:" + p.replace(/\s/g, "");
  const phoneLinks = () => C.phones.map(p => `<a href="${tel(p)}">${p}</a>`).join("<br>");
  const hero = (k) => { const p = M.pages[k]; return `<section class="phero"><div class="wrap center"><small>Home / ${p.crumb}</small><h1>${p.title}</h1><p>${p.sub}</p></div></section>`; };
  const steps = () => `<section class="dark"><div class="wrap center">${eb("OUR TECHNICAL APPROACH")}<h2>Five Principles Behind Every Service Call</h2><div class="steps">${h(M.steps.map((s, i) => `<div><b>${i + 1}</b><h4>${s[0]}</h4><p>${s[1]}</p></div>`))}</div></div></section>`;
  const cta = (t, d, buttons) => `<section class="wrap"><div class="cta"><div><h3>${t}</h3><p>${d}</p></div><div class="btns">${buttons}</div></div></section>`;
  const card = (ic, t, d) => `<div class="card">${ic ? `<span class="ic">${ic}</span>` : ""}<h4>${t}</h4>${Array.isArray(d) ? li(d) : `<p>${d}</p>`}</div>`;
  const waLink = () => `https://wa.me/${C.phones[0].replace(/\D/g, "")}?text=${encodeURIComponent(C.waText)}`;
  const quoteBtn = () => `<a class="btn btn-gold" href="${waLink()}" target="_blank" rel="noopener">Request a Quote</a>`;
  const callBtn = () => btn("Call " + C.phones[0], tel(C.phones[0]), "btn-line");

  return {
    topbar: () => `<div class="wrap bar"><span>📞 <a href="${tel(C.phones[0])}">${C.phones[0]}</a> &nbsp; ✉️ ${C.email} &nbsp; 📍 ${C.area}</span><b>${B.tagline}</b></div>`,
    header: (cur) => `<div class="wrap hd"><a class="logo" href="#/home"><img src="${B.logo}" alt="Logo"><span><strong>${B.short}</strong><small>${B.sub}</small></span></a><nav>${h(M.nav.map(n => `<a href="#/${n[0]}" class="${n[0] === cur ? "on" : ""}">${n[1]}</a>`))}</nav>${quoteBtn()}</div>`,
    footer: () => `<div class="wrap"><div class="fgrid"><div><div class="logo"><img src="${B.logo}" alt="Logo"><strong>${B.full}</strong></div><p>${B.about}</p></div>
      <div><h5>Company</h5><a href="#/about">About Us</a><a href="#/services">Our Services</a><a href="#/industries">Industries We Serve</a><a href="#/contact">Contact Us</a></div>
      <div><h5>Services</h5><a href="#/services">Chiller Services</a><a href="#/services">Compressor Overhauling</a><a href="#/services">Annual Maintenance (AMC)</a><a href="#/services">Spare Parts Supply</a></div>
      <div><h5>Contact</h5><p>${C.address}</p><p>📞 ${phoneLinks()}<br>✉️ ${C.email}</p></div></div>
      <div class="copy"><span>© 2026 ${B.full}. All rights reserved.</span><span>GSTIN: ${C.gstin}</span></div></div>`,

    home: () => { const d = M.home; return `
      <section class="hero"><div class="wrap two"><div>${eb(d.eyebrow)}<h1>Reliable Chiller Solutions, <em>Quality Spare Parts</em> &amp; Professional Technical Services</h1><p>${d.intro}</p><div class="btns">${btn("Get a Free Consultation", "#/contact")}${btn("Explore Our Services", "#/services", "btn-line")}</div>
        <div class="stats">${h(d.stats.map(s => `<div><b>${s[0]}</b><small>${s[1]}</small></div>`))}</div><div class="brandline">${d.brands}<small>${d.brandsLabel}</small></div></div>
        <aside class="glass"><h4>Complete Chiller &amp; HVAC Support</h4><ul class="ticks">${h(d.support.map(x => `<li>${x}</li>`))}</ul></aside></div></section>
      <section class="wrap center">${eb("OUR CORE EXPERTISE")}<h2>Specialized Solutions for Chillers, HVAC Systems &amp; Spare Parts</h2><p class="lead">Our technical team provides complete service support for centrifugal and screw chillers used in commercial and industrial facilities.</p><div class="grid g3 left">${h(d.expertise.map(x => card(...x)))}</div></section>
      ${steps()}
      <section class="tint"><div class="wrap center">${eb("WHY CHOOSE US")}<h2>Why Choose Bharat Technical Services Group?</h2><div class="grid g4 left">${h(d.why.map(x => card(...x)))}</div></div></section>
      <section class="dark slim"><div class="wrap counters">${h(d.counters.map(c => `<div><b data-count="${c[0]}" data-suffix="${c[1]}">0</b><small>${c[2]}</small></div>`))}</div></section>
      <section class="wrap two"><div>${eb("INDUSTRIES WE SERVE")}<h2>Trusted Across Hospitality, Commercial, Industrial &amp; Institutional Facilities</h2><p>${d.sectorsText}</p><div class="chips">${h(d.sectors.map(s => `<span>${s}</span>`))}</div>${btn("See All Industries &amp; Brands →", "#/industries", "btn-navy")}</div>
        <aside class="promise"><span class="ic">🏆</span><h4>Our Service Promise</h4><p>“${B.tagline}”</p><p>${d.promise}</p></aside></section>
      ${cta(d.cta[0], d.cta[1], quoteBtn() + callBtn())}`; },

    about: () => { const d = M.about; return hero("about") + `
      <section class="wrap two"><div>${eb("1. ABOUT US")}<h2>Engineering Reliability Into Every Chiller Plant We Touch</h2>${h(d.paras.map(p => `<p>${p}</p>`))}</div>
        <aside class="infobox"><h4>Company Information</h4>${h(d.info.map(r => `<div class="row"><span>${r[0]}</span><b>${r[1]}</b></div>`))}</aside></section>
      <section class="tint"><div class="wrap center">${eb("VISION, MISSION &amp; PROMISE")}<h2>What Drives Us</h2><div class="grid g3 left">${h(d.vmp.map(x => card(...x)))}</div></div></section>
      <section class="wrap center">${eb("CORE VALUES")}<h2>The Principles Behind Every Job</h2><div class="grid g3 left">${h(d.values.map(x => card("", ...x)))}</div></section>
      ${steps()}
      <section class="wrap center">${eb("OUR COMMITMENT TO CUSTOMERS")}<h2>Protecting the Customer’s Investment, Ensuring Reliable Plant Operation</h2><p class="lead">We believe that technical service is not simply about repairing equipment. It is about protecting the customer’s investment and ensuring reliable plant operation.</p><ul class="ticks cols3 left">${h(d.commit.map(x => `<li>${x}</li>`))}</ul></section>
      ${cta("Want to know more about how we work?", "Explore our full range of chiller and HVAC services, or get in touch with our technical team directly.", btn("View Our Services", "#/services") + btn("Contact Us", "#/contact", "btn-line"))}`; },

    services: () => hero("services") + M.services.map((s, i) => `<section class="${i % 2 ? "tint" : ""}"><div class="wrap">${eb(s.n)}<h2>${s.t}</h2>${h((s.p || []).map(p => `<p class="lead">${p}</p>`))}
      ${s.list ? `<ul class="ticks cols3">${h(s.list.map(x => `<li>${x}</li>`))}</ul>` : ""}
      ${s.cards ? `<div class="grid ${s.cards.length === 4 ? "g4" : s.cards.length === 3 ? "g3" : "g2"}">${h(s.cards.map(x => card(...x)))}</div>` : ""}${s.note ? `<p class="note">${s.note}</p>` : ""}</div></section>`).join("")
      + cta(M.servicesCta[0], M.servicesCta[1], quoteBtn() + callBtn()),

    industries: () => { const d = M.industries; return hero("industries") + `
      <section class="wrap center">${eb("17. INDUSTRIES WE SERVE")}<h2>Our Solutions Are Suitable for a Wide Range of Facilities</h2><div class="grid g4 left">${h(d.groups.slice(0, 4).map(x => card(...x)))}</div><div class="grid g1 left">${card(...d.groups[4])}</div></section>
      <section class="dark"><div class="wrap center">${eb("13. BRANDS &amp; EQUIPMENT EXPERTISE")}<h2>Our Technical Activities Cover Major HVAC &amp; Chiller Manufacturers</h2><p class="lead">${d.brandsText}</p><div class="brands">${h(d.brands.map(b => `<b>${b}</b>`))}</div></div></section>
      <section class="tint"><div class="wrap center">${eb("18. SERVICE &amp; SUPPORT")}<h2>Our Service Philosophy</h2><p class="lead">${d.philosophy}</p><h3 class="vals">${d.values}</h3><p class="lead">${d.after}</p></div></section>
      ${cta(d.cta[0], d.cta[1], quoteBtn())}`; },

    contact: () => { const rows = [["📍", "Registered Address", C.addressFull], ["📞", "Phone", phoneLinks()], ["✉️", "Email", C.email], ["🧾", "GSTIN", `${C.gstin} &nbsp;·&nbsp; ${C.gstNote}`], ["🕒", "Service Hours", C.hours]]; return hero("contact") + `
      <section class="wrap two"><div>${eb("CONTACT DETAILS")}<h2>We’re Here to Help</h2>${h(rows.map(r => `<div class="crow"><span class="ic sm">${r[0]}</span><div><b>${r[1]}</b><p>${r[2]}</p></div></div>`))}</div>
        <form id="enquiry" class="card form"><h3>Request a Quote / Send an Enquiry</h3><p>Fill in the form and our team will respond with next steps — typically within one business day.</p>
          <div class="f2"><label>Full Name *<input name="name" required placeholder="Your name"></label><label>Phone<input name="phone" placeholder="+91 XXXXX XXXXX"></label></div>
          <div class="f2"><label>Email *<input name="email" type="email" required placeholder="you@company.com"></label><label>Service Needed<select name="service">${h(M.serviceOptions.map(o => `<option>${o}</option>`))}</select></label></div>
          <label>Message *<textarea name="message" rows="4" required placeholder="Tell us about your chiller/HVAC system, equipment brand, and the issue or requirement..."></textarea></label>
          <button class="btn btn-gold" type="submit">Send Enquiry</button><p id="formMsg" role="status"></p>${C.formKey ? "" : `<small>This form opens your email app addressed to ${C.email}.</small>`}</form></section>`; }
  };
})();
