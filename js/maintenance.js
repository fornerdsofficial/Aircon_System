// 유지보수 페이지 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 일정 등록 버튼 클릭 이벤트
    const scheduleButtons = document.querySelectorAll('.alerts-table .btn-primary');
    if (scheduleButtons.length > 0) {
        scheduleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('.table-row');
                const device = row.querySelector('.table-col:first-child').textContent;
                const location = row.querySelector('.table-col:nth-child(2)').textContent;
                const issue = row.querySelector('.table-col:nth-child(3)').textContent;
                
                // 일정 등록 모달 표시
                window.showModal('유지보수 일정 등록', `
                    <div class="schedule-form">
                        <div class="form-group">
                            <label>장비</label>
                            <input type="text" value="${device}" readonly>
                        </div>
                        <div class="form-group">
                            <label>위치</label>
                            <input type="text" value="${location}" readonly>
                        </div>
                        <div class="form-group">
                            <label>문제</label>
                            <input type="text" value="${issue}" readonly>
                        </div>
                        <div class="form-group">
                            <label>예정일</label>
                            <input type="date" id="maintenance-date" min="${formatDate(new Date())}">
                        </div>
                        <div class="form-group">
                            <label>시간</label>
                            <input type="time" id="maintenance-time" value="10:00">
                        </div>
                        <div class="form-group">
                            <label>담당자</label>
                            <select id="maintenance-assignee">
                                <option>김철수</option>
                                <option>이영희</option>
                                <option>박지성</option>
                                <option>외부 업체</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>메모</label>
                            <textarea id="maintenance-notes" rows="3" placeholder="추가 사항을 입력하세요"></textarea>
                        </div>
                    </div>
                `, [
                    { id: 'cancel', text: '취소', class: 'btn-secondary' },
                    { id: 'save', text: '일정 등록', class: 'btn-primary', callback: function() {
                        // 실제로는 서버에 일정 저장 필요
                        // 여기서는 성공 메시지만 표시
                        window.showToast(`${device} (${location}) 유지보수 일정이 등록되었습니다.`, 'success');
                        
                        // 버튼 상태 변경
                        button.textContent = '등록됨';
                        button.classList.remove('btn-primary');
                        button.classList.add('btn-success');
                        button.disabled = true;
                    }}
                ]);
                
                // 날짜 기본값 설정 (오늘)
                document.getElementById('maintenance-date').value = formatDate(new Date());
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
    
    // 우선순위 필터
    const priorityFilter = document.querySelector('.priority-filter');
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            const priority = this.value;
            const rows = document.querySelectorAll('.alerts-table .table-row');
            
            rows.forEach(row => {
                const priorityCell = row.querySelector('.priority');
                
                if (priority === 'all') {
                    row.style.display = '';
                } else {
                    if (priorityCell.classList.contains(priority)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // 캘린더 컨트롤
    const calendarControls = document.querySelectorAll('.calendar-controls button');
    if (calendarControls.length > 0) {
        calendarControls.forEach(button => {
            button.addEventListener('click', function() {
                // 실제로는 이전/다음 월 표시 기능 구현 필요
                const currentMonth = document.querySelector('.current-month');
                if (currentMonth) {
                    // 데모용 알림만 표시
                    window.showToast('달력 기능은 목업에서 구현되지 않았습니다.', 'info');
                }
            });
        });
    }
    
    // 일정 추가 버튼
    const addScheduleButton = document.querySelector('.calendar-controls .btn-primary');
    if (addScheduleButton) {
        addScheduleButton.addEventListener('click', function() {
            // 일정 추가 모달 표시
            window.showModal('새 일정 추가', `
                <div class="schedule-form">
                    <div class="form-group">
                        <label>일정 제목</label>
                        <input type="text" id="schedule-title" placeholder="일정 제목을 입력하세요">
                    </div>
                    <div class="form-group">
                        <label>일정 유형</label>
                        <select id="schedule-type">
                            <option value="maintenance">정기 유지보수</option>
                            <option value="repair">수리</option>
                            <option value="inspection">점검</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>대상 장비</label>
                        <select id="schedule-target">
                            <option>모든 장비</option>
                            <option>에어컨 #1</option>
                            <option>에어컨 #2</option>
                            <option>에어컨 #3</option>
                            <option>에어컨 #4</option>
                            <option>에어컨 #5</option>
                            <option>직접 입력</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>날짜</label>
                            <input type="date" id="schedule-date" min="${formatDate(new Date())}">
                        </div>
                        <div class="form-group">
                            <label>시간</label>
                            <input type="time" id="schedule-time" value="10:00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>담당자</label>
                        <select id="schedule-assignee">
                            <option>김철수</option>
                            <option>이영희</option>
                            <option>박지성</option>
                            <option>외부 업체</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>메모</label>
                        <textarea id="schedule-notes" rows="3" placeholder="추가 사항을 입력하세요"></textarea>
                    </div>
                </div>
            `, [
                { id: 'cancel', text: '취소', class: 'btn-secondary' },
                { id: 'save', text: '일정 추가', class: 'btn-primary', callback: function() {
                    // 실제로는 서버에 일정 저장 필요
                    const title = document.getElementById('schedule-title').value;
                    if (!title) {
                        window.showToast('일정 제목을 입력해 주세요.', 'error');
                        return false; // 모달 닫지 않음
                    }
                    
                    // 성공 메시지 표시
                    window.showToast(`일정 "${title}"이(가) 추가되었습니다.`, 'success');
                    return true; // 모달 닫기
                }}
            ]);
            
            // 날짜 기본값 설정 (오늘)
            document.getElementById('schedule-date').value = formatDate(new Date());
        });
    }
    
    // 유지보수 이력 페이지네이션
    const pageButtons = document.querySelectorAll('.page-number');
    if (pageButtons.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 모든 페이지 버튼 비활성화
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // 선택한 페이지 버튼 활성화
                this.classList.add('active');
                
                // 실제로는 해당 페이지 데이터 로드 필요
                // 여기서는 간단한 알림만 표시
                window.showToast(`페이지 ${this.textContent}로 이동합니다.`, 'info');
            });
        });
    }
    
    // 이전/다음 페이지 버튼
    const prevPageBtn = document.querySelector('.page-prev');
    const nextPageBtn = document.querySelector('.page-next');
    
    if (prevPageBtn && nextPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage && activePage.previousElementSibling && activePage.previousElementSibling.classList.contains('page-number')) {
                activePage.previousElementSibling.click();
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage && activePage.nextElementSibling && activePage.nextElementSibling.classList.contains('page-number')) {
                activePage.nextElementSibling.click();
            }
        });
    }
});
