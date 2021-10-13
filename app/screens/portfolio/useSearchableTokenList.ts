import {useEffect, useState} from 'react';
import {BN} from '@avalabs/avalanche-wallet-sdk';
import {
  TokenWithBalance,
  useWalletStateContext,
} from '@avalabs/wallet-react-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShowZeroArrayType = {[x: string]: boolean};

export function useSearchableTokenList(hideZeroBalance = true): {
  searchText: string;
  setShowZeroBalanceList: (list: ShowZeroArrayType) => void;
  loadZeroBalanceList: () => void;
  filteredTokenList: TokenWithBalance[];
  showZeroBalanceList: ShowZeroArrayType;
  setSearchText: (value: ((prevState: string) => string) | string) => void;
  tokenList: TokenWithBalance[];
} {
  const walletState = useWalletStateContext();
  const [tokenList, setTokenList] = useState([] as TokenWithBalance[]);
  const [filteredTokenList, setFilteredTokenList] = useState(
    [] as TokenWithBalance[],
  );
  const [searchText, setSearchText] = useState('');
  const [showZeroBalanceList, setZeroBalanceList] = useState<ShowZeroArrayType>(
    {
      ['init']: false,
    },
  );

  const loadZeroBalanceList = () => {
    AsyncStorage.getItem('showZeroBalanceList').then(value => {
      if (value) {
        const list: ShowZeroArrayType = JSON.parse(value);
        setZeroBalanceList({...list});
      }
    });
  };

  const setShowZeroBalanceList = (list: ShowZeroArrayType) => {
    AsyncStorage.setItem('showZeroBalanceList', JSON.stringify(list)).then(() =>
      setZeroBalanceList(list),
    );
  };

  useEffect(() => loadZeroBalanceList(), []);

  useEffect(() => {
    if (!walletState) {
      return;
    }
    const bnZero = new BN(0);
    const tokens = [
      walletState.avaxToken,
      ...walletState.erc20Tokens.filter(value => {
        return hideZeroBalance ? value.balance.gt(bnZero) : true;
      }),
      ...walletState.antTokens,
    ] as TokenWithBalance[];

    setTokenList(tokens);
  }, [walletState, showZeroBalanceList, hideZeroBalance]);

  useEffect(() => {
    setFilteredTokenList(
      tokenList.filter(
        token =>
          token.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
      ),
    );
  }, [tokenList, searchText]);

  return {
    tokenList,
    filteredTokenList,
    searchText,
    setSearchText,
    setShowZeroBalanceList,
    showZeroBalanceList,
    loadZeroBalanceList,
  };
}
