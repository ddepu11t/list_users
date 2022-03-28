import { View } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AccountScreen from '../screens/AccountScreen'
import HomeScreen from '../screens/HomeScreen'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#FFFFFF',
          paddingBottom: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarLabelStyle: { fontSize: 12, color: '#636363', lineHeight: 24 },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <FontAwesome name='home' size={30} color='black' />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <MaterialCommunityIcons
                name='account-circle-outline'
                size={30}
                color='black'
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation
