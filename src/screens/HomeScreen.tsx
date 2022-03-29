import { FC, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  FlatList,
  IScrollViewProps,
  ScrollView,
  Text,
  View,
} from 'native-base'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import User from '../components/User'

type Users = {}

type ScrollViewRef = IScrollViewProps & {
  scrollTo: (options?: { y: number; x?: number; animated: boolean }) => void
}

const HomeScreen: FC = () => {
  const [users, setUsers] = useState<any[]>([])
  const [results, setResults] = useState(3)

  const [showFilters, setShowFilters] = useState(false)

  const scrollViewRef = useRef<ScrollViewRef>()

  useEffect(() => {
    let screenMounted = true

    const fetchUsers = async () => {
      try {
        const request = await fetch(`https://randomuser.me/api/?results=${6}`)
        const data: any = await request.json()

        setUsers((prevState) => {
          return [...prevState, ...data.results]
        })
      } catch (err: any) {
        console.log(err)
      }
    }

    fetchUsers()

    return () => {
      screenMounted = false
    }
  }, [])

  function debounce(func: () => void, timeout = 1000) {
    let timer: NodeJS.Timeout

    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
      }, timeout)
    }
  }

  return (
    <View flex={0}>
      <Box height={'100%'}>
        <ScrollView
          ref={scrollViewRef}
          onScrollEndDrag={debounce(() => {
            const fetchUsers = async () => {
              try {
                const request = await fetch(
                  `https://randomuser.me/api/?results=${results}`
                )

                const data: any = await request.json()

                setUsers((prevState) => {
                  return [...prevState, ...data.results]
                })
              } catch (err: any) {
                console.log(err)
              }
            }

            fetchUsers()

            console.log('Scroll End')
          })}
        >
          {users &&
            users.map((item) => {
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
            })}
        </ScrollView>
      </Box>

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
        onPress={() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true })
        }}
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

      {true && (
        <View
          position={'absolute'}
          bottom={0}
          width={'100%'}
          bgColor={'#FFFFFF'}
        >
          <Box>
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
              size={24}
              color='black'
              style={{ position: 'absolute', right: 0 }}
            />
          </Box>
        </View>
      )}
    </View>
  )
}

export default HomeScreen
