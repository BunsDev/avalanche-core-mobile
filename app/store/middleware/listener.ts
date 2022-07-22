import {
  addListener,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening
} from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from 'store'
import { addAppListeners } from 'store/app'
import { addBalanceListeners } from 'store/balance'
import { addAccountListeners } from 'store/account'
import { addNetworkListeners } from 'store/network'
import { addNetworkFeeListeners } from 'store/networkFee'
import { addBridgeListeners } from 'store/bridge'
import { addPosthogListeners } from 'store/posthog'
import { addNftListeners } from 'store/nft'

export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export type AppAddListener = TypedAddListener<RootState, AppDispatch>

const listener = createListenerMiddleware({
  onError: (error, errorInfo) => console.error(error, errorInfo)
})

const startListening = listener.startListening as AppStartListening

addAppListeners(startListening)

addBalanceListeners(startListening)

addAccountListeners(startListening)

addNetworkListeners(startListening)

addBridgeListeners(startListening)

addNetworkFeeListeners(startListening)

addPosthogListeners(startListening)

addNftListeners(startListening)

export const addAppListener = addListener as AppAddListener

export { listener }