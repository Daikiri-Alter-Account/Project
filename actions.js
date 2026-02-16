const video = document.getElementById("video");
const line = document.getElementById("measure-line");
const result = document.getElementById("result");
const scaleInput = document.getElementById("scale");
const message = document.getElementById("message");

let isDragging = false;
let startX = 0;

// Activar cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("ombe activa la camara y pela el chimbo");
        console.error(err);
    });

// Iniciar medición
line.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const widthPx = e.clientX - startX;
    if (widthPx > 0) {
        line.style.width = widthPx + "px";

        const cm = (widthPx / scaleInput.value).toFixed(2);
        result.textContent = cm;

        let texto = "";

        if (cm < 10) {
            texto = "😬 chimbo corto";
        } else if (cm < 13) {
            texto = "😅 casi el promedio";
        } else if (cm < 16) {
            texto = "😎 ya paga arriendo";
        } else if (cm <= 19) {
            texto = "🔥 a vaina tutaina";
        } else {
            texto = "💀 nojoda cole";
        }

        message.textContent = texto;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});