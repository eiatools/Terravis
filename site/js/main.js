// TERRAVIS 홈페이지 공통 스크립트
(function(){
  // 모바일 메뉴
  const menu=document.querySelector('.menu'),nav=document.querySelector('nav.main');
  if(menu&&nav){
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);});
    nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  }

  // 평가 유형 탭 (평가항목·절차 페이지)
  const tabs=[...document.querySelectorAll('.tab[role="tab"]')];
  if(tabs.length){
    const show=k=>{
      tabs.forEach(t=>{const on=t.dataset.k===k;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;});
      document.querySelectorAll('.tabpanel').forEach(p=>{p.hidden=p.id!=='panel-'+k;});
    };
    tabs.forEach((t,i)=>{
      t.addEventListener('click',()=>show(t.dataset.k));
      t.addEventListener('keydown',e=>{
        if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
        const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();show(n.dataset.k);
      });
    });
    const fromHash=()=>{const k=location.hash.replace('#','');if(tabs.some(t=>t.dataset.k===k)){show(k);document.getElementById('procedure')?.scrollIntoView();}};
    show(tabs[0].dataset.k);fromHash();addEventListener('hashchange',fromHash);
  }

  // 상담 신청 양식 (시안: 실제 전송 없음)
  const form=document.querySelector('form.inq');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const out=form.querySelector('.out'),name=form.querySelector('#q-name').value.trim(),
            contact=form.querySelector('#q-contact').value.trim(),agree=form.querySelector('#q-agree').checked;
      out.classList.remove('err');
      if(!name||!contact){out.classList.add('err');out.textContent='성함(회사명)과 연락처를 입력해 주세요.';return;}
      if(!agree){out.classList.add('err');out.textContent='개인정보 수집·이용에 동의해 주세요.';return;}
      out.textContent=`${name} 님, 시안 화면이라 실제로 전송되지는 않습니다. 운영 시 담당자에게 접수됩니다.`;
    });
  }
})();
