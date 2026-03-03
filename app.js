/* app.js – simple vanilla implementation */
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((r) => r.json())
    .then(renderPage)
    .catch(console.error);
});

function renderPage(data) {
  renderHero(data.hero);
  renderCards(data.cards);
  renderWallets(data.wallets);
  renderInstallInstructions(data.install);
  renderSecuritySection(data.security);
  renderMerchantBenefits(data.merchantBenefits);
  renderMerchantTools(data.merchantTools);
  renderFooter(data.footer, data.footerBottom);
}

/* HERO */
function renderHero(hero) {
  const el = document.querySelector(".hero");
  el.innerHTML = `
    <h1>${hero.title}</h1>
    <h2>${hero.subtitle}</h2>
    <p>${hero.text}</p>
  `;
}

/* CARDS */
function renderCards(cards) {
  const container = document.getElementById("cards");
  cards.forEach((c) => {
    const div = document.createElement("div");
    div.className = "card" + (c.type === "bch" ? " bch" : "");
    div.innerHTML = `
      <h3>${c.title}</h3>
      <ul>${c.items.map((i) => `<li>${i}</li>`).join("")}</ul>
    `;
    container.appendChild(div);
  });
}

/* WALLET GRID */
function renderWallets(wallets) {
  const container = document.getElementById("wallets");
  wallets.forEach((w) => {
    const a = document.createElement("a");
    a.href = w.url;
    a.className = "wallet-card";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<h4>${w.title}</h4><p>${w.description}</p>`;
    container.appendChild(a);
  });
}

/* INSTALL INSTRUCTIONS */
function renderInstallInstructions(steps) {
  const container = document.getElementById("install-instructions");
  container.innerHTML = `
    <h3>Instruções de Instalação:</h3>
    <ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol>
  `;
}

/* SECURITY SECTION */
function renderSecuritySection(sec) {
  const container = document.getElementById("security");
  container.innerHTML = `
    <h3>${sec.title}</h3>
    ${sec.paragraphs.map((p) => `<p>${p}</p>`).join("")}
  `;
}

/* MERCHANT BENEFITS */
function renderMerchantBenefits(items) {
  const container = document.getElementById("merchant-benefits");
  container.innerHTML = `
    <h3>Benefícios para Comerciantes:</h3>
    <ul style="list-style:none;margin-top:15px;">
      ${items.map((i) => `<li>${i}</li>`).join("")}
    </ul>
  `;
}

/* MERCHANT TOOLS */
function renderMerchantTools(tool) {
  const container = document.getElementById("merchant-tools");
  container.innerHTML = `
    <h3>${tool.title}</h3>
    <p>${tool.text}</p>
    <a href="${tool.linkUrl}" target="_blank" class="map-link">${tool.linkText}</a>
  `;
}

/* FOOTER */
function renderFooter(cols, bottom) {
  const container = document.getElementById("footer");
  cols.forEach((col) => {
    const div = document.createElement("div");
    div.className = "footer-col";
    let html = `<h4>${col.title}</h4>`;
    col.items.forEach((item) => {
      if (item.type === "social") {
        const btns = item.links
          .map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
          .join("");
        html += `<div class="social-row">${btns}</div>`;
      } else {
        html += `<p>${item}</p>`;
      }
    });
    div.innerHTML = html;
    container.appendChild(div);
  });

  const bottomContainer = document.getElementById("footer-bottom");
  bottomContainer.innerHTML = bottom.text;
}
