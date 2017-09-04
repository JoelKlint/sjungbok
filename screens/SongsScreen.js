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
        title: 'Songs',
        // header: null,
    }

    state = {
        songs: {},
        filter: '',
        visibleSongs: {}
    }

    componentWillMount() {
        console.log('WILL FETCH SONGS')
        fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
        .then(res => res.json())
        .then(res => {
            res = R.mapObjIndexed((val, key, obj) => R.assoc('id', key, val))(res)
            this.setState({songs: res, visibleSongs: res})
            console.log('Behandlat färdigt data')
        })
        .catch(err => console.error(err))
    }

    updateSongs() {
        this.setState({
            visibleSongs: R.filter(song => R.contains(this.state.filter, song.title))(this.state.songs)
        })            
    }

    clearFilter() {
        this.setState({
            filter: '',
            visibleSongs: this.state.songs
        })
    }

    render() {
        return (
            <Container>
                {/* <Header searchBar rounded >
                    <Item>
                        <Icon name="ios-search" />
                        <Input 
                            placeholder="Search" 
                            onChangeText={text => this.setState({filter: text})}
                            value={this.state.filter} 
                        />
                        {this.renderSearchCloseButton()}
                    </Item>
                    <Button transparent onPress={() => this.updateSongs()}>
                        <Text>Search</Text>
                    </Button>
                </Header> */}
                <Content>
                    <List 
                        dataArray={this.state.visibleSongs}
                        renderRow={item => <ListItem><Text>{item.title}</Text></ListItem>}
                    >
                    </List>
                </Content>
            </Container>
        )
    }

    renderSearchCloseButton() {
        if(this.state.filter !== '') {
            return <Icon name="ios-close-circle" onPress={() => this.clearFilter()}/>
        }
    }
}

export default SongsScreen