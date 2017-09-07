import SongScreen from './SongScreen'
import Selectors from '../../state/selectors'
import { connect } from 'react-redux'
import { Actions, getState } from 'jumpstate'

export const navigationProps = (id) => {
    const state = getState()
    const song = Selectors.getCurrentSong(state)
    return {
        title: song.title,
        isFavourite: Selectors.getCurrentSongIsFavourite(state),
        toggleFavourite: () => Actions.toggleFavourite(song.id),
    }
}

const stateful = connect((state, props) => {
    return {
        song: Selectors.getCurrentSong(state),
        isFavourite: Selectors.getCurrentSongIsFavourite(state)
    }
})


export default stateful(SongScreen)