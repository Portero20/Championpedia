import Player from '../components/Player/InputPlayer';
import Team from '../components/Teams/Team';
import Trophies from '../components/Trophies/Trophies';

export function SelectInput({ showValue, article, category}) {

    return (
        <>
            {category.toLowerCase() == "futbolistas" ? <Player showValue={showValue} article={article} /> :
             category.toLowerCase() == "copas" ? <Trophies showValue={showValue} article={article} /> :
             category.toLowerCase() == "equipos" ? <Team showValue={showValue} article={article} /> : null}
        </>
    )
}