// 원격 제어 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 장치 선택 기능
    const checkboxes = document.querySelectorAll('.selection-item input[type="checkbox"]');
    const selectAllBtn = document.querySelector('.btn-select-all');
    const clearAllBtn = document.querySelector('.btn-clear-all');
    const selectedCountSpan = document.querySelector('.selected-count span');
    
    // 선택된 장치 수 업데이트
    function updateSelectedCount() {
        const checkedCount = document.querySelectorAll('.selection-item input[type="checkbox"]:checked').length;
        if (selectedCountSpan) {
            selectedCountSpan.textContent = checkedCount;
        }
        
        // 선택된 장치가 있을 때 컨트롤 패널 활성화
        const controlButtons = document.querySelectorAll('.control-panel button:not(.btn-secondary)');
        controlButtons.forEach(button => {
            button.disabled = checkedCount === 0;
        });
    }
    
    // 체크박스 변경 이벤트
    if (checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSelectedCount);
        });
        
        // 초기 업데이트
        updateSelectedCount();
    }
    
    // 전체 선택 버튼
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                if (!checkbox.disabled) {
                    checkbox.checked = true;
                }
            });
            updateSelectedCount();
        });
    }
    
    // 전체 해제 버튼
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectedCount();
        });
    }
    
    // 온도 슬라이더 기능
    const tempSlider = document.getElementById('tempSlider');
    const tempValue = document.querySelector('.temp-value');
    const tempMinus = document.querySelector('.temp-btn.minus');
    const tempPlus = document.querySelector('.temp-btn.plus');
    
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', function() {
            tempValue.textContent = this.value + '°C';
        });
        
        // 온도 감소 버튼
        if (tempMinus) {
            tempMinus.addEventListener('click', function() {
                if (tempSlider.value > tempSlider.min) {
                    tempSlider.value--;
                    tempValue.textContent = tempSlider.value + '°C';
                }
            });
        }
        
        // 온도 증가 버튼
        if (tempPlus) {
            tempPlus.addEventListener('click', function() {
                if (tempSlider.value < tempSlider.max) {
                    tempSlider.value++;
                    tempValue.textContent = tempSlider.value + '°C';
                }
            });
        }
    }
    
    // 모드 버튼 토글
    const modeButtons = document.querySelectorAll('.mode-btn');
    if (modeButtons.length > 0) {
        modeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 풍량 버튼 토글
    const fanButtons = document.querySelectorAll('.fan-btn');
    const fanValue = document.querySelector('.fan-value');
    if (fanButtons.length > 0) {
        fanButtons.forEach(button => {
            button.addEventListener('click', function() {
                fanButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 풍량 텍스트 업데이트
                if (fanValue) {
                    fanValue.textContent = this.querySelector('span').textContent;
                }
            });
        });
    }
    
    // 전원 토글 버튼
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 적용 버튼 클릭 이벤트
    const applyButton = document.querySelector('.apply-controls .btn-primary');
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            const checkedDevices = document.querySelectorAll('.selection-item input[type="checkbox"]:checked');
            
            if (checkedDevices.length === 0) {
                window.showToast('제어할 기기를 선택해 주세요.', 'error');
                return;
            }
            
            // 로딩 상태 표시
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 적용 중...';
            this.disabled = true;
            
            // 적용 지연 시뮬레이션
            setTimeout(() => {
                // 성공 피드백
                const feedbackContent = document.querySelector('.feedback-content');
                if (feedbackContent) {
                    feedbackContent.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <p>${checkedDevices.length}대의 에어컨에 명령이 성공적으로 적용되었습니다.</p>
                        </div>
                    `;
                }
                
                // 타임스탬프 업데이트
                const timestamp = document.querySelector('.timestamp');
                if (timestamp) {
                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    timestamp.textContent = `마지막 업데이트: ${formattedDate}`;
                }
                
                // 버튼 상태 복원
                this.innerHTML = '적용';
                this.disabled = false;
                
                // 토스트 메시지
                window.showToast('설정이 성공적으로 적용되었습니다.', 'success');
            }, 2000);
        });
    }
    
    // 취소 버튼 클릭 이벤트
    const cancelButton = document.querySelector('.apply-controls .btn-secondary');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // 선택 해제
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateSelectedCount();
            
            // 피드백 영역 초기화
            const feedbackContent = document.querySelector('.feedback-content');
            if (feedbackContent) {
                feedbackContent.innerHTML = `
                    <div class="info-message">
                        <i class="fas fa-info-circle"></i>
                        <p>제어할 장치를 선택하고 설정을 적용해 주세요.</p>
                    </div>
                `;
            }
            
            // 토스트 메시지
            window.showToast('설정이 취소되었습니다.', 'info');
        });
    }
});
