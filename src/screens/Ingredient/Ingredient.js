import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
//import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

export default class IngredientScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: [],
            item: props.route.params.item,
            isLoading: true,
            activeSlide: 0
        };
    }

    getAllIngredient() {
        fetch(`https://api.spoonacular.com/food/ingredients/${this.state.item.id}/information?apiKey=5db9859190b844508938ab2440044e2c`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ ingredient: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    componentDidMount() {
        this.getAllIngredient();
    }

    render() {
        const { ingredient, isLoading } = this.state;
        console.log(ingredient.image);
        return (
            <ScrollView >
                <View >
                    <View >
                        <Image source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/`+ this.state.item.image}}/>
                    </View>
                    <View>
                        <Text>{ingredient.original}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}