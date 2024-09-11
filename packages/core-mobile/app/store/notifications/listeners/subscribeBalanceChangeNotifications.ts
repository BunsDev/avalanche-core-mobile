import { AppListenerEffectAPI } from 'store/index'
import { selectAccounts } from 'store/account'
import { registerDeviceToNotificationSender } from 'services/notifications/balanceChange/registerDeviceToNotificationSender'
import { ChainId } from '@avalabs/core-chains-sdk'
import FCMService from 'services/fcm/FCMService'
import { unSubscribeForBalanceChange } from 'services/notifications/balanceChange/unsubscribeForBalanceChange'
import { subscribeForBalanceChange } from 'services/notifications/balanceChange/subscribeForBalanceChange'
import Logger from 'utils/Logger'
import { ChannelId } from 'services/notifications/channels'
import NotificationsService from 'services/notifications/NotificationsService'
import { AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { setFeatureFlags } from 'store/posthog'
import { FeatureFlags, FeatureGates } from 'services/posthog/types'

export async function subscribeBalanceChangeNotifications(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI
): Promise<void> {
  const { getState } = listenerApi

  if (action.type === setFeatureFlags.type) {
    const setFeatureFlagsAction = action as PayloadAction<FeatureFlags>
    if (
      !setFeatureFlagsAction.payload[FeatureGates.BALANCE_CHANGE_NOTIFICATIONS]
    ) {
      Logger.info(
        'skipping subscribeBalanceChangeNotifications: feature flag disabled'
      )
      return
    }
  }

  const accounts = selectAccounts(getState())
  const addresses = Object.values(accounts).map(account => account.addressC)

  if (addresses.length === 0) {
    //skip if no addresses, means wallet is not yet created
    return
  }

  const fcmToken = await FCMService.getFCMToken()
  const { deviceArn } = await registerDeviceToNotificationSender(fcmToken) //TODO: for optimisation, store deviceArn

  //check if only BALANCE_CHANGES notifications are denied
  const blockedNotifications =
    await NotificationsService.getBlockedNotifications()
  if (blockedNotifications.has(ChannelId.BALANCE_CHANGES)) {
    await unSubscribeForBalanceChange({ deviceArn })
    return
  }

  //subscribe
  const chainIds = [
    ChainId.AVALANCHE_MAINNET_ID.toString(),
    ChainId.AVALANCHE_TESTNET_ID.toString()
  ]
  const accounts = selectAccounts(getState())
  const addresses = Object.values(accounts).map(account => account.addressC)
  const response = await subscribeForBalanceChange({
    addresses,
    chainIds,
    deviceArn
  })
  if (response.message !== 'ok') {
    Logger.error(
      `[setupBalanceChangeNotifications.ts][setupBalanceChangeNotifications]${response.message}`
    )
    throw Error(response.message)
  }
}
