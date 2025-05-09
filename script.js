
document.addEventListener("DOMContentLoaded", async () => {

    // ABRIR AS REDE SOCIAL EM NOVA ABA
    const botoesRedes = document.querySelectorAll("button[data-link]");
    botoesRedes.forEach(botao => {
        botao.addEventListener("click", () => {
            const link = botao.getAttribute("data-link");
            window.open(link, "_blank");
        });
    });

    // CRIPTOGRAFIA SENHA  Fonte:https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API

    async function hashSenha(senha) {
        const encoder = new TextEncoder();
        const data = encoder.encode(senha);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    function registrarLog(acao) {
        const logs = JSON.parse(localStorage.getItem("logs") || "[]");
        const data = new Date().toLocaleString();
        logs.push(`[${data}] - ${acao}`);
        localStorage.setItem("logs", JSON.stringify(logs));
    }

    // CADASTRO   Fonte:https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const senha = document.getElementById("senha").value;
            const confirmar = document.getElementById("confirmarSenha").value;

            if (senha !== confirmar) {
                alert("As senhas não coincidem. Por favor, tente novamente.");
                return;
            }

            const senhaCriptografada = await hashSenha(senha);

            localStorage.setItem("usuario", nome);
            localStorage.setItem("senhaHash", senhaCriptografada);

            registrarLog("Usuário cadastrado com nome: " + nome);
            alert("Cadastro realizado com sucesso!");

            window.location.href = "mensagem.html";
        });
    }

    // LOGIN
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nome = document.getElementById("login-nome").value;
            const senha = document.getElementById("login-senha").value;

            const nomeSalvo = localStorage.getItem("usuario");
            const senhaHashSalva = localStorage.getItem("senhaHash");

            if (nome === nomeSalvo && await hashSenha(senha) === senhaHashSalva) {
                registrarLog("Login realizado pelo usuário: " + nome);
                alert("Login realizado com sucesso!");
                window.location.href = "mensagem.html";
            } else {
                alert("Usuário ou senha incorretos.");
            }
        });
    }

    //Menu Hamburgue  Fonte :https://youtu.be/gekJwNUaq0E?si=slad7U1ogm0aOKXE

    const btnMenuMobile = document.getElementById('btn-menu-mobile');
    const menuMobile = document.querySelector('.menu-mobile');

    btnMenuMobile.addEventListener('click', () => {
        menuMobile.style.display = menuMobile.style.display === 'block' ? 'none' : 'block';
    });
});

// Proteção contra XSS  Fonte:https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting
 
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
