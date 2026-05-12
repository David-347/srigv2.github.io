let ws;
let wsConnected = false;

function initWebSocket() {
  const url = `ws://${location.host}:81`;
  ws = new WebSocket(url);

  ws.onopen = () => {
    wsConnected = true;
    logMsg("WS conectado");
    ws.send("STATUS");
  };

  ws.onclose = () => {
    wsConnected = false;
    logMsg("WS desconectado, reintentando...");
    setTimeout(initWebSocket, 3000);
  };

  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      updateStatusFromWS(data);
    } catch (e) {
      console.error("WS parse error", e);
    }
  };
}

function sendWS(cmd) {
  if (wsConnected) ws.send(cmd);
}

function updateStatusFromWS(data) {
  if (typeof data.flow === "number") {
    document.getElementById("flow-value").textContent = data.flow.toFixed(2);
  }
  if (typeof data.voltage === "number") {
    document.getElementById("volt-value").textContent = data.voltage.toFixed(2);
  }
  if (typeof data.humidity === "number") {
    document.getElementById("hum-value").textContent = data.humidity.toFixed(1);
  }
  if (typeof data.zone1 !== "undefined") {
    document.getElementById("z1-state").textContent = data.zone1 ? "ON" : "OFF";
  }
  if (typeof data.zone2 !== "undefined") {
    document.getElementById("z2-state").textContent = data.zone2 ? "ON" : "OFF";
  }
  pushChartData(data);
}
