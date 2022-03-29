import { Box, Button, Image, Text, View } from 'native-base'
import { FC, memo, useState } from 'react'
import Share from 'react-native-share'
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import RemoveUserDialog from './RemoveUserDialog'

interface Props {
  dpURL: string
  fullName: string
  isActive: boolean
  mobileNumber: string
  email: string
  gender: string
}

const User: FC<Props> = ({
  dpURL,
  email,
  fullName,
  gender,
  isActive,
  mobileNumber,
}) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const handleShareUser = async () => {
    try {
      const shareResponse = await Share.open({
        message: `Email: ${email}\nMobile Number: ${mobileNumber}`,
      })
    } catch (err: any) {
      console.log(err)
    }
  }

  const handleDeleteUser = () => {
    setShowRemoveModal(true)
  }

  const rightSwipeActions = () => {
    return (
      <View
        flexDirection={'row'}
        justifyContent={'flex-end'}
        flex={1}
        height={'91%'}
      >
        <Button
          padding={0}
          bgColor={'#42A5F5'}
          width={76}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={handleShareUser}
        >
          <SimpleLineIcons name='share-alt' size={24} color='#ffffff' />
        </Button>

        <Button
          padding={0}
          bgColor={'#E2658C'}
          width={76}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={handleDeleteUser}
        >
          <MaterialCommunityIcons
            name='window-close'
            size={24}
            color='#f7f7f7'
          />
        </Button>
      </View>
    )
  }

  const swipeFromRightOpen = () => {
    console.log('Swipe from right')
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={swipeFromRightOpen}
      >
        <View
          flexDirection={'row'}
          bgColor={'#FFFFFF'}
          paddingX={'3'}
          paddingY={'2'}
          mb={'3'}
          borderRadius={'6'}
          // shadow={'0.5'}
        >
          <Image
            source={{ uri: dpURL }}
            alt={'dp'}
            width={'97'}
            height={'98'}
            borderRadius={'full'}
          />

          <Box ml={'5'}>
            <Text fontSize={18} fontWeight={700} lineHeight={'24'}>
              {fullName}
            </Text>

            <Box flexDirection={'row'} alignItems={'center'} mt={5}>
              <View
                width={2}
                height={2}
                bgColor={gender === 'male' ? '#195A50' : '#822841'}
                borderRadius={'full'}
              />

              <Text ml={2} fontSize={12} fontWeight={400} lineHeight={'14'}>
                {gender === 'male' ? 'Active' : 'Inactive'} | {email}
              </Text>
            </Box>

            <Text fontSize={14} fontWeight={400} lineHeight={'16'} mt={2}>
              {mobileNumber}
            </Text>
          </Box>

          <Box position={'absolute'} right='4' top={3} alignItems='flex-end'>
            <Button bgColor={'#195A50'} borderRadius={20} px={5}>
              {gender}
            </Button>
          </Box>

          <RemoveUserDialog
            showRemoveModal={showRemoveModal}
            setShowRemoveModal={setShowRemoveModal}
            userEmail={email}
          />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default memo(User)
