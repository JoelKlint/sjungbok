import Fuse from 'fuse.js'

let options = { 
    keys: ['title', 'melodyTitle', 'lyrics'] 
}

let fuse = new Fuse([], options)

const makeSongsSearchable = (songs) => fuse = new Fuse(songs, options)

const search = (string) => fuse.search(string)

export { 
    makeSongsSearchable
}

export default search