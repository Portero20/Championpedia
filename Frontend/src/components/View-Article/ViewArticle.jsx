import '../../scss/utilities/_utilities.scss';
import '../../scss/base/medias-detail.css'

import { React, useEffect, useMemo, useRef, useState } from 'react'
import { Buffer } from 'buffer';
import Cookies from 'universal-cookie'
import Button from 'react-bootstrap/Button';
import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import Modal from 'react-bootstrap/Modal';
import Tags from '../Tags/Tags';
import Team from '../Teams/Team';
import TextoHtml from '../TextoHtml';
import Trophies from '../Trophies/Trophies';
import { detail } from "../../services/articles"
import { view } from '../../services/articles';
import { editArticle } from '../../services/articles';
import { useParams } from "react-router-dom";

const ViewArticle = () => {
  const { category, id } = useParams();
  const [article, setarticle] = useState([])
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const editor = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    detail(category, id).then(setarticle)
  }, [id])

  useEffect(() => {
    detail(category, id)
      .then((response) => {
        const buffer = response.image;
        const base64 = Buffer.from(buffer).toString('base64');
        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;
        setImageBase64(base64String);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = new Cookies();
      if (!cookies.get("view", `article-${category}-${id}`)) {
        cookies.set("view", `article-${category}-${id}`)
        
        await view(category, id)
      }
    };
  
    fetchData();
  }, [id]);

  const [articleJodit, setArticleJodit] = useState({
    text: "Texto predeterminado"
  });

  const config = {

    readonly: false,
    height: 600,
    toolbarSticky: false,
    showPlaceholder: false,
    toolbarAdaptive: true,
    addNewLineOnDBLClick: false,
    enableDragAndDropFileToEditor: true,
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video, about",

  }

  useEffect(() => {
    detail(category, id).then(article => {
      setContent(article.text);
    });
  }, [category, id]);

  let input;

  if (category == "futbolistas") {

    input = <InputPlayer showValue={true} article={article} />

  } else if (category == "copas") {

    input = <Trophies showValue={true} article={article} />

  } else if (category == "equipos") {

    input = <Team showValue={true} article={article} />

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    let categoryArticle = category
    let idCategory = parseInt(id)

    if (category == "futbolistas") {
      try {
        let file = document.getElementById("file");
        let title = document.getElementById("title").value;
        let text = articleJodit.text;
        let fullName = document.getElementById("fullName").value;
        let nickName = document.getElementById("nickName").value;
        let born = document.getElementById("born").value;
        let death = document.getElementById("death").value;
        let height = document.getElementById("height").value;
        let weight = document.getElementById("weight").value;
        let nationality = document.getElementById("nationality").value;
        let position = document.getElementById("position").value;
        let team = document.getElementById("team").value;
        let numbers = document.getElementById("numbers").value;
        let goals = document.getElementById("goals").value;
        let debut = document.getElementById("debut").value;
        let retire = document.getElementById("retire").value;
        let tags = document.getElementById("tags").value;
        let category = categoryArticle
        let id = idCategory

        let msgErrors = document.querySelectorAll(".msg-error");

        let formData = new FormData();

        formData.append("file", file.files[0]);
        formData.append("title", title);
        formData.append("text", text);
        formData.append("fullName", fullName);
        formData.append("nickName", nickName);
        formData.append("category", category);
        formData.append("born", born);
        formData.append("death", death);
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append("nationality", nationality);
        formData.append("position", position);
        formData.append("team", team);
        formData.append("numbers", numbers);
        formData.append("goals", goals);
        formData.append("debut", debut);
        formData.append("retire", retire);
        formData.append("tags", tags);
        formData.append("id", id);

        let result = await editArticle(categoryArticle, formData)

        msgErrors.forEach((error) => {
          error.classList.remove("invalid");
        });

        const errorFields = {
          title: 0,
          fullName: 1,
          nickName: 2,
          nationality: 3,
          born: 4,
          death: 5,
          team: 6,
          numbers: 7,
          goals: 8,
          height: 9,
          weight: 10,
          position: 11,
          debut: 12,
          retire: 13,
          image: 14,
          text: 15,
          tags: 16,
        };

        if (Array.isArray(result)) {
          result.forEach((error) => {
            if (error.param in errorFields) {
              const index = errorFields[error.param];
              msgErrors[index].innerText = error.msg;
              msgErrors[index].classList.add("invalid");
            }
          });
        } else {
          window.location.href = `/articulo/${categoryArticle}/${idCategory}`
        }
      } catch (error) {
        console.log(error)
      }

    }
    if (category == "equipos") {
      try {
        let file = document.getElementById("file");
        let title = document.getElementById("title").value;
        let text = articleJodit.text;
        let fullName = document.getElementById("fullName").value;
        let nickName = document.getElementById("nickName").value;
        let foundation = document.getElementById("foundation").value;
        let president = document.getElementById("president").value;
        let stadium = document.getElementById("stadium").value;
        let coach = document.getElementById("coach").value
        let tags = document.getElementById("tags").value;
        let category = categoryArticle
        let id = idCategory

        let msgErrors = document.querySelectorAll(".msg-error");

        let formData = new FormData();

        formData.append("title", title);
        formData.append("text", text);
        formData.append("fullName", fullName);
        formData.append("nickName", nickName);
        formData.append("category", category);
        formData.append("file", file.files[0]);
        formData.append("foundation", foundation);
        formData.append("president", president);
        formData.append("stadium", stadium);
        formData.append("coach", coach);
        formData.append("tags", tags);
        formData.append("id", id);

        let result = await editArticle(categoryArticle, formData)

        msgErrors.forEach((error) => {
          error.classList.remove("invalid");
        });

        const paramIndex = {
          title: 0,
          fullName: 1,
          nickName: 2,
          foundation: 3,
          president: 4,
          stadium: 5,
          coach: 6,
          image: 7,
          text: 8,
          tags: 9
        }

        if (Array.isArray(result)) {
          result.forEach(error => {
            const index = paramIndex[error.param]
            if (index !== undefined) {
              msgErrors[index].innerText = error.msg
              msgErrors[index].classList.add("invalid")
            }
          })
        } else {
          window.location.href = `/articulo/${categoryArticle}/${idCategory}`
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (category == "copas") {

      try {
        let file = document.getElementById("file");
        let title = document.getElementById("title").value;
        let text = articleJodit.text;
        let fullName = document.getElementById("fullName").value;
        let campus = document.getElementById("campus").value;
        let foundation = document.getElementById("foundation").value;
        let organizer = document.getElementById("organizer").value;
        let champion = document.getElementById("champion").value;
        let subchampion = document.getElementById("subchampion").value
        let tags = document.getElementById("tags").value;
        let category = categoryArticle
        let id = idCategory

        let msgErrors = document.querySelectorAll(".msg-error");

        let formData = new FormData();

        formData.append("title", title);
        formData.append("text", text);
        formData.append("fullName", fullName);
        formData.append("category", category);
        formData.append("file", file.files[0]);
        formData.append("campus", campus);
        formData.append("foundation", foundation);
        formData.append("organizer", organizer);
        formData.append("champion", champion);
        formData.append("subchampion", subchampion);
        formData.append("tags", tags);
        formData.append("id", id);

        let result = await editArticle(categoryArticle, formData)

        msgErrors.forEach((error) => {
          error.classList.remove("invalid");
        });

        const errorMap = {
          "title": 0,
          "fullName": 1,
          "campus": 2,
          "foundation": 3,
          "organizer": 4,
          "champion": 5,
          "subchampion": 6,
          "image": 7,
          "text": 8,
          "tags": 9
        };

        if (Array.isArray(result)) {
          result.forEach(error => {
            const index = errorMap[error.param];
            if (index !== undefined) {
              msgErrors[index].innerText = error.msg;
              msgErrors[index].classList.add("invalid");
            }
          });
        } else {
          window.location.href = `/articulo/${categoryArticle}/${idCategory}`
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  function convertirFecha(fecha) {
    // Separar los componentes de la fecha utilizando el método split
    const [anio, mes, dia] = fecha.split("-");

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    // Devolver la fecha formateada
    return fechaFormateada;
  }

  let nickName;
  if (article.nickName && article.nickName != null && article.nickName != undefined && article.nickName != "") {
    nickName = <p className='parrafoJugador'><span className='spanParrafo'>Apodo(s):</span> {article.nickName}</p>
  }

  let born;
  if (article.born) {
    born = <p className='parrafoJugador'><span className='spanParrafo'>Nacimiento:</span> {convertirFecha(article.born.split("T")[0])}</p>
  }

  let nationality;
  if (article.nationality) {
    nationality = <p className='parrafoJugador'><span className='spanParrafo'>Nacionalidad(es):</span> {article.nationality}</p>
  }

  let death;
  if (article.death && article.death != "0000-00-00") {
    death = <p className='parrafoJugador'><span className='spanParrafo'>Fallecimiento:</span> {convertirFecha(article.death.split("T")[0])}</p>
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
    debut = <p className='parrafoJugador'><span className='spanParrafo'>Debut deportivo:</span> {convertirFecha(article.debut.split("T")[0])}</p>
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
    retire = <p className='parrafoJugador'><span className='spanParrafo'>Retirada deportiva:</span> {convertirFecha(article.retire.split("T")[0])}</p>
  }

  let foundation;
  if (article.foundation) {
    foundation = <p className='parrafoJugador'><span className='spanParrafo'>Fundación:</span> {convertirFecha(article.foundation.split("T")[0])}</p>
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

  const fechaHoraString = article.date;
  const fechaHora = new Date(fechaHoraString);

  const dia = fechaHora.getDate().toString().padStart(2, '0');
  const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaHora.getFullYear();
  const hora = fechaHora.getHours().toString().padStart(2, '0');
  const minutos = fechaHora.getMinutes().toString().padStart(2, '0');

  const fechaHoraFormateada = `${anio}/${mes}/${dia} ${hora}:${minutos}`;
  return (
    <div className="container-article-detail">
      <div className="container-detail">
        <div className="containerView-estilo">
          <h3 className="containerView-titulo">{article.title}</h3>
        </div>

        <div className="containerView">
          <div className="descripcionView">
            <div className="parrafoView" id="resultado">
              <TextoHtml texto={article.text} />
              <div className="dataAuthor">
                <p>Fecha de creación: {fechaHoraFormateada}.</p>
                <p>Autor: {article.author}.</p>
              </div>
            </div>
          </div>

          <div className="jugadorContainer">
            <div className="imagen__jugadorFlex">
              {imageBase64 && <img src={imageBase64} />}
            </div>

            <div className="parrafosPersonales">
              <p className="parrafoJugador">
                <span className="spanParrafo">Nombre completo:</span>{" "}
                {article.fullName}
              </p>
              {nickName}
              {born}
              {nationality}
              {height}
              {weight}
              {debut}
              {team}
              {position}
              {numbers}
              {goals}
              {retire}
              {death}
              {foundation}
              {president}
              {coach}
              {stadium}
              {campus}
              {organizer}
              {champion}
              {subchampion}
            </div>

            <Button variant="dark" onClick={handleShow}>
              Editar Artículo
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Editar Artículo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  method="post"
                  encType="multipart/form-data"
                  className="formularioCategorias"
                  onSubmit={handleSubmit}
                >
                  {input}

                  <div className="joditEditor">
                    {useMemo(
                      () => (
                        <JoditEditor
                          ref={editor}
                          value={article.text}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onChange={(newContent) => {
                            const newArticle = { ...article, text: newContent };
                            setArticleJodit(newArticle);
                          }}
                        />
                      ),
                      [article.text]
                    )}
                  </div>

                  <p className="msg-error error-jodit"></p>

                  <Tags showValue={true} article={article} />

                  <p className="msg-error error-tags"></p>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cerrar
                    </Button>
                    <Button variant="dark" type="submit">
                      Guardar Cambios
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewArticle