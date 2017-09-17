import ActionTypes from './actionTypes'
import R from 'ramda'

export const toggleFavourite = (id) => {
    return {
        type: ActionTypes.TOGGLE_FAVOURITE,
        id
    }
}

export const setSongs = (songs) => {
    return {
        type: ActionTypes.SET_SONGS,
        songs
    }
}

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

export const fetchRemoteSongs = () => {
    return (dispatch) => {
        return fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
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
            dispatch(setSongs(res))
            console.log(`State fetched ${R.values(res).length} songs`)
        })
        .catch(err => console.error(err))
    }
}