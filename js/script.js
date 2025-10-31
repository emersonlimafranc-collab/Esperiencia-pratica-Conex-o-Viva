
document.addEventListener('DOMContentLoaded', () => {
  // form masks & validation
  function maskInput(el, type) {
    if(!el) return;
    let v = el.value.replace(/\D/g,'');
    if(type === 'cpf') el.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4').slice(0,14);
    if(type === 'tel') el.value = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3').slice(0,15);
    if(type === 'cep') el.value = v.replace(/(\d{5})(\d{3})/,'$1-$2').slice(0,9);
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if(volunteerForm){
    const cpf = volunteerForm.querySelector('#cpf');
    const tel = volunteerForm.querySelector('#telefone');
    const cep = volunteerForm.querySelector('#cep');
    if(cpf) cpf.addEventListener('input', ()=>maskInput(cpf,'cpf'));
    if(tel) tel.addEventListener('input', ()=>maskInput(tel,'tel'));
    if(cep) cep.addEventListener('input', ()=>maskInput(cep,'cep'));

    volunteerForm.addEventListener('submit', function(e){
      e.preventDefault();
      const nome = volunteerForm.nome.value.trim();
      const email = volunteerForm.email.value.trim();
      const messages = document.getElementById('form-messages');
      if(!nome || !email){
        messages.textContent = 'Por favor preencha os campos obrigatórios (nome e e-mail).';
        messages.style.color = '#d9534f';
        return;
      }
      // simulate save
      const store = JSON.parse(localStorage.getItem('viver_subs') || '[]');
      store.push({nome,email,cpf:volunteerForm.cpf.value,telefone:volunteerForm.telefone.value,created:new Date().toISOString()});
      localStorage.setItem('viver_subs', JSON.stringify(store));
      messages.textContent = 'Inscrição enviada com sucesso! Obrigado por se voluntariar.';
      messages.style.color = '#16a34a';
      volunteerForm.reset();
    });
  }

  // subtle button animation on click (ripple-like)
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      btn.animate([{transform:'scale(1)'},{transform:'scale(0.98)'},{transform:'scale(1)'}], {duration:220, easing:'cubic-bezier(.2,.9,.3,1)'});
    });
  });
});
