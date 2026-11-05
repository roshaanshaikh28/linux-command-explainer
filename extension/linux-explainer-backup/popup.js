const style = document.createElement("style");
style.textContent = CARD_CSS;
document.head.appendChild(style);

const input = document.getElementById("in");
const out = document.getElementById("out");
let port = null;

function run() {
  const v = input.value.trim();
  if (port) { try { port.disconnect(); } catch (e) {} port = null; }
  if (!v) { out.innerHTML = ""; return; }
  out.innerHTML = `<div class="aihead">🤖 AI explanation</div><div class="ai" id="ai"></div>
    <div class="aihead">Quick breakdown (offline)</div>${renderHTML(explain(v))}`;
  port = startAI(v, document.getElementById("ai"));
}
document.getElementById("go").onclick = run;
input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); run(); } });
input.focus();
