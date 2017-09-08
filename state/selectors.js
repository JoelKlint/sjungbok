import { createSelector } from 'reselect'
import R from 'ramda'

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
        const filter = R.filter(s => {
            return R.contains(searchText.toLowerCase(), s.title.toLowerCase())
        })
        return filter(songs)
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