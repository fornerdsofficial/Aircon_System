# 에어컨 시스템 모니터링 & 제어 플랫폼

![에어컨 시스템 모니터링](./assets/images/logo-placeholder.png)

## 프로젝트 개요

에어컨 시스템 모니터링 및 제어 플랫폼은 건물 내 다수의 에어컨 시스템을 실시간으로 모니터링하고, 원격으로 제어하며, 에너지 사용을 최적화하고, 예측적 유지보수 기능을 제공하는 웹 기반 솔루션입니다. 

이 목업 프로젝트는 사용자 인터페이스 디자인을 위한 프론트엔드 구현으로, 실제 백엔드 연동은 포함되어 있지 않습니다.

## 주요 기능

- **대시보드**: 시스템 전체 상태, 핵심 지표, 알림 등을 한눈에 확인
- **실시간 모니터링**: 개별 에어컨의 상태, 온도, 습도, 전력 소비 등을 실시간 관찰
- **원격 제어**: 개별 또는 그룹 에어컨의 전원, 온도, 모드, 풍량 등을 원격으로 제어
- **에너지 최적화**: 사용 패턴 분석 및 AI 기반 에너지 절약 추천
- **예측적 유지보수**: 고장 예측 및 유지보수 일정 관리
- **자동화 설정**: 사용 패턴 및 조건에 따른 자동 제어 규칙 설정
- **사용자 설정**: 프로필, 알림, 보안, 화면 설정 관리

## 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/yourusername/aircon-system.git
cd aircon-system
```

2. 웹 브라우저에서 열기
```bash
# Linux/macOS
open index.html

# Windows
start index.html
```

3. 로그인 정보
```
아이디: admin
비밀번호: admin
```

## 프로젝트 구조

```
aircon-system/
├── assets/
│   └── images/
│       ├── logo-placeholder.png
│       └── profile-placeholder.png
├── css/
│   ├── main.css        # 기본 스타일, 변수, 리셋
│   ├── layout.css      # 레이아웃 관련 스타일
│   └── components.css  # UI 컴포넌트 스타일
├── js/
│   ├── main.js         # 공통 기능
│   ├── auth.js         # 인증 관련
│   ├── charts.js       # 차트 생성 및 관리
│   ├── controls.js     # 원격 제어 기능
│   ├── optimization.js # 에너지 최적화 기능
│   ├── maintenance.js  # 유지보수 관련
│   ├── automation.js   # 자동화 설정
│   └── settings.js     # 사용자 설정
├── index.html          # 로그인 페이지
├── dashboard.html      # 대시보드
├── monitoring.html     # 실시간 모니터링
├── control.html        # 원격 제어
├── optimization.html   # 에너지 최적화
├── maintenance.html    # 예측적 유지보수
├── automation.html     # 자동화 설정
├── settings.html       # 사용자 설정
└── README.md           # 프로젝트 설명
```


## 향후 개발 계획

- **백엔드 연동**: 실제 데이터 연동 및 API 개발
- **실시간 업데이트**: WebSocket을 활용한 실시간 데이터 업데이트
- **고급 분석 기능**: 머신러닝을 활용한 에너지 사용 패턴 분석 및 예측 기능 강화
- **모바일 앱**: 네이티브 모바일 앱 개발
- **확장 기능**: 빌딩 자동화 시스템(BAS), 전력 관리 시스템 등과의 연동