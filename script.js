const windowsOsVideos = [
  { title: "Windows NT 4.0", url: "https://youtu.be/uDQDuafKOgI" },
  { title: "Windows 95", url: "https://youtu.be/JHrXTIm1YFw" },
  { title: "Windows 98", url: "https://youtu.be/siDgl6MTNKI" },
  { title: "Windows 2000", url: "https://youtu.be/UbAzT1yCLjc" },
  { title: "Windows ME", url: "https://youtu.be/6Kyq_JU2f4g" },
  { title: "Windows XP", url: "https://youtu.be/BztTI9rHuAc" },
  { title: "Windows Vista", url: "https://youtu.be/aBEdTx6ew6E" },
  { title: "Windows 7", url: "https://youtu.be/8913gjcIVNc" },
  { title: "Windows 8", url: "https://youtu.be/N6_D3CWBfts" },
  { title: "Windows 10", url: "https://youtu.be/p--f-bxDucs" },
  { title: "Windows 11", url: "https://youtu.be/d_BcjVUAPOw" }
];

const windowsServerVideos = [
  { title: "Windows NT 4.0 (Server)", url: "https://youtu.be/YLT01gl9WfY" },
  { title: "Windows 2000 (Server)", url: "https://youtu.be/d1W1Enhe2wA" },
  { title: "Windows 2003 (Server)", url: "https://youtu.be/mX_moNvj9UM" },
  { title: "Windows 2008-R2 (Server)", url: "https://youtu.be/huJvZQK7RpQ" }
];

const activityVideos = [
  { title: "Windows 2008-R2 Server: Product Key & Adding Multiple Users", url: "https://youtu.be/5HGGeLvgGyY" },
  { title: "Windows 2008-R2 Server: Adding 40 Users", url: "https://youtu.be/RAMG59gdPVs" },
  { title: "Windows 2008-R2 Server: Adding DHCP Role", url: "https://youtu.be/Un_w8flDsu0" },
  { title: "Windows 2008-R2 Server: RAID", url: "https://youtu.be/c9CgWgI8R7U" },
  { title: "Windows 2008-R2 Server: File Services", url: "https://youtu.be/1CjRuPO5uAU" },
  { title: "Windows 2008-R2 Server: Application and Web Server", url: "https://youtu.be/0ykl69OdIOM" },
  { title: "Windows 2008-R2 Server: Group Policy", url: "https://youtu.be/dI5Tn5_Il00" }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getYouTubeId(url) {
  const short = url.match(/youtu\.be\/([\w-]+)/);
  if (short && short[1]) {
    return short[1];
  }

  const standard = url.match(/[?&]v=([\w-]+)/);
  return standard ? standard[1] : "";
}

function buildLearningContent(category, title) {
  if (category === "activities") {
    return {
      description: `This activity video demonstrates a guided hands-on task for ${title}. It focuses on practical server configuration actions you can repeat in a lab setup.`,
      steps: [
        "Prepare a Windows Server 2008-R2 practice machine or virtual lab.",
        "Follow the configuration process shown in the video step by step.",
        "Validate the service or feature after setup.",
        "Document your outputs (screenshots or notes) for activity submission."
      ]
    };
  }

  if (category === "server") {
    return {
      description: `This lesson covers installation flow and initial administration for ${title}. It highlights server-specific setup, roles, and best practices for first-time configuration.`,
      steps: [
        "Review installation prerequisites and system requirements.",
        "Install and configure the server edition as shown.",
        "Set core settings (network, accounts, and security baseline).",
        "Perform post-install checks to confirm stable server operation."
      ]
    };
  }

  return {
    description: `This video introduces ${title}, including its installation or interface walkthrough and key features. It helps learners understand the evolution of Microsoft desktop operating systems.`,
    steps: [
      "Watch the full walkthrough for this Windows version.",
      "Take note of installation or setup sequence shown.",
      "Identify key interface and system feature highlights.",
      "Compare this version with newer or older releases."
    ]
  };
}

function createVideoCard(video, category, sectionKey) {
  const videoId = getYouTubeId(video.url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const learning = buildLearningContent(category, video.title);
  const cardId = `${sectionKey}-${slugify(video.title)}`;

  const card = document.createElement("article");
  card.className = "video-card";
  card.id = cardId;

  card.innerHTML = `
    <div class="video-wrapper">
      <iframe
        src="${embedUrl}"
        title="${video.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    </div>
    <div class="card-content">
      <h3>${video.title}</h3>
      <p class="description">${learning.description}</p>
      <p class="steps-title">Steps</p>
      <ol class="steps">
        ${learning.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <a class="btn btn-link" href="${video.url}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    </div>
  `;

  return card;
}

function renderSection(containerId, videos, category, sectionKey) {
  const grid = document.getElementById(containerId);

  videos.forEach((video) => {
    const card = createVideoCard(video, category, sectionKey);
    grid.appendChild(card);
  });
}

function setupDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".drop-trigger");

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains("open");

      dropdowns.forEach((item) => item.classList.remove("open"));
      if (!isOpen) {
        dropdown.classList.add("open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInside = event.target.closest(".dropdown");
    if (!clickedInside) {
      dropdowns.forEach((item) => item.classList.remove("open"));
    }
  });

  document.querySelectorAll(".dropdown-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      dropdowns.forEach((item) => item.classList.remove("open"));
    });
  });
}

renderSection("windows-os-grid", windowsOsVideos, "os", "os");
renderSection("windows-server-grid", windowsServerVideos, "server", "server");
renderSection("activities-grid", activityVideos, "activities", "activities");
setupDropdowns();
