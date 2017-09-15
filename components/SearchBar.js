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
        const { onSearch, show, onChangeText } = this.props
        return (
            <View style={styles.container}>
                <Ionicons name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} style={styles.icon}/>
                <View style={{flex: 1}}>
                    <TextInput 
                        value={this.state.text}
                        onChangeText={(text) => {
                            this.setState({text: text})
                            onChangeText && onChangeText(text)
                        }}
                        autoFocus
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        placeholder='Titel eller melodi...'
                        returnKeyType='search'
                        returnKeyLabel='search'
                        style={styles.input}
                        onSubmitEditing={() => onSearch && onSearch(this.state.text)}
                    />
                </View>
                <Touchable onPress={() => this.clear()} >
                    <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} style={styles.icon}/>
                </Touchable>
            </View>
        )
    }
}

const iosStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 35,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        alignItems: 'center',
    },
    icon: {
        flex: 0,
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        fontSize: 20,
        color: 'gray'
    },
    input: {
        marginHorizontal: 10,
    }
})

const androidStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 3,
        alignItems: 'center',
        elevation: 7,
    },
    icon: {
        flex: 0,
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        fontSize: 25,
        color: 'gray'
    },
    input: {
        marginHorizontal: 10,
        fontSize: 15,
        height: 30,
    }
})

const styles = Platform.OS === 'ios' ? iosStyles : androidStyles

export default SearchBar