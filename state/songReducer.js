import ActionTypes from './actionTypes'
import R from 'ramda'
import { makeSongsSearchable } from '../util/songSearcher'
import { saveStoreToDisc } from './index'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
    songs: {},
    favourites: [],
}

export default songs = (state = initialState, action) => {
    switch(action.type) {

        case REHYDRATE:
            const incoming = action.payload
            const son = R.values(R.sortBy(s => s.title.toLowerCase(), R.values(incoming.songs)))
            makeSongsSearchable(son)
            return R.merge(state, incoming)

        case ActionTypes.TOGGLE_FAVOURITE:
            const id = action.id
            const isFavourite = R.contains(id, state.favourites)
            let newFavourites
            switch(isFavourite) {
                case true:
                    newFavourites = R.without([id], state.favourites)
                    break;
                case false:
                default:
                    newFavourites = R.append(id, state.favourites)
                    break;
            }
            saveStoreToDisc()
            return R.assoc('favourites', newFavourites, state)

        case ActionTypes.SET_SONGS:
            const songs = action.songs
            const sortedSongs = R.values(R.sortBy(s => s.title.toLowerCase(), R.values(songs)))
            makeSongsSearchable(sortedSongs)
            saveStoreToDisc()
            return R.assoc('songs', songs, state)

        default:
            return state
    }
}