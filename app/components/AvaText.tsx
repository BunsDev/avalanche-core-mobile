import React, {FC, useContext} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {ApplicationContext} from 'contexts/ApplicationContext';

interface TextProps {
  textStyle?: StyleProp<TextStyle>;
  color?: string;
}

const LargeTitleBold: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.largeTitleBold, {color: theme.colorText1}, textStyle]}>
      {children}
    </Text>
  );
};

const TextHeading1: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.heading1, {color: theme.txtListItem}, textStyle]}>
      {children}
    </Text>
  );
};

const TextHeading2: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.heading2, {color: theme.txtListItem}, textStyle]}>
      {children}
    </Text>
  );
};

const TextHeading3: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.heading3, {color: theme.txtListItem}, textStyle]}>
      {children}
    </Text>
  );
};

const TextBody1: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.body2, {color: theme.txtDim}, textStyle]}>
      {children}
    </Text>
  );
};

const TextBody2: FC<TextProps> = ({color, textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.body2, {color: color ?? theme.colorText2}, textStyle]}>
      {children}
    </Text>
  );
};

const TextBody3: FC<TextProps> = ({textStyle, children}) => {
  return <Text style={[styles.body3, textStyle]}>{children}</Text>;
};

const TextTag: FC<TextProps> = ({textStyle, children}) => {
  const theme = useContext(ApplicationContext).theme;
  return (
    <Text style={[styles.textTag, {color: theme.txtListItem}, textStyle]}>
      {children}
    </Text>
  );
};

const TextButtonLarge: FC<TextProps> = ({textStyle, children}) => {
  return <Text style={[styles.textButtonLarge, textStyle]}>{children}</Text>;
};

const TextButtonMedium: FC<TextProps> = ({textStyle, children}) => {
  return <Text style={[styles.textButtonMedium, textStyle]}>{children}</Text>;
};

const TextButtonSmall: FC<TextProps> = ({textStyle, children}) => {
  return <Text style={[styles.textButtonSmall, textStyle]}>{children}</Text>;
};

const AvaText = {
  LargeTitleBold: LargeTitleBold,
  Heading1: TextHeading1,
  Heading2: TextHeading2,
  Heading3: TextHeading3,
  Body1: TextBody1,
  Body2: TextBody2,
  Body3: TextBody3,
  Tag: TextTag,
  ButtonLarge: TextButtonLarge,
  ButtonMedium: TextButtonMedium,
  ButtonSmall: TextButtonSmall,
};

const styles = StyleSheet.create({
  largeTitleBold: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    lineHeight: 44,
  },
  heading1: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 29,
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  heading3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 17,
  },
  body3: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 15,
  },
  textTag: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  textButtonLarge: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  textButtonMedium: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
  },
  textButtonSmall: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default AvaText;
