import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Text, View } from 'native-base'
import { Animated, SafeAreaView } from 'react-native'
import { AntDesign, Octicons } from '@expo/vector-icons'
import User from '../../components/User'
import { fetchUsers } from '../../service/api'
import Spinner from '../../components/Spinner'
import Filters from '../../components/Filters'
import { useGlobalContext } from '../../context/context'

import { UserInterfece } from '../../interfaces'

type RenderItemProps = {
  item: UserInterfece
  index: number
}

const HomeScreen: FC = () => {
  const { users, loading, setUsers } = useGlobalContext()

  const [filters, setFilters] = useState({
    gender: 'female',
    results: 3,
  })

  const [fetchingMoreUsers, setFetchingMoreUsers] = useState(false)

  const [showFilters, setShowFilters] = useState(false)

  const flatListRef = useRef<any>(null)

  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let screenMounted = true

    const callFetchUsers = async () => {
      const users = await fetchUsers(10, filters.gender)

      screenMounted && setUsers(users)
    }

    callFetchUsers()

    return () => {
      screenMounted = false
    }
  }, [filters.gender])

  const handleScrollToTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, y: 0 })
  }

  const handleReachedEndOfTheList = async () => {
    if (!fetchingMoreUsers) {
      setFetchingMoreUsers(true)

      const newUsers = await fetchUsers(filters.results, filters.gender)

      setUsers([...users, ...newUsers])

      setFetchingMoreUsers(false)
    }
  }

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 118,
      offset: 118 * index,
      index,
    }),
    []
  )

  const flatListRederItem = useCallback(({ item, index }: RenderItemProps) => {
    const itemSize = 118 + 8

    const inputRange = [-1, 0, itemSize * index, itemSize * (index + 2)]

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    })

    return <User {...item} scale={scale} />
  }, [])

  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
    }
  )

  const keyExtractor = useCallback((item) => item.dob, [])

  return (
    <View flex={0}>
      <Box height={'100%'}>
        {loading ? (
          <Spinner message='fetching users...' />
        ) : (
          <Animated.FlatList
            ref={flatListRef}
            onScroll={handleOnScroll}
            keyExtractor={keyExtractor}
            data={users}
            renderItem={flatListRederItem}
            onEndReachedThreshold={0.2}
            onEndReached={handleReachedEndOfTheList}
            contentContainerStyle={{ paddingVertical: 5 }}
            maxToRenderPerBatch={filters.results + 3}
            getItemLayout={getItemLayout}
            style={{ paddingTop: 10, paddingBottom: 10 }}
          />
        )}
      </Box>

      {fetchingMoreUsers ? (
        <View
          position={'absolute'}
          bottom={0}
          width={'100%'}
          bgColor={'#86becb'}
          py={1}
          zIndex={5}
        >
          <Spinner message='fetching users...' mt={0} />
        </View>
      ) : null}

      {/* Scroll To Top Arrow && Filters Buttons */}
      {!showFilters ? (
        <>
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
            onPress={handleScrollToTop}
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
            onPress={() => setShowFilters(true)}
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
        </>
      ) : null}

      {showFilters ? (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      ) : null}
    </View>
  )
}

export default HomeScreen
