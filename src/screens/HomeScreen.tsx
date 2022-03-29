import { FC, useEffect, useRef, useState } from 'react'
import { Box, Button, FlatList, Text, View } from 'native-base'
import { AntDesign, Octicons } from '@expo/vector-icons'
import User from '../components/User'
import { fetchUsers } from '../service/api'
import Spinner from '../components/Spinner'
import Filters from '../components/Filters'

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

      <Filters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        gender={gender}
        results={results}
        setGender={setGender}
        setResults={setResults}
      />
    </View>
  )
}

export default HomeScreen
