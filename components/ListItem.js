import React from 'react'
import { 
    TouchableHighlight, 
    View, 
    Text, 
    StyleSheet,
    Platform, 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class ListItem extends React.Component {

    extractStringToRender = () => {
        const { song } = this.props
        const maxLength = 40
        if(song.title.length > maxLength) {
            return `${song.title.substring(0, maxLength-3)}...`
        }
        else {
            return song.title
        }
    }

    render() {
        const { song, onPress } = this.props

        const iconName = Platform.OS === 'ios' 
            ? 'ios-arrow-forward'
            : 'md-arrow-forward'

        return (
            <TouchableHighlight onPress={() => onPress(song.id)}>
                <View style={styles.background}>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            {this.extractStringToRender()}
                        </Text>
                        <Ionicons 
                            style={styles.arrow}
                            name={iconName} 
                            size={20}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#eee',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5, 
        borderColor: '#aaa',
    },
    text: {
        flex: 1,
        marginVertical: 18,
        fontSize: 16,
    },
    arrow: {
        flex: 0,
        marginLeft: 20,
    },
})

export default ListItem
