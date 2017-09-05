import React from 'react'
import { 
    View, 
    Text, 
    FlatList,
    StyleSheet 
} from 'react-native'
import R from 'ramda'

import ListItem from '../components/ListItem'

class AllSongsScreen extends React.Component {
    static navigationOptions = {
        title: 'Songs',
    }

    state = {
        songs: {},
        filter: '',
    }

    componentWillMount() {
        console.log('WILL FETCH SONGS')
        fetch('http://www.dsek.se/arkiv/sanger/api.php?all')
        .then(res => res.json())
        .then(res => {
            res = R.mapObjIndexed((val, key, obj) => R.assoc('id', key, val))(res)
            this.setState({songs: res})
            console.log(`Fetched ${R.values(res).length} songs`)
        })
        .catch(err => console.error(err))
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <FlatList 
                    data={R.values(this.state.songs)}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => {
                        return (
                            <ListItem 
                                text={item.title} 
                                onPress={() => navigation.navigate('Song', {song: item})}
                            />
                        )
                    }}
                />
            </View>
        )
    }
}

export default AllSongsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    }
})