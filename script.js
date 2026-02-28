/* ═══════════════════════════════════════════
   Windows Learning Hub — Application Script
   ═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ────────── Video Data ────────── */
  var videos = {
    os: [
      { id: "os-nt4",       title: "Windows NT 4.0",    yt: "uDQDuafKOgI" },
      { id: "os-95",        title: "Windows 95",        yt: "JHrXTIm1YFw" },
      { id: "os-98",        title: "Windows 98",        yt: "siDgl6MTNKI" },
      { id: "os-2000",      title: "Windows 2000",      yt: "UbAzT1yCLjc" },
      { id: "os-me",        title: "Windows ME",        yt: "6Kyq_JU2f4g" },
      { id: "os-xp",        title: "Windows XP",        yt: "BztTI9rHuAc" },
      { id: "os-vista",     title: "Windows Vista",     yt: "aBEdTx6ew6E" },
      { id: "os-7",         title: "Windows 7",         yt: "8913gjcIVNc" },
      { id: "os-8",         title: "Windows 8",         yt: "N6_D3CWBfts" },
      { id: "os-10",        title: "Windows 10",        yt: "p--f-bxDucs" },
      { id: "os-11",        title: "Windows 11",        yt: "d_BcjVUAPOw" }
    ],
    server: [
      { id: "srv-nt4",      title: "Windows NT 4.0 (Server)",    yt: "YLT01gl9WfY" },
      { id: "srv-2000",     title: "Windows 2000 (Server)",      yt: "d1W1Enhe2wA" },
      { id: "srv-2003",     title: "Windows 2003 (Server)",      yt: "mX_moNvj9UM" },
      { id: "srv-2008r2",   title: "Windows 2008-R2 (Server)",   yt: "huJvZQK7RpQ" }
    ],
    activities: [
      { id: "act-prodkey",  title: "Windows 2008-R2 Server: Product Key & Adding Multiple Users", yt: "5HGGeLvgGyY" },
      { id: "act-40users",  title: "Windows 2008-R2 Server: Adding 40 Users",                    yt: "RAMG59gdPVs" },
      { id: "act-dhcp",     title: "Windows 2008-R2 Server: Adding DHCP Role",                   yt: "Un_w8flDsu0" },
      { id: "act-raid",     title: "Windows 2008-R2 Server: RAID",                               yt: "c9CgWgI8R7U" },
      { id: "act-file",     title: "Windows 2008-R2 Server: File Services",                      yt: "1CjRuPO5uAU" },
      { id: "act-web",      title: "Windows 2008-R2 Server: Application and Web Server",         yt: "0ykl69OdIOM" },
      { id: "act-gpo",      title: "Windows 2008-R2 Server: Group Policy",                       yt: "dI5Tn5_Il00" }
    ]
  };

  /* ────────── Content Helpers ────────── */
  function getDescription(cat, title) {
    if (cat === "activities")
      return "This hands-on activity walks you through " + title +
             ". It focuses on practical server configuration tasks you can replicate in a virtual lab environment. " +
             "Follow each step demonstrated in the video, apply the settings on your own machine, and document your results for submission.";
    if (cat === "server")
      return "This lesson covers the complete installation process and initial configuration of " + title +
             ". Learn about hardware requirements, partition setup, networking configuration, " +
             "role installation, and post-setup best practices for enterprise server environments.";
    return "This video provides a comprehensive walkthrough of " + title +
           " — including the installation process from boot media, first-run setup, desktop interface tour, and key features. " +
           "A great resource for understanding the evolution of Microsoft's desktop operating systems.";
  }

  function getSteps(cat) {
    if (cat === "activities") return [
      "Launch your Windows Server 2008-R2 virtual machine or lab setup.",
      "Follow each configuration step shown in the video carefully.",
      "Pause and replicate each action on your own server instance.",
      "Verify the service or feature is working correctly after configuration.",
      "Take screenshots and document your process for activity submission."
    ];
    if (cat === "server") return [
      "Review minimum hardware and software requirements before starting.",
      "Prepare installation media (ISO or physical disc) and boot from it.",
      "Complete the installation wizard as demonstrated in the video.",
      "Configure essential settings: hostname, network, administrator accounts.",
      "Install required server roles and run post-installation validation."
    ];
    return [
      "Watch the full installation or setup walkthrough from start to finish.",
      "Take note of the boot sequence, partitioning, and setup options.",
      "Observe the desktop interface and explore key features highlighted.",
      "Compare this version's features with newer or older Windows releases.",
      "Optionally recreate the installation in a virtual machine for practice."
    ];
  }

  /* ────────── Lookup ────────── */
  var videoIndex = {};
  ["os", "server", "activities"].forEach(function (cat) {
    videos[cat].forEach(function (v) {
      videoIndex[v.id] = { video: v, category: cat };
    });
  });

  /* ────────── Rendering ────────── */

  // Thumbnail card for listing pages
  function renderCard(v) {
    return '<div class="grid-card" data-video="' + v.id + '">' +
      '<div class="thumb">' +
        '<img src="https://img.youtube.com/vi/' + v.yt + '/hqdefault.jpg" alt="' + v.title + '" loading="lazy">' +
        '<div class="play-icon"></div>' +
      '</div>' +
      '<div class="info"><h3>' + v.title + '</h3>' +
        '<p>Click to view details and watch</p>' +
      '</div></div>';
  }

  // Listing pages
  function renderListingPage(gridId, items) {
    var grid = document.getElementById(gridId);
    var html = "";
    for (var i = 0; i < items.length; i++) html += renderCard(items[i]);
    grid.innerHTML = html;
  }

  // Detail page (single video)
  function renderDetail(videoId) {
    var entry = videoIndex[videoId];
    if (!entry) return;
    var v = entry.video;
    var cat = entry.category;
    var parentPage = cat === "os" ? "windows-os" : cat === "server" ? "windows-server" : "activities";
    var parentLabel = cat === "os" ? "Windows OS" : cat === "server" ? "Windows Server" : "Activities";
    var stepsHtml = "";
    var s = getSteps(cat);
    for (var j = 0; j < s.length; j++) stepsHtml += "<li>" + s[j] + "</li>";

    var page = document.getElementById("page-detail");
    page.innerHTML =
      '<div class="container detail-page">' +
        '<div class="back-row">' +
          '<a class="btn btn-back" data-page="' + parentPage + '">← Back to ' + parentLabel + '</a>' +
        '</div>' +
        '<div class="detail-layout">' +
          '<div class="detail-video">' +
            '<iframe src="https://www.youtube.com/embed/' + v.yt + '?rel=0" title="' + v.title + '" ' +
            'allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen></iframe>' +
          '</div>' +
          '<div class="detail-body">' +
            '<h2>' + v.title + '</h2>' +
            '<p class="desc">' + getDescription(cat, v.title) + '</p>' +
            '<p class="steps-label">Step-by-Step Guide</p>' +
            '<ol>' + stepsHtml + '</ol>' +
            '<div class="actions">' +
              '<a class="btn btn-yt" href="https://youtu.be/' + v.yt + '" target="_blank" rel="noopener noreferrer">▶ Watch on YouTube</a>' +
              '<a class="btn btn-secondary" data-page="' + parentPage + '">Browse More</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Wire up navigation buttons inside detail page
    var btns = page.querySelectorAll("[data-page]");
    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener("click", function (e) {
        e.preventDefault();
        navigate(this.getAttribute("data-page"));
      });
    }
  }

  /* ────────── SPA Navigation ────────── */
  function navigate(target) {
    // If it's a video id, show detail
    if (videoIndex[target]) {
      renderDetail(target);
      showPage("detail");
      updateNav(null);
      return;
    }
    showPage(target);
    updateNav(target);
  }

  function showPage(name) {
    var pages = document.querySelectorAll(".page");
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove("visible");
    var el = document.getElementById("page-" + name);
    if (el) el.classList.add("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // close mobile menu
    document.getElementById("navMenu").classList.remove("show");
    document.getElementById("hamburger").classList.remove("active");
    closeDropdowns();
  }

  function updateNav(page) {
    var links = document.querySelectorAll(".nav-link[data-page]");
    for (var i = 0; i < links.length; i++) links[i].classList.remove("active");
    if (page) {
      var active = document.querySelector('.nav-link[data-page="' + page + '"]');
      if (active) active.classList.add("active");
    }
  }

  /* ────────── Dropdown Logic ────────── */
  var allDropdowns = document.querySelectorAll(".has-dropdown");

  function closeDropdowns() {
    for (var i = 0; i < allDropdowns.length; i++) allDropdowns[i].classList.remove("open");
  }

  for (var d = 0; d < allDropdowns.length; d++) {
    (function (dd) {
      var trigger = dd.querySelector(".nav-link");
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var wasOpen = dd.classList.contains("open");
        closeDropdowns();
        if (!wasOpen) {
          dd.classList.add("open");
        } else {
          navigate(trigger.getAttribute("data-page"));
        }
      });
    })(allDropdowns[d]);
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) closeDropdowns();
  });

  /* ────────── Wire up all [data-page] and [data-video] clicks ────────── */
  function wireNavigation() {
    // Nav links and other data-page elements
    var pageLinks = document.querySelectorAll("[data-page]");
    for (var p = 0; p < pageLinks.length; p++) {
      pageLinks[p].addEventListener("click", function (e) {
        e.preventDefault();
        navigate(this.getAttribute("data-page"));
      });
    }

    // Video card clicks
    var cards = document.querySelectorAll("[data-video]");
    for (var c = 0; c < cards.length; c++) {
      cards[c].addEventListener("click", function () {
        navigate(this.getAttribute("data-video"));
      });
    }

    // Dropdown video items
    var ddItems = document.querySelectorAll(".dropdown-panel [data-video]");
    for (var i = 0; i < ddItems.length; i++) {
      ddItems[i].addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        navigate(this.getAttribute("data-video"));
      });
    }
  }

  /* ────────── Hamburger ────────── */
  document.getElementById("hamburger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("navMenu").classList.toggle("show");
    closeDropdowns();
  });

  /* ────────── Init ────────── */
  renderListingPage("grid-os", videos.os);
  renderListingPage("grid-server", videos.server);
  renderListingPage("grid-activities", videos.activities);
  wireNavigation();

})();
