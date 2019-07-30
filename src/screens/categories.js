import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native'
import Api from '../api'
import InputFilter from '../components/inputFilter'
import CategoryItem from '../components/categoryItem'
import Empty from '../components/emptyList'
import ViewWrapper from '../components/ViewWithNavbarAnimated'
import DrawerIcon from '../components/drawerIcon'
import ShoppingCartIcon from '../components/shoppingCartIcon'

export default class CategoriesScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: true,
      data: [],
      q: ''
    }
    this.handleInput = this.handleInput.bind(this)
  }
  async componentDidMount () {
    let categories = await Api.getCategories()
    this.setState({ categories: categories.data.data, data: categories.data.data, isLoading: false })
  }
  handleInput (q) {
    this.setState({
      q,
      data: this.state.categories.filter(item => item.attributes.name.includes(q))
    })
  }
  render () {
    let { navigation } = this.props
    return (
      <ViewWrapper
        leftIcon={<View style={{ paddingRight: 15, marginRight: 17 }}><DrawerIcon navigation={navigation} /></View>}
        title='Lobubo'
        type='hide'
        navBarChildren={<InputFilter onChangeText={this.handleInput} />}
        rightIcon={<ShoppingCartIcon navigation={navigation} />}
        navigation={this.props.navigation}>
        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty isLoading={this.state.isLoading} />}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CategoryItem item={item} navigation={this.props.navigation} />}
        />
      </ViewWrapper>
    )
  }
}
