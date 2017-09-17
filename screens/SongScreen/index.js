import SongScreen from './SongScreen'
import { connect } from 'react-redux'
import store from '../../state'
import R from 'ramda'
import { toggleFavourite } from '../../state/actions'

export const navigationProps = (song) => {
    const state = store.getState()
    const favourites = state.favourites || []
    return {
        isFavourite: R.contains(song.id, favourites),
        song
    }
}

const stateful = connect(
    (state, props) => {
        const favourites = state.favourites || []
        const songId = props.navigation.state.params.song.id || -1
        return {
            isFavourite: R.contains(songId, favourites)
        }
    },
    (dispatch, props) => {
        const id = props.navigation.state.params.song.id
        return {
            toggleFavourite: () => dispatch(toggleFavourite(id))
        }
    }
)


export default stateful(SongScreen)