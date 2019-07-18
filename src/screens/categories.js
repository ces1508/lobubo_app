import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import Api from '../api'
import InputFilter from '../components/inputFilter'
import CategoryItem from '../components/categoryItem'
import Empty from '../components/emptyList'

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
    return (
      <FlatList
        data={this.state.data}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<InputFilter onChangeText={this.handleInput} />}
        ListEmptyComponent={<Empty isLoading={this.state.isLoading} />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CategoryItem item={item} navigation={this.props.navigation} />}
      />
    )
  }
}
