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
    fetch(`https://vmvstrial1-e7fcd34a5e0d.herokuapp.com/scrape?vin=${vinValue}`)
        .then(response => response.json())
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
            console.error('Error:', error);
            document.getElementById('resultContainer').textContent = 'Error fetching data';
        });
});