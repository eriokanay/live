const text = "Live de Dom a sex às 20h!";
const element = document.getElementById("typewriter");
let index = 0;
let isDeleting = false;

function typewriter() {
    if (!element) return;

    element.textContent = text.substring(0, index);
    let delay = isDeleting ? 100 : 200;

    if (isDeleting) {
        if (index > 0) {
            index -= 1;
        } else {
            isDeleting = false;
            delay = 500; // pausa antes de começar a digitar novamente
        }
    } else {
        if (index < text.length) {
            index += 1;
        } else {
            isDeleting = true;
            delay = 1000; // pausa antes de apagar
        }
    }

    setTimeout(typewriter, delay);
}

typewriter();
