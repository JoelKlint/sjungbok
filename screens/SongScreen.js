import React from 'react'
import { 
    StyleSheet,
    ScrollView, 
    Text,
    Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const iconName = Platform.OS === 'ios'
            ? 'ios-star-outline'
            : 'md-star-outline'
        return {
            title: navigation.state.params.song.title,
            headerRight: (
                <Ionicons 
                    name={iconName} 
                    style={styles.headerStar}
                    size={25}
                />
            )
        }
    }

    render() {
        const { song } = this.props.navigation.state.params
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>{song.lyrics}</Text>
            </ScrollView>
        )
    }
}

export default AllSongsScreen

const styles = StyleSheet.create({
    container: {
    },
    text: {
        textAlign: 'center',
        margin: 20,
        fontSize: 20,
    },
    headerStar: {
        marginRight: 20,
    }
})