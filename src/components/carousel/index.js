import React, { PureComponent } from 'react'
import Swiper, { Pagination } from 'react-native-snap-carousel'
import PropTypes from 'prop-types'
import {
  View,
  Dimensions
} from 'react-native'
import Item from './item'
import Theme from '../../Theme'
import { connect } from 'react-redux'
import { loadCarouselProducts } from '../../ducks/products'
const { width } = Dimensions.get('window')

const mapStateToProps = state => ({ data: state.products.carousel, position: state.position })
const mapDispatchToProps = {
  loadCarouselProducts
}

class Carousel extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }
  componentWillMount () {
    if (this.props.data.length <= 0) {
      let latitude = 4.57087
      let longitude = -74.2973
      this.props.loadCarouselProducts(latitude, longitude)
    }
  }
  render () {
    return (
      <View style={{ marginTop: 10, overflow: 'hidden' }}>
        <Swiper
          height={200}
          itemHeight={200}
          autoplayInterval={4500}
          sliderHeight={200}
          sliderWidth={width}
          itemWidth={width}
          containerCustomStyle={{ flexGrow: 1 }}
          data={this.props.data}
          renderItem={({ item }) => <Item {...item} />}
          onBeforeSnapToItem={index => this.setState({ activeSlide: index })}
          loop
          autoplay />
        <Pagination
          dotsLength={this.props.data.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ paddingVertical: 10 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: Theme.colors.primary
          }}
          inactiveDotStyle={{
            // Define styles for inactive dots here
            backgroundColor: Theme.colors.gray
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    )
  }
}

Carousel.propTypes = {
  data: PropTypes.array.isRequired
}
Carousel.defaultProps = {
  data: []
}
export default connect(mapStateToProps, mapDispatchToProps)(Carousel)
