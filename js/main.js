const technologies = [
  {
    name: "Cloudflare",
    file: "selfhst--cloudflare.svg",
    featured: false
  },
  {
    name: "Docker",
    file: "selfhst--docker.svg",
    featured: true
  },
  {
    name: "ESPHome",
    file: "selfhst--esphome.svg",
    featured: false
  },
  {
    name: "GitLab",
    file: "selfhst--gitlab.svg",
    featured: true
  },
  {
    name: "Grafana",
    file: "selfhst--grafana.svg",
    featured: true
  },
  {
    name: "Home Assistant",
    file: "selfhst--home-assistant.svg",
    featured: false
  },
  {
    name: "Jellyfin",
    file: "selfhst--jellyfin.svg",
    featured: false
  },
  {
    name: "Matrix",
    file: "selfhst--matrix-light.svg",
    featured: false
  },
  {
    name: "PostgreSQL",
    file: "selfhst--postgresql.svg",
    featured: true
  },
  {
    name: "Prometheus",
    file: "selfhst--prometheus.svg",
    featured: true
  },
  {
    name: "Proxmox",
    file: "selfhst--proxmox.svg",
    featured: true
  },
  {
    name: "Traefik",
    file: "selfhst--traefik.svg",
    featured: true
  },
  {
    name: "Vaultwarden",
    file: "selfhst--vaultwarden-light.svg",
    featured: false
  },
  {
    name: "VictoriaMetrics",
    file: "selfhst--victoriametrics-light.svg",
    featured: false
  }
];

const iconBasePath = "assets/icons/";

function createIconImage(technology) {
  const image = document.createElement("img");

  image.src = `${iconBasePath}${technology.file}`;
  image.alt = technology.name;
  image.loading = "lazy";
  image.decoding = "async";

  return image;
}

function renderTechnologyIcons() {
  const container = document.querySelector("#technology-icons");

  if (!container) {
    return;
  }

  technologies
    .filter((technology) => technology.featured)
    .forEach((technology) => {
      const item = document.createElement("span");
      const image = createIconImage(technology);

      item.className = "technology-item";
      item.dataset.label = technology.name;
      item.tabIndex = 0;
      item.setAttribute("role", "img");
      item.setAttribute("aria-label", technology.name);

      image.alt = "";
      image.addEventListener("error", () => item.remove());

      item.appendChild(image);
      container.appendChild(item);
    });
}

function createFloatingIcon(technology, index) {
  const wrapper = document.createElement("span");
  const image = createIconImage(technology);

  const columns = 5;
  const row = Math.floor(index / columns);
  const column = index % columns;

  const xBase = 5 + column * 22;
  const yBase = 7 + row * 31;

  const x = Math.min(92, xBase + Math.random() * 7);
  const y = Math.min(88, yBase + Math.random() * 12);

  const size = 42 + Math.round(Math.random() * 28);
  const opacity = (0.12 + Math.random() * 0.11).toFixed(2);
  const duration = 14 + Math.round(Math.random() * 12);
  const delay = -Math.round(Math.random() * duration);
  const driftX = Math.round(-35 + Math.random() * 70);
  const driftY = Math.round(-45 + Math.random() * 25);
  const rotationStart = Math.round(-7 + Math.random() * 14);
  const rotationEnd = Math.round(-6 + Math.random() * 12);

  wrapper.className = "floating-icon";
  wrapper.style.left = `${x}%`;
  wrapper.style.top = `${y}%`;
  wrapper.style.setProperty("--size", `${size}px`);
  wrapper.style.setProperty("--opacity", opacity);
  wrapper.style.setProperty("--duration", `${duration}s`);
  wrapper.style.setProperty("--delay", `${delay}s`);
  wrapper.style.setProperty("--drift-x", `${driftX}px`);
  wrapper.style.setProperty("--drift-y", `${driftY}px`);
  wrapper.style.setProperty("--rotation-start", `${rotationStart}deg`);
  wrapper.style.setProperty("--rotation-end", `${rotationEnd}deg`);

  image.alt = "";
  image.addEventListener("error", () => wrapper.remove());

  wrapper.appendChild(image);

  return wrapper;
}

function renderFloatingIcons() {
  const container = document.querySelector("#floating-icons");

  if (!container) {
    return;
  }

  technologies.forEach((technology, index) => {
    container.appendChild(createFloatingIcon(technology, index));
  });
}

function setCurrentYear() {
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

renderTechnologyIcons();
renderFloatingIcons();
setCurrentYear();
