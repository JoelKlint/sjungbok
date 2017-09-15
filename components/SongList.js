import React from 'react'
import { 
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

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

SongList.propTypes = {
    songs: PropTypes.array.isRequired,
    onPress: PropTypes.func
}

export default SongList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})