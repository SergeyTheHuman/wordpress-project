import { isWebp } from './components/isWebp.js'
import { Modal } from './components/modal.js'
import Swiper from 'swiper/bundle'
import 'inputmask'
import JustValidate from 'just-validate'

const inputsTel = document.querySelectorAll('input[type="tel"]')
const telMask = new Inputmask('+7 (999) 999-99-99')
telMask.mask(inputsTel)

const connectValidation = new JustValidate('.connect-form')
connectValidation
	.addField('#formTel', [
		{
			rule: 'required',
			errorMessage: 'Пожалуйста, введите ваш телефон',
			errorFieldStyle: {
				border: '1px solid red',
			},
		},
	])
	.addField('#formName', [
		{
			rule: 'required',
			errorMessage: 'Пожалуйста, введите ваше имя',
			errorFieldStyle: {
				border: '1px solid red',
			},
		},
	])
	.addField('#formEmail', [
		{
			rule: 'required',
			errorMessage: 'Пожалуйста, введите адрес электронной почты',
			errorFieldStyle: {
				border: '1px solid red',
			},
		},
		{
			rule: 'email',
			errorMessage: 'Данный адрес электронной почты введен не корректно!',
			errorFieldStyle: {
				border: '1px solid red',
			},
		},
	])

isWebp()

const $burgerBtn = document.querySelector('[data-burger-btn]')
const $menu = document.querySelector('.header__nav')
const $body = document.body
const $links = document.querySelectorAll('a[data-path]')
const $forms = document.querySelectorAll('form')

$forms.forEach((form) =>
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		if (connectValidation.isValid) {
			form.reset()
			connectValidation.refresh()
			connectUsModal.closeModal(connectUsModal.activeModal)
			connectUsModal.bodyUnlock()
			setTimeout(() => {
				alert('Сообщение отправлено, спасибо!')
			}, 500)
		}
	})
)

window.addEventListener('click', (e) => {
	if (e.target.hasAttribute('data-modal-close')) {
		connectValidation.refresh()
	}
})

window.addEventListener('keydown', (e) => {
	if (e.code === 'Escape' || e.keyCode === 27) {
		connectValidation.refresh()
	}
})

$links.forEach((link) =>
	link.addEventListener('click', (e) => {
		const currentLink = e.target
		if (currentLink.dataset.path) {
			e.preventDefault()
			const sectionID = currentLink.dataset.path
			if ($menu.classList.contains('header__nav--opened')) {
				$burgerBtn.classList.remove('burger__button--active')
				$menu.classList.remove('header__nav--opened')
				$body.classList.remove('scroll-lock')
			}
			if (e.target.closest('._lines')) {
				window.location.href = `index.html#${sectionID}`
				return
			}

			document.getElementById(sectionID).scrollIntoView({
				behavior: 'smooth',
			})
		}
	})
)

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
		center: [59.93672823167039, 30.317486354025053],
		zoom: 11,
	})

	map.controls.remove('geolocationControl') // удаляем геолокацию
	map.controls.remove('searchControl') // удаляем поиск
	map.controls.remove('trafficControl') // удаляем контроль трафика
	map.controls.remove('typeSelector') // удаляем тип
	map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('rulerControl') // удаляем контрол правил

	const geoPoint1 = new ymaps.Placemark(
		[59.910095482416324, 30.319871964318526],
		{
			balloonContent: `
				<div class="balloon"> 
					<h5 class="balloon__name">Бассейн WorkClass</h5>
					<div class="balloon__address">Невский проспект, дом 140</div>
		 		</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: '../files/location.svg',
			iconImageSize: [50, 50],
			iconImageOffset: [-23, -60],
		}
	)
	const geoPoint2 = new ymaps.Placemark(
		[59.95844458821735, 30.29954774013346],
		{
			balloonContent: `
				<div class="balloon"> 
					<h5 class="balloon__name">Бассейн "На Гороховой"</h5>
					<div class="balloon__address">3-й проезд Иванова, дом 14, корпус 2</div>
		 		</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: '../files/location.svg',
			iconImageSize: [50, 50],
			iconImageOffset: [-23, -60],
		}
	)

	map.geoObjects.add(geoPoint1)
	map.geoObjects.add(geoPoint2)
}

ymaps.ready(initYandexMap)

const connectUsModal = new Modal()
