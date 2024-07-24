// Function to swap elements in array
function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

// Function to check if two arrays a and b are equal
function arraysEqual(a, b) {
	return a.length === b.length && a.every((val, index) => val === b[index]);
}

// Function to display the results of the parking reordering process on the webpage
function displayResults(initialPositions, targetPositions, steps) {
	const resultDiv = document.getElementById('result');
	const stepsDiv = document.getElementById('steps-result');

	// Clear previous results
	resultDiv.innerHTML = '';
	stepsDiv.innerText = '';

	// Display initial and target states
	resultDiv.innerHTML += `<p>Početno stanje: ${initialPositions.join(' ')}</p>`;
	resultDiv.innerHTML += `<p>Završno stanje: ${targetPositions.join(' ')}</p>`;

	// Display minimal number of steps
	resultDiv.innerHTML += `<p>Minimalan broj koraka: ${steps.length}</p>`;

	// Display each step
	steps.forEach(step => {
		stepsDiv.innerText += step.join(' ') + '\n';
	});
}

// Function to calculate the minimal number of moves required to match the initial parking state to the target parking state
function minMovesToMatchParking(initialPositions, targetPositions) {
	const initial = [...initialPositions];
	const target = [...targetPositions];


	const steps = []; // Array to store each step of the process

	// Loop until the initial positions match the target positions
	while (!arraysEqual(initialPositions, targetPositions)) {
		const zeroIndex = initialPositions.indexOf(0); // Find the index of the empty space (0)
		const targetZeroIndex = targetPositions[zeroIndex]; // Find the target index for the empty space

		// If the empty space is already at the correct position
		if (targetZeroIndex === 0) {
			// Find a car that is not in the correct position and move it to the empty space
			for (let i = 0; i < initialPositions.length; i++) {
				if (initialPositions[i] !== targetPositions[i] && initialPositions[i] !== 0) {
					swap(initialPositions, i, zeroIndex); // Swap the car with the empty space
					steps.push([...initialPositions]); // Record the step
					break;
				}
			}
		} else {
			// Move the car that should be at the empty space's position to the empty space
			const carIndex = initialPositions.indexOf(targetZeroIndex);
			swap(initialPositions, carIndex, zeroIndex); // Swap the car with the empty space
			steps.push([...initialPositions]); // Record the step
		}
	}
	displayResults(initial, target, steps); // Display the results on the webpage
}

// Function to handle the form submission event
function onSubmit(event) {

	event.preventDefault(); // Prevent the default form submission behavior

	const initialInput = document.getElementById('initial');
	const targetInput = document.getElementById('target');
	const initial = initialInput.value.trim(); // Get the initial parking state from the input field
	const target = targetInput.value.trim(); // Get the target parking state from the input field
	const initialPositions = initial.split(' ').map(Number);
	const targetPositions = target.split(' ').map(Number);

	if (initialPositions.length !== targetPositions.length) {
		alert("Broj unijetih vozila mora biti jednak!");
		return;
	}

	if (!initialPositions.every((val) => targetPositions.indexOf(val) !== -1)) {
		alert("Oznake unijetih vozila se moraju poklapati!");
		return;
	}

	if (!initialPositions.includes(0)) {
		alert("Početno stanje mora sadržavati jedno prazno mjesto označeno sa 0!");
		return;
	}

	const initialSet = new Set(initialPositions);
	if (initialSet.size !== initialPositions.length) {
		alert("Početno stanje sadrži duplikate!");
		return;
	}

	minMovesToMatchParking(initialPositions, targetPositions); // Calculate the minimal moves and display the results

	// Clear the input fields
	initialInput.value = '';
	targetInput.value = '';
}
