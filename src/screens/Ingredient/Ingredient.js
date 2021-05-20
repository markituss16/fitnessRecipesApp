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
import { DataTable } from 'react-native-paper';

export default class IngredientScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: [],
            item: props.route.params.item,
            isLoading: true,
        };
    }

    getAllIngredient() {
        fetch(`https://api.spoonacular.com/food/ingredients/${this.state.item.id}/information?apiKey=5db9859190b844508938ab2440044e2c&amount=1`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ ingredient: json });
                console.log(this.state.ingredient)
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
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
                    <Image style={styles.photoIngredient} source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/`+ ingredient.image}}/>
                </View>
                <Text style={styles.ingredientInfo}>{ingredient.original}</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Nutrients</DataTable.Title>
                        <DataTable.Title>Quantitat</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell numeric></DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
        );
    }
}