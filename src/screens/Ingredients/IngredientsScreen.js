import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
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
    console.log("Hola")
    fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=6d106e958353435ca0dd71bb974c1032&query=${query}&number=50`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ ingredients: json.results });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
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
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.container}>
        <Image style={styles.photo} source={item.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    //const ingredientsArray = getAllIngredientsAPI();
    const { data, isLoading } = this.state;

    return (
      <View>
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
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={this.state.ingredients}
                keyExtractor={({ id }, index) => id}
                renderItem={this.renderIngredient}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}