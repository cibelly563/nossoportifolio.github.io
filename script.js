document.addEventListener("DOMContentLoaded", () => {
    // Alerta de boas-vindas
    alert("Seja bem-vindo ao nosso portfólio!");

    // Abrir redes sociais em nova aba
    const botoesRedes = document.querySelectorAll("button[data-link]");
    botoesRedes.forEach(botao => {
        botao.addEventListener("click", () => {
            const link = botao.getAttribute("data-link");
            window.open(link, "_blank");
        });
    });
});