'use client';
import 'swiper/css';
import './mainPage.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { ROUTE } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useMediaQuery } from '@mui/material';

const SliderDescription = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="slider__content">
      {children}
      <button onClick={() => router.push(ROUTE.PRODUCT)} className="button button-main">
        GO TO PRODUCTS
      </button>
    </div>
  );
};

export default function Slider() {
  const mediaMatches1040 = useMediaQuery('(max-width:1040px)');
  const mediaMatches766 = useMediaQuery('(max-width:766px)');
  const mediaMatches420 = useMediaQuery('(max-width:420px)');

  function checkWidth() {
    if (mediaMatches420) {
      return 310;
    } else if (mediaMatches766) {
      return 380;
    } else if (mediaMatches1040) {
      return 700;
    } else {
      return 960;
    }
  }

  function checkHeight() {
    if (mediaMatches420) {
      return 194;
    }
    if (mediaMatches766) {
      return 240;
    }
    if (mediaMatches1040) {
      return 430;
    } else {
      return 550;
    }
  }

  const width = checkWidth();
  const height = checkHeight();

  return (
    <div className="slider__container categories-grid-1">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        navigation={true}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
          <Image
            priority={true}
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/novogodnee-ukrashenie-shary.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title">
              As the holiday season draws near, the air is filled with anticipation and joy, and homes come alive with the sparkle
              of Christmas decorations
            </p>
          </SliderDescription>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/ukrasheniia-shary-novyi-god-rozhdestvo-golden-new-year-ch-16.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title">
              For those with a penchant for creativity, do-it-yourself projects abound, offering opportunities to infuse personal
              flair into the holiday decor.
            </p>
          </SliderDescription>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/shary-shariki-ukrashenie-novyi-god-novogodnee-ruka.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title">
              In the heart of the home stands the Christmas tree, a beacon of cheer and warmth. Its branches, adorned with an
              array of ornaments, tell stories of cherished memories and beloved traditions.
            </p>
          </SliderDescription>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/ukrasheniia-fon-shary-elka-novyi-god-rozhdestvo-red-new-year.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title white-title">
              From delicate glass baubles to handmade treasures passed down through generations, each decoration adds its own
              unique touch to the symphony of holiday magic.
            </p>
          </SliderDescription>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/girlianda-shar-ukrashenie.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title white-title">
              Garlands gracefully drape across mantelpieces and staircases, weaving a tapestry of greenery adorned with festive
              accents.
            </p>
          </SliderDescription>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="slider-img"
            width={width}
            height={height}
            src="/assets/slider/ukrasheniia-fon-shary-elka-colorful-novyi-god-rozhdestvo-new.webp"
            alt="image"
          />
          <SliderDescription>
            <p className="slider__content-title">
              And what would Christmas be without the enchanting glow of twinkling lights? Strands of shimmering bulbs illuminate
              the darkness, casting a soft, inviting glow throughout the home.
            </p>
          </SliderDescription>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
