const I18N = {
  es: {
    login: "Iniciar sesión",
    tab_dashboard: "Dashboard",
    tab_zones: "Zonas",
    tab_logs: "Registros",
    tab_config: "Configuración",
    card_flow: "Flujo",
    card_voltage: "Voltaje",
    card_humidity: "Humedad suelo",
    card_status: "Estado",
    chart_flow: "Histórico de flujo",
    chart_humidity: "Histórico de humedad",
    zones_title: "Control de zonas",
    zone_state: "Estado:",
    logs_title: "Registros",
    config_title: "Configuración",
    config_hum: "Umbrales de humedad",
    btn_on: "Encender",
    btn_off: "Apagar",
    btn_save: "Guardar",
    login_title: "Iniciar sesión",
    login_user: "Usuario",
    login_pass: "Contraseña",
    btn_cancel: "Cancelar",
    btn_login: "Entrar"
  },
  en: {
    login: "Log in",
    tab_dashboard: "Dashboard",
    tab_zones: "Zones",
    tab_logs: "Logs",
    tab_config: "Settings",
    card_flow: "Flow",
    card_voltage: "Voltage",
    card_humidity: "Soil humidity",
    card_status: "Status",
    chart_flow: "Flow history",
    chart_humidity: "Humidity history",
    zones_title: "Zone control",
    zone_state: "State:",
    logs_title: "Logs",
    config_title: "Settings",
    config_hum: "Humidity thresholds",
    btn_on: "On",
    btn_off: "Off",
    btn_save: "Save",
    login_title: "Log in",
    login_user: "User",
    login_pass: "Password",
    btn_cancel: "Cancel",
    btn_login: "Login"
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.es;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}
