export const isElementInView = (element: HTMLElement) => {
    const bounding = element.getBoundingClientRect();
    return bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight
};