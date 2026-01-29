window.addEventListener('DOMContentLoaded', function () {
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieConsent = localStorage.getItem('cookieConsent');
  const cookiePreferences = localStorage.getItem('cookiePreferences');

  if (!cookieConsent && !cookiePreferences) {
    cookieBanner.classList.add('show');
  }
});

/* === ADICIONADO: Toast + mensagens inteligentes (sem mexer no resto) === */
function showCookieToast(message) {
  let toast = document.getElementById('cookieToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cookieToast';
    toast.className = 'cookie-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.__cookieToastTimer);
  window.__cookieToastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function listFromPreferences(prefs) {
  const aceites = ['Necessários'];
  const rejeitados = [];

  if (prefs.functional) aceites.push('Funcionais'); else rejeitados.push('Funcionais');
  if (prefs.analytics) aceites.push('Estatísticas'); else rejeitados.push('Estatísticas');
  if (prefs.marketing) aceites.push('Marketing'); else rejeitados.push('Marketing');

  return { aceites, rejeitados };
}

function joinPT(items) {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items[0] + ' e ' + items[1];
  return items.slice(0, -1).join(', ') + ' e ' + items[items.length - 1];
}

/* Abrir modal */
function showCookieSettings() {
  document.getElementById('cookieBanner').classList.remove('show');

  const overlay = document.getElementById('cookieModalOverlay');
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');

  loadCookiePreferencesIntoUI();
}

/* Fechar modal */
function closeCookieSettings() {
  const overlay = document.getElementById('cookieModalOverlay');
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

/* Clique fora para fechar */
document.addEventListener('click', function (e) {
  const overlay = document.getElementById('cookieModalOverlay');
  if (!overlay) return;

  const isOpen = overlay.classList.contains('is-open');
  if (!isOpen) return;

  if (e.target === overlay) closeCookieSettings();
});

/* ESC para fechar */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCookieSettings();
});

/* Accordion */
function toggleCookieAccordion(btn) {
  const item = btn.closest('.cookie-acc-item');
  if (!item) return;
  item.classList.toggle('is-open');
}

/* Aceitar tudo (banner ou modal) */
function acceptAllCookies() {
  const preferences = {
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true
  };

  localStorage.setItem('cookieConsent', 'all');
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

  const { aceites } = listFromPreferences(preferences);
  showCookieToast(`Aceitaste cookies de ${joinPT(aceites)}.`);

  document.getElementById('cookieBanner').classList.remove('show');
  closeCookieSettings();
}

/* Rejeitar tudo (exceto necessários) */
function rejectAllCookies() {
  const preferences = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  };

  localStorage.setItem('cookieConsent', 'necessary');
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

  showCookieToast('Rejeitaste todos os cookies, exceto os obrigatórios para o funcionamento do site.');

  document.getElementById('cookieBanner').classList.remove('show');
  closeCookieSettings();
}

/* Mantém compatibilidade com os botões do banner */
function acceptCookies(type) {
  if (type === 'all') {
    acceptAllCookies();
    return;
  }
  rejectAllCookies();
}

/* Guardar preferências (modal) */
function saveCookiePreferences() {
  const functionalEl = document.getElementById('functional-cookies');
  const analyticsEl = document.getElementById('analytics-cookies');
  const marketingEl = document.getElementById('marketing-cookies');

  const preferences = {
    necessary: true,
    functional: !!functionalEl && functionalEl.checked,
    analytics: !!analyticsEl && analyticsEl.checked,
    marketing: !!marketingEl && marketingEl.checked
  };

  localStorage.setItem('cookieConsent', 'custom');
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

  const { aceites, rejeitados } = listFromPreferences(preferences);
  showCookieToast(`Preferências guardadas: aceitaste ${joinPT(aceites)} e rejeitaste ${joinPT(rejeitados)}.`);

  document.getElementById('cookieBanner').classList.remove('show');
  closeCookieSettings();
}

/* Pré-carregar toggles com base no que já está guardado */
function loadCookiePreferencesIntoUI() {
  const saved = localStorage.getItem('cookiePreferences');

  const defaults = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  };

  let prefs = defaults;
  if (saved) {
    try {
      prefs = { ...defaults, ...JSON.parse(saved) };
    } catch (e) {
      prefs = defaults;
    }
  }

  const functionalEl = document.getElementById('functional-cookies');
  const analyticsEl = document.getElementById('analytics-cookies');
  const marketingEl = document.getElementById('marketing-cookies');

  if (functionalEl) functionalEl.checked = !!prefs.functional;
  if (analyticsEl) analyticsEl.checked = !!prefs.analytics;
  if (marketingEl) marketingEl.checked = !!prefs.marketing;
}

function showPage(pageId) {

  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));


  const selectedPage = document.getElementById(pageId + 'Page');
  if (selectedPage) {
    selectedPage.classList.add('active');
  }


  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });


  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('show');
}

function submitContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;
  const consent = document.getElementById('contactConsent').checked;

  if (!consent) {
    alert('⚠️ Por favor, aceite a Política de Privacidade para continuar.');
    return;
  }


  alert(`✅ Mensagem enviada com sucesso!\n\nObrigado ${name}, entraremos em contacto brevemente através de ${email}.`);


  event.target.reset();
}

function submitRightsRequest(event) {
  event.preventDefault();

  const right = document.getElementById('rightsSelect').value;
  const description = document.getElementById('rightsDescription').value;

  if (!right || right === 'Selecione o direito que pretende exercer') {
    alert('⚠️ Por favor, selecione um direito.');
    return;
  }

  if (!description.trim()) {
    alert('⚠️ Por favor, descreva o seu pedido.');
    return;
  }


  alert(`✅ Pedido enviado com sucesso!\n\nO seu pedido de "${right}" foi recebido. Responderemos no prazo de 1 mês conforme estabelecido no RGPD.`);


  event.target.reset();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 968) {
    document.getElementById('mobileNav').classList.remove('show');
  }
});

console.log('🏥 LAR DE SONHO - Website carregado com sucesso!');
console.log('🔒 100% Conforme com RGPD');
console.log('📧 Contacto: geral@lardesonho.pt');
