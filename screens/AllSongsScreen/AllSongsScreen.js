import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'

import SearchBar from '../../components/SearchBar'
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

import searchSongs from '../../util/songSearcher'

import Colors from '../../constants/Colors'
import R from 'ramda'

let searchTimeout = null

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { songCount } = R.pathOr({}, ['state', 'params'], navigation)
        return {
            title: `Sångbok`,
            headerRight: <Text style={{marginHorizontal: 10}}>{`${songCount || 0} sånger`}</Text>
        }
    }

    state = {
        loading: false,
        showSearch: true,
        searchResult: null,
        fetching: false,
        searchQuery: '',
    }

    componentWillMount() {
        this._search(this.props.searchQuery || '') //Populate searchResults on mount
    }

    componentDidUpdate(prevProps, prevState) {
        // Execute new search if songs updated
        if(prevProps.allSongs !== this.props.allSongs) {
            this._search(this.state.searchQuery || '')
        }
    }

    _setSearchResult = (songs) => {
        this.setState({searchResult: songs})
        this.props.navigation.setParams({
            songCount: songs.length
        })
    }

    _fetchRemoteSongs = () => {
        this.setState({fetching: true})
        return this.props.fetchRemoteSongs()
        .then(() => this.setState({fetching: false}))
    }

    _search(text) {
        if(text === '') {
            searchSongs('').then(songs => this._setSearchResult(songs))
        }
        else {
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
                searchSongs(text).then(songs => {
                    this.setState({loading: false})
                    this._setSearchResult(songs)
                })
            }, searchDelay)
        }
    }

    setSearchQuery(text) {
        this.setState({searchQuery: text})
        this._search(text)
    }

    render() {
        const { allSongs, navigation } = this.props
        const { loading, showSearch, searchResult, fetching, searchQuery } = this.state
        let listView
        switch(loading) {
            case true:
                listView = <ActivityIndicator style={{flex: 1}} size='large' />
                break;
            case false:
            default:
                listView = (
                    <SongList 
                        songs={searchResult || []}
                        onPress={id => {
                            const song = allSongs[id]
                            navigation.navigate('Song', navigationProps(song))
                        }}
                        onRefresh={() => this._fetchRemoteSongs()}
                        refreshing={fetching}
                        //onScrollUp={() => this.state.showSearch === false && this.setState({showSearch: true})}
                        //onScrollDown={() => this.state.showSearch === true && this.setState({showSearch: false})}
                    />
                )
        }

        return (
            <View style={styles.container}>
                <SearchBar 
                    onChangeText={(text) => this.setSearchQuery(text)}
                    onClear={() => this.setSearchQuery('')}
                    show={true}
                    value={searchQuery}
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