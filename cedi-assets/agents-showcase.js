(() => {
  const lab=document.querySelector('#agentes');if(!lab)return;
  lab.classList.add('agent-showcase');
  const heading=lab.querySelector('.agent-heading');
  heading.querySelector('.lux-kicker').textContent='INTELIGENCIA CONECTADA A CEDI';
  heading.querySelector('h2').textContent='Agentes para tu operación.';
  heading.querySelector('p:not(.lux-kicker)').textContent='Centry, activo. Bidi y Heath, próximamente.';
  const stage=lab.querySelector('.agent-stage');
  const conversation=document.createElement('div');conversation.className='agent-conversation';stage.append(conversation);
  const iconPaths=['M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14M15 15l6 6','M3 11l18-8-8 18-2-8-8-2Zm8 2L21 3','M7 3h9l4 4v14H4V3h3M14 3v5h6M8 14l3 3 5-6','M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4ZM8 12l3 3 5-6'];
  const icon=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[i]}"/></svg>`;
  const presentation={
    centry:{eyebrow:'CENTRY / IA PARA TU TESORERÍA',title:'Tu tesorería, a una pregunta de distancia.',intro:'Consulta, organiza y prepara tu operación financiera desde una sola conversación.',features:[['Consulta inteligente','Saldos, movimientos y pagos pendientes.'],['Pagos y dispersiones','Prepara transferencias, pagos programados y nómina.'],['Facturación y conciliación','Relaciona movimientos con facturas y detecta pendientes.'],['Tesorería conectada','Pagos internacionales, tarjetas y tareas recurrentes.']],control:'Centry hace el trabajo. Tú mantienes el control.',note:'Cada operación de pago requiere tu autorización.',question:'¿Qué pagos tengo pendientes?',answer:'Encontré tus pagos pendientes. ¿Quieres revisarlos?',cta:'Conoce a Centry',href:'#ver/centry'},
    bidi:{eyebrow:'BIDI / COBRANZA',title:'Dale continuidad a cada cobro.',intro:'Un agente para preparar el seguimiento de tu cobranza y los mensajes para tus clientes.',features:[['Seguimiento de cobros','Organiza los pendientes de tu equipo.'],['Mensajes para clientes','Prepara borradores para revisar.']],control:'Tú decides qué comunicar.',note:'En desarrollo. No envía mensajes desde esta demostración.',question:'¿Cómo damos seguimiento a este cobro?',answer:'Podré ayudarte a preparar un mensaje para que lo revises.',cta:'Conoce la solución de cobranza',href:'#solucion/cobranza'},
    heath:{eyebrow:'HEATH / ANÁLISIS E INFORMACIÓN',title:'Lee el contexto. Conecta las piezas.',intro:'Información organizada para que el equipo de CEDI anticipe las necesidades de tu empresa.',features:[['Análisis de información','Reúne el contexto de tu operación.'],['Seguimiento con criterio','Apoya la revisión del equipo de CEDI.']],control:'La información acompaña la decisión.',note:'Uso interno de CEDI. Próximamente.',question:'¿Qué debemos revisar de esta operación?',answer:'Podré reunir la información para apoyar la revisión del equipo.',cta:'Conoce el modelo de CEDI',href:'#ver/modelo'}
  };
  function present(){
    const selected=lab.querySelector('[data-agent][aria-pressed="true"]');
    const id=['centry','bidi','heath'][Number(selected?.dataset.agent||0)],p=presentation[id];lab.dataset.showcaseAgent=id;
    lab.querySelector('.agent-description').innerHTML=`<span class="agent-scope">${id==='centry'?'Para clientes · Activo':id==='heath'?'Uso interno · Próximamente':'Para clientes · Próximamente'}</span><p class="agent-product-eyebrow">${p.eyebrow}</p><h3>${p.title}</h3><p class="agent-product-intro">${p.intro}</p><ul class="agent-capabilities">${p.features.map(([name,detail],i)=>`<li>${icon(i)}<div><strong>${name}</strong><span>${detail}</span></div></li>`).join('')}</ul><div class="agent-authorization">${icon(3)}<p><strong>${p.control}</strong><span>${p.note}</span></p></div><a class="agent-product-cta" href="${p.href}" ${id==='centry'?'data-centry-video aria-haspopup="dialog"':''}>${p.cta}<span aria-hidden="true">→</span></a>`;
    conversation.innerHTML=`<span class="agent-conversation-label">${id==='centry'?'UNA CONVERSACIÓN CON CENTRY':'VISTA CONCEPTUAL · PRÓXIMAMENTE'}</span><p class="agent-user-question">${p.question}</p><div class="agent-example-answer">${icon(0)}<p>${p.answer}</p></div><small>Ejemplo ilustrativo · Sin conexión a tus datos.</small>`;
  }
  lab.querySelectorAll('[data-agent]').forEach(button=>{const previous=button.onclick;button.onclick=function(event){previous?.call(this,event);present()}});
  lab.querySelector('.agent-disclaimer').textContent='Centry está activo. Bidi y Heath están en desarrollo. Los ejemplos son ilustrativos; no consultan datos reales ni ejecutan operaciones.';
  present();
})();

