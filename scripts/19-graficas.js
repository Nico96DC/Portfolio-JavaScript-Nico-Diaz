/* scripts/19-graficas.js */

const ctx = document.getElementById('graficoVentas');
const form = document.getElementById('formVentas');

function generateColor() {
  // Genera un color HSL aleatorio, buen contraste y variedad
  const h = Math.floor(Math.random() * 360);
  const s = 65; // saturación
  const l = 50; // luminosidad
  return `hsl(${h} ${s}% ${l}%)`;
}

let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

// Asegurar que cada venta tenga un color (para datos previos)
let changed = false;
ventas = ventas.map(v => {
  if (!v.color) {
    changed = true;
    return { ...v, color: generateColor() };
  }
  return v;
});
if (changed) localStorage.setItem('ventas', JSON.stringify(ventas));

const chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ventas.map(v => v.mes),
    datasets: [{
      label: 'Monto de Ventas ($)',
      data: ventas.map(v => v.monto),
      backgroundColor: ventas.map(v => v.color),
      borderColor: 'rgba(255,255,255,0.8)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#222' } },
      tooltip: { titleColor: '#222', bodyColor: '#222' }
    },
    scales: {
      // En pie/doughnut no aplica, pero es útil si cambias a 'bar' o 'line'
      y: { beginAtZero: true, ticks: { color: '#222' }, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { ticks: { color: '#222' }, grid: { color: 'rgba(0,0,0,0.05)' } }
    }
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const mes = document.getElementById('mes').value.trim();
  const monto = parseFloat(document.getElementById('monto').value);

  if (mes && !isNaN(monto)) {
    const color = generateColor();
    ventas.push({ mes, monto, color });
    localStorage.setItem('ventas', JSON.stringify(ventas));

    chart.data.labels = ventas.map(v => v.mes);
    chart.data.datasets[0].data = ventas.map(v => v.monto);
    chart.data.datasets[0].backgroundColor = ventas.map(v => v.color);
    chart.update();

    form.reset();
  }
});