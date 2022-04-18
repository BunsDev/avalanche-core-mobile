import React, { FC, useMemo } from 'react'
import {
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { Space } from 'components/Space'
import AvaText from 'components/AvaText'
import AvaButton from 'components/AvaButton'
import SwapNarrowSVG from 'components/svg/SwapNarrowSVG'
import AvaListItem from 'components/AvaListItem'
import DropDown from 'components/Dropdown'
import { Row } from 'components/Row'
import Separator from 'components/Separator'
import Avatar from 'components/Avatar'
import CheckmarkSVG from 'components/svg/CheckmarkSVG'
import {
  AssetType,
  BIG_ZERO,
  Blockchain,
  formatTokenAmount
} from '@avalabs/bridge-sdk'
import { Big } from '@avalabs/avalanche-wallet-sdk'
import AppNavigation from 'navigation/AppNavigation'
import CarrotSVG from 'components/svg/CarrotSVG'
import InputText from 'components/InputText'
import useBridge from 'screens/bridge/hooks/useBridge'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BridgeStackParamList } from 'navigation/wallet/BridgeScreenStack'
import { useApplicationContext } from 'contexts/ApplicationContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const formatBalance = (balance: Big | undefined) => {
  return balance && formatTokenAmount(balance, 6)
}

const Bridge: FC = () => {
  const navigation = useNavigation<StackNavigationProp<BridgeStackParamList>>()
  const theme = useApplicationContext().theme
  const {
    assetPrice,
    currentBlockchain,
    currentAsset,
    setCurrentBlockchain,
    setAmount,
    amount,
    amountTooLowError,
    txFee,
    transferCost,
    transferAsset,
    blockchainTokenSymbol,
    targetBlockchain,
    setTargetBlockchain,
    sourceBalance,
    setCurrentAsset,
    setPending,
    bridgeError,
    tokenInfoContext,
    maxTransferAmount,
    setTransactionDetails,
    assetInfo,
    pending,
    amountTooHighError,
    transferDisabled
  } = useBridge()

  const isBitcoinBalanceZero =
    (sourceBalance?.balance?.lte(BIG_ZERO) ?? true) &&
    currentBlockchain === Blockchain.BITCOIN

  /**
   * Used to display currently selected and dropdown items.
   * When used to render current item, showCheckmarks is false
   * When used to render dropdown items, showCheckmark is true
   * currently selected
   *
   * Added additional parameter 'selectedBlockchain' in preparation for Bitcoin'
   *
   * @param blockchain
   * @param selectedBlockchain
   * @param showCheckmark
   */
  function dropdownItemFormat(
    blockchain: string,
    selectedBlockchain?: Blockchain,
    showCheckmark = true
  ) {
    const isSelected = showCheckmark && blockchain === selectedBlockchain
    return (
      <Row
        style={{
          paddingVertical: 8,
          paddingHorizontal: 8,
          alignItems: 'center'
        }}>
        <Avatar.Custom
          name={blockchain}
          symbol={
            blockchain === Blockchain.AVALANCHE
              ? 'AVAX'
              : blockchain === Blockchain.ETHEREUM
              ? 'ETH'
              : 'BTC'
          }
        />
        <Space x={8} />
        <AvaText.Body1>{blockchain.toUpperCase()}</AvaText.Body1>
        {isSelected && (
          <>
            <Space x={8} />
            <CheckmarkSVG color={'white'} />
          </>
        )}
      </Row>
    )
  }

  /**
   * Opens token selection modal
   */
  const navigateToTokenSelector = () => {
    navigation.navigate(AppNavigation.Modal.BridgeSelectToken, {
      onTokenSelected: setCurrentAsset
    })
  }

  /**
   * Opens Add bitcoin instructions modal
   */
  const navigateToAddBitcoinInstructions = () => {
    navigation.navigate(AppNavigation.Bridge.AddInstructions, {
      onTokenSelected: setCurrentAsset
    })
  }

  /**
   * Method used to render custom dropdown item
   * @param item
   * @param blockchain
   */
  const renderDropdownOptions = (
    item: ListRenderItemInfo<string>,
    blockchain = Blockchain.AVALANCHE
  ) => {
    return dropdownItemFormat(item.item, blockchain)
  }

  /**
   * Blockchain array that's fed to dropdown
   */
  const blockChainItems = useMemo(() => {
    return [Blockchain.AVALANCHE, Blockchain.BITCOIN, Blockchain.ETHEREUM]
  }, [])

  const handleAmountChanged = (value: string) => {
    /**
     * Split the input and make sure the right side never exceeds
     * the denomination length
     */
    setAmount(new Big(value || 0))
  }

  /**
   * Handles transfer transaction
   */
  const handleTransfer = async () => {
    if (BIG_ZERO.eq(amount)) {
      return
    }

    try {
      setPending(true)
      const result = await transferAsset(amount)

      if (!result?.hash) {
        return
      }

      setTransactionDetails({
        tokenSymbol:
          assetInfo.assetType === AssetType.NATIVE
            ? assetInfo.wrappedAssetSymbol
            : currentAsset || '',
        amount
      })

      // Navigate to transaction status page
      navigation.navigate(AppNavigation.Bridge.BridgeTransactionStatus, {
        blockchain: currentBlockchain as string,
        txHash: result.hash,
        txTimestamp: Date.now().toString()
      })
    } catch (e) {
      const error = e as Error
      Alert.alert(
        'Error Bridging',
        error?.reason ??
          'An unknown error has occurred. Bridging was halted. Please try again later'
      )
      return
    } finally {
      setPending(false)
    }
  }

  const calculateEstimatedTotal = useMemo(() => {
    if (!transferCost) {
      return
    }
    const amountMinusTransfer = amount.minus(transferCost)
    return `${assetPrice.mul(amountMinusTransfer).toNumber()}`
  }, [transferCost, amount, assetPrice])

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <AvaText.LargeTitleBold textStyle={{ marginHorizontal: 8 }}>
          Bridge
        </AvaText.LargeTitleBold>
        <Space y={20} />
        <View style={{ backgroundColor: theme.colorBg2, borderRadius: 10 }}>
          <AvaListItem.Base
            title={'From'}
            rightComponent={
              <DropDown
                style={{ marginRight: 19 }}
                filterItems={blockChainItems}
                currentItem={dropdownItemFormat(
                  currentBlockchain,
                  undefined,
                  false
                )}
                onItemSelected={bc => setCurrentBlockchain(bc as Blockchain)}
                customRenderItem={item =>
                  renderDropdownOptions(item, currentBlockchain)
                }
                minWidth={180}
              />
            }
          />
          {isBitcoinBalanceZero && (
            <Row style={{ justifyContent: 'flex-end' }}>
              <AvaButton.Base
                style={{ marginEnd: 16, marginBottom: 8 }}
                onPress={navigateToAddBitcoinInstructions}>
                <AvaText.TextLink>Add Bitcoin</AvaText.TextLink>
              </AvaButton.Base>
            </Row>
          )}
          <Separator inset={16} />
          <View style={styles.fromContainer}>
            <AvaText.Body3
              color={theme.colorText2}
              textStyle={{
                alignSelf: 'flex-end',
                paddingEnd: 16
              }}>
              Balance:
              {sourceBalance?.balance
                ? ` ${formatBalance(sourceBalance?.balance)}`
                : !!currentAsset && <ActivityIndicator size={'small'} />}{' '}
              {blockchainTokenSymbol}
            </AvaText.Body3>
            <Row style={styles.tokenSelectContainer}>
              <Pressable onPress={() => navigateToTokenSelector()}>
                <Row style={styles.tokenRow}>
                  {!!currentAsset && (
                    <>
                      <Avatar.Custom
                        name={blockchainTokenSymbol}
                        symbol={blockchainTokenSymbol}
                        logoUri={
                          tokenInfoContext?.[blockchainTokenSymbol]?.logo
                        }
                      />
                      <Space x={8} />
                    </>
                  )}
                  <AvaText.Body1 textStyle={styles.tokenSelectorText}>
                    {currentAsset ? blockchainTokenSymbol : 'Select'}
                  </AvaText.Body1>
                  <CarrotSVG direction={'down'} size={12} />
                </Row>
              </Pressable>
              <View>
                <InputText
                  width={160}
                  mode={'amount'}
                  keyboardType="numeric"
                  onMax={() => {
                    if (maxTransferAmount) {
                      setAmount(maxTransferAmount.round(6, 0))
                    }
                  }}
                  onChangeText={handleAmountChanged}
                  text={amount.toString()}
                />
                {!currentAsset && (
                  <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => navigateToTokenSelector()}
                  />
                )}
              </View>
            </Row>
            {!amount.eq(BIG_ZERO) && (
              <AvaText.Body3
                currency
                color={theme.colorText2}
                textStyle={{
                  alignSelf: 'flex-end',
                  paddingEnd: 16
                }}>
                {`${assetPrice.mul(amount).toNumber()}`}
              </AvaText.Body3>
            )}
          </View>
        </View>
        {(!!bridgeError || !!amountTooLowError || !!amountTooHighError) && (
          <AvaText.Body3
            textStyle={{ marginVertical: 4 }}
            color={theme.colorError}>
            {bridgeError || amountTooLowError || amountTooHighError}
          </AvaText.Body3>
        )}
        <AvaButton.Base
          onPress={() => {
            setCurrentBlockchain(
              currentBlockchain === Blockchain.AVALANCHE
                ? Blockchain.ETHEREUM
                : Blockchain.AVALANCHE
            )
          }}
          style={[styles.swapButton, { backgroundColor: theme.colorBg2 }]}>
          <SwapNarrowSVG />
        </AvaButton.Base>
        <View style={{ backgroundColor: theme.colorBg2, borderRadius: 10 }}>
          <AvaListItem.Base
            title={'To'}
            rightComponent={
              <DropDown
                style={{ marginRight: 19 }}
                filterItems={blockChainItems}
                currentItem={dropdownItemFormat(
                  targetBlockchain,
                  targetBlockchain,
                  false
                )}
                onItemSelected={bc => setTargetBlockchain(bc as Blockchain)}
                customRenderItem={item =>
                  renderDropdownOptions(item, targetBlockchain)
                }
                minWidth={180}
              />
            }
          />
          <Separator inset={16} />
          <Row style={styles.receiveRow}>
            <View>
              <AvaText.ButtonLarge>Receive</AvaText.ButtonLarge>
              <AvaText.Body3
                color={theme.colorText2}
                textStyle={{ marginTop: 8 }}>
                Estimated (minus transfer fees)
              </AvaText.Body3>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {/* receive amount */}
              <AvaText.Body1>
                {txFee && amount && !BIG_ZERO.eq(amount)
                  ? `${amount.minus(txFee).toNumber().toFixed(9)} `
                  : '- '}
                <AvaText.Body1 color={theme.colorText2}>
                  {currentAsset}
                </AvaText.Body1>
              </AvaText.Body1>
              {/* estimate amount */}
              <AvaText.Body3
                currency
                textStyle={{ marginTop: 8 }}
                color={theme.colorText2}>
                {transferCost && amount && !BIG_ZERO.eq(amount)
                  ? calculateEstimatedTotal
                  : 0}
              </AvaText.Body3>
            </View>
          </Row>
        </View>
      </ScrollView>
      <AvaButton.Base
        style={[
          styles.transferButton,
          { backgroundColor: transferDisabled ? '#FFFFFF80' : theme.white }
        ]}
        onPress={() => {
          handleTransfer()
        }}
        disabled={transferDisabled}>
        <Row>
          {pending && <ActivityIndicator color={theme.background} />}
          <AvaText.ButtonLarge
            textStyle={{ color: theme.background, marginStart: 4 }}>
            Transfer
          </AvaText.ButtonLarge>
        </Row>
      </AvaButton.Base>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8
  },
  fromContainer: {
    flex: 1,
    paddingStart: 16,
    paddingTop: 16,
    paddingBottom: 16
  },
  tokenSelectContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tokenRow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tokenSelectorText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  swapButton: {
    alignSelf: 'flex-end',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16
  },
  receiveRow: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between'
  },
  transferButton: {
    margin: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 12
  }
})

export default Bridge
