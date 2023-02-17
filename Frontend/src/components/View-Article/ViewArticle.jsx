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

  console.log(article)

  return (

    <div>

      <div className='containerView'>

        <div className="descripcionView">

          <div className='containerView-estilo'>

            <h3 className='containerView-titulo'></h3>

          </div>

          <p className='parrafoView'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse neque officia nulla sint odit. Unde quidem facere eius aspernatur, iusto necessitatibus, distinctio enim, minima tenetur aperiam dolores eum quis hic nihil doloribus vel! Nihil, ad alias quis nostrum accusamus cupiditate repellat, quod fugiat, ullam vitae necessitatibus amet minus sequi! Deserunt consequatur optio fugiat. Nihil in natus eos reiciendis ducimus harum nulla cumque nisi, eaque earum sit voluptates vero est beatae quam illo mollitia, officia ipsa cupiditate at. Pariatur inventore eaque aliquam voluptatibus deserunt eligendi. Quibusdam soluta ab sunt ea. Possimus eum pariatur cum nihil temporibus ea aperiam voluptas recusandae rerum omnis distinctio nesciunt odit modi laboriosam laudantium fugiat ex alias, repudiandae voluptate consectetur. Facilis quisquam, rem, est sapiente in sequi similique voluptate assumenda, officia nemo ipsa eligendi porro nisi suscipit eveniet blanditiis vero consequuntur? Id nobis suscipit aliquam corporis voluptatem rerum. Aperiam et reprehenderit, reiciendis illum harum commodi nemo asperiores magnam debitis dolorum consequatur voluptates nisi amet accusantium modi nesciunt voluptatibus similique natus autem. Quo voluptates harum natus molestiae distinctio nobis nostrum, vero totam numquam dolore adipisci quis, reprehenderit doloremque, at dolorem! Minima iusto, consectetur vitae quos ipsam facilis, temporibus tenetur maxime nostrum magni porro deserunt commodi rerum. Consequuntur nostrum maxime ullam suscipit voluptatem temporibus cupiditate explicabo amet pariatur accusantium, minus quibusdam officia neque a! Maxime doloribus excepturi, voluptatum numquam optio, dolorum dicta deleniti eligendi ut amet debitis sapiente illo exercitationem laborum molestias inventore. Quo reprehenderit iusto, rerum vel, itaque eius perferendis maxime, officia dolorum culpa nihil a nesciunt molestiae eum aut odit temporibus cupiditate repudiandae quasi explicabo error. Atque, veniam! Voluptatum, tempora, voluptate deserunt labore blanditiis dolores non vitae vel accusamus eveniet rerum temporibus, veniam eum. Iusto explicabo voluptas nulla aperiam eaque atque laudantium obcaecati perspiciatis sunt fuga suscipit voluptates modi, corrupti harum, laboriosam vel quod! Accusamus error fugit sequi assumenda veniam, eveniet enim, dolore corporis voluptatum laborum molestias id modi! Tenetur dolore voluptas nesciunt mollitia. Sint libero explicabo maxime consequatur unde autem voluptatem corporis dolorum doloremque. Fuga perspiciatis, excepturi quod adipisci ipsam facere saepe rem quaerat voluptatum omnis! Dignissimos, totam labore ab voluptatem veniam molestiae rem facere ullam? Optio facere atque, ex facilis nesciunt in, necessitatibus, at sequi fuga sunt provident consequatur culpa eos id. Deserunt qui possimus atque quae error, explicabo in autem aliquid inventore! Quam a odit, eos cumque delectus dignissimos ratione voluptatum nam corporis quis consectetur? Veritatis nemo quod accusamus totam nihil? Id, ut ratione laudantium dicta sunt quod unde ipsum laboriosam veritatis cum? Est temporibus, eveniet veritatis et quisquam, accusantium saepe harum velit sapiente iusto molestiae, repudiandae unde. Velit labore illo consequatur nesciunt sed commodi aperiam, tempore harum dolorem odit possimus tempora, quam placeat veniam minima, ullam neque debitis sint explicabo omnis expedita minus delectus deserunt saepe. Perferendis cum suscipit assumenda quibusdam a alias, quis hic repudiandae accusamus ut recusandae exercitationem odio iste omnis iure cupiditate laudantium dolore maxime inventore modi dicta fugit quidem quos ratione? Eos nesciunt fugiat sed, animi distinctio quisquam ab vero accusantium facilis nam tempore illum asperiores sapiente sunt similique omnis tempora quae alias quam reiciendis quod recusandae itaque pariatur dignissimos? Soluta praesentium, id labore quibusdam esse dolorum possimus voluptate quia, quo perferendis pariatur sit quaerat incidunt corrupti iure quam, ab architecto deserunt ipsam illo! Doloremque id sint repudiandae modi. Ab porro atque, delectus iure, odit saepe accusamus laudantium doloribus aut sed cum ipsam nostrum repudiandae velit possimus obcaecati labore harum ducimus eius, officia minus minima? Deserunt, magnam impedit repudiandae quo nemo molestias harum minus sed quisquam corrupti? Saepe ipsa quam quos quas corporis cumque sed! Eius corporis debitis officia sunt, perferendis totam eaque optio, fugiat in vel sapiente iure. Iure et odit eligendi vitae tempore rem, alias distinctio itaque fuga dicta autem eum minima quis aut reiciendis totam dolor accusantium qui? Quam voluptas eaque excepturi. Commodi est, dicta vero numquam modi animi eos unde quod esse, laboriosam in, quae neque omnis! Rerum eveniet maxime, sapiente impedit commodi dolorem. Incidunt vel sapiente nisi? Dolorem nulla ratione doloribus expedita! Repellat velit consequatur dicta nulla adipisci, perferendis veritatis animi quis odio libero aperiam ipsum nam! Iste illum minima provident qui suscipit iure, laboriosam illo quo alias sequi praesentium esse nam nesciunt vero, blanditiis eius nostrum ad deserunt dolorem quod facere, perspiciatis optio!</p>

        </div>

        <div className='jugadorContainer'>

          <div className='imagen__jugadorFlex'>

            {/* acá en src seria / src={urlImage} / pero la saque para q no te tire error cuando entres a la pagina */}
            <img src={urlImage} alt="" className='peleIMG' />
          </div>

          <div className='datosPersonales'>
            <h4>Datos personales</h4>
          </div>

          <div className='parrafosPersonales'>

            <p className='parrafoJugador'><span className='spanParrafo'>Nombre completo:</span> Edson Arantes do Nascimiento
            </p>
            <p className='parrafoJugador'><span className='spanParrafo'>Apodos:</span> O Rei, La perla negra, D10s</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Nacimiento:</span> Tres Corações, Minas Gerais,
              Brasil23 de octubre de 1940. </p>
            <p className='parrafoJugador'><span className='spanParrafo'>Nacionalidad:</span> Brasileña</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Fallecimiento:</span> São Paulo, Brasil 29 de
              diciembre de 2022</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Altura:</span> 1,73 m 5 8″</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Debut deportivo:</span> 7 de septiembre de 1956
              (Santos F. C.)</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Posición:</span> Delantero</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Dorsal(es):</span> 10</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Goles en clubes:</span> 680 (oficiales) 1156 (todos)
            </p>
            <p className='parrafoJugador'><span className='spanParrafo'>Retirada deportiva:</span> 1 de octubre de 1977 (New
              York Cosmos)</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Selección nacional:</span> Brasil</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Debut:</span> 7 de julio de 1957</p>
            <p className='parrafoJugador'><span className='spanParrafo'>Dorsal(es):</span> 10 Part. (goles)92 (77)</p>

          </div>

        </div>


      </div>


    </div>



  )
}

export default ViewArticle