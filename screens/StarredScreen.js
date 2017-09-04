import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'
import {
    Container, 
    Content,
} from 'native-base'

class StarredScreen extends React.Component {
    static navigationOptions = {
        title: 'Starred',
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>This is where you will find your favourite songs</Text>
                </Content>
            </Container>
        )
    }
}

export default StarredScreen