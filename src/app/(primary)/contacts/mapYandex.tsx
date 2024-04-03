'use client';
import './contactsPage.scss';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useMediaQuery } from '@mui/material';

export default function MapYandex() {
  const mediaMatches766 = useMediaQuery('(max-width:766px)');
  const mediaMatches420 = useMediaQuery('(max-width:420px)');

  function checkWidth() {
    if (mediaMatches420) {
      return 300;
    } else if (mediaMatches766) {
      return 400;
    } else {
      return 800;
    }
  }

  function checkHeight() {
    if (mediaMatches420) {
      return 170;
    } else if (mediaMatches766) {
      return 250;
    } else {
      return 500;
    }
  }

  const widthMap = checkWidth();
  const heightMap = checkHeight();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    console.error(...args);
  };

  return (
    <YMaps>
      <Map defaultState={{ center: [25.773659, -80.180515], zoom: 11 }} width={widthMap} height={heightMap}>
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
