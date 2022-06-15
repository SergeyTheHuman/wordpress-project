import { isWebp } from './components/isWebp.js'

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
