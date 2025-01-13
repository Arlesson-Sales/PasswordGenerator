const interface = {
    length_input: document.querySelector("#password-length"),
    copy_button: document.querySelector("#copy-button"),
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
    const password = generatorPassword(event.target.value);
    interface.out.value = password;
});

interface.copy_button.addEventListener("click", () => {
    const password = interface.out.value;
    window.navigator.clipboard.writeText(password);
})