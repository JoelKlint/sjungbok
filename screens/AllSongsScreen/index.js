import AllSongsScreen from './AllSongsScreen'
import { connect } from 'react-redux'
import R from 'ramda'
import Selectors from '../../state/selectors'

const stateful = connect((state, props) => {
    return {
        songs: Selectors.getSearchResult(state),
    }
})

export default stateful(AllSongsScreen)