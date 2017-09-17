import { createStore, applyMiddleware } from 'redux'

import songs from './songReducer'
import thunk from 'redux-thunk'

const store = createStore(
    songs,
    applyMiddleware(
        thunk
    )
)

export default store