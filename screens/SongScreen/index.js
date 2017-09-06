import SongScreen from './SongScreen'
import Selectors from '../../state/selectors'
import { connect } from 'react-redux'
import { Actions, getState } from 'jumpstate'

export const initProps = (id) => {
    const state = getState()
    const song = Selectors.getCurrentSong(state)
    return {
        title: song.title,
        starred: Selectors.getCurrentSongIsStarred(state),
        toggleStar: () => Actions.toggleStar(song.id),
    }
}

const stateful = connect((state, props) => {
    const song = Selectors.getCurrentSong(state)
    return {
        song: song,
        starred: Selectors.getCurrentSongIsStarred(state)
    }
})


export default stateful(SongScreen)