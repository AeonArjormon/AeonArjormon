(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!document.body) return;

  var COLORS = ["#f7c2ce", "#f1a7bc", "#e98ba6", "#f9d3dd", "#de7f9b", "#f4b3c3"];
  var MAX_PETALS = 26;

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;" +
    "pointer-events:none;z-index:1;opacity:.92;";
  // 放进 #main 里，和菜单栏处于同一个层叠上下文，花瓣才不会盖住导航
  var host = document.getElementById("main") || document.body;
  host.insertBefore(canvas, host.firstChild);

  var ctx = canvas.getContext("2d");
  var width = 0;
  var height = 0;
  var dpr = 1;
  var petals = [];
  var last = 0;
  var running = true;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function shade(hex, k) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round(((n >> 16) & 255) * k);
    var g = Math.round(((n >> 8) & 255) * k);
    var b = Math.round((n & 255) * k);
    return "rgba(" + r + "," + g + "," + b + ",.45)";
  }

  function makePetal(spread) {
    var size = rand(12, 26);
    var color = COLORS[(Math.random() * COLORS.length) | 0];
    return {
      x: rand(-40, width + 40),
      y: spread ? rand(-20, height) : rand(-80, -10),
      w: size,
      h: size * rand(1.0, 1.3),
      vy: rand(20, 55),
      sway: rand(10, 26),
      swaySpeed: rand(0.5, 1.3),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      vr: rand(-1.0, 1.0),
      flip: rand(0, Math.PI * 2),
      flipSpeed: rand(0.7, 1.7),
      alpha: rand(0.32, 0.72),
      color: color,
      edge: shade(color, 0.78)
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = Math.min(MAX_PETALS, Math.max(10, Math.round(width / 64)));
    while (petals.length < target) petals.push(makePetal(true));
    if (petals.length > target) petals.length = target;
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    // 翻面效果：横向压缩，模拟花瓣在空中打转（保底 0.45，避免变成细条）
    ctx.scale(0.45 + 0.55 * Math.abs(Math.cos(p.flip)), 1);
    ctx.globalAlpha = p.alpha;

    ctx.beginPath();
    ctx.moveTo(0, -p.h * 0.5);
    ctx.bezierCurveTo(p.w * 0.78, -p.h * 0.34, p.w * 0.66, p.h * 0.3, p.w * 0.12, p.h * 0.5);
    ctx.bezierCurveTo(-p.w * 0.1, p.h * 0.58, -p.w * 0.62, p.h * 0.18, -p.w * 0.56, -p.h * 0.24);
    ctx.bezierCurveTo(-p.w * 0.4, -p.h * 0.58, -p.w * 0.18, -p.h * 0.54, 0, -p.h * 0.5);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.strokeStyle = p.edge;
    ctx.lineWidth = 0.9;
    ctx.stroke();

    // 内侧高光，避免看起来像一枚色块
    ctx.globalAlpha = p.alpha * 0.5;
    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.beginPath();
    ctx.ellipse(p.w * 0.05, -p.h * 0.1, p.w * 0.2, p.h * 0.22, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function step(now) {
    if (!running) return;
    if (!last) last = now;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.clearRect(0, 0, width, height);

    var wind = Math.sin(now * 0.00022) * 15;

    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.phase += p.swaySpeed * dt;
      p.flip += p.flipSpeed * dt;
      p.x += (Math.cos(p.phase) * p.sway + wind) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;

      if (p.y - p.h > height + 30 || p.x < -140 || p.x > width + 140) {
        petals[i] = makePetal(false);
      }
      drawPetal(petals[i]);
    }

    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) {
      last = 0;
      requestAnimationFrame(step);
    }
  });

  requestAnimationFrame(step);
})();
