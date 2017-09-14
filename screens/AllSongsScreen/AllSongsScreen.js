import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Actions } from 'jumpstate'

import SearchBar from '../../components/SearchBar'
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'

import Colors from '../../constants/Colors'
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { toggleSearchBar } = R.pathOr({}, ['state', 'params'], navigation)
        return {
            title: 'Songs',
            headerRight: (
                <Touchable onPress={() => toggleSearchBar()}>
                    <Ionicons 
                        name={'ios-search'} 
                        size={25}
                        style={styles.headerSearchButton}
                    />
                </Touchable>
            )
        }
    }

    state = {
        loading: false,
        showSearch: false,
    }

    componentWillMount() {
        Actions.fetchAllSongs()
        this.props.navigation.setParams({
            toggleSearchBar: () => this.setState({showSearch: !this.state.showSearch})
        })
    }

    search(text) {
        this.setState({loading: true})
        setTimeout(() => {
            Actions.searchSongs(text)
            .then(() => this.setState({loading: false}))
        }, 1)
    }

    render() {
        const { songs, navigation } = this.props
        const { loading, showSearch } = this.state
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
                    onSearch={(text) => this.search(text)}
                    onClear={() => this.search('')}
                    show={showSearch}
                />
                {listView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerSearchButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    }
})

export default AllSongsScreen