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
import firebase from '../../database/firebaseDB';

const db = firebase.firestore();

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  onPressCategory = item => {
    this.props.navigation.navigate('Category', { item });
  };

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.imatge }} />
        <Text style={styles.categoriesName}>{item.nomCategoria}</Text>
      </View>
    </TouchableHighlight>
  );

  fetchCategoriesData = async () => {
    await db.collection('categories').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
          this.state.categories.push(doc.data());
      });
      this.setState(this.state.categories);
    })
  }

  componentDidMount() {
    this.fetchCategoriesData();
  }

  render() {
    const { categories } = this.state;
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.nomCategoria}`}
        />
      </View>
    );
  }
}