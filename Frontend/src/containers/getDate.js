export function getDate(fecha) {
    const [anio, mes, dia] = fecha.split("-");
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
}

export function getFullDate(fecha) {
    const fechaHora = new Date(fecha);
    const dia = fechaHora.getDate().toString().padStart(2, '0');
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaHora.getFullYear();
    const hora = fechaHora.getHours().toString().padStart(2, '0');
    const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    const fechaHoraFormateada = `${anio}/${mes}/${dia} ${hora}:${minutos}`;

    return fechaHoraFormateada
}