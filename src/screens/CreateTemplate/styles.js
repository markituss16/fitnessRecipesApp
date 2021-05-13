import { StyleSheet, Dimensions } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';

const styles = StyleSheet.create ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    fons: {
        shadowColor: '#00000021',
        shadowOffset: {
          width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 10,
        backgroundColor:"white"
    },
    titol: {
      fontSize: 18,
      fontWeight: 'bold'
    },
});

export default styles; 