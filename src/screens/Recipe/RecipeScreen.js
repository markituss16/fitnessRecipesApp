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
            activeSlide: 0
        };
    }

    renderImage = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={item} />
            </View>
        </TouchableHighlight>
    );

    render() {
        //const { navigation } = this.props;
        //const item = navigation.getParam('item');
        return (
            <ScrollView style={styles.container}>
                <View style={styles.infoRecipeContainer}>
                    <View style={styles.infoContainer}>
                        <Image style={styles.infoPhoto} source={require('../../../assets/arroz.jpg')} />
                        <Text style={styles.infoRecipe}>20 minutes </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoDescriptionRecipe}>redvgrfbfb</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}