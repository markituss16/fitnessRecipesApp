import React from 'react';
import styles from './styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
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
    Button
} from 'react-native';
import { recipes } from '../../data/dataArrays';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe');
    };

    renderRecipes = ({ item }) => (
        <TouchableHighlight onPress={() => this.onPressRecipe(item)}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author} onPress={() => this.props.navigation.navigate('Perfil') }>{item.author}</Text>
                    </View>
                </View>
                <Image style={styles.cardImage} source={item.photo_url} />
                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <FavoriteIcon color="disabled"/>
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <BookmarkIcon color="disabled"/>
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={recipes}
                    keyExtractor={item => `${item.recipeId}`}
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