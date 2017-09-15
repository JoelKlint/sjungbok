import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Actions } from 'jumpstate'

import SearchBar from '../../components/SearchBar'
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

import Colors from '../../constants/Colors'
import R from 'ramda'

let searchTimeout = null

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { songCount } = R.pathOr({}, ['state', 'params'], navigation)
        return {
            title: `Sök`,
            headerRight: <Text style={{marginHorizontal: 10}}>{`${songCount || 0} träffar`}</Text>
        }
    }

    state = {
        loading: false,
    }

    componentWillMount() {
        Actions.fetchAllSongs()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.songs.length !== nextProps.songs.length) {
            this.props.navigation.setParams({
                songCount: nextProps.songs.length
            })
        }
    }

    search(text) {
        /**
         * Time to wait until the search should be executed
         * This is user to reduce the amount of searches.
         * Without it, a full search is performed for every letter entered
         */
        const searchDelay = 250
        this.setState({loading: true})
        if(searchTimeout != null) {
            clearTimeout(searchTimeout)
            searchTimeout = null
        }
        searchTimeout = setTimeout(() => {
            Actions.searchSongs(text)
            .then(() => this.setState({loading: false}))
        }, searchDelay)
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
                    onChangeText={(text) => this.search(text)}
                    onClear={() => this.search('')}
                />
                {listView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    headerSearchButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    }
})

export default AllSongsScreen