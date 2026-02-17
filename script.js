// Simulated Data (for testing before ESP arrives)

let coValue = 5;
let energy = 1;

const ctx = document.getElementById('coChart').getContext('2d');

const coChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CO Level (ppm)',
            data: [],
            borderColor: '#00ff99',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: { ticks: { color: 'white' }},
            y: { ticks: { color: 'white' }}
        }
    }
});

setInterval(() => {


    // Fake random values
    coValue = (Math.random() *  12).toFixed(2);
    let air = (Math.random() * 400).toFixed(0);
    let temp = (Math.random() * 10 + 25).toFixed(1);
    let hum = (Math.random() * 30 + 40).toFixed(0);
    let power = (Math.random() * 200).toFixed(1);

    energy += power / 100000; // small increase

    let co2Emission = (energy * 0.7).toFixed(3);

    // Update UI
    document.getElementById("co").innerText = coValue + " ppm";
    document.getElementById("air").innerText = air;
    document.getElementById("temp").innerText = temp + " °C";
    document.getElementById("hum").innerText = hum + " %";
    document.getElementById("power").innerText = power + " W";
    document.getElementById("co2").innerText = co2Emission + " kg";

    // Update graph
    coChart.data.labels.push('');
    coChart.data.datasets[0].data.push(coValue);

    if (coChart.data.labels.length > 20) {
        coChart.data.labels.shift();
        coChart.data.datasets[0].data.shift();
    }
    // ALERT LOGIC
if (coValue > 9) {
    document.body.classList.add("danger");
    document.getElementById("alert").style.display = "block";
} else {
    document.body.classList.remove("danger");
    document.getElementById("alert").style.display = "none";
}

    coChart.update();

}, 2000);