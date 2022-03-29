import 'react-native-gesture-handler'
import { NativeBaseProvider, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import BottomNaviagtion from './src/navigation/BottomNaviagtion'
import { AppProvider } from './src/context/context'

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppProvider>
          <View flex={1}>
            <BottomNaviagtion />
          </View>
        </AppProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
