import { compose, createStore, applyMiddleware } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import songs from './songReducer'
import thunk from 'redux-thunk'

const store = createStore(
    songs,
    undefined,
    compose(
        applyMiddleware(thunk),
        autoRehydrate(),
    )
)

export const rehydrateReduxState = () => {
    return new Promise((resolve, reject) => {
        /**
         * Called initially to load the store
         */
        persistStore(store, {storage: AsyncStorage}, () => {
            console.log('Store rehydrated')
            resolve()
        })
    })
}


/**
 * Saves store to disc
 */
export const saveStoreToDisc = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            persistStore(store, {storage: AsyncStorage}, () => {
                console.log('Saved store to disc')
                resolve()
            })
        }, 1000)
    })
}

export default store