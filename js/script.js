/* =========================================================
   Portfolio interactivity
   Handles: theme toggle, mobile nav, scroll reveal,
   back-to-top, skill bar animation, skill filtering
   ========================================================= */

(function () {
  "use strict";

  var THEME_KEY = "portfolio-theme";
  var root = document.documentElement;

  /* ---------- Theme toggle (dark / light) ---------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      var isLight = theme === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.textContent = isLight ? "☀️" : "\u{1F319}";
      toggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  function initTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = stored || (prefersLight ? "light" : "dark");
    applyTheme(theme);

    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(current);
        localStorage.setItem(THEME_KEY, current);
      });
    }
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top button ---------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 400);
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Animated skill proficiency bars ---------- */
  function initSkillBars() {
    var bars = document.querySelectorAll(".skill-bar-fill");
    if (!bars.length) return;

    if (!("IntersectionObserver" in window)) {
      bars.forEach(function (bar) {
        bar.style.width = bar.dataset.level + "%";
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.level + "%";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    bars.forEach(function (bar) { observer.observe(bar); });
  }

  /* ---------- Skill category filtering ---------- */
  function initSkillFilter() {
    var filterBar = document.querySelector(".filter-bar");
    var categories = document.querySelectorAll(".skill-category");
    if (!filterBar || !categories.length) return;

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      var target = btn.dataset.category;
      categories.forEach(function (cat) {
        var show = target === "all" || cat.dataset.category === target;
        cat.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileNav();
    initScrollReveal();
    initBackToTop();
    initSkillBars();
    initSkillFilter();
    initFooterYear();
  });
})();
