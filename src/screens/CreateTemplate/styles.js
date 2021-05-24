import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fons: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 10,
    backgroundColor: "white"
  },
  titol: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default styles;