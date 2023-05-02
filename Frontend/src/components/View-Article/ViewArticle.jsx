import '../../scss/utilities/_utilities.scss';
import '../../scss/base/medias-detail.css'
import './_articleView.scss';

import { React, useEffect, useMemo, useRef, useState } from 'react'
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
import { editArticle, deleteArticle } from '../../services/articles';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ViewDetail } from '../../logic/ViewDetail';

const ViewArticle = () => {

  const navigate = useNavigate();

  const { category, id, password } = useParams();
  const [article, setarticle] = useState([])
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const editor = useRef(null);
  const [isAdmin, setAdmin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    detail(category, id).then(setarticle)
  }, [id])

  const handleDelete = async () => {
    await deleteArticle(category, id);
    toast.success('Artículo eliminado correctamente');
    navigate("/");
  };

  useEffect(() => {

    password === import.meta.env.VITE_APP_PASSWORD ? setAdmin(true) : setAdmin(false);

  }, [password])

  useEffect(() => {
    const fetchData = async () => {
      const cookies = new Cookies();
      if (!cookies.get(`view-article-${category}-${id}`, `article-${category}-${id}`)) {
        cookies.set(`view-article-${category}-${id}`, `article-${category}-${id}`, {
          path: '/',
          expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
        })

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

  if (category == "Futbolistas") {

    input = <InputPlayer showValue={true} article={article} />

  } else if (category == "Copas") {

    input = <Trophies showValue={true} article={article} />

  } else if (category == "Equipos") {

    input = <Team showValue={true} article={article} />

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    let categoryArticle = category
    let idCategory = parseInt(id)

    if (category == "Futbolistas") {
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
    if (category == "Equipos") {
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
    if (category == "Copas") {

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
            <ViewDetail article={article}/>

            <div className='buttonsContainer'>

              <Button variant="dark" onClick={handleShow} className='buttonReact'>
                Editar Artículo
              </Button>

              {isAdmin && (

                <div>
                  <Button onClick={handleDelete} variant='danger' className='buttonReact'>Eliminar Articulo</Button>
                </div>

              )}

            </div>

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
                          tabIndex={1}
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