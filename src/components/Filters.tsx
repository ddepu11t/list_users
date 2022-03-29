import { Box, Button, Center, Modal, Text } from 'native-base'
import { FC, memo } from 'react'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  showFilters: boolean
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
  setGender: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<React.SetStateAction<number>>
  gender: string
  results: number
}

const Filters: FC<Props> = ({
  showFilters,
  setShowFilters,
  gender,
  setGender,
  setResults,
  results,
}) => {
  const handleDecreseNoOfResults = () => {
    setResults((prevState) => {
      if (prevState > 1) {
        return prevState - 1
      } else {
        return prevState
      }
    })
  }

  const handleIncreaseNoOfResults = () => {
    setResults((prevState) => prevState + 1)
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
                  {results}
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
          </Modal.Body>

          {/* <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowFilters(false)
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowFilters(false)
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer> */}
        </Modal.Content>
      </Modal>
    </Center>
  )
}

export default memo(Filters)
