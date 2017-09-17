import FavouritesScreen from './FavouritesScreen'
import { connect } from 'react-redux'
import Selectors from '../../state/selectors'
import R from 'ramda'

const stateful = connect((state, props) => {
    return {
        favouriteSongs: R.values(Selectors.getAllFavourites(state)),
        allSongs: Selectors.getAllSongsAsMap(state)
    }
})

export default stateful(FavouritesScreen)