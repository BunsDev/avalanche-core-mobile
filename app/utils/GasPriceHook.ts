import {
  BehaviorSubject,
  filter,
  interval,
  map,
  pairwise,
  switchMap,
  tap,
} from 'rxjs';
import {BN, GasHelper, Utils} from '@avalabs/avalanche-wallet-sdk';
import {useEffect, useState} from 'react';

export interface GasPrice {
  bn: BN;
  value: string;
}
const SECONDS_30 = 1000 * 10;

export function useGasPrice(): {
  gasPrice$: BehaviorSubject<GasPrice>;
} {
  const [gasPrice$] = useState(
    new BehaviorSubject<GasPrice>({bn: new BN(0), value: ''} as GasPrice),
  );

  useEffect(() => {
    getGasPrice()
      .then(parseGasPrice)
      .then(res => gasPrice$.next(res));

    const subscription = interval(SECONDS_30)
      .pipe(
        switchMap(() => getGasPrice()),
        pairwise(),
        filter(
          ([oldPrice, newPrice]) => oldPrice.toString() !== newPrice.toString(),
        ),
        map(([_, newPrice]) => parseGasPrice(newPrice)),
        tap((res: any) => {
          gasPrice$.next(res);
        }),
      )
      .subscribe();

    return () => {
      subscription?.unsubscribe();
    };
  }, [gasPrice$]);

  return {
    gasPrice$,
  };
}

function getGasPrice(): Promise<BN> {
  return GasHelper.getAdjustedGasPrice();
}

function parseGasPrice(bn: BN) {
  const value = Utils.bnToLocaleString(bn, 9);
  return {
    bn,
    value,
  };
}