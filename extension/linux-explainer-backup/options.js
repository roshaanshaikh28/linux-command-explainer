const key = document.getElementById("key");
const model = document.getElementById("model");
const msg = document.getElementById("msg");
chrome.storage.local.get(["apiKey", "model"]).then((v) => { key.value = v.apiKey || ""; model.value = v.model || ""; });
document.getElementById("save").onclick = async () => {
  await chrome.storage.local.set({ apiKey: key.value.trim(), model: model.value.trim() });
  msg.textContent = "Saved ✓";
  setTimeout(() => (msg.textContent = ""), 2000);
};
