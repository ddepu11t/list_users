import { NativeBaseProvider, Text, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import BottomNaviagtion from './src/navigation/BottomNaviagtion'

const App = () => {
  return (
    <NativeBaseProvider>
      <View
        // borderWidth={1}
        flex={1}
        // alignItems={"center"}
        // justifyContent={"center"}
      >
        <NavigationContainer>
          <BottomNaviagtion />
        </NavigationContainer>
      </View>
    </NativeBaseProvider>
  )
}

export default App
