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

function initYandexMap() {
	let map = new ymaps.Map('address__map', {
		center: [50.59130164348107, 36.58778729849953],
		zoom: 17,
	})

	map.controls.remove('geolocationControl') // удаляем геолокацию
	map.controls.remove('searchControl') // удаляем поиск
	map.controls.remove('trafficControl') // удаляем контроль трафика
	map.controls.remove('typeSelector') // удаляем тип
	map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('rulerControl') // удаляем контрол правил

	// Создание геообъекта с типом точка (метка).
	const geoPoint = new ymaps.Placemark(
		[50.59130164348107, 36.58778729849953],
		{},
		{
			iconLayout: 'default#image',
			iconImageHref: '../files/location.svg',
			iconImageSize: [50, 50],
			iconImageOffset: [-23, -60],
		}
	)

	// Размещение геообъекта на карте.
	map.geoObjects.add(geoPoint)
}

ymaps.ready(initYandexMap)
