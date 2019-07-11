import Theme from '../../Theme'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  textEmphasis: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  name: {
  },
  price: {
    color: Theme.colors.secondary
  },
  section: {
    paddingVertical: 20
  },
  sectionTitle: {
    flexDirection: 'row',
    paddingBottom: 0
  }
})
