import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import {
  getAllIngredients,
} from '../../data/MockData';

export default class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.container}>
        <Image style={styles.photo} source={item[0].photo_url}/>
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: 'grey' }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );
  
  render(){
    const ingredientsArray = getAllIngredients(); 
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={ingredientsArray}
          renderItem={this.renderIngredient}
        />
      </View>
    );
  }
}