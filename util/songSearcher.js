import Fuse from 'fuse.js'

let options = { 
    shouldSort: true,
    // tokenize: true,
    keys: [
        {
            name: 'title',
            weight: 3/5,
        }, 
        {
            name: 'melodyTitle',
            weight: 2/5
        }, 
        // {
        //     name: 'lyrics',
        //     weight: 1/5
        // }
    ] 
}

let fuse = new Fuse([], options)
let allSongs = []

const makeSongsSearchable = (songs) => {
    allSongs = songs
    fuse = new Fuse(songs, options)
}

const search = (string) => {
    return new Promise((resolve, reject) => {
        const res = string.length > 0 ? fuse.search(string) : allSongs
        resolve(res)
    })
}

export { 
    makeSongsSearchable
}

export default search