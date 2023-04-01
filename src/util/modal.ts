export const openModal = (modalElement: HTMLElement) => {
    modalElement.classList.remove('-z-10');
    modalElement.classList.add('z-10');
    modalElement.classList.remove('opacity-0');
    modalElement.classList.add('opacity-100');
}

export const closeModal = (modalElement: HTMLElement) => {
    modalElement.classList.remove('opacity-100');
    modalElement.classList.add('opacity-0');
    // After animation is done
    setTimeout(() => {
        modalElement.classList.remove('z-10');
        modalElement.classList.add('-z-10');
    }, 301);
}