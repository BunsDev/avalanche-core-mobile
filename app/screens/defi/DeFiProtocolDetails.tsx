import { useRoute } from '@react-navigation/native'
import AvaButton from 'components/AvaButton'
import Spinner from 'components/animation/Spinner'
import { useApplicationContext } from 'contexts/ApplicationContext'
import { useDeFiProtocol } from 'hooks/defi/useDeFiProtocol'
import AppNavigation from 'navigation/AppNavigation'
import { WalletScreenProps } from 'navigation/types'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import LinkSVG from 'components/svg/LinkSVG'
import { Space } from 'components/Space'
import Card from 'components/Card'
import { useDeFiChainList } from 'hooks/defi/useDeFiChainList'
import { openURL } from 'utils/openURL'
import { ScrollView } from 'react-native-gesture-handler'
import { useExchangedAmount } from 'hooks/defi/useExchangedAmount'
import { ProtocolDetailsErrorState } from './components/ProtocolDetailsErrorState'
import { mapPortfolioItems } from './utils'
import { DeFiPortfolioItemGroup } from './components/DeFiPortfolioItemGroup'
import { ZeroState } from './components/ZeroState'
import { DeFiPortfolioHeader } from './components/DeFiPortfolioHeader'

type ScreenProps = WalletScreenProps<
  typeof AppNavigation.Wallet.DeFiProtocolDetails
>

export const DeFiProtocolDetails = () => {
  const {
    theme,
    appHook: { currencyFormatter }
  } = useApplicationContext()
  const getAmount = useExchangedAmount()

  const protocolId = useRoute<ScreenProps['route']>().params.protocolId
  const { data, isLoading, error, isPaused, isSuccess } =
    useDeFiProtocol(protocolId)
  const { data: chainList } = useDeFiChainList()

  const memoizedChain = useMemo(() => {
    if (!data?.chain) return undefined
    return chainList?.[data.chain]
  }, [chainList, data?.chain])

  const goToProtocolPage = useCallback(async () => {
    openURL(data?.siteUrl)
  }, [data?.siteUrl])

  const calculatedTotalValueOfProtocolItems = useMemo(() => {
    if (!data?.portfolioItemList) return currencyFormatter(0)
    const totalValue = data?.portfolioItemList.reduce(
      (total, { stats }) => total + stats.netUsdValue,
      0
    )
    return getAmount(totalValue)
  }, [currencyFormatter, data?.portfolioItemList, getAmount])

  const portfolioItemList = useMemo(() => {
    if (!data?.portfolioItemList) return []
    const portfolioItemGroups = mapPortfolioItems(data.portfolioItemList)
    return portfolioItemGroups.map(group => {
      return <DeFiPortfolioItemGroup key={group.name} group={group} />
    })
  }, [data?.portfolioItemList])

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner size={77} />
      </View>
    )
  }
  if (error || (isPaused && !isSuccess)) return <ProtocolDetailsErrorState />
  if (!data || !data?.portfolioItemList || data.portfolioItemList.length === 0)
    return <ZeroState skipBodyText />

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <DeFiPortfolioHeader
          logoUrl={data.logoUrl}
          name={data.name}
          chainLogoUrl={memoizedChain?.logoUrl}
          chainName={memoizedChain?.name}
          goToProtocolPage={goToProtocolPage}
          totalValueOfProtocolItems={calculatedTotalValueOfProtocolItems}
        />
        <ScrollView>{portfolioItemList}</ScrollView>
      </Card>
      <AvaButton.PrimaryLarge onPress={goToProtocolPage}>
        <LinkSVG color={theme.logoColor} />
        <Space x={8} />
        {`Go to ${data?.name ?? protocolId}`}
      </AvaButton.PrimaryLarge>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 41,
    justifyContent: 'space-between'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: 16,
    marginBottom: 24,
    padding: 16
  }
})
