// 자동화 설정 페이지 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 자동화 규칙 토글 스위치
    const ruleToggles = document.querySelectorAll('.rule-item .toggle-input');
    if (ruleToggles.length > 0) {
        ruleToggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const ruleItem = this.closest('.rule-item');
                const ruleName = ruleItem.querySelector('h4').textContent;
                
                if (this.checked) {
                    window.showToast(`"${ruleName}" 규칙이 활성화되었습니다.`, 'success');
                } else {
                    window.showToast(`"${ruleName}" 규칙이 비활성화되었습니다.`, 'info');
                }
            });
        });
    }
    
    // 자동화 규칙 편집 버튼
    const editButtons = document.querySelectorAll('.rule-actions .fa-edit');
    if (editButtons.length > 0) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ruleItem = this.closest('.rule-item');
                const ruleName = ruleItem.querySelector('h4').textContent;
                const ruleDescription = ruleItem.querySelector('.rule-description').textContent;
                
                // 규칙 편집 모달 표시
                window.showModal('자동화 규칙 편집', `
                    <div class="rule-edit-form">
                        <div class="form-group">
                            <label>규칙 이름</label>
                            <input type="text" id="rule-name" value="${ruleName}">
                        </div>
                        <div class="form-group">
                            <label>규칙 설명</label>
                            <input type="text" id="rule-description" value="${ruleDescription}">
                        </div>
                        <div class="form-section">
                            <h4>조건 설정</h4>
                            <div class="form-group">
                                <label>요일 선택</label>
                                <div class="day-checkboxes">
                                    <label class="checkbox-item"><input type="checkbox" checked> 월</label>
                                    <label class="checkbox-item"><input type="checkbox" checked> 화</label>
                                    <label class="checkbox-item"><input type="checkbox" checked> 수</label>
                                    <label class="checkbox-item"><input type="checkbox" checked> 목</label>
                                    <label class="checkbox-item"><input type="checkbox" checked> 금</label>
                                    <label class="checkbox-item"><input type="checkbox"> 토</label>
                                    <label class="checkbox-item"><input type="checkbox"> 일</label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>시작 시간</label>
                                    <input type="time" id="rule-start-time" value="08:30">
                                </div>
                                <div class="form-group">
                                    <label>종료 시간</label>
                                    <input type="time" id="rule-end-time" value="18:30">
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <h4>동작 설정</h4>
                            <div class="form-group">
                                <label>대상 장비</label>
                                <select id="rule-target">
                                    <option>모든 사무실 에어컨</option>
                                    <option>모든 에어컨</option>
                                    <option>1층 에어컨</option>
                                    <option>2층 에어컨</option>
                                    <option>3층 에어컨</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>명령</label>
                                <select id="rule-command">
                                    <option>전원 ON</option>
                                    <option>전원 OFF</option>
                                    <option>온도 설정</option>
                                    <option>모드 변경</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>모드</label>
                                <select id="rule-mode">
                                    <option>냉방</option>
                                    <option>난방</option>
                                    <option>송풍</option>
                                    <option>제습</option>
                                    <option>자동</option>
                                </select>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>온도</label>
                                    <input type="number" id="rule-temperature" value="24" min="18" max="30"> °C
                                </div>
                                <div class="form-group">
                                    <label>풍량</label>
                                    <select id="rule-fan">
                                        <option>자동</option>
                                        <option>약</option>
                                        <option selected>중간</option>
                                        <option>강</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                `, [
                    { id: 'cancel', text: '취소', class: 'btn-secondary' },
                    { id: 'save', text: '저장', class: 'btn-primary', callback: function() {
                        // 실제로는 서버에 저장 필요
                        const newName = document.getElementById('rule-name').value;
                        if (!newName) {
                            window.showToast('규칙 이름을 입력해 주세요.', 'error');
                            return false; // 모달 닫지 않음
                        }
                        
                        // 화면 업데이트 (실제로는 서버 응답에 따라 업데이트 필요)
                        ruleItem.querySelector('h4').textContent = newName;
                        ruleItem.querySelector('.rule-description').textContent = document.getElementById('rule-description').value;
                        
                        // 성공 메시지
                        window.showToast(`"${newName}" 규칙이 저장되었습니다.`, 'success');
                        return true; // 모달 닫기
                    }}
                ]);
            });
        });
    }
    
    // 자동화 규칙 삭제 버튼
    const deleteButtons = document.querySelectorAll('.rule-actions .fa-trash');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ruleItem = this.closest('.rule-item');
                const ruleName = ruleItem.querySelector('h4').textContent;
                
                // 삭제 확인 모달 표시
                window.showModal('규칙 삭제 확인', `
                    <div class="confirm-delete">
                        <p>"${ruleName}" 규칙을 삭제하시겠습니까?</p>
                        <p>이 작업은 되돌릴 수 없습니다.</p>
                    </div>
                `, [
                    { id: 'cancel', text: '취소', class: 'btn-secondary' },
                    { id: 'delete', text: '삭제', class: 'btn-danger', callback: function() {
                        // 실제로는 서버에 삭제 요청 필요
                        
                        // 애니메이션과 함께 규칙 항목 제거
                        ruleItem.style.opacity = '0';
                        setTimeout(() => {
                            ruleItem.style.height = '0';
                            ruleItem.style.marginBottom = '0';
                            ruleItem.style.overflow = 'hidden';
                            
                            setTimeout(() => {
                                ruleItem.remove();
                            }, 300);
                        }, 300);
                        
                        // 성공 메시지
                        window.showToast(`"${ruleName}" 규칙이 삭제되었습니다.`, 'success');
                    }}
                ]);
            });
        });
    }
    
    // 새 규칙 추가 버튼
    const addRuleButton = document.querySelector('.rule-actions .btn-primary');
    if (addRuleButton) {
        addRuleButton.addEventListener('click', function() {
            // 새 규칙 추가 모달 표시
            window.showModal('새 자동화 규칙 추가', `
                <div class="rule-edit-form">
                    <div class="form-group">
                        <label>규칙 이름</label>
                        <input type="text" id="new-rule-name" placeholder="규칙 이름을 입력하세요">
                    </div>
                    <div class="form-group">
                        <label>규칙 설명</label>
                        <input type="text" id="new-rule-description" placeholder="규칙에 대한 간단한 설명을 입력하세요">
                    </div>
                    <div class="form-section">
                        <h4>조건 유형</h4>
                        <div class="form-group">
                            <select id="condition-type">
                                <option value="schedule">일정 기반 (요일, 시간)</option>
                                <option value="sensor">센서 기반 (온도, 습도 등)</option>
                                <option value="occupancy">재실 여부 기반</option>
                                <option value="combined">복합 조건</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-section condition-schedule">
                        <h4>일정 조건</h4>
                        <div class="form-group">
                            <label>요일 선택</label>
                            <div class="day-checkboxes">
                                <label class="checkbox-item"><input type="checkbox" checked> 월</label>
                                <label class="checkbox-item"><input type="checkbox" checked> 화</label>
                                <label class="checkbox-item"><input type="checkbox" checked> 수</label>
                                <label class="checkbox-item"><input type="checkbox" checked> 목</label>
                                <label class="checkbox-item"><input type="checkbox" checked> 금</label>
                                <label class="checkbox-item"><input type="checkbox"> 토</label>
                                <label class="checkbox-item"><input type="checkbox"> 일</label>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>시작 시간</label>
                                <input type="time" id="new-rule-start-time" value="08:30">
                            </div>
                            <div class="form-group">
                                <label>종료 시간</label>
                                <input type="time" id="new-rule-end-time" value="18:30">
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h4>동작 설정</h4>
                        <div class="form-group">
                            <label>대상 장비</label>
                            <select id="new-rule-target">
                                <option>모든 사무실 에어컨</option>
                                <option>모든 에어컨</option>
                                <option>1층 에어컨</option>
                                <option>2층 에어컨</option>
                                <option>3층 에어컨</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>명령</label>
                            <select id="new-rule-command">
                                <option>전원 ON</option>
                                <option>전원 OFF</option>
                                <option>온도 설정</option>
                                <option>모드 변경</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>모드</label>
                            <select id="new-rule-mode">
                                <option>냉방</option>
                                <option>난방</option>
                                <option>송풍</option>
                                <option>제습</option>
                                <option>자동</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>온도</label>
                                <input type="number" id="new-rule-temperature" value="24" min="18" max="30"> °C
                            </div>
                            <div class="form-group">
                                <label>풍량</label>
                                <select id="new-rule-fan">
                                    <option>자동</option>
                                    <option>약</option>
                                    <option selected>중간</option>
                                    <option>강</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `, [
                { id: 'cancel', text: '취소', class: 'btn-secondary' },
                { id: 'save', text: '추가', class: 'btn-primary', callback: function() {
                    // 실제로는 서버에 저장 필요
                    const ruleName = document.getElementById('new-rule-name').value;
                    const ruleDescription = document.getElementById('new-rule-description').value;
                    
                    if (!ruleName) {
                        window.showToast('규칙 이름을 입력해 주세요.', 'error');
                        return false; // 모달 닫지 않음
                    }
                    
                    // 성공 메시지
                    window.showToast(`"${ruleName}" 규칙이 추가되었습니다.`, 'success');
                    
                    // 페이지 새로고침 (실제로는 DOM에 새 규칙 추가 필요)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    
                    return true; // 모달 닫기
                }}
            ]);
        });
    }
    
    // 센서 설정 슬라이더
    const sliders = document.querySelectorAll('.range-slider .slider');
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            
            // 초기값 설정
            updateSliderValue(slider, valueDisplay);
            
            // 값 변경 이벤트
            slider.addEventListener('input', function() {
                updateSliderValue(this, valueDisplay);
            });
        });
    }
    
    // 슬라이더 값 업데이트 함수
    function updateSliderValue(slider, display) {
        if (!display) return;
        
        const value = slider.value;
        const min = slider.min || 0;
        const max = slider.max || 100;
        const percent = ((value - min) / (max - min)) * 100;
        
        // 슬라이더 색상 그라데이션 업데이트 (선택적)
        slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
        
        // 값 표시 업데이트
        if (slider.parentElement.parentElement.querySelector('label').textContent.includes('온도')) {
            display.textContent = `${value}°C`;
        } else if (slider.parentElement.parentElement.querySelector('label').textContent.includes('습도')) {
            display.textContent = `${value}%`;
        } else if (slider.parentElement.parentElement.querySelector('label').textContent.includes('부재')) {
            display.textContent = `${value}분`;
        } else {
            display.textContent = value;
        }
    }
    
    // 센서 토글 스위치
    const sensorToggles = document.querySelectorAll('.sensor-item .toggle-input');
    if (sensorToggles.length > 0) {
        sensorToggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const sensorItem = this.closest('.sensor-item');
                const sensorName = sensorItem.querySelector('h4').textContent;
                
                if (this.checked) {
                    window.showToast(`"${sensorName}" 센서 연동이 활성화되었습니다.`, 'success');
                    sensorItem.querySelector('.sensor-settings').style.display = 'block';
                } else {
                    window.showToast(`"${sensorName}" 센서 연동이 비활성화되었습니다.`, 'info');
                    sensorItem.querySelector('.sensor-settings').style.display = 'none';
                }
            });
            
            // 초기 상태 설정
            const sensorItem = toggle.closest('.sensor-item');
            if (toggle.checked) {
                sensorItem.querySelector('.sensor-settings').style.display = 'block';
            } else {
                sensorItem.querySelector('.sensor-settings').style.display = 'none';
            }
        });
    }
    
    // 스케줄 설정 관련
    const newScheduleButton = document.querySelector('.schedule-actions .btn-primary');
    if (newScheduleButton) {
        newScheduleButton.addEventListener('click', function() {
            // 새 스케줄 추가 모달 표시 (여기서는 간소화)
            window.showToast('스케줄 추가 기능은 목업에서 구현되지 않았습니다.', 'info');
        });
    }
});
