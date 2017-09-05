import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'

class StarredScreen extends React.Component {
    static navigationOptions = {
        title: 'Starred',
    }

    render() {
        return (
            <Text>This is where you will find your favourite songs</Text>
        )
    }
}

export default StarredScreen