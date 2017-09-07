import React from 'react'
import { Actions } from 'jumpstate'

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    componentWillMount() {
        Actions.getAllSongs()
    }

    render() {
        const { songs, navigation } = this.props
        return (
            <SongList 
                songs={songs}
                onPress={id => {
                    Actions.setCurrentSong(id)
                    navigation.navigate('Song', navigationProps(id))
                }}
            />
        )
    }
}

export default AllSongsScreen