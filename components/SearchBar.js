import React from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

class SearchBar extends React.Component {

    clear() {
        const { onClear } = this.props
        onClear && onClear('')
    }

    render() {
        const { onSearch, show, onChangeText, value } = this.props
        if(show) {
            return (
                <View style={styles.background}>
                    <View style={styles.container}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} style={styles.icon}/>
                        <View style={{flex: 1}}>
                            <TextInput 
                                value={value}
                                onChangeText={(text) => {
                                    onChangeText && onChangeText(text)
                                }}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                placeholder='Titel eller melodi...'
                                returnKeyType='search'
                                returnKeyLabel='search'
                                style={styles.input}
                                onSubmitEditing={() => onSearch && onSearch(value)}
                            />
                        </View>
                        <Touchable onPress={() => this.clear()} >
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} style={styles.icon}/>
                        </Touchable>
                    </View>
                </View>
            )
        }
        else {
            return <View></View>
        }
    }
}

const iosStyles = StyleSheet.create({
    background: {
        backgroundColor: '#C1C1C7'
    },
    container: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
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
    background: {
        margin: 0, // Worthless styling that is needed for ios. Just here as a placeholder
    },
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