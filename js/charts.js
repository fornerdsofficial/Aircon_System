// 차트 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 에너지 소비량 차트
    const energyConsumptionChart = document.getElementById('energyConsumptionChart');
    if (energyConsumptionChart) {
        new Chart(energyConsumptionChart, {
            type: 'bar',
            data: {
                labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                datasets: [{
                    label: '에너지 소비량 (kWh)',
                    data: [120, 190, 230, 250, 210, 235, 240, 180],
                    backgroundColor: 'rgba(59, 135, 110, 0.7)',
                    borderColor: 'rgba(59, 135, 110, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '에너지 소비량 (kWh)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '시간'
                        }
                    }
                }
            }
        });
    }
    
    // 온도 및 습도 차트
    const temperatureChart = document.getElementById('temperatureChart');
    if (temperatureChart) {
        new Chart(temperatureChart, {
            type: 'line',
            data: {
                labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                datasets: [
                    {
                        label: '평균 온도 (°C)',
                        data: [21, 22, 24, 26, 27, 25, 24, 23],
                        borderColor: 'rgba(244, 67, 54, 0.8)',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: '평균 습도 (%)',
                        data: [45, 42, 40, 38, 36, 39, 42, 43],
                        borderColor: 'rgba(33, 150, 243, 0.8)',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        position: 'left',
                        title: {
                            display: true,
                            text: '온도 (°C)'
                        },
                        min: 15,
                        max: 35
                    },
                    y1: {
                        position: 'right',
                        title: {
                            display: true,
                            text: '습도 (%)'
                        },
                        min: 0,
                        max: 100,
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '시간'
                        }
                    }
                }
            }
        });
    }
    
    // 기타 차트를 추가할 수 있습니다.
});
