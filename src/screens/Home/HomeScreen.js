import React from 'react';
import styles from './styles';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import { recipes } from '../../data/dataArrays';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', { item });
    };

    renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(101, 96, 71, 0.2)'>
            <View style={styles.container}>
                <Image style={styles.photo} source={item.photo_url} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <FlatList
                    vertical 
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={recipes}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.recipeId}`}
                />
            </View>
        );
    }
}