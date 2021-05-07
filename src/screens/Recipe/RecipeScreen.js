import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import styles from './styles';
//import Carousel, { Pagination } from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const { width: viewportWidth } = Dimensions.get('window');
/*
export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
    }

    renderImage = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={item} />
            </View>
        </TouchableHighlight>
    );

    render() {
        const { activeSlide } = this.state;
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        return (
            <ScrollView style={styles.container}>
                <View style={styles.carouselContainer}>
                    <View style={styles.carousel}>
                        <Carousel
                            ref={c => {
                                this.slider1Ref = c;
                            }}
                            data={item.photosArray}
                            renderItem={this.renderImage}
                            sliderWidth={viewportWidth}
                            itemWidth={viewportWidth}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            firstItem={0}
                            loop={false}
                            autoplay={false}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            onSnapToItem={index => this.setState({ activeSlide: index })}
                        />
                        <Pagination
                            dotsLength={item.photosArray.length}
                            activeDotIndex={activeSlide}
                            containerStyle={styles.paginationContainer}
                            dotColor="rgba(255, 255, 255, 0.92)"
                            dotStyle={styles.paginationDot}
                            inactiveDotColor="white"
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this.slider1Ref}
                            tappableDots={!!this.slider1Ref}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}*/