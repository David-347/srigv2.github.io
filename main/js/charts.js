let flowHistory = [];
let humHistory = [];

function pushChartData(data) {
  const now = Date.now();
  if (typeof data.flow === "number") {
    flowHistory.push({ t: now, v: data.flow });
    if (flowHistory.length > 100) flowHistory.shift();
  }
  if (typeof data.humidity === "number") {
    humHistory.push({ t: now, v: data.humidity });
    if (humHistory.length > 100) humHistory.shift();
  }
  drawCharts();
}

function drawCharts() {
  const flowCanvas = document.getElementById("chart-flow");
  const humCanvas = document.getElementById("chart-hum");
  if (!flowCanvas || !humCanvas) return;

  const fctx = flowCanvas.getContext("2d");
  const hctx = humCanvas.getContext("2d");

  drawSimpleLineChart(fctx, flowHistory, "L/min");
  drawSimpleLineChart(hctx, humHistory, "%");
}

function drawSimpleLineChart(ctx, data, unit) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (data.length < 2) {
    ctx.fillStyle = "#888";
    ctx.fillText("Sin datos", 10, 20);
    return;
  }

  const minV = Math.min(...data.map(d => d.v));
  const maxV = Math.max(...data.map(d => d.v));
  const minT = data[0].t;
  const maxT = data[data.length - 1].t;
  const pad = 10;

  ctx.strokeStyle = "#444";
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.stroke();

  ctx.strokeStyle = "#4caf50";
  ctx.beginPath();
  data.forEach((d, i) => {
    const x = pad + ((d.t - minT) / (maxT - minT || 1)) * (w - 2 * pad);
    const y = h - pad - ((d.v - minV) / (maxV - minV || 1)) * (h - 2 * pad);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#aaa";
  ctx.fillText(`${data[data.length - 1].v.toFixed(1)} ${unit}`, pad + 5, pad + 10);
}
