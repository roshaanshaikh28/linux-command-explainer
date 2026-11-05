const model = document.getElementById("model");
const msg = document.getElementById("msg");

const DEFAULT_MODEL = "linux-soc-teacher:latest";

chrome.storage.local.get(["model"]).then((v) => {
  model.value = v.model || DEFAULT_MODEL;
});

document.getElementById("save").onclick = async () => {
  await chrome.storage.local.set({
    model: model.value.trim() || DEFAULT_MODEL
  });

  msg.textContent = "Saved ✓";
  setTimeout(() => (msg.textContent = ""), 2000);
};
