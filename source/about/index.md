---
title: 关于
date: 2026-06-04
layout: page
---

<style>
.about-resume-shell {
  width: 100%;
  margin: 0;
}

.about-resume-frame {
  display: block;
  width: 100%;
  max-width: 100% !important;
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  max-height: none !important;
  border: 0;
  border-radius: 0;
  background: #f5f5f7;
}

@media (max-width: 768px) {
  .article:has(.about-resume-shell) {
    width: 100%;
    padding: 0 10px;
  }

  .article:has(.about-resume-shell) .content {
    margin: 16px 0 32px;
  }

  .about-resume-frame {
    height: calc(100vh - 48px);
    min-height: calc(100vh - 48px);
    max-height: none !important;
    border-radius: 0;
  }
}
</style>

<div class="about-resume-shell">
  <iframe id="about-resume-frame" class="about-resume-frame" src="/AeonArjormon/resume/" title="关于" loading="eager" scrolling="auto" style="display:block;width:100%;max-width:none;height:calc(100vh - 50px);min-height:calc(100vh - 50px);max-height:none;border:0;border-radius:0;background:#f5f5f7;"></iframe>
</div>

<script>
(() => {
  const frame = document.getElementById("about-resume-frame");
  if (!frame) return;

  const shell = frame.closest(".about-resume-shell");
  const content = frame.closest(".content");
  const article = frame.closest(".article");
  const title = article?.querySelector(":scope > div:first-child");
  const info = article?.querySelector(":scope > .info");

  if (article) {
    article.style.width = "100vw";
    article.style.maxWidth = "100vw";
    article.style.margin = "50px 0 0";
    article.style.padding = "0";
  }
  if (content) {
    content.style.margin = "0";
    content.style.width = "100vw";
    content.style.maxWidth = "100vw";
  }
  if (shell) {
    shell.style.width = "100%";
    shell.style.margin = "0";
  }
  if (title) title.style.display = "none";
  if (info) info.style.display = "none";

  Object.assign(frame.style, {
    display: "block",
    width: "100%",
    maxWidth: "none",
    height: "calc(100vh - 50px)",
    minHeight: "calc(100vh - 50px)",
    maxHeight: "none",
    border: "0",
    borderRadius: "0",
    background: "#f5f5f7"
  });

  const fitViewport = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (article) article.style.margin = "48px 0 0";
      frame.style.height = "calc(100vh - 48px)";
      frame.style.minHeight = "calc(100vh - 48px)";
      frame.style.maxHeight = "none";
    } else {
      if (article) article.style.margin = "50px 0 0";
      frame.style.height = "calc(100vh - 50px)";
      frame.style.minHeight = "calc(100vh - 50px)";
      frame.style.maxHeight = "none";
    }
    frame.setAttribute("scrolling", "auto");
  };

  fitViewport();
  window.addEventListener("resize", fitViewport);
})();
</script>
