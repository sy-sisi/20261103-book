// 북앤드림 공통 인터랙션 스크립트
document.addEventListener('DOMContentLoaded', () => {
  // 모바일 메뉴 열기/닫기
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // data-modal 속성이 있는 버튼을 누르면 해당 팝업을 표시
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.getElementById(button.dataset.modal);
      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // 닫기 버튼, 팝업 바깥 영역, ESC 키로 팝업 닫기
  const closeModal = modal => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };
  document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
  });

  // 신청 페이지: 탭에 따라 신청 종류와 추가 입력 항목 변경
  const tabs = document.querySelectorAll('.tab');
  const formType = document.getElementById('formType');
  const extraLabel = document.getElementById('extraLabel');
  const dateLabel = document.getElementById('dateLabel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');
      if (formType) formType.value = tab.dataset.form;
      if (extraLabel && dateLabel) {
        if (tab.dataset.form === 'publisher') {
          extraLabel.innerHTML = '출판사 / 팀 이름 <input name="team" required placeholder="출판사 또는 팀 이름">';
          dateLabel.innerHTML = '참가 희망 부스 <select name="booth"><option>기본 부스</option><option>확장 부스</option></select>';
        } else if (tab.dataset.form === 'talk') {
          dateLabel.innerHTML = '예약 회차 <select name="session"><option>11월 21일(토) 13:00</option><option>11월 22일(일) 13:00</option></select>';
          extraLabel.innerHTML = '예약 인원 <select name="people"><option>1명</option><option>2명</option></select>';
        } else {
          dateLabel.innerHTML = '방문 예정일 <select name="date"><option>11월 21일(토)</option><option>11월 22일(일)</option><option>양일 모두</option></select>';
          extraLabel.innerHTML = '방문 인원 <select name="people"><option>1명</option><option>2명</option><option>3명</option><option>4명</option></select>';
        }
      }
    });
  });

  // 시연용 신청 완료 처리: 실제 서버로 개인정보를 전송하지 않음
  const form = document.getElementById('registrationForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      document.getElementById('successMessage')?.classList.add('show');
      document.getElementById('successMessage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});