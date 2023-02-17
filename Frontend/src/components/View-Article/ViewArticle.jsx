import '../../scss/utilities/_utilities.scss';
import { Link, useParams } from "react-router-dom";
import { detail } from "../../services/articles"
import { React, useState, useEffect } from 'react'

const ViewArticle = () => {
  const { category, id } = useParams();
  const [article, setarticle] = useState([])


  useEffect(() => {
    detail(category, id).then(setarticle)
  }, [id])

  let urlImage = `http://localhost:3000/article/images?imagen=${article.image}`

  let nickName;
  if (article.nickName && article.nickName != null) {
    nickName = <p className='parrafoJugador'><span className='spanParrafo'>Apodo(s):</span> {article.nickName}</p>
  }

  let born;
  if (article.born) {
    born = <p className='parrafoJugador'><span className='spanParrafo'>Nacimiento:</span> {article.born}</p>
  }

  let nationality;
  if (article.nationality) {
    nationality = <p className='parrafoJugador'><span className='spanParrafo'>Nacionalidad(es):</span> {article.nationality}</p>
  }

  let death;
  if (article.death && article.death != "0000-00-00") {
    death = <p className='parrafoJugador'><span className='spanParrafo'>Fallecimiento:</span> {article.death}</p>
  }

  let height;
  if (article.height) {
    height = <p className='parrafoJugador'><span className='spanParrafo'>Altura:</span> {article.height}</p>
  }

  let team;
  if (article.team) {
    team = <p className='parrafoJugador'><span className='spanParrafo'>Equipo actual:</span> {article.team}</p>
  }

  let weight;
  if (article.weight) {
    weight = <p className='parrafoJugador'><span className='spanParrafo'>Peso:</span> {article.weight} kg</p>
  }

  let debut;
  if (article.debut) {
    debut = <p className='parrafoJugador'><span className='spanParrafo'>Debut deportivo:</span> {article.debut}</p>
  }

  let position;
  if (article.position) {
    position = <p className='parrafoJugador'><span className='spanParrafo'>Posición(es):</span> {article.position}</p>
  }

  let numbers;
  if (article.numbers) {
    numbers = <p className='parrafoJugador'><span className='spanParrafo'>Dorsal(es):</span> {article.numbers}</p>
  }

  let goals;
  if (article.goals) {
    goals = <p className='parrafoJugador'><span className='spanParrafo'>Goles en clubes:</span> {article.goals}</p>
  }

  let retire;
  if (article.retire && article.retire != "0000-00-00") {
    retire = <p className='parrafoJugador'><span className='spanParrafo'>Retirada deportiva:</span> {article.retire}</p>
  }

  let foundation;
  if (article.foundation) {
    foundation = <p className='parrafoJugador'><span className='spanParrafo'>Fundación:</span> {article.foundation}</p>
  }

  let president;
  if (article.president) {
    president = <p className='parrafoJugador'><span className='spanParrafo'>Presidente:</span> {article.president}</p>
  }
  
  let coach;
  if (article.coach) {
    coach = <p className='parrafoJugador'><span className='spanParrafo'>Entrenador:</span> {article.coach}</p>
  }

  let stadium;
  if (article.stadium) {
    stadium = <p className='parrafoJugador'><span className='spanParrafo'>Estadio:</span> {article.stadium}</p>
  }

  let campus;
  if (article.campus) {
    campus = <p className='parrafoJugador'><span className='spanParrafo'>Sede:</span> {article.campus}</p>
  }

  let organizer;
  if (article.organizer) {
    organizer = <p className='parrafoJugador'><span className='spanParrafo'>Organizador:</span> {article.organizer}</p>
  }

  let champion;
  if (article.champion) {
    champion = <p className='parrafoJugador'><span className='spanParrafo'>último campeón:</span> {article.champion}</p>
  }

  let subchampion;
  if (article.subchampion) {
    subchampion = <p className='parrafoJugador'><span className='spanParrafo'>último subcampeón:</span> {article.subchampion}</p>
  }

  return (

    <div>

      <div className='containerView'>

        <div className="descripcionView">

          <div className='containerView-estilo'>

            <h3 className='containerView-titulo'>{article.title}</h3>

          </div>
          <p className='parrafoView'>{article.text}</p>

        </div>

        <div className='jugadorContainer'>

          <div className='imagen__jugadorFlex'>

            <img src={urlImage} alt="" className='peleIMG' />
          </div>

          <div className='datosPersonales'>
            <h4>Datos personales</h4>
          </div>

          <div className='parrafosPersonales'>
            <p className='parrafoJugador'><span className='spanParrafo'>Nombre completo:</span> {article.fullName}</p>
            {nickName}
            {born}
            {nationality}
            {death}
            {height}
            {team}
            {weight}
            {debut}
            {position}
            {numbers}
            {goals}
            {retire}
            {foundation}
            {president}
            {coach}
            {stadium}
            {campus}
            {organizer}
            {champion}
            {subchampion}
          </div>

        </div>


      </div>


    </div>



  )
}

export default ViewArticle