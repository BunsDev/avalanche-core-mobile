import React, { FC, useEffect, useState } from 'react'
import { useApplicationContext } from 'contexts/ApplicationContext'
import { View } from 'react-native'
import AvaText from 'components/AvaText'
import { Space } from 'components/Space'
import { useSwapContext } from 'contexts/SwapContext'
import numeral from 'numeral'
import FlexSpacer from 'components/FlexSpacer'
import TokenSelectAndAmount from 'components/TokenSelectAndAmount'
import { mustNumber } from 'utils/JsTools'
import { TokenWithBalance } from 'store/balance'

interface TokenDropDownProps {
  type?: 'From' | 'To'
  error?: string
  onOpenSelectToken: (
    onTokenSelected: (token: TokenWithBalance) => void
  ) => void
}

const TokenDropDown: FC<TokenDropDownProps> = ({
  type,
  error,
  onOpenSelectToken
}) => {
  const context = useApplicationContext()
  const swapContext = useSwapContext()
  const [srcTokenBalance, setSrcTokenBalance] = useState('-')

  const isFrom = type === 'From'

  const selectedToken = isFrom
    ? swapContext.swapFrom.token
    : swapContext.swapTo.token
  const usdValue = isFrom
    ? swapContext.swapFrom.usdValue
    : swapContext.swapTo.usdValue
  const setAmount = isFrom
    ? swapContext.swapFrom.setAmount
    : swapContext.swapTo.setAmount
  const setToken = isFrom
    ? swapContext.swapFrom.setToken
    : swapContext.swapTo.setToken
  const amount = isFrom
    ? swapContext.swapFrom.amount
    : swapContext.swapTo.amount

  useEffect(() => {
    if (!swapContext.swapFrom.token) {
      setSrcTokenBalance('-')
      return
    }

    const tokenWithBal = swapContext.swapFrom.token

    if (tokenWithBal) {
      setSrcTokenBalance(
        `${tokenWithBal.balanceDisplayValue} ${tokenWithBal.symbol}`
      )
    } else {
      setSrcTokenBalance('-')
    }
  }, [swapContext.swapFrom.token])

  return (
    <View style={{ marginHorizontal: 16, flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        {type && <AvaText.Heading3>{type}</AvaText.Heading3>}
        {isFrom && <AvaText.Body2>{srcTokenBalance}</AvaText.Body2>}
      </View>
      <Space y={4} />
      <TokenSelectAndAmount
        selectedToken={selectedToken}
        amount={amount.toString()}
        maxEnabled={isFrom}
        onAmountSet={amount1 =>
          setAmount(mustNumber(() => Number.parseFloat(amount1), 0))
        }
        onOpenSelectToken={() => onOpenSelectToken(setToken)}
      />
      <Space y={8} />
      <View
        style={{
          flexDirection: 'row'
        }}>
        {error && (
          <AvaText.Body3 color={context.theme.colorError}>
            {error}
          </AvaText.Body3>
        )}
        <FlexSpacer />
        <AvaText.Body2>
          {selectedToken
            ? `${numeral(usdValue).format('0[.0000]a')} USD`
            : '$0.00 USD'}
        </AvaText.Body2>
      </View>
    </View>
  )
}

export default TokenDropDown
