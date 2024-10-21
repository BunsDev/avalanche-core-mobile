/* eslint-env detox/detox, jest */
/**
 * @jest-environment ./environment.ts
 */
import assert from 'assert'
import BottomTabsPage from '../../pages/bottomTabs.page'
import { warmup } from '../../helpers/warmup'
import watchlistPage from '../../pages/watchlist.page'
import actions from '../../helpers/actions'
import { TokenDetailToken } from '../../helpers/tokens'
import tokenDetailPage from '../../pages/tokenDetail.page'

describe('Watchlist', () => {
  const tokens: TokenDetailToken[] = [
    { id: 'avalanche-2', symbol: 'AVAX', name: 'avalanche' },
    { id: 'bitcoin', symbol: 'BTC', name: 'bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'ethereum' }
  ]

  beforeAll(async () => {
    await warmup()
    await device.disableSynchronization()
  })

  it('should navigate watchlist tabs', async () => {
    // Favorite tab > Verify the default favorites
    await BottomTabsPage.tapWatchlistTab()
    await actions.waitForElementNoSync(watchlistPage.favoritesTab, 10000)
    await watchlistPage.verifyFavorites(['AVAX', 'BTC', 'ETH'])

    // All tab > Verify the the contents are displayed
    await watchlistPage.tapAllTab()
    await actions.waitForElementNoSync(by.text('Sort by: Market Cap'), 10000)
    await actions.waitForElement(by.id('watchlist_price'))
  })

  it('should reorder Favorites', async () => {
    // Go to Favorites tab
    await BottomTabsPage.tapWatchlistTab()
    await actions.waitForElementNoSync(watchlistPage.favoritesTab)
    await watchlistPage.tapFavoritesTab()
    // Pick random tokens 5 times and reorder randomly either up or down
    let i = 0
    while (i < 5) {
      // pick a random token out of 3 default favorites tokens
      const token = actions.shuffleArray(tokens)[0]
      if (token) {
        // hold and drag either go up or down (drag direction is random)
        await watchlistPage.reorderToken(token.id)
      }
      i++
    }
  })

  it('should sort on All tab', async () => {
    // Go to All tab
    let previousOption = 'Market Cap'
    const sortOptions = ['Price', 'Volume', 'Gainers', 'Losers']
    await actions.waitForElementNoSync(watchlistPage.allTab, 10000)
    await watchlistPage.tapAllTab()
    await actions.waitForElementNoSync(by.text('Sort by: Market Cap'), 10000)

    for (const option of sortOptions) {
      // Get the top token price before sort
      const beforeSort = await watchlistPage.getTopTokenPriceFromList()

      // Sort by the option
      await watchlistPage.tapSortBtn()
      await watchlistPage.verifyWatchlistDropdownItems(previousOption)
      await watchlistPage.selectSortOption(option)
      await actions.waitForElementNoSync(by.text(`Sort by: ${option}`), 2000)

      // Get the top token price after sort
      const afterSort = await watchlistPage.getTopTokenPriceFromList()

      // Verify `beforeSort` and `afterSort` are not equal
      assert.notEqual(beforeSort, afterSort)
      previousOption = option
    }
  })

  it('should navigate to token detail screen', async () => {
    await watchlistPage.tapFavoritesTab()
    await watchlistPage.tapWatchListToken('btc', 1)
    await actions.waitForElement(tokenDetailPage.oneWeekTab)
  })

  it('should verify token detail screen', async () => {
    await actions.swipeUp(tokenDetailPage.oneWeekTab, 'fast', 0.5, 0)
    await tokenDetailPage.verifyTokenDetailScreen()
  })
})
