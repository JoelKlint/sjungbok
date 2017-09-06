import React from 'react'
import { 
    View, 
    Text, 
    FlatList,
    StyleSheet 
} from 'react-native'
import { Actions } from 'jumpstate'

import { initProps } from '../../screens/SongScreen'

import ListItem from '../../components/ListItem'

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    componentWillMount() {
        Actions.getAllSongs()
    }

    render() {
        const { navigation, songs } = this.props
        return (
            <View style={styles.container}>
                <FlatList 
                    data={songs}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => {
                        return (
                            <ListItem 
                                text={item.title} 
                                onPress={() => {
                                    Actions.setCurrentSong(item.id)
                                    navigation.navigate('Song', initProps(item.id))
                                }}
                            />
                        )
                    }}
                />
            </View>
        )
    }
}

export default AllSongsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    }
})