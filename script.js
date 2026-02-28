/* ═══════════════════════════════════════════════
   Windows Learning Hub — Enhanced Interactions
   ═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ── Dropdown Toggle ── */
  var dropdowns = document.querySelectorAll(".has-dropdown");

  function closeAllDropdowns(except) {
    dropdowns.forEach(function (dd) {
      if (dd !== except) dd.classList.remove("open");
    });
  }

  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector(".nav-link");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var wasOpen = dd.classList.contains("open");
      closeAllDropdowns();
      if (!wasOpen) dd.classList.add("open");
    });

    /* touch support */
    trigger.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var wasOpen = dd.classList.contains("open");
      closeAllDropdowns();
      if (!wasOpen) dd.classList.add("open");
    });
  });

  /* close on outside click */
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) closeAllDropdowns();
  });

  /* close on Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ── Hamburger Menu ── */
  var hamburger = document.getElementById("hamburger");
  var navMenu   = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("show");
      closeAllDropdowns();
    });

    /* close mobile menu when clicking a non-dropdown link */
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      if (!link.closest(".has-dropdown")) {
        link.addEventListener("click", function () {
          hamburger.classList.remove("active");
          navMenu.classList.remove("show");
        });
      }
    });
  }
});
