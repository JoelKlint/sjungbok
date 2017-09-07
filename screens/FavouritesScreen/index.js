import FavouritesScreen from './FavouritesScreen'
import { connect } from 'react-redux'
import Selectors from '../../state/selectors'
import R from 'ramda'

const stateful = connect((state, props) => {
    return {
        songs: R.values(Selectors.getAllFavourites(state))
    }
})

export default stateful(FavouritesScreen)