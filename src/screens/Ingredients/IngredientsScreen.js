import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';

export default class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      isLoading: true,
      query: ''
    }
  }

  getAllIngredientsAPI(query) {
    fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=5db9859190b844508938ab2440044e2c&query=${query}&number=50`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ ingredients: json.results });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
        console.log(this.state.ingredients)
      });
  }

  handleSearch(text) {
    var ingredientsArray = this.getAllIngredientsAPI(text);
    if (text == '') {
      this.setState({
        query: text,
        ingredients: []
      });
    } else {
      this.setState({
        query: text,
        ingredients: ingredientsArray
      });
    }
  };

  componentDidMount() {
    this.getAllIngredientsAPI();
  }

  onPressIngredient = item => {
    this.props.navigation.navigate('Ingredient', { item });
  }

  renderIngredient = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressIngredient(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/`+ item.image}} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { ingredients, isLoading } = this.state;
    console.log(ingredients)
    return (
      <ScrollView>
        {isLoading ? <ActivityIndicator /> : (
          <View>
            <View>
              <SearchBar
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                  flex: 1
                }}
                inputContainerStyle={{
                  backgroundColor: '#EDEDED'
                }}
                inputStyle={{
                  backgroundColor: '#EDEDED',
                  borderRadius: 10,
                  color: 'black'
                }}
                searchIcond
                clearIcon
                round
                onChangeText={text => {
                  this.handleSearch(text);
                }}
                placeholder="Search"
                value={this.state.query}
              />
            </View>
            <View>
              <FlatList
                vertical
                numColumns={3}
                data={ingredients}
                keyExtractor={({ id }, index) => id}
                renderItem={this.renderIngredient}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}