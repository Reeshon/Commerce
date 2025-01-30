// ...existing code...
function YM(actualVariable) {
    // Log the variable to see its value
    console.log('actualVariable:', actualVariable);

    // Ensure actualVariable is defined before accessing its length property
    if (actualVariable && actualVariable.length) {
        // ...existing code...
        console.log('Proceeding with processing actualVariable.');
    } else {
        console.error('actualVariable is undefined or has no length property');
        console.error('Type of actualVariable:', typeof actualVariable);
        if (actualVariable) {
            console.error('actualVariable keys:', Object.keys(actualVariable));
        }
    }
    // ...existing code...
    console.log('YM function execution completed.');
}
// ...existing code...