import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Animated, RefreshControl, View } from 'react-native'
import AvaText from 'components/AvaText'
import Loader from 'components/Loader'
import {
  getHistory,
  TransactionERC20,
  TransactionNormal,
  useWalletContext
} from '@avalabs/wallet-react-components'
import { ScrollView } from 'react-native-gesture-handler'
import ActivityListItem from 'screens/activity/ActivityListItem'
import { endOfToday, endOfYesterday, format, isSameDay } from 'date-fns'
import { useBridgeSDK } from '@avalabs/bridge-sdk'
import BridgeTransactionItem from 'screens/bridge/components/BridgeTransactionItem'
import { BridgeTransactionStatusParams } from 'navigation/types'
import { Row } from 'components/Row'
import DropDown from 'components/Dropdown'
import useInAppBrowser from 'hooks/useInAppBrowser'
import { isBridgeTransaction } from 'screens/bridge/utils/bridgeTransactionUtils'
import { useApplicationContext } from 'contexts/ApplicationContext'
import {
  isContractCallTransaction,
  isIncomingTransaction,
  isOutgoingTransaction
} from 'utils/TransactionTools'

const yesterday = endOfYesterday()
const today = endOfToday()

interface Props {
  embedded?: boolean
  tokenSymbolFilter?: string
  openTransactionDetails: (item: TransactionNormal | TransactionERC20) => void
  openTransactionStatus: (params: BridgeTransactionStatusParams) => void
}

