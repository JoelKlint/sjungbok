import { createSelector } from 'reselect'
import R from 'ramda'

const getAllSongs = state => R.propOr({}, 'songs', state)

const getCurrentSongId = state => state.current.song

const getCurrentSong = createSelector(
    [getAllSongs, getCurrentSongId],
    (songs, id) => R.propOr({}, id, songs)
)

const getAllFavourites = state => R.propOr({}, 'favourites', state)

const getCurrentSongIsFavourite = createSelector(
    [getAllFavourites, getCurrentSong],
    (favourites, song) => R.propEq(song.id, true, favourites)
)

export default {
    getAllSongs,
    getAllFavourites,
    getCurrentSong,
    getCurrentSongIsFavourite,
}