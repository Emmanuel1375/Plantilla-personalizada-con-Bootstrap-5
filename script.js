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
