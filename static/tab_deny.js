// This script stops the user from cycle tabbing onto an otherwise hidden button

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            // Prevent default tabbing behavior
            event.preventDefault();

            // Get all focusable elements inside the sidenav
            const sidenav = document.querySelector('.sidenav');
            const focusableElements = Array.from(
                sidenav.querySelectorAll('a, button, input, select, textarea')
            );

            if (focusableElements.length === 0) return; // Exit if no focusable elements

            // Determine the current focused element
            const currentIndex = focusableElements.indexOf(document.activeElement);

            // Navigate forward or backward based on Shift key
            const nextIndex = event.shiftKey
                ? (currentIndex - 1 + focusableElements.length) % focusableElements.length // Shift + Tab
                : (currentIndex + 1) % focusableElements.length; // Tab

            // Focus the next or previous element
            focusableElements[nextIndex].focus();
        }
    });

