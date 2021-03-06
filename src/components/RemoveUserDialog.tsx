import { Box, Button, Modal, ScrollView, Text } from 'native-base'
import { FC, memo } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useGlobalContext } from '../context/context'

interface Props {
  showRemoveModal: boolean
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>
  userEmail: string
  fullName: string
}

const RemoveUserDialog: FC<Props> = ({
  showRemoveModal,
  setShowRemoveModal,
  userEmail,
  fullName,
}) => {
  const { users, setUsers } = useGlobalContext()

  const handleOnPressYes = () => {
    setUsers(users.filter((item) => item.email !== userEmail))
  }

  const handleOnPressNo = () => {
    setShowRemoveModal(false)
  }

  return (
    <Modal isOpen={showRemoveModal} size={'lg'}>
      <Modal.Content maxH='212' bgColor={'#FFFFFF'}>
        <Modal.Header alignItems={'center'}>
          <AntDesign name='delete' size={28} color='#42A5F5' />

          <Text
            color={'#323232'}
            fontWeight={700}
            fontSize={18}
            lineHeight={21}
            mt={5}
          >
            Remove {fullName}
          </Text>

          <Text
            color={'#555555'}
            fontWeight={400}
            fontSize={18}
            lineHeight={21}
            mt={3}
          >
            Are you sure?
          </Text>

          <Box
            flexDirection={'row'}
            width={'100%'}
            mt={8}
            justifyContent={'center'}
          >
            <Button
              variant='outline'
              colorScheme='info'
              size={'lg'}
              onPress={handleOnPressNo}
            >
              No
            </Button>

            <Button
              colorScheme='info'
              ml={5}
              size={'lg'}
              onPress={handleOnPressYes}
            >
              Yes
            </Button>
          </Box>
        </Modal.Header>
      </Modal.Content>
    </Modal>
  )
}

export default memo(RemoveUserDialog)
