const text = "Lives de Dom a Sex às 17H!";
const element = document.getElementById("typewriter");
let index = 0;
let isDeleting = false;

function type() {
    if (isDeleting) {
        element.textContent = text.substring(0, index--);
    } else {
        element.textContent = text.substring(0, index++);
    }

    let delay = isDeleting ? 100 : 200;

    if (!isDeleting && index === text.length + 1) {
        isDeleting = true;
        delay = 1000; // pausa antes de apagar
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        delay = 500; // pausa antes de começar a digitar novamente
    }

    setTimeout(type, delay);
}

type();
