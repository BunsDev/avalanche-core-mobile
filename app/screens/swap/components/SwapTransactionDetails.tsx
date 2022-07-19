import React, { FC } from 'react'
import { useApplicationContext } from 'contexts/ApplicationContext'
import { View } from 'react-native'
import { Space } from 'components/Space'
import AvaText from 'components/AvaText'
import InputText from 'components/InputText'
import { Popable } from 'react-native-popable'
import NetworkFeeSelector, { FeePreset } from 'components/NetworkFeeSelector'
import { Row } from 'components/Row'
import { BigNumber } from 'ethers'
import Big from 'big.js'

const isSlippageValid = (value: string) => {
  if (
    (parseFloat(value) >= 0 &&
      parseFloat(value) <= 100 &&
      value?.length <= 4) ||
    !value
  ) {
    return true
  }
  return false
}

interface SwapTransactionDetailProps {
  review?: boolean
  fromTokenSymbol?: string
  toTokenSymbol?: string
  rate: number
  walletFee?: number
  onGasChange?: (
    gasLimit: number,
    gasPrice: BigNumber,
    feeType: FeePreset
  ) => void
  gasLimit: number
  gasPrice: BigNumber
  slippage: number
  setSlippage?: (slippage: number) => void
  selectedGasFee?: FeePreset
  maxGasPrice?: string
}

export function popableContent(message: string, backgroundColor: string) {
  return (
    <View
      style={{ padding: 8, backgroundColor: backgroundColor, borderRadius: 8 }}>
      <AvaText.Body3>{message}</AvaText.Body3>
    </View>
  )
}

const SwapTransactionDetail: FC<SwapTransactionDetailProps> = ({
  review = false,
  fromTokenSymbol,
  toTokenSymbol,
  rate,
  walletFee,
  onGasChange,
  gasLimit,
  gasPrice,
  slippage,
  setSlippage
}) => {
  // const { gasPrice } = useGasPrice()
  const { theme } = useApplicationContext()
  // const { trxDetails } = useSwapContext()

  // const { navigate } = useNavigation<NavigationProp>()
  const slippageInfoMessage = popableContent(
    'Suggested slippage – your transaction will fail if the price changes unfavorably more than this percentage',
    theme.colorBg3
  )

  const netFeeInfoMessage = popableContent(
    `Gas limit: ${gasLimit} \nGas price: ${gasPrice.toString()} nAVAX`,
    theme.colorBg3
  )

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      {review || (
        <>
          <Space y={16} />
          <AvaText.Heading3>Transaction details</AvaText.Heading3>
          <Space y={16} />
        </>
      )}
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <AvaText.Body2 color={theme.white}>Rate</AvaText.Body2>
        <AvaText.Heading3>
          1 {fromTokenSymbol} ≈ {rate?.toFixed(4)} {toTokenSymbol}
        </AvaText.Heading3>
      </Row>
      <Space y={16} />
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Popable
          content={slippageInfoMessage}
          position={'right'}
          style={{ minWidth: 200 }}
          backgroundColor={theme.colorBg3}>
          <AvaText.Body2 color={theme.white}>
            Slippage tolerance ⓘ
          </AvaText.Body2>
        </Popable>
        {review ? (
          <AvaText.Heading3>{slippage}%</AvaText.Heading3>
        ) : (
          <InputText
            onChangeText={value => {
              const sanitizedValue = value.startsWith('.') ? '0.' : value
              isSlippageValid(sanitizedValue) &&
                setSlippage?.(Number(sanitizedValue))
            }}
            text={slippage.toString()}
            mode={'percentage'}
            keyboardType={'numeric'}
            minHeight={32}
            paddingVertical={0}
            {...{ maxLength: 2, fontSize: 14, lineHeight: 14 }}
            style={{
              backgroundColor: theme.colorBg3,
              borderRadius: 8
            }}
          />
        )}
      </Row>
      {review && (
        <>
          <Space y={16} />
          <Row
            style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Popable
              content={netFeeInfoMessage}
              position={'right'}
              style={{ minWidth: 200 }}
              backgroundColor={theme.colorBg3}>
              <AvaText.Body2 color={theme.white}>Network Fee ⓘ</AvaText.Body2>
            </Popable>
            <AvaText.Heading3>
              {new Big(gasPrice.toString())
                .mul(gasLimit)
                .div(10 ** 18)
                .toFixed(6)}{' '}
              AVAX
            </AvaText.Heading3>
          </Row>
        </>
      )}
      {!review && (
        <>
          <Space y={16} />
          <NetworkFeeSelector gasLimit={gasLimit} onChange={onGasChange} />
          {/*<AvaText.Body3*/}
          {/*  currency*/}
          {/*  textStyle={{ marginTop: 4, alignSelf: 'flex-end' }}>*/}
          {/*  {'test'}*/}
          {/*</AvaText.Body3>*/}
        </>
      )}
      <Space y={16} />
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <AvaText.Body2 color={theme.white}>Avalanche Wallet fee</AvaText.Body2>
        <AvaText.Heading3>{walletFee}</AvaText.Heading3>
      </Row>
    </View>
  )
}

export default SwapTransactionDetail
