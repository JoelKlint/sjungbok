import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.name,
    })

    render() {
        return (
            <Text>This is the song view</Text>
        )
    }
}

export default AllSongsScreen