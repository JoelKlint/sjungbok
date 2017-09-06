import { 
    State,
    Effect,
    Actions
} from 'jumpstate'
import R from 'ramda'

const state = State({
    
    initial: {
        current: {
            song: undefined
        },
        songs: {},
        stars: {},
    },

    setCurrentSong(state, id) {
        return R.assocPath(['current', 'song'], id, state)
    },

    setSongs(state, songs) {
        return R.assoc('songs', songs, state)
    },

    toggleStar(state, songId) {
        const currentlyStarred = R.pathOr(false, ['stars', songId], state)
        switch(currentlyStarred) {
            case true:
                return R.dissocPath(['stars', songId], state)
            case false:
            default:
                return R.assocPath(['stars', songId], true, state)
        }
    }

})

export default state

Effect('getAllSongs', () => {
    console.log('State is fetching songs')
    fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
    .then(res => res.json())
    .then(res => {
        res = R.mapObjIndexed((val, key, obj) => R.assoc('id', key, val))(res)
        Actions.setSongs(res)
        console.log(`State fetched ${R.values(res).length} songs`)
    })
    .catch(err => console.error(err))
})