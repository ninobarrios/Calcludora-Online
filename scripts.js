document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('.graficotabla table tbody');
    const input1 = document.getElementById('input1');
    const percentageDisplay = document.getElementById('percentageDisplay');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const resultado = document.getElementById('resultado');
    const discountPercentageSpan = document.getElementById('discount-percentage');
    const errorMessage = document.getElementById('error-message');

    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    function updateTable() {
        const value = parseInt(input1.value, 10);

        if (isNaN(value) || value < 0 || value > 100) {
            errorMessage.textContent = 'Ingrese un valor entre 0 y 100.';
            return;
        }

        errorMessage.textContent = '';
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.style.backgroundColor = '');

        for (let i = 0; i < value; i++) {
            if (i < cells.length) {
                cells[i].style.backgroundColor = '#ed826b';
            }
        }

        percentageDisplay.textContent = ` de 100`;
    }

    function validarInput2() {
        let valor = parseFloat(input2.value);
        if (isNaN(valor) || valor < 0 || valor > 10000000) {
            errorMessage.textContent = 'Ingrese un descuento válido (0-100).';
            input2.value = '';
        } else {
            errorMessage.textContent = '';
        }
        calcularPorcentaje();
    }

    function calcularPorcentaje() {
        const percent = parseFloat(input2.value);
        const number = parseFloat(input3.value);
        if (!isNaN(percent) && !isNaN(number)) {
            const result = (percent / 100) * number;
            resultado.value = result.toFixed(2);
        } else {
            resultado.value = '';
        }
    }

    input1.addEventListener('input', updateTable);
    input2.addEventListener('input', validarInput2);
    input3.addEventListener('input', calcularPorcentaje);

    updateTable();
    calcularPorcentaje();
});

