import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SongList from '../../components/SongList'
import { Actions } from 'jumpstate'
import { navigationProps } from '../SongScreen'

class FavouritesScreen extends React.Component {
    static navigationOptions = {
        title: 'Favoriter',
    }

    render() {
        const { songs, navigation } = this.props
        if(songs.length !== 0) {
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
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Ojsan...</Text>
                    <Text style={styles.subtext}>Här var det tomt</Text>
                </View>
            )
        }
    }
}

export default FavouritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        marginBottom: 40,
    },
    subtext: {
        fontSize: 30,
    }
})