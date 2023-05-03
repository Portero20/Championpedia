import React, { useState, useEffect, useMemo, useRef } from 'react'
import { ViewDetail } from '../viewDetail/ViewDetail';
import TextoHtml from '../TextoHtml';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import JoditEditor from 'jodit-react';
import Tags from '../Tags/Tags';
import { deleteArticle } from '../../services/articles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SelectInput } from '../SelectInput/SelectInput'
import { handleSubmit } from '../Validation/Validation';

export function ContainerDetail({ article }) {
    const { password, category, id } = useParams();
    const [show, setShow] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const editor = useRef(null);
    const navigate = useNavigate();
    const [valor, setValor] = useState("");

    function recibirValor(valorHijo) {
        setValor(valorHijo);
    }

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
        password === import.meta.env.VITE_APP_PASSWORD ? setAdmin(true) : setAdmin(false);

    }, [password])

    const handleDelete = async () => {
        await deleteArticle(category, id);
        toast.success('Artículo eliminado correctamente');
        navigate("/");
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fechaHoraString = article.date;
    const fechaHora = new Date(fechaHoraString);

    const dia = fechaHora.getDate().toString().padStart(2, '0');
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaHora.getFullYear();
    const hora = fechaHora.getHours().toString().padStart(2, '0');
    const minutos = fechaHora.getMinutes().toString().padStart(2, '0');

    const fechaHoraFormateada = `${anio}/${mes}/${dia} ${hora}:${minutos}`;

    const [articleJodit, setArticleJodit] = useState({
        text: "Texto predeterminado"
    });

    const content = articleJodit.text;
    const selected = category.toLowerCase()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const idCategory = parseInt(id)
        const view = "edit"
        await handleSubmit(selected, content, view, idCategory);

        if (valor.length > 0) {
            toast.warning('Título en uso por otro artículo');
        }
    }

    return (
        <>
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
                            <ViewDetail article={article} />

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
                                        onSubmit={handleFormSubmit}
                                    >
                                        <SelectInput showValue={true} article={article} category={selected} recibirValor={recibirValor} />

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
        </>
    )
}