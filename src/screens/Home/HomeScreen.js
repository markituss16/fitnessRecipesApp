import React from 'react';
import styles from './styles';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { List } from 'react-native-paper';
import firebase from '../../database/firebaseDB';

const db = firebase.firestore();

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            lista: [],
            loading: true,
            authenticated: false,
        }
    }

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', { item });
    };

    renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor={'transparent'} onPress={() => this.onPressRecipe(item)}>
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
                                <Text style={styles.socialBarLabel}>{item.liked}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <List.Icon icon="bookmark" />
                                <Text style={styles.socialBarLabel}>{item.saved}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    fetchRecipesData = async () => {
        this.state.lista = [];
        await db.collection('receptes').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                this.state.lista.push(doc.data());
            });
            this.setState(this.state.lista);
        })
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            this.setState({ loading: false, authenticated: true });
        } else {
            this.setState({ loading: false, authenticated: false });
        }
    }

    render() {
        const { lista } = this.state;
        if (this.state.loading) return null;
        if (!this.state.authenticated) {
            this.props.navigation.navigate('Login');
        }
        this.fetchRecipesData();
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={lista}
                    keyExtractor={item => `${item.postTime}`}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    renderItem={this.renderRecipes}
                />
            </View>
        )
    }
}