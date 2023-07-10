import React, { useMemo } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Platform
} from 'react-native'
import AvaText from 'components/AvaText'
import ActivityListItem from 'screens/activity/ActivityListItem'
import BridgeTransactionItem from 'screens/bridge/components/BridgeTransactionItem'
import { BridgeTransactionStatusParams } from 'navigation/types'
import useInAppBrowser from 'hooks/useInAppBrowser'
import { useSelector } from 'react-redux'
import { selectBridgeTransactions } from 'store/bridge'
import { Transaction } from 'store/transaction'
import ZeroState from 'components/ZeroState'
import { BridgeTransaction } from '@avalabs/bridge-sdk'
import { UI, useIsUIDisabled } from 'hooks/useIsUIDisabled'
import { RefreshControl } from 'components/RefreshControl'
import { usePostCapture } from 'hooks/usePosthogCapture'
import FlashList from 'components/FlashList'
import { getDayString } from 'utils/date/getDayString'

const SCREEN_WIDTH = Dimensions.get('window').width
const BOTTOM_PADDING = SCREEN_WIDTH * 0.3

type Section = {
  title: string
  data: Transaction[] | BridgeTransaction[]
}

type Item = string | Transaction | BridgeTransaction

interface Props {
  isRefreshing: boolean
  onRefresh: () => void
  onEndReached?: () => void
  data: Transaction[]
  openTransactionDetails: (item: Transaction) => void
  openTransactionStatus: (params: BridgeTransactionStatusParams) => void
  hidePendingBridgeTransactions: boolean
  testID?: string
}

const Transactions = ({
  isRefreshing,
  onRefresh,
  onEndReached,
  data,
  openTransactionDetails,
  openTransactionStatus,
  hidePendingBridgeTransactions
}: Props) => {
  const { openUrl } = useInAppBrowser()
  const { capture } = usePostCapture()
  const bridgeDisabled = useIsUIDisabled(UI.Bridge)
  const pendingBridgeByTxId = useSelector(selectBridgeTransactions)
  const combinedData = useMemo(() => {
    const allSections: Section[] = []

    const pendingBridgeTransactions = Object.values(pendingBridgeByTxId).sort(
      (a, b) => b.sourceStartedAt - a.sourceStartedAt // descending
    )

    // add pending bridge transactions
    if (
      !hidePendingBridgeTransactions &&
      !bridgeDisabled &&
      pendingBridgeTransactions.length > 0
    )
      allSections.push({ title: 'Pending', data: pendingBridgeTransactions })

    // add all other transactions
    let section: { title: string; data: Transaction[] }
    let sectionTitle = ''

    data.forEach(item => {
      const dateText = getDayString(item.timestamp)
      if (!sectionTitle || sectionTitle !== dateText) {
        section = {
          title: dateText,
          data: [item]
        }
        sectionTitle = dateText
        allSections.push(section)
      } else {
        section.data.push(item)
      }
    })

    // convert back to flatlist data format
    const flatListData: Array<Item> = []

    for (const s of allSections) {
      flatListData.push(s.title)
      flatListData.push(...s.data)
    }

    return flatListData
  }, [bridgeDisabled, data, hidePendingBridgeTransactions, pendingBridgeByTxId])

  const renderPendingBridgeTransaction = (tx: BridgeTransaction) => {
    return (
      <BridgeTransactionItem
        key={tx.sourceTxHash}
        item={tx}
        onPress={() => {
          openTransactionStatus({
            txHash: tx.sourceTxHash || ''
          })
        }}
      />
    )
  }

  const renderItem = (item: Item) => {
    // render section header
    if (typeof item === 'string') {
      return renderSectionHeader(item)
    }

    // render row
    if ('addressBTC' in item) {
      return renderPendingBridgeTransaction(item)
    } else {
      const onPress = () => {
        if (item.isContractCall || item.isBridge) {
          capture('ActivityCardLinkClicked')
          openUrl(item.explorerLink)
        } else {
          capture('ActivityCardDetailShown')
          openTransactionDetails(item)
        }
      }

      return (
        <View key={item.hash}>
          {item.isBridge ? (
            <BridgeTransactionItem item={item} onPress={onPress} />
          ) : (
            <ActivityListItem tx={item} onPress={onPress} />
          )}
        </View>
      )
    }
  }

  const renderSectionHeader = (title: string) => {
    return (
      <Animated.View style={styles.headerContainer}>
        <AvaText.ActivityTotal>{title}</AvaText.ActivityTotal>
      </Animated.View>
    )
  }

  const keyExtractor = (item: string | Transaction | BridgeTransaction) => {
    if (typeof item === 'string') return item

    if ('addressBTC' in item) return `pending-${item.sourceTxHash}`

    return item.hash
  }

  const renderTransactions = () => {
    if (Platform.OS === 'ios') {
      return (
        <FlashList
          data={combinedData}
          renderItem={item => renderItem(item.item)}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainer}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={TransactionsZeroState}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
          getItemType={(item: Item) => {
            return typeof item === 'string' ? 'sectionHeader' : 'row'
          }}
          estimatedItemSize={71}
        />
      )
    }

    return (
      <FlatList
        data={combinedData}
        renderItem={item => renderItem(item.item)}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={TransactionsZeroState}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
        }
      />
    )
  }

  return <View style={styles.container}>{renderTransactions()}</View>
}

const TransactionsZeroState = () => {
  return (
    <View style={styles.zeroState}>
      <ZeroState.NoTransactions />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { paddingBottom: BOTTOM_PADDING },
  zeroState: { flex: 1, marginTop: '30%' },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  }
})

export default React.memo(Transactions)
