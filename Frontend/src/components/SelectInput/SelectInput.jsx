import Player from '../Player/InputPlayer';
import Team from '../Teams/Team';
import Trophies from '../Trophies/Trophies';

export function SelectInput({ showValue, article, category, recibirValor }) {

    return (
        <>
            {category == "futbolistas" ? <Player showValue={showValue} article={article} recibirValor={recibirValor} /> :
             category == "copas" ? <Trophies showValue={showValue} article={article} recibirValor={recibirValor} /> :
             category == "equipos" ? <Team showValue={showValue} article={article} recibirValor={recibirValor} /> : null}
        </>
    )
}