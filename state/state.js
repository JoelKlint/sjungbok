import { 
    State,
    Effect,
    Actions
} from 'jumpstate'
import R from 'ramda'
import { makeSongsSearchable } from '../util/songSearcher'
import searchSongs from '../util/songSearcher'

const state = State({
    
    initial: {
        current: {
            song: undefined,
            searchText: '',
        },
        songs: {},
        favourites: [],
        searchResult: [],
    },

    setCurrentSong(state, id) {
        return R.assocPath(['current', 'song'], id, state)
    },

    setCurrentSearchText(state, text) {
        return R.assocPath(['current', 'searchText'], text, state)
    },

    setSongs(state, songs) {
        const sortedSongs = R.values(R.sortBy(s => s.title.toLowerCase(), R.values(songs)))
        makeSongsSearchable(sortedSongs)
        return R.merge(state, {
            songs: songs,
            searchResult: sortedSongs
        })
    },

    toggleFavourite(state, songId) {
        const isFavourite = R.contains(songId, state.favourites)
        let newFavourites
        switch(isFavourite) {
            case true:
                newFavourites = R.without([songId], state.favourites)
                break;
            case false:
            default:
                newFavourites = R.append(songId, state.favourites)
                break;
        }
        return R.assoc('favourites', newFavourites, state)
    },

    setSearchResult(state, songs) {
        return R.assoc('searchResult', songs, state)
    }

})

export default state

const unEscapeHtml = (text) => {
    const toConvert = text || ''
    const map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
    }
    return toConvert.replace(/&.+?;/g, m => map[m])
  }

Effect('fetchAllSongs', () => {
    console.log('State is fetching songs')
    fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
    .then(res => res.json())
    .then(res => {
        res = R.mapObjIndexed((song, id, allSongs) => {
            const converted = {
                id: id,
                title: unEscapeHtml(song.title),
                lyrics: unEscapeHtml(song.lyrics),
                melodyTitle: unEscapeHtml(song.melodyTitle)
            }
            return R.merge(song, converted)
        })(res)
        Actions.setSongs(res)
        console.log(`State fetched ${R.values(res).length} songs`)
    })
    .catch(err => console.error(err))
})

Effect('searchSongs', (text) => {
    searchSongs(text).then(songs => {
        Actions.setSearchResult(songs)
    })
    .catch(err => console.error(err))
})