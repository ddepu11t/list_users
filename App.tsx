import 'react-native-gesture-handler'
import { NativeBaseProvider, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import BottomNaviagtion from './src/navigation/BottomNaviagtion'

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <View flex={1}>
          <BottomNaviagtion />
        </View>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
