import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules';
import { useReducedMotion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function PropertyGallery({
  images
}) {
  const reduced = useReducedMotion();
  return <Swiper className="gallery" modules={[Navigation, Pagination, A11y, Keyboard]} navigation pagination={{
    clickable: true
  }} keyboard={{
    enabled: true
  }} speed={reduced ? 0 : 350}>{images.map((image, i) => <SwiperSlide key={image.src}><img src={image.src} alt={image.alt} loading={i ? 'lazy' : 'eager'} /></SwiperSlide>)}</Swiper>;
}
