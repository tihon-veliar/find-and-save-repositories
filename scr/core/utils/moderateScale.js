//@flow
import { Dimensions } from 'react-native';
import _ from 'lodash';

const { width, fontScale, height } = Dimensions.get('window');

const guidelineBaseWidth: number = 375;

const defaultScaleFactor: number = width < guidelineBaseWidth ? 0.5 : 1;

const scale: (size: number) => number = size =>
  (width / guidelineBaseWidth) * size;

export const moderateScale: (size: number, factor: number) => number =
  _.memoize(
    (size: number, factor: number = defaultScaleFactor) =>
      Math.round((size + (scale(size) - size) * factor) * 100) / 100,
  );

export const fontScaleNormalize: (size: number, facto: number) => number =
  _.memoize((size: number, factor: number = defaultScaleFactor) =>
    fontScale > 1.4
      ? ((size + (scale(size) - size) * factor) / fontScale) * 1.353
      : size + (scale(size) - size) * factor,
  );
export const screenHeight: number = height;
export const screenWidth: number = width;
