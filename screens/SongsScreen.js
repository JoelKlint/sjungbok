import React from 'react'
import { Text } from 'react-native'
import R from 'ramda'
import {
    Container, 
    Header,
    Content,
    List,
    ListItem,
    Item,
    Input,
    Icon,
    Button,
} from 'native-base'

class SongsScreen extends React.Component {
    static navigationOptions = {
        // title: 'All',
        header: null,
    }

    state = {
        songs: {}
    }

    componentWillMount() {
        console.log('WILL FETCH SONGS')
        fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
        .then(res => res.json())
        .then(res => {
            res = R.mapObjIndexed((val, key, obj) => R.assoc('id', key, val))(res)
            this.setState({songs: res})
            console.log('Behandlat färdigt data')
        })
        .catch(err => console.error(err))
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded >
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    <List 
                        dataArray={this.state.songs}
                        renderRow={item => <ListItem><Text>{item.title}</Text></ListItem>}
                    >
                    </List>
                </Content>
            </Container>
        )
    }
}

export default SongsScreen