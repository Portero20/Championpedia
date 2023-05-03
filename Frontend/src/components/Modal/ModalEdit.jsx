import React, { useMemo, useRef, useState } from 'react'
import { SelectInput } from '../SelectInput/SelectInput'
import Modal from 'react-bootstrap/Modal';
import JoditEditor from 'jodit-react';
import Tags from '../Tags/Tags';
import Button from 'react-bootstrap/Button';

export function ModalEdit({ show, handleFormSubmit, article, selected, recibirValor, handleClose, setArticleJodit }) {
    const editor = useRef(null);

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

    return (
        <>
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
        </>
    )
}