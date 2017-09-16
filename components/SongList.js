import React from 'react'
import { 
    Platform,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import ListItem from './ListItem'

class SongList extends React.Component {

    offset = 0
    _onScroll = (e) => {
        const newOffset = e.nativeEvent.contentOffset.y
        if(newOffset < 0) { return }
        const diff = newOffset - this.offset
        this.offset = newOffset

        const { onScrollDown, onScrollUp } = this.props
        const sensitivity = Platform.OS === 'ios' ? 10 : 15
        if(Math.abs(diff) < sensitivity) {
            // Scrolling too slow, do not do anything
            return
        }
        else if(diff < 0 && onScrollUp) { // scrolling up
            onScrollUp()
        }
        else if(onScrollDown){ // scrolling down
            onScrollDown()
        }
    }

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
                    onScroll={this._onScroll}
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