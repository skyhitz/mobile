import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Letter } from 'app/modules/ui/Letter';

const spacingForLetterIndex = (letters: any, index: any, spacing: any) =>
  letters.length - 1 === index ? 0 : spacing;

const TextWithLetterSpacing = (props: any) => {
  const { children, spacing, viewStyle, textStyle } = props;
  const letters = children.split('');

  return (
    <View style={[styles.container, viewStyle]}>
      {letters.map((letter: any, index: any) => (
        <Letter
          key={index}
          spacing={spacingForLetterIndex(letters, index, spacing)}
          textStyle={textStyle}
        >
          {letter}
        </Letter>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default TextWithLetterSpacing;
