/* ═══════════════════════════════════════
   Windows Learning Hub — Dropdown & Hamburger
   ═══════════════════════════════════════ */
(function () {
  "use strict";

  var allDropdowns = document.querySelectorAll(".has-dropdown");

  function closeAll() {
    for (var i = 0; i < allDropdowns.length; i++)
      allDropdowns[i].classList.remove("open");
  }

  for (var d = 0; d < allDropdowns.length; d++) {
    (function (dd) {
      var trigger = dd.querySelector(".nav-link");
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = dd.classList.contains("open");
        closeAll();
        if (!wasOpen) dd.classList.add("open");
      });
    })(allDropdowns[d]);
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) closeAll();
  });

  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("show");
      closeAll();
    });
  }
})();
