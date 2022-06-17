//- Пример js-инициализации
import Swiper from 'swiper/bundle'

const swiper = new Swiper('.класс', {
	slidesPerView: 2,
	spaceBetween: 30,
	breakpoints: {
		// when window width is >= 640px
		768: {
			slidesPerView: 4,
			spaceBetween: 40,
		},
	},
})
