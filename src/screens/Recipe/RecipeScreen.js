import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import styles from './styles';
//import Carousel, { Pagination } from 'react-native-snap-carousel';

//const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
        };
    }

    render() {
        const { item } = this.state;
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
                    <Image style={styles.photoIngredient} source={{ uri: item.image }} />
                </View>
                <Text style={styles.infoRecipeName}>{item.title}</Text>
                <View style={styles.infoContainer}>
                    <Image style={styles.infoPhoto} source={require('../../../assets/time.png')} />
                    <Text style={styles.infoRecipe}>{item.time}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoDescriptionRecipe}>{item.infoRecipe}</Text>
                </View>
            </ScrollView>
        );
    }
}