// 사용자 설정 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 설정 탭 전환 기능
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.settings-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성화된 버튼 및 컨텐츠 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 선택한 탭 활성화
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // 프로필 폼 제출
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 저장 진행 상태 표시 (실제로는 서버 통신 필요)
            const saveButton = this.querySelector('.btn-primary');
            const originalText = saveButton.textContent;
            saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 저장 중...';
            saveButton.disabled = true;
            
            // 저장 완료 시뮬레이션
            setTimeout(() => {
                saveButton.innerHTML = originalText;
                saveButton.disabled = false;
                window.showToast('프로필이 성공적으로 저장되었습니다.', 'success');
            }, 1500);
        });
    }
    
    // 비밀번호 변경 폼 제출
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // 간단한 유효성 검사
            if (!currentPassword || !newPassword || !confirmPassword) {
                window.showToast('모든 필드를 입력해 주세요.', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                window.showToast('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                window.showToast('비밀번호는 8자 이상이어야 합니다.', 'error');
                return;
            }
            
            // 저장 진행 상태 표시 (실제로는 서버 통신 필요)
            const saveButton = this.querySelector('.btn-primary');
            const originalText = saveButton.textContent;
            saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 변경 중...';
            saveButton.disabled = true;
            
            // 저장 완료 시뮬레이션
            setTimeout(() => {
                saveButton.innerHTML = originalText;
                saveButton.disabled = false;
                
                // 폼 초기화
                this.reset();
                
                window.showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');
            }, 1500);
        });
    }
    
    // 2단계 인증 토글
    const twoFactorToggle = document.getElementById('two-factor');
    const setupButton = document.querySelector('.btn-setup');
    
    if (twoFactorToggle && setupButton) {
        twoFactorToggle.addEventListener('change', function() {
            setupButton.disabled = !this.checked;
            
            const statusElement = document.querySelector('.auth-status .status-disabled');
            if (statusElement) {
                if (this.checked) {
                    statusElement.textContent = '설정 중';
                    statusElement.className = 'status-pending';
                } else {
                    statusElement.textContent = '사용 안함';
                    statusElement.className = 'status-disabled';
                }
            }
        });
        
        setupButton.addEventListener('click', function() {
            if (!twoFactorToggle.checked) return;
            
            // 2단계 인증 설정 모달 표시 (실제로는 QR 코드 등 표시 필요)
            window.showModal('2단계 인증 설정', `
                <div class="two-factor-setup">
                    <p>1. 인증 앱을 스마트폰에 설치하세요 (Google Authenticator, Microsoft Authenticator 등)</p>
                    <p>2. 아래 QR 코드를 앱으로 스캔하세요</p>
                    <div class="qr-placeholder">QR 코드 영역</div>
                    <p>3. 생성된 6자리 코드를 입력하세요</p>
                    <div class="verification-code">
                        <input type="text" maxlength="6" placeholder="6자리 코드">
                    </div>
                </div>
            `, [
                { id: 'cancel', text: '취소', class: 'btn-secondary' },
                { id: 'verify', text: '확인', class: 'btn-primary', callback: function() {
                    const statusElement = document.querySelector('.auth-status .status-pending');
                    if (statusElement) {
                        statusElement.textContent = '사용 중';
                        statusElement.className = 'status-enabled';
                    }
                    window.showToast('2단계 인증이 성공적으로 설정되었습니다.', 'success');
                }}
            ]);
        });
    }
    
    // 테마 변경
    const themeOptions = document.querySelectorAll('input[name="theme"]');
    if (themeOptions.length > 0) {
        themeOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.checked) {
                    const themeValue = this.id;
                    
                    // 실제로는 테마 변경 코드 필요
                    console.log('테마 변경:', themeValue);
                    
                    window.showToast(`테마가 ${this.nextElementSibling.textContent}(으)로 변경되었습니다.`, 'info');
                }
            });
        });
    }
});
