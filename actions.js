const video = document.getElementById("video");
const line = document.getElementById("measure-line");
const result = document.getElementById("result");
const message = document.getElementById("message");

let isDragging = false;
let startX = 0;

// Escala fija (px = 1 cm)
const SCALE = 37;

// Cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(() => alert("ombe prende la camara y muestra el chimbo"));

// Inicia medición
line.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
});

// Mide
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const widthPx = e.clientX - startX;
    if (widthPx <= 0) return;

    line.style.width = widthPx + "px";

    const cm = (widthPx / SCALE).toFixed(2);
    result.textContent = cm;

    if (cm < 10) {
        message.textContent = "😬 chimbo corto";
    } else if (cm < 13) {
        message.textContent = "😅 casi el promedio";
    } else if (cm < 16) {
        message.textContent = "😎 ya paga arriendo";
    } else if (cm <= 19) {
        message.textContent = "🔥 a vaina tutaina";
    } else {
        message.textContent = "💀 el propio tun tun tun vergun";
    }
});

// Termina medición
document.addEventListener("mouseup", () => {
    isDragging = false;
});