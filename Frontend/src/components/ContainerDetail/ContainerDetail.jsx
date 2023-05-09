import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { ViewDetail } from '../ViewDetail/ViewDetail';
import { deleteArticle } from '../../services/articles';
import { handleSubmit } from '../Validation/Validation';
import { toast } from 'react-toastify';
import { getFullDate } from '../../containers/getDate'
import { ModalEdit } from '../Modal/ModalEdit'
import TextoHtml from '../TextoHtml';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';

export function ContainerDetail({ article }) {
    const { password, category, id } = useParams();
    const [show, setShow] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const [valor, setValor] = useState("");

    function recibirValor(valorHijo) {
        setValor(valorHijo);
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
                    <div className="containerView">
                        <div className="descripcionView">
                            <div className="parrafoView" id="resultado">
                                <TextoHtml texto={article.text} />
                                <div className="dataAuthor">
                                    <p>Fecha de creación: {getFullDate(article.date)}.</p>
                                    <p>Autor: {article.author}.</p>
                                </div>
                            </div>
                        </div>

                        <div className="jugadorContainer">
                            <div className="containerView-estilo">
                                <h3 className="containerView-titulo">{article.title}</h3>
                            </div>
                            <ViewDetail article={article} selected={selected} />

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
                            <ModalEdit show={show} article={article} selected={selected} handleFormSubmit={handleFormSubmit} recibirValor={recibirValor} handleClose={handleClose} setArticleJodit={setArticleJodit} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}