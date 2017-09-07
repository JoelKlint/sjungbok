import { createSelector } from 'reselect'
import R from 'ramda'

const getAllSongs = state => R.propOr({}, 'songs', state)

const getCurrentSongId = state => state.current.song

const getCurrentSong = createSelector(
    [getAllSongs, getCurrentSongId],
    (songs, id) => R.propOr({}, id, songs)
)

const getAllFavouritesId = state => R.propOr([], 'favourites', state)

const getAllFavourites = createSelector(
    [getAllFavouritesId, getAllSongs],
    (favIds, songs) => R.filter(song => R.contains(song.id, favIds))(songs)
)

const getCurrentSongIsFavourite = createSelector(
    [getAllFavouritesId, getCurrentSong],
    (favouritesIds, song) => R.contains(song.id, favouritesIds)
)

export default {
    getAllSongs,
    getAllFavouritesId,
    getAllFavourites,
    getCurrentSong,
    getCurrentSongIsFavourite,
}