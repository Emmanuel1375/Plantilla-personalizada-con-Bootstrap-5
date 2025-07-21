const toggleButton = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar-desktop");
const content = document.getElementById("main-content");
let collapsed = false;
let tooltipInstances = [];

function toggleTooltips(enable) {
  tooltipInstances.forEach((t) => t.dispose());
  tooltipInstances = [];

  if (enable) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      tooltipInstances.push(
        new bootstrap.Tooltip(el, {
          placement: "right",
        })
      );
      // Ocultar tooltip al hacer click en el enlace
      el.addEventListener("click", function hideTooltipOnClick() {
        const tip = bootstrap.Tooltip.getInstance(el);
        if (tip) tip.hide();
      });
    });
  }
}

toggleButton.addEventListener("click", () => {
  collapsed = !collapsed;
  sidebar.classList.toggle("collapsed", collapsed);
  content.classList.toggle("collapsed", collapsed);
  toggleButton.innerHTML = `<i class="bi bi-chevron-${
    collapsed ? "right" : "left"
  }"></i>`;
  toggleTooltips(collapsed);
});

// Activar tooltips solo si el sidebar está colapsado al cargar
if (sidebar.classList.contains("collapsed")) {
  toggleTooltips(true);
}

// Lógica para selector de tema (claro, oscuro, sistema)
document.addEventListener('DOMContentLoaded', function () {
  const themeRadios = document.querySelectorAll('input[name="appearance"]');
  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme === 'device' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme);
    localStorage.setItem('theme', theme);
  }
  // Leer preferencia guardada
  let savedTheme = localStorage.getItem('theme') || 'device';
  setTheme(savedTheme);
  themeRadios.forEach(radio => {
    radio.checked = radio.value === savedTheme;
    radio.addEventListener('change', function () {
      setTheme(this.value);
    });
  });
  // Escuchar cambios del sistema si está en modo "device"
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if ((localStorage.getItem('theme') || 'device') === 'device') {
        setTheme('device');
      }
    });
  }
});