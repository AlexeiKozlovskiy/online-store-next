'use client';
import './contactsPage.scss';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useMediaMatches } from '@/hooks/mediaMatchesHook';

export default function MapYandex() {
  const { width, height } = useMediaMatches({
    mediaPoints: [
      { maxWidth: 420, width: 300, height: 170 },
      { maxWidth: 766, width: 400, height: 250 },
    ],
    baseWidth: 800,
    baseHeight: 500,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    console.error(...args);
  };

  return (
    <YMaps>
      <Map defaultState={{ center: [25.773659, -80.180515], zoom: 11 }} width={width} height={height}>
        <Placemark
          defaultGeometry={[25.775539, -80.186209]}
          properties={{
            balloonContentBody: 'This is balloon loaded by the Yandex.Maps API module system',
          }}
        />
      </Map>
    </YMaps>
  );
}
