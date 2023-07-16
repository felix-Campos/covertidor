
    // Función para convertir las monedas y mostrar el historial en un gráfico
    function convertirMoneda() {
      const cantidad = document.getElementById('cantidad').value;
      const moneda = document.getElementById('moneda').value;

      // Realizar la consulta a la API utilizando fetch
      fetch(`https://mindicador.cl/api/${moneda}`)
        .then(response => response.json())
        .then(data => {
          const historial = data.serie.slice(0, 10); // Obtener los últimos 10 días del historial
          const valores = historial.map(d => d.valor); // Obtener los valores de cada día
          const fechas = historial.map(d => d.fecha); // Obtener las fechas de cada día

          // Mostrar el historial en un gráfico utilizando Chart.js
          const ctx = document.getElementById('chart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: fechas,
              datasets: [{
                label: 'Valor de la moneda',
                data: valores,
                borderColor: 'blue',
                fill: false
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          // Mostrar el resultado en el elemento con id "resultado"
          const valor = data.serie[0].valor;
          const resultado = cantidad * valor;
          document.getElementById('resultado').textContent = resultado.toFixed(2);
        })
        .catch(error => {
          // Mostrar el error en el elemento con id "error"
          document.getElementById('error').textContent = 'Error en la respuesta de la API: ' + error;
        });
    }
  