function ActivityList({
  embedded,
  tokenSymbolFilter,
  openTransactionDetails,
  openTransactionStatus
}: Props) {
  const [loading, setLoading] = useState(true)
  const wallet = useWalletContext()?.wallet
  // const { network } = useNetworkContext()!
  const { openUrl } = useInAppBrowser()
  const [allHistory, setAllHistory] = useState<
    (TransactionNormal | TransactionERC20)[]
  >([])
  const { pendingBridgeTransactions } =
    useApplicationContext().repo.pendingBridgeTransactions
  const { bitcoinAssets, ethereumWrappedAssets } = useBridgeSDK()
  const bridgeTransactions = pendingBridgeTransactions.bridgeTransactions
  const [filter, setFilter] = useState(ActivityFilter.All)

  const isBridgeTx = useCallback(
    (tx: typeof allHistory[0]): tx is TransactionERC20 => {
      return isBridgeTransaction(tx, ethereumWrappedAssets, bitcoinAssets)
    },
    [bitcoinAssets, ethereumWrappedAssets]
  )

  const getDayString = (date: Date) => {
    const isToday = isSameDay(today, date)
    const isYesterday = isSameDay(yesterday, date)
    return isToday
      ? 'Today'
      : isYesterday
      ? 'Yesterday'
      : format(date, 'MMMM do')
  }

  const filteredHistory = useMemo(
    () =>
      allHistory?.filter(tx => {
        const showAll = filter === ActivityFilter.All
        const isBridge =
          isBridgeTx(tx) && (showAll || filter === ActivityFilter.Bridge)
        const isIncoming =
          isIncomingTransaction(tx) &&
          !isBridge &&
          (showAll || filter === ActivityFilter.Incoming)
        const isOutgoing =
          isOutgoingTransaction(tx) &&
          (showAll || filter === ActivityFilter.Outgoing)
        const isContractCall =
          isContractCallTransaction(tx) &&
          (showAll || filter === ActivityFilter.ContractApprovals)

        if (
          // Return empty if the tx doesn't fit in the currently selected filter
          !(showAll || isBridge || isIncoming || isOutgoing || isContractCall)
        ) {
          return
        }

        return tokenSymbolFilter
          ? tokenSymbolFilter ===
              (('tokenSymbol' in tx && tx.tokenSymbol) || 'AVAX')
          : true
      }),
    [allHistory, tokenSymbolFilter, isBridgeTx, filter]
  )

  useEffect(() => {
    loadHistory().then()
  }, [wallet])

  const loadHistory = async () => {
    if (!wallet) {
      return []
    }
    setLoading(true)
    setAllHistory((await getHistory(wallet, 50)) ?? [])
    setLoading(false)
  }

  const renderItems = () => {
    return (
      <View>
        {bridgeTransactions && Object.values(bridgeTransactions).length > 0 && (
          <>
            <Animated.View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
                marginRight: 8
              }}>
              <AvaText.ActivityTotal>Pending</AvaText.ActivityTotal>
            </Animated.View>
            {Object.values(bridgeTransactions).map((tx, i) => {
              return (
                <BridgeTransactionItem
                  key={tx.sourceTxHash + i}
                  item={tx}
                  onPress={() => {
                    openTransactionStatus({
                      blockchain: tx.sourceChain,
                      txHash: tx.sourceTxHash || '',
                      txTimestamp: tx.sourceStartedAt
                        ? Date.parse(tx.sourceStartedAt.toString()).toString()
                        : Date.now().toString()
                    })
                  }}
                />
              )
            })}
          </>
        )}
        {filteredHistory.map((tx, index) => {
          const isNewDay =
            index === 0 ||
            !isSameDay(tx.timestamp, filteredHistory[index - 1].timestamp)

          return (
            <>
              {isNewDay && (
                <Animated.View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 16,
                    marginRight: 8
                  }}>
                  <AvaText.ActivityTotal>
                    {getDayString(tx.timestamp)}
                  </AvaText.ActivityTotal>
                </Animated.View>
              )}
              {isBridgeTx(tx) ? (
                <BridgeTransactionItem
                  item={tx}
                  onPress={() => openUrl(tx.explorerLink)}
                />
              ) : (
                <ActivityListItem
                  tx={tx}
                  onPress={() => openTransactionDetails(tx)}
                />
              )}
            </>
          )
        })}
      </View>
    )
  }

  function onRefresh() {
    loadHistory().then()
  }

  /**
   * if view is embedded, meaning it's used in the bottom sheet (currently), then we wrap it
   * with the appropriate scrollview.
   *
   * We also don't show the 'header'
   * @param children
   */
  const ScrollableComponent = ({ children }: { children: React.ReactNode }) => {
    const isEmpty = filteredHistory.length === 0

    return embedded ? (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {children}
      </ScrollView>
    ) : (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={
          isEmpty
            ? { flex: 1, justifyContent: 'center', alignItems: 'center' }
            : {
                marginVertical: 4
              }
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {children}
      </ScrollView>
    )
  }

  return !allHistory ? (
    <Loader />
  ) : (
    <View style={{ flex: 1 }}>
      {embedded || (
        <AvaText.LargeTitleBold textStyle={{ marginHorizontal: 16 }}>
          Activity
        </AvaText.LargeTitleBold>
      )}
      <Row style={{ justifyContent: 'flex-end', paddingHorizontal: 16 }}>
        <DropDown
          alignment={'flex-end'}
          width={200}
          data={[
            ActivityFilter.All,
            ActivityFilter.ContractApprovals,
            ActivityFilter.Incoming,
            ActivityFilter.Outgoing,
            ActivityFilter.Bridge
          ]}
          selectionRenderItem={selectedItem => (
            <SelectionRenderItem text={selectedItem} />
          )}
          onItemSelected={selectedItem => setFilter(selectedItem)}
          optionsRenderItem={item => {
            return <OptionsRenderItem text={item.item} />
          }}
        />
      </Row>
      <ScrollableComponent children={renderItems()} />
    </View>
  )
}

enum ActivityFilter {
  All = 'All',
  ContractApprovals = 'Contract Approvals',
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
  Bridge = 'Bridge'
}

function SelectionRenderItem({ text }: { text: string }) {
  return <AvaText.ButtonSmall>Display: {text}</AvaText.ButtonSmall>
}

function OptionsRenderItem({ text }: { text: string }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <AvaText.Body1>{text}</AvaText.Body1>
    </View>
  )
}

export default ActivityList