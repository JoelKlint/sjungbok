import React from 'react'
import { 
    Platform,
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

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

    _renderSeparator = () => {
        return (
            <View style={{
                height: 0.5,
                marginLeft: 20,
                backgroundColor: Colors.gray,
            }}/>
        )
    }

    render() {
        const { songs, onPress, onRefresh, refreshing } = this.props
        if(songs.length !== 0) {
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
                        ItemSeparatorComponent={this._renderSeparator}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                </View>
            )
        }    
        else {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Ojsan...</Text>
                    <Text style={styles.emptySubtext}>Det verkar inte finnas några sånger</Text>
                </View>
            )
        }    
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
    },
    emptyContainer: {
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 50,
        marginBottom: 40,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 30,
        textAlign: 'center',
    }
})