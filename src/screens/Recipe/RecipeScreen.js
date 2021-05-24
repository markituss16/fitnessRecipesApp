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
import { List } from 'react-native-paper';

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
            <ScrollView>
                <View style={{ borderBottomWidth: 0.4, marginBottom: 5, borderBottomColor: 'grey' }}>
                    <Image style={styles.photoIngredient} source={{ uri: item.image }} />
                </View>
                <View style={styles.infoRecipeContainer}>
                    <Text style={styles.infoRecipeName}>{item.title}</Text>
                    <Text style={styles.author}>{item.username}</Text>
                    <View style={styles.infoContainer}>
                        <Image style={styles.infoPhoto} source={require('../../../assets/time.png')} />
                        <Text style={styles.infoRecipe}>{item.time}</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoDescriptionRecipe}>{item.infoRecipe}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoIngredients}>
                    <Text style={styles.titol}>Ingredients</Text>
                    <Text>{item.guest} comensals</Text>
                    <Text>{item.ingredient1}</Text>
                    <View style={styles.divider} />
                    <Text>{item.ingredient2}</Text>
                    <View style={styles.divider} />
                    <Text>{item.ingredient3}</Text>
                    <View style={styles.divider} />
                    <Text>{item.ingredient4}</Text>
                    <View style={styles.divider} />
                    <Text>{item.ingredient5}</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.infoIngredients}>
                    <Text style={styles.titol}>Passos</Text>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View item>
                            <List.Icon icon="numeric-1-box" />
                        </View>
                        <Text style={{paddingTop: 17}}>{item.step1}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View item>
                            <List.Icon icon="numeric-2-box" />
                        </View>
                        <Text style={{paddingTop: 17}}>{item.step2}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View item>
                            <List.Icon icon="numeric-3-box" />
                        </View>
                        <Text style={{paddingTop: 17}}>{item.step3}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View item>
                            <List.Icon icon="numeric-4-box" />
                        </View>
                        <Text style={{paddingTop: 17}}>{item.step4}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View item>
                            <List.Icon icon="numeric-5-box" />
                        </View>
                        <Text style={{paddingTop: 17}}>{item.step5}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}