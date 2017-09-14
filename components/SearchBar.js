import React from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

class SearchBar extends React.Component {

    state = {
        text: ''
    }

    clear() {
        const { onClear } = this.props
        this.setState({text: ''})
        onClear && onClear('')
    }

    render() {
        const { onSearch, onClear, show } = this.props
        if(show) {
            return (
                <View style={iosStyles.container}>
                    <Ionicons name='ios-search' size={20} style={iosStyles.searchIcon}/>
                    <View style={{flex: 1}}>
                        <TextInput 
                            value={this.state.text}
                            onChangeText={(text) => this.setState({text: text})}
                            autoFocus
                            autoCorrect={false}
                            placeholder='Search...'
                            returnKeyType='search'
                            returnKeyLabel='search'
                            style={iosStyles.input}
                            onSubmitEditing={() => onSearch(this.state.text)}
                        />
                    </View>
                    <Touchable onPress={() => this.clear()}>
                        <Ionicons name='ios-close' size={20} style={iosStyles.clearIcon}/>
                    </Touchable>
                </View>
            )
        }
        else {
            return <View></View>
        }
    }
}

const iosStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 35,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    searchIcon: {
        flex: 0,
        backgroundColor: 'transparent',
        paddingLeft: 10,
    },
    clearIcon: {
        flex: 0,
        backgroundColor: 'transparent',
        paddingRight: 10,
    },
    input: {
        marginHorizontal: 10,
    }
})

const androidStyles = StyleSheet.create({
})

export default SearchBar