import AllSongsScreen from './AllSongsScreen'
import { connect } from 'react-redux'
import R from 'ramda'
import { fetchRemoteSongs } from '../../state/actions'

const stateful = connect(
    (state, props) => { 
        return {
            allSongs: state.songs || {}
        }
    },
    (dispatch, props) => {
        return {
            fetchRemoteSongs: () => dispatch(fetchRemoteSongs())
        }
    }
)

export default stateful(AllSongsScreen)