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
    return password;
}

//Funções para eventos.
function generateAndShowPassword()
{
    let password_length = interface.length_input.value;
    document.querySelector("#password-controls-container").children[0].innerHTML = `Tamanho <span>${password_length}</span>`;
    interface.out.value = generatorPassword(password_length);
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