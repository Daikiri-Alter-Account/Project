const video = document.getElementById("video");
const result = document.getElementById("result");
const message = document.getElementById("message");

const PALM_WIDTH_CM = 8.5; // promedio humano
let model;

// Cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream);

// Cargar modelo
async function loadModel() {
    model = await handpose.load();
    detectar();
}

async function detectar() {
    if (!model) return;

    const predictions = await model.estimateHands(video);

    if (predictions.length > 0) {
        const hand = predictions[0].landmarks;

        // Puntos palma
        const left = hand[5];
        const right = hand[17];

        const palmWidthPx = Math.abs(right[0] - left[0]);
        const pxPorCm = palmWidthPx / PALM_WIDTH_CM;

        // Objeto estimado (70% del ancho del video)
        const objectPx = video.videoWidth * 0.7;
        const cm = (objectPx / pxPorCm).toFixed(1);

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
    }

    requestAnimationFrame(detectar);
}

loadModel();