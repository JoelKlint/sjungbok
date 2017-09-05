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
    render() {
        const { onPress } = this.props

        const iconName = Platform.OS === 'ios' 
            ? 'ios-arrow-forward'
            : 'md-arrow-forward'

        return (
            <TouchableHighlight onPress={onPress}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {this.props.text}
                    </Text>
                    <Ionicons 
                        style={styles.arrow}
                        name={iconName} 
                        size={20}
                    />
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderBottomWidth: 1, 
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
