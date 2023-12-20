import { FlatList, Text, View } from '@avalabs/k2-mobile'
import { Space } from 'components/Space'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllFavorites } from 'store/browser/slices/favorites'
import { Favorite } from 'store/browser'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { FavoritesListItem } from './FavoritesListItem'
import { SuggestedSection } from './SuggestedSection'

export const FavoritesAndSuggestions = ({
  onScrollHandler
}: {
  onScrollHandler: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
}): JSX.Element | null => {
  const favorites = useSelector(selectAllFavorites)

  return (
    <View sx={{ height: '100%' }}>
      {favorites.length > 0 && (
        <>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16
            }}>
            <Text variant="heading5">Favorites</Text>
          </View>
          <Space y={16} />
        </>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favorites}
        renderItem={item => (
          <FavoritesListItem
            favorite={item.item as Favorite}
            isLastItem={item.index === favorites.length - 1}
          />
        )}
        onScroll={onScrollHandler}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListFooterComponent={<SuggestedSection />}
        contentInset={{ bottom: 160 }}
      />
    </View>
  )
}