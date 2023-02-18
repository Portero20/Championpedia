import React from 'react';

function TextoHtml(props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.texto }} />
  );
}

export default TextoHtml;