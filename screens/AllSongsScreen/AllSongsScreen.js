import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Actions } from 'jumpstate'
import SearchBar from 'react-native-search-box';

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

import Colors from '../../constants/Colors'

const searchTimeout = undefined

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    state = {
        loading: false
    }

    componentWillMount() {
        Actions.fetchAllSongs()
    }

    search(text) {
        this.setState({loading: true})
        if(searchTimeout !== undefined) {
            clearTimeout(searchTimeout)
        }
        searchTimeout = setTimeout(() => {
            Actions.searchSongs(text)
            this.setState({loading: false})
        }, 300)
    }

    render() {
        const { songs, navigation } = this.props
        const { loading } = this.state
        let listView
        switch(loading) {
            case true:
                listView = <ActivityIndicator style={{flex: 1}} size='large' />
                break;
            case false:
            default:
                listView = (
                    <SongList 
                        songs={songs}
                        onPress={id => {
                            Actions.setCurrentSong(id)
                            navigation.navigate('Song', navigationProps(id))
                        }}
                    />
                )
        }

        return (
            <View style={styles.container}>
                <SearchBar 
                    onChangeText={text => this.search(text)}
                    onCancel={() => this.search('')}
                    onDelete={() => this.search('')}
                />
                {listView}
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