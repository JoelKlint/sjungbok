import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'

class FavouritesScreen extends React.Component {
    static navigationOptions = {
        title: 'My Hearts',
    }

    render() {
        return (
            <Text>This is where you will find your favourite songs</Text>
        )
    }
}

export default FavouritesScreen