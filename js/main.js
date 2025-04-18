// 사이드바 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
    
    // 사용자 프로필 드롭다운
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            // 프로필 드롭다운 메뉴 토글 (실제 구현 필요)
            console.log('프로필 메뉴 토글');
        });
    }
    
    // 알림 버튼 클릭
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // 알림 목록 토글 (실제 구현 필요)
            console.log('알림 목록 토글');
        });
    }
    
    // 반응형 화면 처리
    function handleResize() {
        if (window.innerWidth < 992) {
            sidebar.classList.add('mobile-view');
        } else {
            sidebar.classList.remove('mobile-view');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // 모바일 뷰에서 사이드바 메뉴 항목 클릭 시 사이드바 접기
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                sidebar.classList.add('sidebar-collapsed');
            }
        });
    });
    
    // 토스트 메시지 표시 함수
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(toast);
        
        // 토스트 표시 애니메이션
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // 토스트 자동 닫기
        const closeTimeout = setTimeout(() => {
            closeToast();
        }, duration);
        
        // 토스트 닫기 버튼
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(closeTimeout);
            closeToast();
        });
        
        function closeToast() {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }
    };
    
    // 데모용: 모달 창 표시 함수
    window.showModal = function(title, content, actions = []) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        let actionsHtml = '';
        actions.forEach(action => {
            actionsHtml += `<button class="btn ${action.class || 'btn-secondary'}" data-action="${action.id}">${action.text}</button>`;
        });
        
        modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
                <div class="modal-footer">
                    ${actionsHtml}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 모달 표시 애니메이션
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // 모달 닫기 버튼
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        // 배경 클릭 시 모달 닫기
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // 액션 버튼 이벤트 리스너
        const actionButtons = modal.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const actionId = this.getAttribute('data-action');
                const action = actions.find(a => a.id === actionId);
                if (action && typeof action.callback === 'function') {
                    action.callback();
                }
                closeModal();
            });
        });
        
        function closeModal() {
            modal.classList.remove('show');
            modal.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        return {
            close: closeModal
        };
    };
});
