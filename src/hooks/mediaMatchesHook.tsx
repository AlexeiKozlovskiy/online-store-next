import { useState, useEffect } from 'react';
import { useWindowSize } from './windowSize';

interface IMediaPoint {
  maxWidth: number;
  width: number;
  height: number;
}

interface IUseAnimations {
  mediaPoints: IMediaPoint[];
  baseWidth: number;
  baseHeight: number;
}

export function useMediaMatches({ mediaPoints, baseWidth, baseHeight }: IUseAnimations) {
  const [width, setWidth] = useState(baseWidth);
  const [height, setHeight] = useState(baseHeight);
  const windowSize = useWindowSize();

  useEffect(() => {
    for (const point of mediaPoints) {
      if (windowSize.width! < point.maxWidth) {
        setWidth(point.width);
        setHeight(point.height);
        break;
      }
      if (windowSize.width! > point.maxWidth) {
        setWidth(baseWidth);
        setHeight(baseHeight);
      }
    }
  }, [windowSize.width]);

  return { width, height };
}
