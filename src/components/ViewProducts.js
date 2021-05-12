import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';

const ViewIngredientsButton = props => {
    const {onPress} = props;
      return (
        <TouchableHighlight onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>View Ingredients</Text>
          </View>
        </TouchableHighlight>
      );
}

export default ViewIngredientsButton;