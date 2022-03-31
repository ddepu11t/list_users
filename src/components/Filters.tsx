import { Box, Button, Center, Modal, Text } from 'native-base'
import { FC, memo, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

type FilterType = {
  gender: string
  results: number
}

interface Props {
  showFilters: boolean
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
  filters: FilterType
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
}

const Filters: FC<Props> = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
}) => {
  const [newResults, setNewResults] = useState(filters.results)
  const [newGender, setNewGender] = useState(filters.gender)

  const handleDecreseNoOfResults = () => {
    setNewResults((prevState) => {
      if (prevState > 1) {
        return prevState - 1
      } else {
        return prevState
      }
    })
  }

  const handleIncreaseNoOfResults = () => {
    setNewResults((prevState) => prevState + 1)
  }

  const handleCancel = () => {
    setShowFilters(false)
  }

  const handleSave = () => {
    setFilters({ gender: newGender, results: newResults })
    setShowFilters(false)
  }

  return (
    <Center>
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        size={'lg'}
      >
        <Modal.Content
          width={'100%'}
          borderTopRightRadius={15}
          borderTopLeftRadius={15}
          style={{
            paddingBottom: 15,
            marginBottom: 5,
            marginTop: 'auto',
          }}
        >
          <Modal.CloseButton />

          <Modal.Header>
            <Text
              fontWeight={700}
              fontSize={18}
              lineHeight={21}
              color={'#555555'}
              textAlign={'center'}
            >
              Filters
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Box
              borderBottomWidth={1}
              borderColor={'#9797974D'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              px={2}
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
                  onPress={handleDecreseNoOfResults}
                />
                <Text
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                  color={'#323232'}
                  mx={2}
                  textAlign={'center'}
                >
                  {newResults}
                </Text>

                <AntDesign
                  name='pluscircleo'
                  size={22}
                  color={'black'}
                  onPress={handleIncreaseNoOfResults}
                />
              </Box>
            </Box>

            {/* Gender */}
            <Box
              mt={5}
              flexDirection={'row'}
              justifyContent={'space-between'}
              px={2}
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
                  bgColor={newGender === 'female' ? '#463264' : '#E2E2E2'}
                  color={newGender === 'female' ? '#FFFFFF' : '#ABABAB'}
                  borderTopLeftRadius={10}
                  borderBottomLeftRadius={10}
                  onPress={() => setNewGender('female')}
                >
                  F
                </Button>

                <Button
                  bgColor={newGender === 'male' ? '#463264' : '#E2E2E2'}
                  color={newGender === 'male' ? '#FFFFFF' : '#ABABAB'}
                  borderTopRightRadius={10}
                  borderBottomRightRadius={10}
                  onPress={() => setNewGender('male')}
                >
                  M
                </Button>
              </Box>
            </Box>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group
              space={2}
              justifyContent={'space-between'}
              width={'90%'}
              mx={'auto'}
              // borderWidth={1}
            >
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={handleCancel}
                bgColor={'#FFFFFF'}
                color={'#555555'}
                width={'50%'}
              >
                Cancel
              </Button>

              <Button
                onPress={handleSave}
                bgColor={'#463264'}
                color={'#FFFFFF'}
                width={'50%'}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  )
}

export default memo(Filters)
