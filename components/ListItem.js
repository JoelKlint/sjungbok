import React from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Platform, 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import Touchable from 'react-native-platform-touchable'

class ListItem extends React.PureComponent {
    
    render() {
        const { song, onPress } = this.props

        const iconName = Platform.OS === 'ios' 
            ? 'ios-arrow-forward'
            : 'md-arrow-forward'

        return (
            <Touchable onPress={() => onPress(song.id)}>
                <View style={styles.container}>
                    <View style={styles.textContainer} >
                        <Text numberOfLines={1} style={styles.title}>
                            {song.title || 'Inte angivet'}
                        </Text>
                        <Text numberOfLines={1} style={styles.melody}>
                            Mel: {song.melodyTitle || 'Inte angivet'}
                        </Text>
                    </View>
                    <Ionicons 
                        style={styles.arrow}
                        name={iconName} 
                        size={20}
                        color={Colors.accent}
                    />
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 20,
    },
    textContainer: {
        flex: 1,
        marginVertical: 18
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    melody: {
        fontSize: 15,
        fontStyle: 'italic',
        color: Colors.subText
    },
    arrow: {
        flex: 0,
        marginLeft: 20,
    },
})

export default ListItem