document.addEventListener('DOMContentLoaded', function () {
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const discountPercentageSpan = document.getElementById('discount-percentage');
    const productPriceSpan = document.getElementById('product-price');
    const discountAmountSpan = document.getElementById('discount-amount');

    function updateDiscountDetails() {
        const discountValue = parseFloat(input2.value);
        const productPrice = parseFloat(input3.value);

        discountPercentageSpan.textContent = `${discountValue}%`;
        productPriceSpan.textContent = `$${productPrice}`;

        const discountAmount = (productPrice * (discountValue / 100)).toFixed(2);
        discountAmountSpan.textContent = `$${discountAmount}`;
    }

    input2.addEventListener('input', updateDiscountDetails);
    input3.addEventListener('input', updateDiscountDetails);

    updateDiscountDetails();
});
document.addEventListener("DOMContentLoaded", function () {
    for (let i = 1; i <= 4; i++) {
        const buttonId = `toggle-button${i === 1 ? '' : i}`;
        const contentId = `extra-content${i === 1 ? '' : i}`;

        const toggleBtn = document.getElementById(buttonId);
        const extraContent = document.getElementById(contentId);

        toggleBtn?.addEventListener("click", function (event) {
            event.preventDefault();
            const link = toggleBtn.querySelector('a');
            const isHidden = extraContent.style.display === "none" || extraContent.style.display === "";
            extraContent.style.display = isHidden ? "flex" : "none";
            if (link) link.textContent = isHidden ? "Ocultar Fórmula" : "Ver Fórmula";
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const input2 = document.getElementById("input2");
    const input3 = document.getElementById("input3");
    const resultado = document.getElementById("resultado");

    function updateLabels(className, value) {
        const labels = document.querySelectorAll(className);
        labels.forEach(label => {
            label.textContent = value;
        });
    }

    function updateValues() {
        const percentage = parseFloat(input2.value) || 0;
        const number = parseFloat(input3.value) || 0;
        const result = (percentage / 100) * number;

        updateLabels('.input2-value-label', `${percentage}`);
        updateLabels('.input3-value-label', `${number}`);
        updateLabels('.resultado-value-label', `${result.toFixed(2)}`);

        resultado.value = result.toFixed(2);
    }

    input2.addEventListener("input", updateValues);
    input3.addEventListener("input", updateValues);

    updateValues();
});

function obtenerNumero() {
    var porcentaje = document.getElementById("input2").value;
    var total = document.getElementById("input3").value;

    porcentaje = parseFloat(porcentaje) || 0;
    total = parseFloat(total) || 0;

    var resultado = (porcentaje / 100) * total;

    document.getElementById("resultado").textContent = resultado.toFixed(2);
}





document.addEventListener('DOMContentLoaded', () => {
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const input2ValueLabel = document.querySelector('.input2-value-label');
    const input3ValueLabel = document.querySelector('.input3-value-label');
    const ctx = document.getElementById('myPieChart').getContext('2d');

    let pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Descuento Aplicado', 'Monto Restante'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#ed826b', '#7eb9a4'], // Colores fijos
                hoverOffset: 10,
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverBorderColor: '#222',
                hoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 1500,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: {
                            size: 14,
                            family: 'Segoe UI'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const total = pieChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const value = tooltipItem.raw;
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                            return `${tooltipItem.label}: S/ ${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    const updateChart = () => {
        const porcentaje = parseFloat(input2.value) || 0;
        const precio = parseFloat(input3.value) || 0;

        const descuentoAplicado = (porcentaje / 100) * precio;
        const restante = precio - descuentoAplicado;

        input2ValueLabel.textContent = `${porcentaje.toFixed(2)}%`;
        input3ValueLabel.textContent = `${precio.toFixed(2)}`;

        pieChart.data.datasets[0].data = [descuentoAplicado, restante];
        pieChart.update();
    };

    input2.addEventListener('input', updateChart);
    input3.addEventListener('input', updateChart);

    updateChart();
});





document.addEventListener('DOMContentLoaded', function () {
    const porcentajebox2 = document.getElementById('porcentajebox2');
    const parteporcentajebox2 = document.getElementById('parteporcentajebox2');
    const resultadototalbox2 = document.getElementById('resultadototalbox2');

    const labelPorcentajebox2 = document.getElementById('labelPorcentajebox2');
    const labelParteporcentajebox2 = document.getElementById('labelParteporcentajebox2');
    const labelResultadototalbox2 = document.getElementById('labelResultadototalbox2');

    const inputValueLabels = document.querySelectorAll('.input2-value-label2');
    const inputPercentageLabels = document.querySelectorAll('.input2-percentage-label');
    const input3ValueLabels = document.querySelectorAll('.input3-value-label2');

    const ctx = document.getElementById('myPieChart2').getContext('2d');

    const myPieChart2 = new Chart(ctx, {
        type: 'doughnut', // Cambiado de 'pie' a 'doughnut'
        data: {
            labels: ['% Aplicado', 'Restante'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#ed826b', '#7eb9a4'], // Colores personalizados
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '60%', 
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const total = dataset.data.reduce((sum, value) => sum + value, 0);
                            const value = dataset.data[tooltipItem.dataIndex];
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                            return `${tooltipItem.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });

    function calcularResultado() {
        const porcentaje = parseFloat(porcentajebox2.value) || 0;
        const parte = parseFloat(parteporcentajebox2.value) || 0;

        if (porcentaje > 0 && parte > 0) {
            const resultadototal = (parte * 100) / porcentaje;
            resultadototalbox2.value = resultadototal.toFixed(2);
            labelResultadototalbox2.textContent = resultadototal.toFixed(2);

            labelPorcentajebox2.textContent = porcentaje;
            labelParteporcentajebox2.textContent = parte;

            inputValueLabels.forEach(label => {
                label.textContent = parte;
            });
            inputPercentageLabels.forEach(label => {
                label.textContent = porcentaje;
            });
            input3ValueLabels.forEach(label => {
                label.textContent = resultadototal.toFixed(2);
            });

            const partePorcentaje = (parte * 100) / resultadototal;
            const restante = 100 - partePorcentaje;

            myPieChart2.data.datasets[0].data = [partePorcentaje, restante];
            myPieChart2.data.labels = [
                `% Aplicado: (${partePorcentaje.toFixed(2)}%) ${parte.toFixed(2)}`,
                `Restante: (${restante.toFixed(2)}%) ${(resultadototal - parte).toFixed(2)}`
            ];

            myPieChart2.update();
        } else {
            resultadototalbox2.value = 'Error';
            labelResultadototalbox2.textContent = 'Error';

            inputValueLabels.forEach(label => {
                label.textContent = '';
            });
            inputPercentageLabels.forEach(label => {
                label.textContent = '';
            });
            input3ValueLabels.forEach(label => {
                label.textContent = '';
            });

            myPieChart2.data.datasets[0].data = [0, 100];
            myPieChart2.data.labels = ['% Aplicado', 'Restante'];
            myPieChart2.update();
        }
    }

    calcularResultado();
    porcentajebox2.addEventListener('input', calcularResultado);
    parteporcentajebox2.addEventListener('input', calcularResultado);
});







document.addEventListener('DOMContentLoaded', function () {
    const porcentajebox3 = document.getElementById('porcentajebox3'); // Total
    const parteporcentajebox3 = document.getElementById('parteporcentajebox3'); // Parte del total
    const resultadototalbox3 = document.getElementById('resultadototalbox3');

    const labelPorcentajebox3 = document.getElementById('labelPorcentajebox3');
    const labelParteporcentajebox3 = document.getElementById('labelParteporcentajebox3');
    const labelResultadototalbox3 = document.getElementById('labelResultadototalbox3');

    const inputValueLabels3 = document.querySelectorAll('.input2-value-label3');
    const inputPercentageLabels3 = document.querySelectorAll('.input2-percentage-label3');
    const input3ValueLabels3 = document.querySelectorAll('.input3-value-label3');

    const ctx = document.getElementById('myPieChart3').getContext('2d');

    const myPieChart3 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Restante', 'Parte'],
            datasets: [{
                label: 'Distribución',
                data: [0, 100],
                backgroundColor: ['#ed826b', '#7eb9a4'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        generateLabels: function (chart) {
                            const dataset = chart.data.datasets[0];
                            const total = dataset.data.reduce((sum, value) => sum + value, 0);
                            return chart.data.labels.map((label, i) => {
                                const value = dataset.data[i];
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                                return {
                                    text: `${label} ${percentage}%`,
                                    fillStyle: dataset.backgroundColor[i],
                                    strokeStyle: dataset.backgroundColor[i],
                                    lineWidth: 1,
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let total = myPieChart3.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            let value = tooltipItem.raw;
                            let percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                            return `${tooltipItem.label}: ${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    function calcularResultado() {
        const total = parseFloat(porcentajebox3.value); 
        const parte = parseFloat(parteporcentajebox3.value); 

        if (!isNaN(total) && !isNaN(parte) && total > 0 && parte >= 0) {
            const porcentajeParte = (parte / total) * 100;
            const restante = total - parte;

            // Actualizar campos visibles
            resultadototalbox3.value = porcentajeParte.toFixed(2) + ' %';
            labelResultadototalbox3.textContent = porcentajeParte.toFixed(2);

            labelPorcentajebox3.textContent = total;
            labelParteporcentajebox3.textContent = parte;

            inputValueLabels3.forEach(label => { label.textContent = parte; });
            inputPercentageLabels3.forEach(label => { label.textContent = porcentajeParte.toFixed(2)+"%"; });
            input3ValueLabels3.forEach(label => { label.textContent = total; });

            // Actualizar gráfico
            myPieChart3.data.datasets[0].data = [restante, parte];
            myPieChart3.data.labels = [
                ``,
                ``
            ];
            myPieChart3.update();
        } else {
            resultadototalbox3.value = 'Error';
            labelResultadototalbox3.textContent = 'Error';

            inputValueLabels3.forEach(label => { label.textContent = ''; });
            inputPercentageLabels3.forEach(label => { label.textContent = ''; });
            input3ValueLabels3.forEach(label => { label.textContent = ''; });

            myPieChart3.data.datasets[0].data = [0, 100];
            myPieChart3.data.labels = ['Restante', 'Parte'];
            myPieChart3.update();
        }
    }

    calcularResultado();
    porcentajebox3.addEventListener('input', calcularResultado);
    parteporcentajebox3.addEventListener('input', calcularResultado);
});







document.addEventListener('DOMContentLoaded', function () {
    const porcentajebox4 = document.getElementById('porcentajebox4');
    const parteporcentajebox4 = document.getElementById('parteporcentajebox4');
    const parteporcentajebox42 = document.getElementById('parteporcentajebox42');
    const resultadototalbox4 = document.getElementById('resultadototalbox4');

    const labelPorcentajebox4 = document.getElementById('labelPorcentajebox4');
    const labelParteporcentajebox4 = document.getElementById('labelParteporcentajebox4');
    const labelResultadototalbox4 = document.getElementById('labelResultadototalbox4');
    const partePorcentajeLabel = document.getElementById('partePorcentajeLabel');

    const inputValueLabels4 = document.querySelectorAll('.input2-value-label4');
    const inputPercentageLabels4 = document.querySelectorAll('.input2-percentage-label4');
    const input3ValueLabels4 = document.querySelectorAll('.input3-value-label4');
    const partePorcentajeLabels42 = document.querySelectorAll('.parteporcentajebox42');

    const ctx = document.getElementById('myPieChart4').getContext('2d');

    const myPieChart4 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Parte Calculada', 'Restante'],
            datasets: [{
                label: 'Distribución',
                data: [0, 100],
                backgroundColor: ['#ed826b', '#7eb9a4'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '60%', // hace la dona
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            const total = myPieChart4.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = (value / total * 100).toFixed(2);
                            return `${tooltipItem.label}: (${percentage}%) ${value.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });

    function manejarError() {
        resultadototalbox4.value = 'Error';
        labelResultadototalbox4.textContent = 'Error';

        inputValueLabels4.forEach(label => label.textContent = '');
        inputPercentageLabels4.forEach(label => label.textContent = '');
        input3ValueLabels4.forEach(label => label.textContent = '');
        partePorcentajeLabels42.forEach(label => label.textContent = '');

        myPieChart4.data.datasets[0].data = [0, 100];
        myPieChart4.update();
    }

    function calcularResultado() {
        const porcentaje = parseFloat(porcentajebox4.value);
        const parte = parseFloat(parteporcentajebox4.value);
        const parteExtra = parseFloat(parteporcentajebox42.value);

        if (!isNaN(porcentaje) && !isNaN(parte) && !isNaN(parteExtra) && porcentaje > 0) {
            const resultadototal = (parte * parteExtra) / porcentaje;
            resultadototalbox4.value = resultadototal.toFixed(2);
            labelResultadototalbox4.textContent = resultadototal.toFixed(2);

            labelPorcentajebox4.textContent = porcentaje;
            labelParteporcentajebox4.textContent = parte;

            inputValueLabels4.forEach(label => label.textContent = parte);
            inputPercentageLabels4.forEach(label => label.textContent = porcentaje);
            input3ValueLabels4.forEach(label => label.textContent = resultadototal.toFixed(2));
            partePorcentajeLabels42.forEach(label => label.textContent = parteExtra);

            // Calcular el porcentaje real que representa la parteExtra
            const porcentajeCalculado = (parteExtra * 100) / 100; // ya es porcentaje directo
            const restante = 100 - parteExtra;

            myPieChart4.data.datasets[0].data = [parteExtra, restante];
            myPieChart4.data.labels = [
                `${parteExtra.toFixed(2)}%`,
                `${restante.toFixed(2)}%`
            ];
            myPieChart4.update();

            partePorcentajeLabel.textContent = `Porcentaje extra: ${parteExtra.toFixed(2)}% / Resultado: ${resultadototal.toFixed(2)}`;
        } else {
            manejarError();
        }
    }

    calcularResultado();
    porcentajebox4.addEventListener('input', calcularResultado);
    parteporcentajebox4.addEventListener('input', calcularResultado);
    parteporcentajebox42.addEventListener('input', calcularResultado);
});






/*----------------------------------------------*/
const porcentajes = [10, 15, 20, 25, 50, 75];
const preguntas = [];

function generarPreguntas() {
    const quizContainer = document.getElementById("quizContainer");

    for (let i = 0; i < 8; i++) {
        const porcentaje = porcentajes[Math.floor(Math.random() * porcentajes.length)];
        const base = Math.floor(Math.random() * 901) + 100; // de 100 a 1000
        const resultado = parseFloat(((porcentaje / 100) * base).toFixed(2));

        preguntas.push({ id: `q${i + 1}`, porcentaje, base, resultado });


        const card = document.createElement("div");
        card.className = "quiz-card";
        card.innerHTML = `
            <h4> ¿Cuál es el ${porcentaje}% de ${base}?</h4>
            <input type="number" step="any" id="q${i + 1}"  placeholder="Tu respuesta">
            <span id="result${i + 1}">⏳</span>
        `;
        quizContainer.appendChild(card);
    }
}

function checkAnswers() {
    preguntas.forEach((pregunta, i) => {
        const input = document.getElementById(pregunta.id);
        const resultSpan = document.getElementById(`result${i + 1}`);
        const userAnswer = parseFloat(input.value);

        if (!isNaN(userAnswer)) {
            if (Math.abs(userAnswer - pregunta.resultado) < 0.01) {
                resultSpan.textContent = `✅ ${pregunta.resultado}`;
                resultSpan.style.color = "#2e7d32"; // verde
            } else {
                resultSpan.textContent = `❌ ${userAnswer} (✔ ${pregunta.resultado})`;
                resultSpan.style.color = "#d32f2f"; // rojo
            }
        } else {
            resultSpan.textContent = "-";
            resultSpan.style.color = "inherit";
        }
    });
}

generarPreguntas();

/*----------------------------------------------*/

const ids = [
    "input1",
    "input2",
    "porcentajebox2",
    "porcentajebox4",
    "parteporcentajebox42"
];

ids.forEach(id => {
    const input = document.getElementById(id);

    if (!input) return;

    // Quitar el % al enfocar
    input.addEventListener("focus", () => {
        input.value = input.value.replace('%', '');
    });

    // Mientras se escribe, mantener solo números y agregar %
    input.addEventListener("input", () => {
        let val = input.value.replace(/[^0-9]/g, '');
        input.value = val ? val + '%' : '';
    });

    // Al salir, asegurarse que tenga el %
    input.addEventListener("blur", () => {
        if (input.value !== '' && !input.value.includes('%')) {
            input.value += '%';
        }
    });
});

// Función para obtener el número sin el %
function getPorcentajeSinSimbolo(id) {
    const val = document.getElementById(id)?.value || '';
    return parseFloat(val.replace('%', '')) || 0;
}
