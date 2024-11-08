import crypto from 'crypto'
import * as utils from 'services/earn/utils'
import * as Toast from 'utils/toast'
import { DeepLink } from '../types'
import { handleDeeplink } from './handleDeeplink'

const mockShowTransactionSuccessToast = jest.fn()
const mockShowTransactionErrorToast = jest.fn()
jest
  .spyOn(Toast, 'showTransactionSuccessToast')
  .mockImplementation(mockShowTransactionSuccessToast)
jest
  .spyOn(Toast, 'showTransactionErrorToast')
  .mockImplementation(mockShowTransactionErrorToast)

const mockDispatch = jest.fn()
const mockNavigateToClaimRewards = jest.fn()

describe('handleDeeplink', () => {
  describe('handle walletConnect urls', () => {
    it('should parse https link correctly', () => {
      const mockDeeplink = {
        url: 'https://core.app/wc?uri=wc%3Ab08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec%402%3Frelay-protocol%3Dirn%26symKey%3Da33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb'
      }
      handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload:
          'wc:b08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec@2?relay-protocol=irn&symKey=a33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb',
        type: 'walletConnectV2/newSession'
      })
    })

    it('should parse wc link correctly', () => {
      const mockDeeplink = {
        url: 'wc:b08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec@2?relay-protocol=irn&symKey=a33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb'
      }
      handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload:
          'wc:b08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec@2?relay-protocol=irn&symKey=a33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb',
        type: 'walletConnectV2/newSession'
      })
    })

    it('should parse core link correctly', () => {
      const mockDeeplink = {
        url: 'core://wc?uri=wc%3Ab08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec%402%3Frelay-protocol%3Dirn%26symKey%3Da33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb'
      }
      handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
      expect(mockDispatch).toHaveBeenCalledWith({
        payload:
          'wc:b08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec@2?relay-protocol=irn&symKey=a33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb',
        type: 'walletConnectV2/newSession'
      })
    })

    it('should not dispatch wallet connect with http url', () => {
      const mockDeeplink = {
        url: 'http://core.app/wc?uri=wc%3Ab08d4b7be6bd25662c5922faadf82ff94d525af4282e0bdc9a78ae2ed9e086ec%402%3Frelay-protocol%3Dirn%26symKey%3Da33be37bb809cfbfbc788a54649bfbf1baa8cdbfe2fe21657fb51ef1bc7ab1fb'
      }
      handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
      expect(mockDispatch).not.toHaveBeenCalled()
    })

    it('should not dispatch wallet connect with random string', () => {
      const randomString = crypto.randomBytes(16).toString('hex')
      const mockDeeplink = {
        url: randomString
      }
      handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })

  describe('handle stakecomplete deeplink', () => {
    jest
      .spyOn(utils, 'navigateToClaimRewards')
      .mockImplementation(mockNavigateToClaimRewards)
  })

  it('should have called navigateToClaimReward', () => {
    const mockDeeplink = {
      url: 'core://stakecomplete'
    }
    handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
    expect(mockNavigateToClaimRewards).toHaveBeenCalled()
  })

  it('should not have called navigateToClaimReward', () => {
    const mockDeeplink = {
      url: 'core://stakecomplet'
    }
    handleDeeplink(mockDeeplink as DeepLink, mockDispatch, false)
    expect(mockNavigateToClaimRewards).not.toHaveBeenCalled()
  })
})
