const API_BASE = "";

function logMsg(msg) {
  const logs = document.getElementById("logs-container");
  if (!logs) return;
  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logs.prepend(line);
}

async function fetchStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/status`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    document.getElementById("flow-value").textContent = data.flow.toFixed(2);
    document.getElementById("volt-value").textContent = data.voltage.toFixed(2);
    document.getElementById("hum-value").textContent = data.humidity.toFixed(1);
    document.getElementById("z1-state").textContent = data.zone1 ? "ON" : "OFF";
    document.getElementById("z2-state").textContent = data.zone2 ? "ON" : "OFF";
    pushChartData(data);
  } catch (e) {
    logMsg("Error status: " + e.message);
  }
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.querySelectorAll(".tab-content").forEach(c => {
        c.classList.toggle("active", c.id === `tab-${target}`);
      });
    });
  });
}

function initTheme() {
  const btn = document.getElementById("btn-theme");
  const saved = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("theme-dark", saved === "dark");
  document.body.classList.toggle("theme-light", saved === "light");
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    document.body.classList.toggle("theme-dark", !isDark);
    document.body.classList.toggle("theme-light", isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });
}

function initLang() {
  const sel = document.getElementById("lang-select");
  const saved = localStorage.getItem("lang") || "es";
  sel.value = saved;
  applyLang(saved);
  sel.addEventListener("change", () => {
    const lang = sel.value;
    localStorage.setItem("lang", lang);
    applyLang(lang);
  });
}

function initLogin() {
  const modal = document.getElementById("login-modal");
  const btnLogin = document.getElementById("btn-login");
  const btnCancel = document.getElementById("login-cancel");
  const btnOk = document.getElementById("login-ok");

  btnLogin.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  btnCancel.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  btnOk.addEventListener("click", () => {
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();
    if (user && pass) {
      localStorage.setItem("user", user);
      modal.classList.add("hidden");
      logMsg("Login OK: " + user);
    } else {
      logMsg("Login inválido");
    }
  });
}

function initZones() {
  document.getElementById("z1-on").addEventListener("click", () => {
    fetch(`${API_BASE}/api/v1/zone1/on`, { method: "POST" });
    sendWS("Z1_ON");
  });
  document.getElementById("z1-off").addEventListener("click", () => {
    fetch(`${API_BASE}/api/v1/zone1/off`, { method: "POST" });
    sendWS("Z1_OFF");
  });
  document.getElementById("z2-on").addEventListener("click", () => {
    fetch(`${API_BASE}/api/v1/zone2/on`, { method: "POST" });
    sendWS("Z2_ON");
  });
  document.getElementById("z2-off").addEventListener("click", () => {
    fetch(`${API_BASE}/api/v1/zone2/off`, { method: "POST" });
    sendWS("Z2_OFF");
  });
}

function initConfig() {
  const btn = document.getElementById("save-hum");
  btn.addEventListener("click", () => {
    const min = parseFloat(document.getElementById("hum-min").value);
    const max = parseFloat(document.getElementById("hum-max").value);
    logMsg(`Umbrales humedad: ${min} - ${max}`);
    // aquí luego puedes mandar al ESP32 maestro/STM32
  });
}

window.addEventListener("load", () => {
  initTabs();
  initTheme();
  initLang();
  initLogin();
  initZones();
  initConfig();
  initWebSocket();
  fetchStatus();
  setInterval(fetchStatus, 10000);
});
