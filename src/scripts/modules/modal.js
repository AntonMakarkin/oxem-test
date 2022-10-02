const modal = (modalSelector, overlaySelector) => {
    const modalWindow = document.querySelector(modalSelector);
    const overlay = document.querySelector(overlaySelector);
    //const modalCloseButton = document.querySelector(modalCloseButton);

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target.classList.contains('.closeModal')) {
            overlay.style.display = 'none';
        }
    })
}

export default modal;