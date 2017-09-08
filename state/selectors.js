import { createSelector } from 'reselect'
import R from 'ramda'
import searchSongs from '../util/songSearcher'

const getCurrentSearchText = state => R.pathOr('', ['current', 'searchText'], state)

const getAllSongsAsMap = state => R.propOr({}, 'songs', state)

const getAllSongsSortedByTitle = createSelector(
    [getAllSongsAsMap],
    (songs) => R.sortBy(s => s.title.toLowerCase(), R.values(songs))
)

const getCurrentSongId = state => state.current.song

const getCurrentSong = createSelector(
    [getAllSongsAsMap, getCurrentSongId],
    (songs, id) => R.propOr({}, id, songs)
)

const getSongsMatchingSearchByTitle = createSelector(
    [getAllSongsSortedByTitle, getCurrentSearchText],
    (songs, searchText) => {
        return searchText.length > 0 ? searchSongs(searchText) : songs
    }
)

const getAllFavouritesId = state => R.propOr([], 'favourites', state)

const getAllFavourites = createSelector(
    [getAllFavouritesId, getAllSongsSortedByTitle],
    (favIds, songs) => R.filter(song => R.contains(song.id, favIds))(songs)
)

const getCurrentSongIsFavourite = createSelector(
    [getAllFavouritesId, getCurrentSong],
    (favouritesIds, song) => R.contains(song.id, favouritesIds)
)


export default {
    getAllSongsAsMap,
    getAllFavouritesId,
    getAllFavourites,
    getCurrentSong,
    getCurrentSongIsFavourite,
    getCurrentSearchText,
    getSongsMatchingSearchByTitle,
    getAllSongsSortedByTitle,
}