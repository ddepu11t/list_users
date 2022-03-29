import { FC, useEffect, useRef, useState } from 'react'
import { Box, Button, FlatList, Text, View } from 'native-base'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import User from '../components/User'
import { fetchUsers } from '../service/api'
import Spinner from '../components/Spinner'

type Users = {}

const HomeScreen: FC = () => {
  const [users, setUsers] = useState<{
    data: any[]
    loading: boolean
  }>({ data: [], loading: true })

  const [results, setResults] = useState(6)
  const [gender, setGender] = useState('female')
  const [scrollBottomLoading, setScrollBottomLoading] = useState(false)

  const [showFilters, setShowFilters] = useState(false)

  const flatListRef = useRef<any>(null)

  useEffect(() => {
    let screenMounted = true

    const callFetchUsers = async () => {
      const users = await fetchUsers(results, gender)

      screenMounted && setUsers({ data: users, loading: false })
    }

    callFetchUsers()

    return () => {
      screenMounted = false
    }
  }, [gender])

  const handleReachedEndOfTheList = async () => {
    setScrollBottomLoading(true)

    const users = await fetchUsers(results, gender)

    setUsers((prevState) => ({
      data: [...prevState.data, ...users],
      loading: false,
    }))

    setScrollBottomLoading(false)
  }

  const handleScrollToTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, y: 0 })
  }

  return (
    <View flex={0}>
      <Box height={'100%'}>
        {users.loading ? (
          <Spinner message='fetching users...' />
        ) : (
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.dob.date}
            data={users.data}
            renderItem={({ item }) => {
              let { email, gender, phone } = item

              return (
                <User
                  key={item.dob.date}
                  email={email}
                  gender={gender}
                  mobileNo={phone}
                  dpURL={item.picture.medium}
                  fullName={`${item.name.title} ${item.name.first} ${item.name.last}`}
                  isActive={false}
                />
              )
            }}
            onEndReached={handleReachedEndOfTheList}
          />
        )}

        {scrollBottomLoading && (
          <View
            position={'absolute'}
            bottom={0}
            // justifyContent={'center'}
            width={'100%'}
            bgColor={'#bfbfbf7e'}
            py={1}
          >
            <Spinner message='fetching users...' mt={0} />
          </View>
        )}
      </Box>

      {/* Scroll To Top Arrow && Filters Buttons */}
      {!showFilters && (
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
      )}

      {showFilters && (
        <View
          position={'absolute'}
          bottom={0}
          width={'100%'}
          bgColor={'#FFFFFF'}
          borderTopRadius={15}
          pb={5}
        >
          {/* Header */}
          <Box py={5}>
            <Text
              fontWeight={700}
              fontSize={18}
              lineHeight={21}
              color={'#555555'}
              textAlign={'center'}
            >
              Filters
            </Text>

            <Entypo
              name='cross'
              size={28}
              color='black'
              style={{ position: 'absolute', right: 15, top: 12 }}
              onPress={() => setShowFilters(false)}
            />
          </Box>

          {/* No of Results */}
          <Box
            borderBottomWidth={1}
            borderColor={'#9797974D'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            px={5}
            pb={3}
          >
            <Text
              fontWeight={700}
              fontSize={16}
              lineHeight={24}
              color={'#323232'}
            >
              No. of Results
            </Text>

            <Box flexDirection={'row'}>
              <AntDesign
                name='minuscircleo'
                size={22}
                color='black'
                onPress={() => {
                  setResults((prevState) => {
                    if (prevState > 1) {
                      return prevState - 1
                    } else {
                      return prevState
                    }
                  })
                }}
              />
              <Text
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
                color={'#323232'}
                mx={2}
                textAlign={'center'}
              >
                {results}
              </Text>

              <AntDesign
                name='pluscircleo'
                size={22}
                color={'black'}
                onPress={() => {
                  setResults((prevState) => prevState + 1)
                }}
              />
            </Box>
          </Box>

          {/* Gender */}
          <Box
            mt={5}
            flexDirection={'row'}
            justifyContent={'space-between'}
            px={5}
            pb={3}
            borderBottomWidth={1}
            borderColor={'#9797974D'}
          >
            <Text
              fontWeight={700}
              fontSize={16}
              lineHeight={24}
              color={'#323232'}
            >
              Gender:
            </Text>

            <Box flexDirection={'row'}>
              <Button
                bgColor={gender === 'female' ? '#463264' : '#E2E2E2'}
                color={gender === 'female' ? '#FFFFFF' : '#ABABAB'}
                borderTopLeftRadius={10}
                borderBottomLeftRadius={10}
                onPress={() => setGender('female')}
              >
                F
              </Button>

              <Button
                bgColor={gender === 'male' ? '#463264' : '#E2E2E2'}
                color={gender === 'male' ? '#FFFFFF' : '#ABABAB'}
                borderTopRightRadius={10}
                borderBottomRightRadius={10}
                onPress={() => setGender('male')}
              >
                M
              </Button>
            </Box>
          </Box>
        </View>
      )}
    </View>
  )
}

export default HomeScreen
