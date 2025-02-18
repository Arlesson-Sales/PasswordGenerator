const interface = {
    out: document.querySelector("#password-out"),
    copy_buttons: document.querySelectorAll(".copy-button"),
    length_input: document.querySelector("#password-length"),

    //Configurações da senha gerada.
    password_config: {
        labels: document.querySelectorAll("input[type='checkbox']"),
        "uppercase-checkbox": true,
        "numbers-checkbox": true,
        "symbols-checkbox": true
    }
}

function calculeSecurity(length)
{
    let percent_limit = 40;
    if (interface.password_config["uppercase-checkbox"]) percent_limit += 20;
    if (interface.password_config["symbols-checkbox"]) percent_limit += 20;
    if (interface.password_config["numbers-checkbox"]) percent_limit += 20;

    const security = Math.round(length / 35 * percent_limit);
    const bar = document.querySelector("#bar");
    
    bar.style.backgroundColor = security <= 10 ? "var(--unsafe-color)" : "var(--safe-color)";
    bar.style.width = `${security}%`;
}

function validPassWord(password)
{
    if (interface.password_config["uppercase-checkbox"] && !password.match("[A-Z]"))
        return false;
    if (interface.password_config["symbols-checkbox"] && !password.match("[!@#$%&*()[]]"))
        return false;
    if (interface.password_config["numbers-checkbox"] && !password.match("[0-9]"))
        return false;
    return true;
}

function generatorPassword(length)
{
    let chars = "abcdefghijklmnopqrstuvxwyz";
    let password = "";

    if (interface.password_config["uppercase-checkbox"]) chars += "ABCDEFGHIJKLMNOPQRSTUVXWYZ";
    if (interface.password_config["symbols-checkbox"]) chars += "!@#$%&*()[]";
    if (interface.password_config["numbers-checkbox"]) chars += "1234567890";
    
    for (let index = 0; index < length; index++)
    {
        let random_value = Math.floor(Math.random() * chars.length);
        password += chars.substring(random_value, random_value + 1);
    }
    return validPassWord(password) ? password : generatorPassword(length);
}

//Funções para eventos.
function generateAndShowPassword()
{
    let password_length = interface.length_input.value;
    document.querySelector("#password-controls-container").children[0].innerHTML = `Tamanho <span>${password_length}</span>`;
    interface.out.value = generatorPassword(password_length);
    calculeSecurity(password_length);
}

function checkmarkToggle(check_name, index)
{
    const checkmark = document.querySelector(".checkbox-controls-container").children[index].firstElementChild;
    interface.password_config[`${check_name}`] = !interface.password_config[`${check_name}`];
    checkmark.classList.toggle("checkbox-mark-checked");
    generateAndShowPassword();
}

//Aplicação de eventos.
window.addEventListener("load", generateAndShowPassword);
//Evento - Gerar uma nova senha a cada interação do usuario com o ranger.
interface.length_input.addEventListener("input", generateAndShowPassword);
//Evento - Copiar a senha gerada para a area de transferencia.
interface.copy_buttons.forEach(button => button.addEventListener("click", () => window.navigator.clipboard.writeText(interface.out.value)));
//Evento - Definir os caracteres que terá na senha gerada.
interface.password_config.labels.forEach((label, index) => label.addEventListener("click", (event) => checkmarkToggle(event.target.id, index)));
//Eventos - Botão de gerar nova senha.
document.querySelector("#new-button").addEventListener("click", generateAndShowPassword);