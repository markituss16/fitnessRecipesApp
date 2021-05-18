import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    FlatList,
    Button
} from 'react-native'
import styles from './styles';
import firebase from '../../database/firebaseDB';
import { List } from 'react-native-paper';

const db = firebase.firestore();

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            list: []
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    renderRecipes = ({ item }) => (
        <TouchableHighlight onPress={() => this.onPressRecipe(item)}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('Perfil')}>{item.username}</Text>
                    </View>
                </View>
                <Image style={styles.cardImage} source={{ uri: item.image }} />
                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <List.Icon icon="heart" />
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <List.Icon icon="bookmark" />
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    fetchUserRecipesData = async () => {
        await db.collection('receptes').where('username', '==', firebase.auth().currentUser.displayName).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                this.state.list.push(doc.data());
            });
            this.setState(this.state.list);
        })
    }

    componentDidMount() {
        this.fetchUserRecipesData();
    }

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.gearButton}>
                        <List.Icon icon="exit-to-app" onPress={() => this.signOut()} />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{this.state.displayName}</Text>
                    <Text style={styles.aboutUser}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     </Text>
                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>15</Text>
                            <Text style={styles.userInfoSubTitle}>Publicacions</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>20</Text>
                            <Text style={styles.userInfoSubTitle}>Favorits</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.container}>
                        <FlatList style={styles.list}
                            data={this.state.lista}
                            keyExtractor={item => `${item.title}`}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.separator} />
                                )
                            }}
                            renderItem={this.renderRecipes}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}