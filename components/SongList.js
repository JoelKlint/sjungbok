import React from 'react'
import { 
    View,
    FlatList,
    StyleSheet
} from 'react-native'

import ListItem from './ListItem'

class SongList extends React.Component {
    render() {
        const { songs, onPress } = this.props        
        return (
            <View style={styles.container}>
                <FlatList 
                    data={songs}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => {
                        return (
                            <ListItem 
                                song={item}
                                onPress={onPress}
                            />
                        )
                    }}
                />
            </View>
        )
    }
}

export default SongList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    }
})