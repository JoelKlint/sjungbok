import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'jumpstate'
import SearchBar from 'react-native-search-box';

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

import Colors from '../../constants/Colors'

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    componentWillMount() {
        Actions.fetchAllSongs()
    }

    render() {
        const { songs, navigation, searchText } = this.props
        return (
            <View style={styles.container}>
                <SearchBar 
                    onChangeText={text => Actions.setCurrentSearchText(text)}
                    onCancel={() => Actions.setCurrentSearchText('')}
                    onDelete={() => Actions.setCurrentSearchText('')}
                />
                <SongList 
                    songs={songs}
                    onPress={id => {
                        Actions.setCurrentSong(id)
                        navigation.navigate('Song', navigationProps(id))
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default AllSongsScreen