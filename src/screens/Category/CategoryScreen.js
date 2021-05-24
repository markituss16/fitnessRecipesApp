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
import { List, IconButton } from 'react-native-paper';
import firebase from '../../database/firebaseDB';

const db = firebase.firestore();

export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCat: props.route.params.item,
            category: [],
        }
    }

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
                                <IconButton icon="heart" onPress={() => this.likesPost(item)} />
                                <Text style={styles.socialBarLabel}>{item.likes}</Text>
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
        await db.collection('receptes').where('category', '==', this.state.itemCat.nomCategoria).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                this.state.category.push(doc.data());
            });
            this.setState(this.state.category);
        })
    }

    componentDidMount() {
        this.fetchRecipesData();
    }

    render() {
        const { category } = this.state;
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={category}
                    keyExtractor={item => `${item.title}`}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    renderItem={this.renderRecipes}
                />
            </View>
        );
    }
}