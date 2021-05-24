import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    infoContainer: {
      alignItems: 'center',
      marginBottom: 30
    },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    infoPhoto: {
      height: 100,
      width: 100,
    },
    loginText: {
      color: '#C84348',
      marginTop: 25,
      textAlign: 'center'
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default styles;