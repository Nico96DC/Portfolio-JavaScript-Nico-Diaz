export function relojDinamico() {
    const ahora = new Date();
    let horas = String(ahora.getHours()).padStart(2, '0');
    let minutos = String(ahora.getMinutes()).padStart(2, '0');
    let segundos = String(ahora.getSeconds()).padStart(2, '0');

    const tiempo = document.getElementById("reloj");
    tiempo.textContent = `${String(horas).padStart(2,'0')}:${minutos}:${segundos}`;

    // asignar clase según hora
    tiempo.classList.remove('mañana','tarde','noche');
    if (horas >= 6 && horas < 12) tiempo.classList.add('mañana');      // 06:00-11:59
    else if (horas >= 12 && horas < 18) tiempo.classList.add('tarde'); // 12:00-17:59
    else tiempo.classList.add('noche');                           // 18:00-05:59
}