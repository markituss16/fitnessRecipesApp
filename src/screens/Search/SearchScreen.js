import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import firebase from '../../database/firebaseDB';

const db = firebase.firestore();

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: []
    };
  }

  handleSearch(text) {
    var recipeArray1 = this.fetchRecipesData(text);
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data: recipeArray1
      });
    }
  };

  fetchRecipesData = async(recipeName) => {
    const recipes = [];
    await db.collection('receptes').doc(recipeName).get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        recipes.push(doc.data());
      });
    });
    return recipes;
  }

  getValue = () => {
    return this.state.value;
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(101, 96, 71, 0.2)'>
      <View style={styles.container}>
        <Image style={styles.photo} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView>
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
              value={this.state.value}
            />
          </View>
          <View>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={this.state.data}
              renderItem={this.renderRecipes}
              keyExtractor={item => `${item.title}`}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}