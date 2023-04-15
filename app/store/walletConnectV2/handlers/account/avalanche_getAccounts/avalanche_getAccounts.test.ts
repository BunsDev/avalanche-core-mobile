import { RpcMethod } from 'store/walletConnectV2'
import mockSession from 'tests/fixtures/walletConnect/session.json'
import mockAccounts from 'tests/fixtures/accounts.json'
import { avalancheGetAccountsHandler as handler } from './avalanche_getAccounts'

jest.mock('store/account', () => {
  const actual = jest.requireActual('store/account')
  return {
    ...actual,
    selectAccounts: () => mockAccounts,
    selectActiveAccount: () => mockAccounts[0]
  }
})

const mockDispatch = jest.fn()
const mockListenerApi = {
  getState: jest.fn(),
  dispatch: mockDispatch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const testMethod = 'avalanche_getAccounts' as RpcMethod.AVALANCHE_GET_ACCOUNTS

const testRequest = {
  method: testMethod,
  data: {
    id: 1677366383831712,
    topic: '3a094bf511357e0f48ff266f0b8d5b846fd3f7de4bd0824d976fdf4c5279b261',
    params: {
      request: {
        method: testMethod,
        params: {}
      },
      chainId: 'eip155:43113'
    }
  },
  session: mockSession
}

describe('avalanche_getAccounts handler', () => {
  it('should contain correct methods', () => {
    expect(handler.methods).toEqual(['avalanche_getAccounts'])
  })

  describe('handle', () => {
    it('should return success with the list of available accounts', async () => {
      const result = await handler.handle(testRequest, mockListenerApi)

      expect(result).toEqual({
        success: true,
        value: [
          {
            index: 0,
            name: 'Account 1',
            addressAVM: '',
            addressBTC: 'tb1qlzsvluv4cahzz8zzwud40x2hn3zq4c7zak6spw',
            addressC: '0xcA0E993876152ccA6053eeDFC753092c8cE712D0',
            addressCoreEth: '',
            addressPVM: '',
            active: true,
            type: 'primary'
          },
          {
            index: 1,
            name: 'Account 2',
            addressAVM: '',
            addressBTC: 'tb1qjmapax0vtca726g8kaermd5rzdljql66esxs49',
            addressC: '0xC7E5ffBd7843EdB88cCB2ebaECAa07EC55c65318',
            addressCoreEth: '',
            addressPVM: '',
            active: false,
            type: 'primary'
          }
        ]
      })
    })
  })
})
