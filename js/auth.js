// 인증 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const loginButton = document.querySelector('.btn-login');
    
    if (loginForm && loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // 간단한 유효성 검사
            if (!username || !password) {
                showErrorMessage('아이디와 비밀번호를 모두 입력해 주세요.');
                return;
            }
            
            // 로그인 동작 시뮬레이션
            simulateLogin(username, password, rememberMe);
        });
        
        // 엔터 키로 로그인
        loginForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    loginButton.click();
                }
            });
        });
    }
    
    // 에러 메시지 표시
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // 기존 에러 메시지 제거
        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 로그인 버튼 위에 에러 메시지 삽입
        const btnLogin = document.querySelector('.btn-login');
        btnLogin.parentNode.insertBefore(errorDiv, btnLogin);
        
        // 애니메이션 효과
        setTimeout(() => {
            errorDiv.classList.add('show');
        }, 10);
    }
    
    // 로그인 시뮬레이션 (실제로는 서버 통신이 필요)
    function simulateLogin(username, password, rememberMe) {
        // 로그인 버튼 로딩 상태로 변경
        const loginButton = document.querySelector('.btn-login');
        const originalText = loginButton.textContent;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 로그인 중...';
        loginButton.disabled = true;
        
        // 로그인 지연 시뮬레이션
        setTimeout(() => {
            // 간단한 데모용 인증 (실제로는 서버에서 인증 필요)
            if (username === 'admin' && password === 'admin') {
                // 로그인 성공 - 대시보드로 이동
                window.location.href = 'dashboard.html';
            } else {
                // 로그인 실패
                loginButton.innerHTML = originalText;
                loginButton.disabled = false;
                showErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        }, 1500);
    }
});
