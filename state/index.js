import { CreateJumpstateMiddleware } from 'jumpstate'
import { createStore, applyMiddleware } from 'redux'

import state from './state'

const store = createStore(
    state,
    applyMiddleware(
        CreateJumpstateMiddleware()
    )
)

export default store