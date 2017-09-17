import React from 'react'
import { 
    StyleSheet,
    ScrollView, 
    Text,
    Platform,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors'
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { title, isFavourite, toggleFavourite } = navigation.state.params
        let iconName = ''
        switch(isFavourite) {
            case true:
                iconName = Platform.OS === 'ios' 
                    ? 'ios-heart' 
                    : 'md-heart'
                break;
            case false:
            default:
                iconName = Platform.OS === 'ios' 
                    ? 'ios-heart-outline' 
                    : 'md-heart-outline'
                break;
        }
        return {
            title: title,
            headerRight: (
                <TouchableWithoutFeedback onPress={toggleFavourite}>
                    <Ionicons 
                        name={iconName} 
                        style={styles.headerStar}
                        size={25}
                        color={isFavourite === true ? Colors.favourite : 'black'}
                    />
                </TouchableWithoutFeedback>
            ),
        }
    }

    // Send relevant prop updates to header via react navigation
    componentWillReceiveProps(nextProps) {
        const props = this.props
        const navProps = this.props.navigation.state.params
        let newParams = {}
        if(nextProps.isFavourite !== props.isFavourite)
            newParams.isFavourite = nextProps.isFavourite
        if(navProps.title !== nextProps.song.title)
            newParams.title = nextProps.song.title
        if(Object.keys(newParams).length !== 0) {
            props.navigation.setParams(newParams)
        }
    }

    render() {
        const { song } = this.props
        return (
            <View style={styles.background}>
                <View style={styles.container} >
                    <Text style={styles.title}>{song.title}</Text>
                    <Text style={styles.melodyTitle}>Melodi: {song.melodyTitle}</Text>
                    <ScrollView>
                        <Text style={styles.text}>{song.lyrics}</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default AllSongsScreen

const margin = 20

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.background,
        flex: 1
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 2,
        marginHorizontal: margin,
    },
    melodyTitle: {
        fontSize: 15,
        marginHorizontal: margin,
        marginBottom: 20,
        fontStyle: 'italic',
        color: Colors.subText,
    },
    text: {
        fontSize: 18,
        marginHorizontal: margin,
        flex: 1,
    },
    headerStar: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    }
})