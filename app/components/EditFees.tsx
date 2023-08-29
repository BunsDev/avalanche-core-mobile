import AvaText from 'components/AvaText'
import { Space } from 'components/Space'
import { View } from 'react-native'
import InputText from 'components/InputText'
import AvaButton from 'components/AvaButton'
import React, { useState } from 'react'
import FlexSpacer from 'components/FlexSpacer'
import { Row } from 'components/Row'
import { useNativeTokenPrice } from 'hooks/useNativeTokenPrice'
import { calculateGasAndFees } from 'utils/Utils'
import { useSelector } from 'react-redux'
import { selectActiveNetwork } from 'store/network'
import { PopableContent } from './PopableContent'

interface EditFeesProps {
  gasPrice: bigint
  gasLimit: number
  onSave: (newGasLimit: number) => void
  onClose?: () => void
}

const gasLimitInfoInfoMessage = (
  <PopableContent message="Gas limit is the maximum units of gas you are willing to use." />
)

const EditFees = ({ gasPrice, gasLimit, onSave, onClose }: EditFeesProps) => {
  const [newGasLimit, setNewGasLimit] = useState(gasLimit)
  const tokenPrice = useNativeTokenPrice().nativeTokenPrice
  const network = useSelector(selectActiveNetwork)
  const [feeError, setFeeError] = useState('')
  const [newFees, setNewFees] = useState<
    ReturnType<typeof calculateGasAndFees>
  >(
    calculateGasAndFees({
      gasPrice,
      tokenPrice,
      tokenDecimals: network?.networkToken?.decimals,
      gasLimit
    })
  )

  const checkCustomGasLimit = (customGasLimit: string) => {
    try {
      const fees = calculateGasAndFees({
        gasPrice,
        tokenPrice,
        tokenDecimals: network?.networkToken?.decimals,
        gasLimit: isNaN(parseInt(customGasLimit)) ? 0 : parseInt(customGasLimit)
      })
      setNewFees(fees)
      setNewGasLimit(fees.gasLimit)
      if (fees.gasLimit === 0) {
        setFeeError('Please enter a valid gas limit')
      } else {
        feeError && setFeeError('')
      }
    } catch (e) {
      setFeeError('Gas Limit is too much')
    }
  }

  const handleOnSave = () => {
    if (newGasLimit) {
      onSave(newGasLimit)
      onClose?.()
    }
  }

  const saveDisabled = !!feeError || newGasLimit === 0

  return (
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <AvaText.LargeTitleBold textStyle={{ marginHorizontal: 12 }}>
        Edit Gas Limit
      </AvaText.LargeTitleBold>
      <Space y={24} />
      <Row style={{ marginHorizontal: 12, alignItems: 'flex-end' }}>
        <AvaText.Heading1>{newFees.fee}</AvaText.Heading1>
        <Space x={4} />
        <AvaText.Heading3>
          {network?.networkToken?.symbol?.toUpperCase()}
        </AvaText.Heading3>
      </Row>
      <InputText
        label={'Gas Limit'}
        mode={'amount'}
        text={newGasLimit === 0 ? '' : newGasLimit.toString()}
        popOverInfoText={gasLimitInfoInfoMessage}
        onChangeText={checkCustomGasLimit}
        errorText={feeError}
      />
      <FlexSpacer />
      <AvaButton.PrimaryLarge
        disabled={saveDisabled}
        style={{ marginHorizontal: 12 }}
        onPress={handleOnSave}>
        Save
      </AvaButton.PrimaryLarge>
    </View>
  )
}
export default EditFees
