export function relojDinamico() {
    const actualizarReloj = () => {
        const ahora = new Date();
        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();
        let segundos = ahora.getSeconds();
        const ampm = horas >= 12 ? 'PM' : 'AM';

        horas = horas % 12;
        horas = horas ? horas : 12;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;

        const tiempoFormateado = `${horas}:${minutos}:${segundos} ${ampm}`;
        console.log(tiempoFormateado);
    };

actualizarReloj();
setInterval(actualizarReloj, 1000);
}