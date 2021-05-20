import React from 'react';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import { Image, StyleSheet, Button, Text, View, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebaseDB';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import uuid from 'react-uuid';
import { List } from 'react-native-paper';

const db = firebase.firestore();

export default class CreateTemplateScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: firebase.auth().currentUser.displayName,
            title: '',
            infoRecipe: '',
            time: '',
            guest: 0,
            ingredient1: '',
            ingredient2: '',
            step1: '',
            step2: '',
            image: null,
            uploading: false,
            liked: 0,
            saved: 0,
            postTime: firebase.firestore.FieldValue.serverTimestamp()
        };
    }

    async componentDidMount() {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    }

    /*IMAGE PICKER*/
    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log("taking a photo");
        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        console.log("just picking... ");
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
    /**************************************/

    /**
     * 
     * Firebase form data insertion 
     */

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    submitPost = () => {
        db.collection('receptes').doc(this.state.title).set({
            username: this.state.username,
            image: this.state.image,
            title: this.state.title,
            infoRecipe: this.state.infoRecipe,
            time: this.state.time,
            guest: this.state.guest,
            ingredient1: this.state.ingredient1,
            ingredient2: this.state.ingredient2,
            step1: this.state.step1,
            step2: this.state.step2,
            liked: this.state.liked,
            saved: this.state.saved,
            postTime: this.state.postTime
        })
            .then(() => {
                console.log("Data saved!");
            })
            .catch((error) => {
                console.error("Error escrivint document: ", error);
            });
        this.props.navigation.navigate('Inici');
    }

    render() {
        return (
            <ScrollView>
                <TouchableHighlight onPress={this._pickImage}>
                    <View style={styles.fons}>
                        <Text style={{ alignText: 'right' }}>Upload image</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._takePhoto}>
                    <View style={styles.fons}>
                        <Text style={{ alignText: 'right' }}>Take photo</Text>
                    </View>
                </TouchableHighlight>
                <Image source={{ uri: this.state.image }} style={{ alignItems: 'center', width: 350, height: 200 }} />
                <View style={styles.fons}>
                    <TextInput
                        value={this.state.title}
                        onChangeText={(val) => this.updateInputVal(val, 'title')}
                        style={styles.textField}
                        placeholder="Títol de la recepta"
                    />
                    <TextInput
                        onChangeText={(val) => this.updateInputVal(val, 'infoRecipe')}
                        multiline
                        placeholder="Informació de la recepta"
                    />
                    <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                        <Text>Temps d'elaboració</Text>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'time')} style={{ width: 200 }} label="Ex: 1h 30min" />
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                        <Text>Comensals</Text>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'guest')} style={{ width: 200 }} label="Ex: 3 comensals" />
                    </View>
                </View>
                <View style={styles.fons}>
                    <Text style={styles.titol}>Ingredients</Text>
                    <View container spacing={1} alignItems="flex-end">
                        <View item>
                            <List.Icon icon="numeric-1-box" />
                        </View>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'ingredient1')} label="Ex: Barreja els ous amb la llet fins..." style={{ width: 280 }} />
                    </View>
                    <View container spacing={1} alignItems="flex-end" style={{ marginTop: 10 }}>
                        <View item>
                            <List.Icon icon="numeric-2-box" />
                        </View>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'ingredient2')} label="Ex: Posa la barreja en un motlle i..." style={{ width: 280 }} />
                    </View>
                </View>
                <View style={styles.fons}>
                    <Text style={styles.titol}>Passos</Text>
                    <View container spacing={1} alignItems="flex-end">
                        <View item>
                            <List.Icon icon="food-variant" />
                        </View>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'step1')} label="Ex: Barreja els ous amb la llet fins..." style={{ width: 280 }} />
                    </View>
                    <View container spacing={1} alignItems="flex-end" style={{ marginTop: 10 }}>
                        <View item>
                            <List.Icon icon="food-variant" />
                        </View>
                        <TextInput onChangeText={(val) => this.updateInputVal(val, 'step2')} label="Ex: Posa la barreja en un motlle i..." style={{ width: 280 }} />
                    </View>
                </View>
                <Button
                    color="#C84348"
                    title="Publicar"
                    onPress={() => this.submitPost()}
                />
            </ScrollView>
        );
    }
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(uuid());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it

    return await snapshot.ref.getDownloadURL();
}
