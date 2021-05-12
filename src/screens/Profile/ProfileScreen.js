import React, { Component } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    FlatList,
    Button
} from 'react-native'
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import firebase from '../../database/firebaseDB';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    renderRecipes = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                </View>
                <Image style={styles.cardImage} source={item.photo_url} />
                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <FavoriteIcon color="disabled" />
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                                <BookmarkIcon color="disabled" />
                                <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.gearButton}>
                        <ExitToAppIcon fontSize="large" onClick={() => this.signOut()} />
                    </TouchableOpacity>
                    <Image
                        style={styles.userImg}
                        source={require('../../../assets/avatar.png')}
                    />
                    <Text style={styles.userName}>{this.state.displayName}</Text>
                    <Text style={styles.aboutUser}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     </Text>
                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>15</Text>
                            <Text style={styles.userInfoSubTitle}>Publicacions</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>20</Text>
                            <Text style={styles.userInfoSubTitle}>Favorits</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.container}>
                        <FlatList style={styles.list}
                            data={recipes}
                            keyExtractor={item => `${item.recipeId}`}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.divider} />
                                )
                            }}
                            renderItem={this.renderRecipes}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}