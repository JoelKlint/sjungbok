import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SongList from '../../components/SongList'
import { navigationProps } from '../SongScreen'
import Colors from '../../constants/Colors'

class FavouritesScreen extends React.Component {
    static navigationOptions = {
        title: 'Favoriter',
    }

    render() {
        const { favouriteSongs, navigation, allSongs } = this.props
        if(favouriteSongs.length !== 0) {
            return (
                <View style={styles.container}>
                    <SongList 
                        songs={favouriteSongs} 
                        onPress={id => {
                            const song = allSongs[id]
                            navigation.navigate('Song', navigationProps(song))
                        }}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.emptyContainer}>
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
        backgroundColor: Colors.background,
        flex: 1,
    },
    emptyContainer: {
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        marginBottom: 40,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 30,
        textAlign: 'center',
    }
})