const video = document.getElementById("video");
const container = document.getElementById("camera-container");
const result = document.getElementById("result");
const message = document.getElementById("message");

const SCALE = 37; // px = 1 cm (aprox)

let points = [];

// Cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(() => alert("ombe activa la camara y pela el chimbo"));

// Click para marcar puntos
container.addEventListener("click", (e) => {
    if (points.length === 2) {
        points = [];
        document.querySelectorAll(".point").forEach(p => p.remove());
    }

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.push({ x, y });

    const dot = document.createElement("div");
    dot.className = "point";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    container.appendChild(dot);

    if (points.length === 2) {
        medir();
    }
});

function medir() {
    const [p1, p2] = points;

    const distanciaPx = Math.abs(p2.x - p1.x);
    const cm = (distanciaPx / SCALE).toFixed(2);

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