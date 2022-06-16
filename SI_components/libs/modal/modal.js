export class Modal {
	constructor(modalContainer) {
		this.buttons = Array.from(document.querySelectorAll('[data-modal-path]'))
		this.modals = Array.from(document.querySelectorAll('[data-modal-target]'))
		this.activeModal = null

		this.init()
	}

	init() {
		this.buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const modalPath = btn.dataset.modalPath
				const modal = this.modals.find((modal) => modal.dataset.modalTarget === modalPath)

				if (this.activeModal) {
					this.closeModal(this.activeModal)
				}
				this.openModal(modal)
				this.bodyLock()

				modal.addEventListener('click', (e) => {
					if (e.target.hasAttribute('data-modal-close')) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
				window.addEventListener('keydown', (e) => {
					if (e.code === 'Escape' || e.keyCode === 27) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
			})
		})
	}

	openModal(modal) {
		modal.classList.add('modal--opened')
		this.activeModal = modal
	}
	closeModal(modal) {
		modal.classList.remove('modal--opened')
		this.activeModal = null
	}

	bodyLock() {
		const scrollWidth = document.body.offsetWidth - document.body.clientWidth
		const bodyPadding = parseInt(window.getComputedStyle(document.body).paddingRight)
		document.body.style.paddingRight = `${bodyPadding + scrollWidth}px`
		document.body.classList.add('lock-scroll')
	}

	bodyUnlock() {
		document.body.classList.remove('lock-scroll')
		document.body.style = ``
	}
}
