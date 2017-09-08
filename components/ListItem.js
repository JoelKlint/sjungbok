import React from 'react'
import { 
    TouchableHighlight, 
    View, 
    Text, 
    StyleSheet,
    Platform, 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

class ListItem extends React.Component {

    extractTitleString = () => {
        const { song } = this.props
        const maxLength = 40
        if(song.title.length > maxLength) {
            return `${song.title.substring(0, maxLength-3)}...`
        }
        else {
            return song.title
        }
    }

    extractMelodyString = () => {
        const { song } = this.props
        const maxLength = 35
        let melody = ''
        const melodyTitle = song.melodyTitle || ''
        if(melodyTitle.length > maxLength) {
            melody = `${melodyTitle.substring(0, maxLength-3)}...`
        }
        else if(melodyTitle.length === 0) {
            melody = 'okänd'
        }
        else {
            melody = melodyTitle
        }
        return 'mel: ' + melody
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
                        <View style={styles.textContainer} >
                            <Text style={styles.title}>
                                {this.extractTitleString()}
                            </Text>
                            <Text style={styles.melody}>
                                {this.extractMelodyString()}
                            </Text>
                        </View>
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
        backgroundColor: Colors.background,
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
