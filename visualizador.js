
const cookies = [
    { name: "session_id", category: "necessario", purpose: "Manter sessão ativa", data: ["IP", "Browser"], expiry: "Sessão" },
    { name: "analytics_ua", category: "analitico", purpose: "Estatísticas de uso", data: ["Páginas visitadas", "Tempo no site"], expiry: "2 anos" },
    { name: "ads_pixel", category: "marketing", purpose: "Publicidade direcionada", data: ["Interesses", "Páginas visitadas"], expiry: "6 meses" },
    { name: "social_fb", category: "terceiros", purpose: "Integração Facebook", data: ["ID de utilizador", "Páginas visitadas"], expiry: "1 ano" },
];


function getUserData() {
    
    return {
        "IP": "192.168.1.100",
        "Browser": navigator.userAgent || "Desconhecido",
        "Sistema operativo": navigator.platform || "Desconhecido",
        "Localização aproximada": "Lisboa, Portugal", 
        "Data e hora de acesso": new Date().toLocaleString(),
        "Preferências do utilizador associadas a redes sociais": "Nenhuma"
    };
}


function renderCookies() {
    const container = document.getElementById("cookie-details");
    if (!container) return;

    container.innerHTML = "";

    const userData = getUserData();

    const analyticsActive = document.getElementById("analytics-toggle").checked;
    const marketingActive = document.getElementById("marketing-toggle").checked;
    const thirdpartyActive = document.getElementById("thirdparty-toggle").checked;

    cookies.forEach(cookie => {
        if (
            cookie.category === "necessario" ||
            (cookie.category === "analitico" && analyticsActive) ||
            (cookie.category === "marketing" && marketingActive) ||
            (cookie.category === "terceiros" && thirdpartyActive)
        ) {
            const card = document.createElement("div");
            card.className = "cookie-card";

            
            const dataList = cookie.data.map(d => {
                return `<li>${d}: ${userData[d] || "Nenhum"}</li>`;
            }).join("");

            card.innerHTML = `
                <span class="cookie-category ${cookie.category}">${cookie.category.charAt(0).toUpperCase() + cookie.category.slice(1)}</span>
                <h4>${cookie.name}</h4>
                <p><strong>Finalidade:</strong> ${cookie.purpose}</p>
                <p><strong>Dados recolhidos:</strong></p>
                <ul>${dataList}</ul>
                <p><strong>Expiração:</strong> ${cookie.expiry}</p>
            `;
            container.appendChild(card);
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analytics-toggle").addEventListener("change", renderCookies);
    document.getElementById("marketing-toggle").addEventListener("change", renderCookies);
    document.getElementById("thirdparty-toggle").addEventListener("change", renderCookies);

    renderCookies();
});
