document.getElementById('submitVIN').addEventListener('click', function () {
    document.querySelector('.container').classList.add('result');

    const loadingScreen = document.querySelector('.loader');

    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        loadingScreen.classList.add('hidden');
    }, 20000);

    const vinValue = document.getElementById('inputVIN').value;
    if (!vinValue) {
        alert('Please enter a VIN');
        return;
    }
    fetch(`https://vmvstrial1-e7fcd34a5e0d.herokuapp.com/scrape?vin=${vinValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById('resultContainer').textContent = 'Error fetching data';
            } else {
                document.getElementById('resultContainer').innerHTML = `
                    <p>Mileage: ${data.mileage}</p>
                    <p>Year/Month: ${data.year}</p>
                    <img src="${data.image}" alt="Vehicle Image" style="width: 300px;">
                `;
            }
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            document.getElementById('resultContainer').textContent = 'Error fetching data';
        });
});