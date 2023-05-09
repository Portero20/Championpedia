import { getDate } from "../../containers/getDate"

export function ViewDetail({ article, selected }) {
    return (
        <>
            <div className="imagen__jugadorFlex">
                {article && <img src={article.image} />}
            </div>
            {selected === "futbolistas" && <p className="dataOf">Datos del jugador:</p>}
            {selected === "equipos" && <p className="dataOf">Datos del equipo:</p>}
            {selected === "copas" && <p className="dataOf">Datos del torneo:</p>}
            <div className="parrafosPersonales">
                <p className="parrafoJugador">
                    <span className="spanParrafo">Nombre completo:</span>{" "}
                    {article.fullName}
                </p>
                {article && article.nickName && article.nickName != null && article.nickName != undefined && article.nickName != "" && <p className='parrafoJugador'><span className='spanParrafo'>Apodo(s):</span> {article.nickName}</p>}
                {article && article.born && <p className='parrafoJugador'><span className='spanParrafo'>Nacimiento:</span> {getDate(article.born.split("T")[0])}</p>}
                {article && article.nationality && <p className='parrafoJugador'><span className='spanParrafo'>Nacionalidad(es):</span> {article.nationality}</p>}
                {article && article.height && <p className='parrafoJugador'><span className='spanParrafo'>Altura:</span> {article.height}</p>}
                {article && article.weight && <p className='parrafoJugador'><span className='spanParrafo'>Peso:</span> {article.weight} kg</p>}
                {article && article.debut && <p className='parrafoJugador'><span className='spanParrafo'>Debut deportivo:</span> {getDate(article.debut.split("T")[0])}</p>}
                {article && article.team && <p className='parrafoJugador'><span className='spanParrafo'>Equipo actual:</span> {article.team}</p>}
                {article && article.position && <p className='parrafoJugador'><span className='spanParrafo'>Posición(es):</span> {article.position}</p>}
                {article && article.numbers && <p className='parrafoJugador'><span className='spanParrafo'>Dorsal(es):</span> {article.numbers}</p>}
                {article && article.goals && <p className='parrafoJugador'><span className='spanParrafo'>Goles en clubes:</span> {article.goals}</p>}
                {article && article.retire && article.retire != "0000-00-00" && <p className='parrafoJugador'><span className='spanParrafo'>Retirada deportiva:</span> {getDate(article.retire.split("T")[0])}</p>}
                {article && article.death && article.death != "0000-00-00" && <p className='parrafoJugador'><span className='spanParrafo'>Fallecimiento:</span> {getDate(article.death.split("T")[0])}</p>}
                {article && article.foundation && <p className='parrafoJugador'><span className='spanParrafo'>Fundación:</span> {getDate(article.foundation.split("T")[0])}</p>}
                {article && article.president && <p className='parrafoJugador'><span className='spanParrafo'>Presidente:</span> {article.president}</p>}
                {article && article.coach && <p className='parrafoJugador'><span className='spanParrafo'>Entrenador:</span> {article.coach}</p>}
                {article && article.stadium && <p className='parrafoJugador'><span className='spanParrafo'>Estadio:</span> {article.stadium}</p>}
                {article && article.campus && <p className='parrafoJugador'><span className='spanParrafo'>Sede:</span> {article.campus}</p>}
                {article && article.organizer && <p className='parrafoJugador'><span className='spanParrafo'>Organizador:</span> {article.organizer}</p>}
                {article && article.champion && <p className='parrafoJugador'><span className='spanParrafo'>último campeón:</span> {article.champion}</p>}
                {article && article.subchampion && <p className='parrafoJugador'><span className='spanParrafo'>último subcampeón:</span> {article.subchampion}</p>}
            </div>
        </>
    )
}