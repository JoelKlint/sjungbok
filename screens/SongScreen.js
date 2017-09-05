import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    render() {
        return (
            <Text>This is the song view</Text>
        )
    }

    renderSearchCloseButton() {
        if(this.state.filter !== '') {
            return <Icon name="ios-close-circle" onPress={() => this.clearFilter()}/>
        }
    }
}

export default AllSongsScreen