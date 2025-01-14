const interface = {
    copy_buttons: document.querySelectorAll(".copy-button"),
    length_input: document.querySelector("#password-length"),
    out: document.querySelector("#password-out")
}

function generatorPassword(length)
{
    const chars = "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ1234567890!@#$%&*()[]";
    let password = "";
    
    for (let index = 0; index < length; index++)
    {
        let random_value = Math.floor(Math.random() * chars.length);
        password += chars.substring(random_value, random_value + 1);
    }
    return password;
}

//Aplicação de eventos.
interface.length_input.addEventListener("input", event => {
    interface.out.value = generatorPassword(event.target.value);
});

interface.copy_buttons.forEach(button => {
    button.addEventListener("click", () => window.navigator.clipboard.writeText(interface.out.value))
})