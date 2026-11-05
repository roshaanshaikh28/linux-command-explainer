let aiPort = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg) return;
  if (msg.type === "explain" && msg.text) showCard(msg.text);
  if (msg.type === "explain-selection") {
    const t = String(window.getSelection()).trim();
    showCard(t || "");
  }
});

function showCard(text) {
  closeCard();
  const host = document.createElement("div");
  host.id = "lx-explainer-host";
  host.style.cssText = "all:initial;position:fixed;top:16px;right:16px;z-index:2147483647;";
  const root = host.attachShadow({ mode: "open" });
  const hasText = text.trim().length > 0;
  root.innerHTML = `
    <style>${CARD_CSS}
      .box{width:420px;max-width:90vw;max-height:80vh;overflow:auto;border:1px solid #cbd5e1;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.25);padding:12px 14px}
      .top{display:flex;justify-content:space-between;align-items:center;font-weight:600}
      button{border:0;background:#e2e8f0;border-radius:6px;padding:2px 9px;cursor:pointer;font-size:14px}
    </style>
    <div class="card box">
      <div class="top"><span>🐧 Command explained</span><button id="x">✕</button></div>
      ${hasText
        ? `<div class="aihead">🤖 AI explanation</div><div class="ai" id="ai"></div>
           <div class="aihead">Quick breakdown (offline)</div>${renderHTML(explain(text))}`
        : `<p>Select a command first, then press the shortcut again.</p>`}
    </div>`;
  document.documentElement.appendChild(host);
  root.getElementById("x").onclick = closeCard;
  if (hasText) aiPort = startAI(text, root.getElementById("ai"));
  document.addEventListener("keydown", onKey, true);
}

function onKey(e) { if (e.key === "Escape") closeCard(); }

function closeCard() {
  const old = document.getElementById("lx-explainer-host");
  if (old) old.remove();
  if (aiPort) { try { aiPort.disconnect(); } catch (e) {} aiPort = null; }
  document.removeEventListener("keydown", onKey, true);
}
