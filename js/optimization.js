// 에너지 최적화 페이지 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 날짜 필터 버튼
    const periodButtons = document.querySelectorAll('.quick-period button');
    if (periodButtons.length > 0) {
        periodButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 모든 버튼 비활성화
                periodButtons.forEach(btn => btn.classList.remove('active'));
                
                // 선택한 버튼 활성화
                this.classList.add('active');
                
                // 날짜 범위 업데이트 (실제로는 날짜 계산 필요)
                const period = this.getAttribute('data-period');
                const endDate = new Date();
                let startDate = new Date();
                
                switch (period) {
                    case 'week':
                        startDate.setDate(endDate.getDate() - 7);
                        break;
                    case 'month':
                        startDate.setMonth(endDate.getMonth() - 1);
                        break;
                    case 'quarter':
                        startDate.setMonth(endDate.getMonth() - 3);
                        break;
                    case 'year':
                        startDate.setFullYear(endDate.getFullYear() - 1);
                        break;
                }
                
                const startInput = document.getElementById('startDate');
                const endInput = document.getElementById('endDate');
                
                if (startInput && endInput) {
                    startInput.value = formatDate(startDate);
                    endInput.value = formatDate(endDate);
                }
            });
        });
    }
    
    // 날짜 형식 포맷팅 (YYYY-MM-DD)
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // 적용 버튼 클릭 이벤트
    const applyDateBtn = document.querySelector('.btn-apply-date');
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', function() {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (!startDate || !endDate) {
                window.showToast('시작일과 종료일을 모두 선택해 주세요.', 'error');
                return;
            }
            
            // 데이터 로딩 시뮬레이션
            window.showToast('데이터를 불러오는 중입니다...', 'info');
            
            // 실제로는 서버에서 데이터를 가져와야 함
            // 여기서는 차트 업데이트 시뮬레이션만 수행
            
            setTimeout(() => {
                renderCharts();
                window.showToast('데이터가 업데이트 되었습니다.', 'success');
            }, 1500);
        });
    }
    
    // AI 추천 적용 버튼
    const applyRecommendationBtns = document.querySelectorAll('.recommendation-card .btn-primary');
    if (applyRecommendationBtns.length > 0) {
        applyRecommendationBtns.forEach(button => {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 적용 중...';
                this.disabled = true;
                
                const recommendationTitle = this.closest('.recommendation-card').querySelector('h4').textContent;
                
                // 적용 완료 시뮬레이션
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> 적용됨';
                    this.disabled = true;
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-success');
                    window.showToast(`"${recommendationTitle}" 설정이 적용되었습니다.`, 'success');
                }, 1500);
            });
        });
    }
    
    // 차트 렌더링
    function renderCharts() {
        // 월별 에너지 소비 차트
        const monthlyEnergyChart = document.getElementById('monthlyEnergyChart');
        if (monthlyEnergyChart) {
            new Chart(monthlyEnergyChart, {
                type: 'bar',
                data: {
                    labels: ['1월', '2월', '3월', '4월'],
                    datasets: [{
                        label: '2025년 에너지 소비량 (kWh)',
                        data: [42500, 45200, 47800, 48720],
                        backgroundColor: 'rgba(59, 135, 110, 0.7)',
                        borderColor: 'rgba(59, 135, 110, 1)',
                        borderWidth: 1
                    }, {
                        label: '2024년 에너지 소비량 (kWh)',
                        data: [51200, 49800, 50100, 52300],
                        backgroundColor: 'rgba(96, 125, 139, 0.7)',
                        borderColor: 'rgba(96, 125, 139, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 2,  // 추가: 가로:세로 비율 설정
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
                                text: '월'
                            }
                        }
                    }
                }
            });
        }
        
        // 시간대별 에너지 소비 패턴 차트
        const hourlyEnergyChart = document.getElementById('hourlyEnergyChart');
        if (hourlyEnergyChart) {
            new Chart(hourlyEnergyChart, {
                type: 'line',
                data: {
                    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                    datasets: [{
                        label: '평일 평균',
                        data: [12, 10, 18, 48, 52, 50, 40, 20],
                        borderColor: 'rgba(59, 135, 110, 1)',
                        backgroundColor: 'rgba(59, 135, 110, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: '주말 평균',
                        data: [8, 7, 8, 15, 18, 20, 16, 12],
                        borderColor: 'rgba(255, 152, 0, 1)',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 2,  // 추가: 가로:세로 비율 설정
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '에너지 소비량 (kW)'
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
        
        // 건물 비교 차트
        const buildingComparisonChart = document.getElementById('buildingComparisonChart');
        if (buildingComparisonChart) {
            new Chart(buildingComparisonChart, {
                type: 'radar',
                data: {
                    labels: ['에너지 효율', '전력 소비량', '냉방 효율', '난방 효율', '유지보수 비용'],
                    datasets: [{
                        label: '당사 건물',
                        data: [85, 72, 90, 78, 82],
                        backgroundColor: 'rgba(59, 135, 110, 0.2)',
                        borderColor: 'rgba(59, 135, 110, 1)',
                        pointBackgroundColor: 'rgba(59, 135, 110, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(59, 135, 110, 1)'
                    }, {
                        label: '유사 규모 평균',
                        data: [68, 65, 70, 65, 72],
                        backgroundColor: 'rgba(96, 125, 139, 0.2)',
                        borderColor: 'rgba(96, 125, 139, 1)',
                        pointBackgroundColor: 'rgba(96, 125, 139, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(96, 125, 139, 1)'
                    }, {
                        label: '최상위 25%',
                        data: [95, 90, 92, 88, 85],
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        borderColor: 'rgba(33, 150, 243, 1)',
                        pointBackgroundColor: 'rgba(33, 150, 243, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(33, 150, 243, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1.2,  // 추가: 가로:세로 비율 설정
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });
        }
    }
    
    // 초기 차트 렌더링
    renderCharts();
});