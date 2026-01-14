// Banner
window.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        cookieBanner.classList.add('show');
    }
});

function acceptCookies(type) {
    localStorage.setItem('cookieConsent', type);
    document.getElementById('cookieBanner').classList.remove('show');
    
    if (type === 'all') {
        alert('✅ Todos os cookies foram aceites!');
    } else {
        alert('✅ Apenas cookies necessários foram aceites!');
    }
}

function showCookieSettings() {
    document.getElementById('cookieBanner').classList.remove('show');
    showPage('cookies');
}

function saveCookiePreferences() {
    const functional = document.getElementById('functional-cookies').checked;
    const analytics = document.getElementById('analytics-cookies').checked;
    const marketing = document.getElementById('marketing-cookies').checked;
    
    const preferences = {
        necessary: true,
        functional: functional,
        analytics: analytics,
        marketing: marketing
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('✅ Preferências de cookies guardadas com sucesso!');
}

// nNAV
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

// Contacto EHEH
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

window.addEventListener('resize', function() {
    if (window.innerWidth > 968) {
        document.getElementById('mobileNav').classList.remove('show');
    }
});

// ===== LOGS =====
console.log('🏥 LAR DE SONHO - Website carregado com sucesso!');
console.log('🔒 100% Conforme com RGPD');
console.log('📧 Contacto: geral@lardesonho.pt');
