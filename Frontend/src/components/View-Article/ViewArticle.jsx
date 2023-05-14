import '../../scss/utilities/_utilities.scss';
import '../../scss/base/medias-detail.css'
import './_articleView.scss';

import { React, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { detail, view } from '../../services/articles';
import { useParams } from "react-router-dom";
import { ContainerDetail } from '../ContainerDetail/ContainerDetail';
import ClipLoader from 'react-spinners/ClipLoader';

const ViewArticle = () => {
  const { category, id } = useParams();
  const [article, setarticle] = useState([])
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    detail(category, id).then(setarticle)
  }, [id])

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

  useEffect(() => {
    detail(category, id).then(article => {
      setContent(article.text);
      setIsLoading(true)
    });
  }, [category, id]);

  return (
    <div>

      {isLoading && <ContainerDetail article={article} />}
      {!isLoading && <div className='loaderArticulos'><ClipLoader/></div>}

    </div>
  );
}

export default ViewArticle