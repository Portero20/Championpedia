export default function getDate(fecha) {
    const [anio, mes, dia] = fecha.split("-");
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
}