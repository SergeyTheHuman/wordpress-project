import { isWebp } from './components/isWebp.js'
import Swiper from 'swiper/bundle'

isWebp()

const $burgerBtn = document.querySelector('[data-burger-btn]')
const $menu = document.querySelector('.header__nav')
const $body = document.body

$burgerBtn.addEventListener('click', (e) => {
	$burgerBtn.classList.toggle('burger__button--active')
	$menu.classList.toggle('header__nav--opened')
	$body.classList.toggle('scroll-lock')
})

$body.addEventListener('click', (e) => {
	if (!e.target.closest('.burger__button') && !e.target.closest('.header__nav') && $menu.classList.contains('header__nav--opened')) {
		$burgerBtn.classList.remove('burger__button--active')
		$menu.classList.remove('header__nav--opened')
		$body.classList.remove('scroll-lock')
	}
})

const reviewsSwiper = new Swiper('.reviews__swiper', {
	grabbable: true,
	spaceBetween: 0,
	centeredSlides: true,
	slidesPerView: 1.1,
	loop: true,
	pagination: {
		el: '.reviews__swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	breakpoints: {
		576: {
			slidesPerView: 1.4,
		},
		768: {
			slidesPerView: 1.8,
		},
		1024: {
			slidesPerView: 3,
		},
	},
})
