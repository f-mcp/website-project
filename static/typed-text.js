document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".typed-text"); // Select all elements with the class `typed-text`
    const speed = 100; // Typing speed in milliseconds per character

    elements.forEach((element) => {
        const text = element.getAttribute("data-text"); // Get the text from the `data-text` attribute
        console.log(text);
        let index = 0;

        function typeLetter() {
            if (index < text.length) {
                // Append the next character, treating it as HTML
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeLetter, speed);
            }
        }

        typeLetter(); // Start typing for each element
    });
});
