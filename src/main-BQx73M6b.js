// ...existing code...
function YM(actualVariable) {
    // Log the variable to see its value
    console.log('actualVariable:', actualVariable);

    // Ensure actualVariable is defined before accessing its length property
    if (actualVariable && actualVariable.length) {
        // ...existing code...
    } else {
        console.error('actualVariable is undefined or has no length property');
    }
    // ...existing code...
}
// ...existing code...