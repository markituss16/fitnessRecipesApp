import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../database/firebaseDB';
import styles from './styles';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    userLogin = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Has d\'entrar dades per a iniciar sessió!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    console.log('Usuari iniciat!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('MyFitnessRecipes')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    userAnonymously = () => {
        firebase
        .auth().signInAnonymously().then(() => {
            this.props.navigation.navigate('MyFitnessRecipes')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Contrasenya"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <Button
                    color="#3740FE"
                    title="Iniciar sessió"
                    onPress={() => this.userLogin()}
                />
                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    No tens un compte? Registra't
                </Text>
                <Text
                    style={styles.loginText}
                    onPress={() => this.userAnonymously()}>
                    Entra com a convidat
                </Text>
            </View>
        );
    }
}