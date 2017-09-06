import { createSelector } from 'reselect'
import R from 'ramda'

const getAllSongs = state => R.propOr({}, 'songs', state)

const getCurrentSongId = state => state.current.song

const getCurrentSong = createSelector(
    [getAllSongs, getCurrentSongId],
    (songs, id) => R.propOr({}, id, songs)
)

const getAllStars = state => R.propOr({}, 'stars', state)

const getCurrentSongIsStarred = createSelector(
    [getAllStars, getCurrentSong],
    (stars, song) => R.propEq(song.id, true, stars)
)

export default {
    getAllSongs,
    getAllStars,
    getCurrentSong,
    getCurrentSongIsStarred,
}