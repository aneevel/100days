// Get input element
const inputElement = document.querySelector('input');

const warningThreshold = 10;

// Setup callback function
inputElement.addEventListener('input', (event) => {
    
    // Get value of input
    const inputText = event.target.value;
    
    // Get remainig chars element
    const remainingCharElement = document.querySelector('#remaining-chars');

    // Get length of input
    const inputLength = inputText.length;

    // Update remaining chars
    const remainingChars = event.target.maxLength - inputLength;
    remainingCharElement.textContent = remainingChars;

    if (remainingChars <= warningThreshold)
        inputElement.classList.add('warning');
    else 
        inputElement.classList.remove('warning');
});