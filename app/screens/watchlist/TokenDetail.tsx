import React, {FC, useLayoutEffect, useState} from 'react';
import {Dimensions, Pressable, ScrollView, Text, View} from 'react-native';
import {useApplicationContext} from 'contexts/ApplicationContext';
import AvaListItem from 'components/AvaListItem';
import Avatar from 'components/Avatar';
import AvaText from 'components/AvaText';
import {Space} from 'components/Space';
import Switch from 'components/Switch';
import AvaButton from 'components/AvaButton';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {
  GradientProps,
  SlideAreaChart,
} from '@connectedcars/react-native-slide-charts';
import {LinearGradient, Stop} from 'react-native-svg';
import TabViewAva from 'components/TabViewAva';
import {useNavigation} from '@react-navigation/native';
import StarSVG from 'components/svg/StarSVG';

interface Props {}

const screenWidth = Dimensions.get('window').width;

// const data = [-100, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const TokenDetail: FC<Props> = props => {
  const {theme, repo, appHook} = useApplicationContext();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(true);

  function handleFavorite() {
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{paddingEnd: 8}} onPress={handleFavorite}>
          <StarSVG selected={isFavorite} />
        </Pressable>
      ),
    });
  }, [isFavorite]);

  const chartConfig: AbstractChartConfig = {
    // backgroundGradientFrom: theme.colorSuccess,
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: '#08130D',
    // backgroundGradientToOpacity: 0.9,
    fillShadowGradient: '#53C26E',
    fillShadowGradientOpacity: 0.3,
    color: () => theme.colorSuccess,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
    width: screenWidth,
  };

  const renderCustomLabel = (title: string, focused: boolean) => {
    return (
      <AvaText.Heading3
        textStyle={{color: focused ? theme.colorText1 : theme.colorText2}}>
        {title}
      </AvaText.Heading3>
    );
  };

  const defaultAreaChartFillGradient = (props: GradientProps) => {
    return (
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...props}>
        <Stop stopColor="#FF0000" offset="0%" stopOpacity="0.5" />
        <Stop stopColor="#000000" offset="100%" stopOpacity="0.2" />
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={{paddingHorizontal: 8}}>
      <AvaListItem.Base
        title={<AvaText.Heading1>Avalance</AvaText.Heading1>}
        titleAlignment={'flex-start'}
        subtitle={'AVAX'}
        leftComponent={
          <Avatar.Custom name={'Avalanche'} symbol={'AVAX'} size={48} />
        }
      />
      <Space y={24} />
      <AvaListItem.Base
        title={<AvaText.Body2>Price</AvaText.Body2>}
        titleAlignment={'flex-start'}
        subtitle={
          <Text>
            <AvaText.Heading3>$101.24 </AvaText.Heading3>
            <AvaText.Body3 color={theme.colorSuccess}>
              +$1.13(1.29%)
            </AvaText.Body3>
          </Text>
        }
        rightComponent={<Switch />}
      />

      {/*<LineChart*/}
      {/*  style={{flex: 1, minWidth: 200, minHeight: 150}}*/}
      {/*  data={data}*/}
      {/*  svg={{stroke: 'rgb(255, 0, 0)'}}*/}
      {/*  contentInset={{top: 10, bottom: 10}}*/}
      {/*/>*/}

      {/*<LineChart*/}
      {/*  data={data}*/}
      {/*  width={screenWidth}*/}
      {/*  height={200}*/}
      {/*  chartConfig={chartConfig}*/}
      {/*  withHorizontalLabels={false}*/}
      {/*  withVerticalLabels={false}*/}
      {/*  withHorizontalLines={false}*/}
      {/*  withVerticalLines={false}*/}
      {/*  onDataPointClick={({value, dataset, getColor, y, x, index}) => {*/}
      {/*    console.log('value: ' + value);*/}
      {/*    console.log('dataset: ' + dataset);*/}
      {/*    console.log('getColor: ' + getColor);*/}
      {/*    console.log('y: ' + y);*/}
      {/*    console.log('x: ' + x);*/}
      {/*    console.log('index: ' + index);*/}
      {/*  }}*/}
      {/*/>*/}

      <SlideAreaChart
        scrollable
        style={{marginTop: 32, backgroundColor: theme.transparent, left: -24}}
        width={screenWidth + 24}
        shouldCancelWhenOutside={false}
        data={[
          {x: 1, y: 5},
          {x: 2, y: 6},
          {x: 3, y: 11},
          {x: 4, y: 50},
          {x: 5, y: 3},
          {x: 6, y: 34},
          {x: 7, y: 5},
          {x: 8, y: 6},
          {x: 9, y: 11},
          {x: 10, y: 50},
          {x: 11, y: 3},
          {x: 12, y: 34},
          {x: 27, y: 11},
        ]}
        axisWidth={16}
        axisHeight={16}
        paddingBottom={8}
        alwaysShowIndicator={true}
        callbackWithX={x => console.log(x)}
        callbackWithY={y => console.log(y)}
        toolTipProps={{
          toolTipTextRenderers: [
            ({scaleY, y}) => ({
              text: scaleY.invert(y).toFixed(1).toString(),
            }),
          ],
        }}
        showIndicatorCallback={opacity => console.log('opacity: ' + opacity)}
        cursorProps={{
          cursorLine: false,
          cursorMarkerHeight: 18,
          cursorMarkerWidth: 18,
          cursorColor: theme.alternateBackground,
          cursorBorderColor: theme.alternateBackground,
        }}
        chartLineColor={theme.colorError}
        chartLineWidth={2}
        yAxisProps={{
          horizontalLineColor: theme.transparent,
          verticalLineColor: theme.transparent,
          interval: 5,
        }}
        renderFillGradient={defaultAreaChartFillGradient}
      />

      <Space y={8} />

      <TabViewAva renderCustomLabel={renderCustomLabel}>
        <View title={'24H'} />
        <View title={'1W'} />
        <View title={'1M'} />
        <View title={'3M'} />
        <View title={'1Y'} />
        <View title={'ALL'} />
      </TabViewAva>

      <Space y={8} />

      <AvaListItem.Base
        title={<AvaText.Heading2>Market Data</AvaText.Heading2>}
        titleAlignment={'flex-start'}
        rightComponent={
          <AvaText.Body2
            textStyle={{
              padding: 4,
              backgroundColor: theme.colorBg3,
              color: theme.colorText1,
            }}>
            Rank: 8
          </AvaText.Body2>
        }
      />

      <AvaListItem.Base
        title={<AvaText.Body2>Market Cap</AvaText.Body2>}
        titleAlignment={'flex-start'}
        rightComponentAlignment={'flex-start'}
        subtitle={<AvaText.Heading3>$23.4B</AvaText.Heading3>}
        rightComponent={
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <AvaText.Body2>Contract Address</AvaText.Body2>
            <AvaText.Heading3>0xB2d...232d</AvaText.Heading3>
          </View>
        }
      />

      <AvaListItem.Base
        title={<AvaText.Body2>24h Volume</AvaText.Body2>}
        titleAlignment={'flex-start'}
        rightComponentAlignment={'flex-start'}
        subtitle={<AvaText.Heading3>$1.4B</AvaText.Heading3>}
        rightComponent={
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <AvaText.Body2 textStyle={{alignSelf: 'flex-start'}}>
              Website
            </AvaText.Body2>
            <AvaText.Heading3 textStyle={{color: '#0A84FF'}}>
              avax.network
            </AvaText.Heading3>
          </View>
        }
      />

      <AvaListItem.Base
        title={<AvaText.Body2>Available Supply</AvaText.Body2>}
        titleAlignment={'flex-start'}
        rightComponentAlignment={'flex-start'}
        subtitle={<AvaText.Heading3>$220.3M</AvaText.Heading3>}
        rightComponent={
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <AvaText.Body2>Twitter</AvaText.Body2>
            <AvaText.Heading3 textStyle={{color: '#0A84FF'}}>
              @avalancheavax
            </AvaText.Heading3>
          </View>
        }
      />

      <AvaListItem.Base
        title={<AvaText.Body2>Total Suppy</AvaText.Body2>}
        titleAlignment={'flex-start'}
        subtitle={<AvaText.Heading3>$377.7M</AvaText.Heading3>}
      />

      <AvaButton.SecondaryLarge>Buy AVAX</AvaButton.SecondaryLarge>
    </ScrollView>
  );
};

export default TokenDetail;
