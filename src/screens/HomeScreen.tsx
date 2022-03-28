import { FC, useEffect } from 'react'
import { Button, Text, View } from 'native-base'
import { AntDesign, Octicons } from '@expo/vector-icons'

const HomeScreen: FC = () => {
  useEffect(() => {
    let screenMounted = true

    return () => {
      screenMounted = false
    }
  }, [])

  return (
    <View borderWidth={1} flex={1}>
      {/* Scroll To Top Arrow */}
      <Button
        backgroundColor={'#FFFFFF'}
        borderRadius={'20'}
        position={'absolute'}
        right={'8'}
        bottom={'24'}
        width={'43'}
        height={'65'}
        padding={0}
        alignItems={'center'}
        justifyContent={'center'}
        shadow={'5'}
        borderWidth={0.5}
        borderColor={'rgba(0,0,0,0.5)'}
      >
        <AntDesign
          style={{ alignSelf: 'center' }}
          name='arrowup'
          size={28}
          color='#463264'
        />
      </Button>

      {/* Filters Icons */}
      <Button
        backgroundColor={'#FFFFFF'}
        borderRadius={'full'}
        position={'absolute'}
        right={'7'}
        bottom={5}
        width={'55'}
        height={'55'}
        padding={0}
        alignItems={'center'}
        justifyContent={'center'}
        shadow={'5'}
        borderWidth={0.5}
        borderColor={'rgba(0,0,0,0.5)'}
      >
        <Octicons
          style={{ alignSelf: 'center' }}
          name='settings'
          size={24}
          color='#463264'
        />
        <Text
          color={'#463264'}
          fontSize={11}
          fontWeight={400}
          lineHeight={16.5}
        >
          Filters
        </Text>
      </Button>
    </View>
  )
}

export default HomeScreen
