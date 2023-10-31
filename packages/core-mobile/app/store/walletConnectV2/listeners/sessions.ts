import { AppListenerEffectAPI } from 'store/index'
import WalletConnectService from 'services/walletconnectv2/WalletConnectService'
import { InteractionManager } from 'react-native'
import { showSimpleToast } from 'components/Snackbar'
import Logger from 'utils/Logger'
import {
  onRehydrationComplete,
  selectWalletState,
  WalletState
} from 'store/app'
import { AnyAction } from '@reduxjs/toolkit'
import { WalletConnectCallbacks } from 'services/walletconnectv2/types'
import { selectActiveNetwork, setActive } from 'store/network'
import { selectActiveAccount, setActiveAccountIndex } from 'store/account'
import { UPDATE_SESSION_DELAY } from 'consts/walletConnect'
import { killSessions, newSession, onDisconnect, onRequest } from '../slice'
import { RpcMethod } from '../types'

const callbacks = (
  listenerApi: AppListenerEffectAPI
): WalletConnectCallbacks => {
  const { dispatch } = listenerApi

  return {
    onSessionProposal: data =>
      dispatch(
        onRequest({
          method: RpcMethod.SESSION_REQUEST,
          data
        })
      ),
    onSessionRequest: (data, session) =>
      dispatch(
        onRequest({
          method: data.params.request.method,
          data,
          session
        })
      ),
    onDisconnect: data => dispatch(onDisconnect(data))
  }
}

export const initWalletConnect = async (
  action: AnyAction,
  listenerApi: AppListenerEffectAPI
) => {
  try {
    const state = listenerApi.getState()

    if (onRehydrationComplete.match(action)) {
      const walletState = selectWalletState(state)

      if (walletState === WalletState.NONEXISTENT) return
    }

    await WalletConnectService.init(callbacks(listenerApi))

    /**
     * update all sessions with active chainId and address so that dapps stay in sync with wallet.
     * this is crucial for dapps that use wagmi.
     *
     * notes: the delay is to allow dapps to settle down after the session is established. wallet connect se sdk also does the same.
     */
    const chainId = selectActiveNetwork(state).chainId
    const address = selectActiveAccount(state)?.address
    setTimeout(() => updateSessions(chainId, address), UPDATE_SESSION_DELAY)
  } catch (e) {
    Logger.error('Unable to init wallet connect v2', e)
  }
}

export const updateSessions = async (
  chainId: number,
  address: string | undefined
) => {
  try {
    if (!address) return

    await WalletConnectService.updateSessions({
      chainId,
      address
    })
  } catch (e) {
    Logger.error('Unable to update WC sessions', e)
  }
}

export const startSession = async (action: ReturnType<typeof newSession>) => {
  const uri = action.payload

  try {
    await WalletConnectService.pair(uri)
  } catch (e) {
    Logger.error('Unable to pair with dapp', e)
    showSimpleToast('Unable to pair with dapp')
  }
}

export const killAllSessions = async () =>
  WalletConnectService.killAllSessions()

export const killSomeSessions = async (
  action: ReturnType<typeof killSessions>
) => {
  const sessionsToKill = action.payload
  const topics = sessionsToKill.map(session => session.topic)

  WalletConnectService.killSessions(topics)
}

export const handleDisconnect = async (
  action: ReturnType<typeof onDisconnect>
) => {
  const peerMeta = action.payload

  InteractionManager.runAfterInteractions(() => {
    showSimpleToast(`${peerMeta.name} was disconnected`)
  })
}

export const handleNetworkChange = async (
  action: ReturnType<typeof setActive>,
  listenerApi: AppListenerEffectAPI
) => {
  const state = listenerApi.getState()
  const address = selectActiveAccount(state)?.address
  const chainId = action.payload

  updateSessions(chainId, address)
}

export const handleAccountChange = async (
  action: ReturnType<typeof setActiveAccountIndex>,
  listenerApi: AppListenerEffectAPI
) => {
  const state = listenerApi.getState()
  const { chainId } = selectActiveNetwork(state)
  const address = selectActiveAccount(state)?.address

  updateSessions(chainId, address)
}