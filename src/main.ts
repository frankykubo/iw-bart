import('./tailwind.css');
import('./styles.scss');

// just to be able to preview modals, ignoring jumpy element bug

const openModal = (modalElement: HTMLElement) => {
    modalElement.classList.remove('-z-10');
    modalElement.classList.add('z-10');
    modalElement.classList.remove('opacity-0');
    modalElement.classList.add('opacity-100');
}

const closeModal = (modalElement: HTMLElement) => {
    modalElement.classList.remove('opacity-100');
    modalElement.classList.add('opacity-0');
    // After animation is done
    setTimeout(() => {
        modalElement.classList.remove('z-10');
        modalElement.classList.add('-z-10');
    }, 301);
}

const bindModalOpeners = () => {
    document.querySelectorAll('.modalTrigger').forEach((elm) => {
        elm.addEventListener('click', function(this: HTMLElement) {
            const modalID = this.getAttribute('data-modal-id')
            const action = this.getAttribute('data-action');
            if (!modalID || !action) {
                throw new Error('Modal element not specified or no action provided.');
            }
            const modalElement = document.querySelector<HTMLElement>(`#${modalID}`);
            if (!modalElement) {
                throw new Error('Modal element does not exist');
            }
            if (action === 'open') {
                openModal(modalElement);
                return;
            } else if (action === 'close') {
                closeModal(modalElement);
                return;
            }
            throw new Error('Invalid modal action');
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    console.log('here')
    bindModalOpeners();
});