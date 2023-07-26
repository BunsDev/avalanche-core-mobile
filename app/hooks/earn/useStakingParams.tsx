import { useSelector } from 'react-redux'
import { selectIsDeveloperMode } from 'store/settings/advanced'
import { Avax } from 'types/Avax'

export interface StakeParamsHook {
  minStakeAmount: Avax
}

export default function useStakingParams(): StakeParamsHook {
  const isDeveloperMode = useSelector(selectIsDeveloperMode)
  const minStakeAmount = isDeveloperMode ? Avax.fromBase(1) : Avax.fromBase(25)

  return {
    minStakeAmount
  } as StakeParamsHook
}
