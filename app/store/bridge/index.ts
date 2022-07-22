import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { BridgeTransaction } from '@avalabs/bridge-sdk'
import { AppStartListening } from 'store/middleware/listener'
import { selectNetworks, setActive } from 'store/network'
import { BridgeState, initialState } from 'store/bridge/types'

const reducerName = 'bridge'

export const bridgeSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    addBridgeTransaction: (state, action: PayloadAction<BridgeTransaction>) => {
      const bridgeTx = action.payload
      state.bridge.bridgeTransactions[bridgeTx.sourceTxHash] = bridgeTx
    },
    popBridgeTransaction: (state, action: PayloadAction<string>) => {
      const sourceTxHash = action.payload
      delete state.bridge.bridgeTransactions[sourceTxHash]
    },
    setBridgeFilter(state, action: PayloadAction<boolean>) {
      state.bridge.isMainnet = action.payload
    }
  }
})

const selectIsMainnet = (state: RootState) => state.bridge.bridge.isMainnet

const selectTransactions = (state: RootState) =>
  state.bridge.bridge.bridgeTransactions

export const selectBridge = (state: RootState) => state.bridge.bridge

export const selectBridgeTransactions = createSelector(
  [selectTransactions, selectIsMainnet],
  (bridgeTransactions, isMainnet) => {
    return Object.values(bridgeTransactions).reduce<
      BridgeState['bridgeTransactions']
    >((txs, btx) => {
      // go figure
      const bridgeTx = btx as BridgeTransaction
      if (bridgeTx.environment === (isMainnet ? 'main' : 'test')) {
        txs[bridgeTx.sourceTxHash] = bridgeTx
      }
      return txs
    }, {})
  }
)

export const { addBridgeTransaction, popBridgeTransaction, setBridgeFilter } =
  bridgeSlice.actions

export const addBridgeListeners = (startListening: AppStartListening) => {
  // listen to network changes here to update filter
  startListening({
    actionCreator: setActive,
    effect: (action, listenerApi) => {
      const state = listenerApi.getState()
      const networks = selectNetworks(state)
      // updates bridge isMainnet filter based on selected network
      listenerApi.dispatch(setBridgeFilter(!networks[action.payload].isTestnet))
    }
  })
}

export * from './types'

export default bridgeSlice.reducer