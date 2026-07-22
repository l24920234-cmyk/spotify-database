// ============================================================
// MusicIk — register.js
// Ecualizador, notas flotantes y tilt del vinilo (igual que
// login.js), más validación del formulario de registro y
// conexión real al backend.
// ============================================================
 
const API_BASE = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`;
console.log("✅ register.js cargó");
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ---------- ECUALIZADOR AMBIENTE ----------
  const waveform = document.getElementById('waveform');
  if (waveform) {
    const BAR_COUNT = 36;
    let bars = '';
    for (let i = 0; i < BAR_COUNT; i++) {
      const height = 8 + Math.round(Math.random() * 26);
      const duration = (0.6 + Math.random() * 0.9).toFixed(2);
      const delay = (Math.random() * 1.2).toFixed(2);
      bars += `<span style="height:${height}px; animation-duration:${duration}s; animation-delay:-${delay}s;"></span>`;
    }
    waveform.innerHTML = bars;
  }
 
  // ---------- NOTAS MUSICALES FLOTANDO ----------
  const notesContainer = document.getElementById('notes');
  if (notesContainer) {
    const symbols = ['♪', '♫', '♬', '♩'];
    const NOTE_COUNT = 14;
    let notesHtml = '';
    for (let i = 0; i < NOTE_COUNT; i++) {
      const left = Math.round(Math.random() * 100);
      const size = 12 + Math.round(Math.random() * 14);
      const duration = (10 + Math.random() * 10).toFixed(1);
      const delay = (Math.random() * 14).toFixed(1);
      const drift = Math.round((Math.random() - 0.5) * 120);
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      notesHtml += `<span style="left:${left}%; font-size:${size}px; animation-duration:${duration}s; animation-delay:-${delay}s; --drift:${drift}px;">${symbol}</span>`;
    }
    notesContainer.innerHTML = notesHtml;
  }
 
  // ---------- TILT 3D DEL VINILO CON EL MOUSE ----------
  const turntable = document.querySelector('.turntable');
  if (turntable && window.matchMedia('(hover: hover)').matches) {
    const stage = document.querySelector('.turntable-stage');
    stage.addEventListener('mousemove', (e) => {
      const rect = turntable.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      turntable.style.transform = `perspective(600px) rotateY(${relX * 10}deg) rotateX(${-relY * 10}deg)`;
    });
    stage.addEventListener('mouseleave', () => { turntable.style.transform = ''; });
  }
 
  // ---------- FORMULARIO ----------
  const form = document.getElementById('registerForm');
  console.log("Formulario:", form);
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const pass2Input = document.getElementById('password2');
  const termsInput = document.getElementById('terms');
 
  const nombreField = document.getElementById('nombreField');
  const emailField = document.getElementById('emailField');
  const passField = document.getElementById('passField');
  const pass2Field = document.getElementById('pass2Field');
 
  const nombreError = document.getElementById('nombreError');
  const emailError = document.getElementById('emailError');
  const passError = document.getElementById('passError');
  const pass2Error = document.getElementById('pass2Error');
  const termsError = document.getElementById('termsError');
 
  const submitBtn = document.getElementById('submitBtn');
  const togglePass = document.getElementById('togglePass');
  const eyeOpen = togglePass.querySelector('.eye-open');
  const eyeClosed = togglePass.querySelector('.eye-closed');
 
  // ---------- MOSTRAR / OCULTAR CONTRASEÑA ----------
  togglePass.addEventListener('click', () => {
    const isPassword = passInput.type === 'password';
    passInput.type = isPassword ? 'text' : 'password';
    eyeOpen.style.display = isPassword ? 'none' : '';
    eyeClosed.style.display = isPassword ? '' : 'none';
  });
 
  // ---------- VALIDACIÓN ----------
  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
 
  function setFieldState(field, errorEl, valid, mensaje){
    field.classList.remove('invalid', 'valid');
    errorEl.classList.remove('show');
    if (mensaje) errorEl.textContent = mensaje;
    if (valid === true){
      field.classList.add('valid');
    } else if (valid === false){
      field.classList.add('invalid');
      errorEl.classList.add('show');
    }
  }
 
  function validarNombre() {
  const ok = nombreInput.value.trim().length >= 2;
  setFieldState(nombreField, nombreError, ok);
  return ok;
}

function validarEmail() {
  const ok = isValidEmail(emailInput.value.trim());
  setFieldState(emailField, emailError, ok);
  return ok;
}

function validarPass() {
  const ok = passInput.value.length >= 4;
  setFieldState(passField, passError, ok);
  return ok;
}

function validarPass2() {
  const ok = pass2Input.value.length > 0 &&
             pass2Input.value === passInput.value;
  setFieldState(pass2Field, pass2Error, ok);
  return ok;
}
 
  nombreInput.addEventListener('blur', () => { if (nombreInput.value.trim() !== '') validarNombre(); });
  nombreInput.addEventListener('input', () => { if (nombreField.classList.contains('invalid')) validarNombre(); });
 
  emailInput.addEventListener('blur', () => { if (emailInput.value.trim() !== '') validarEmail(); });
  emailInput.addEventListener('input', () => { if (emailField.classList.contains('invalid')) validarEmail(); });
 
  passInput.addEventListener('blur', () => { if (passInput.value !== '') validarPass(); });
  passInput.addEventListener('input', () => {
    if (passField.classList.contains('invalid')) validarPass();
    if (pass2Input.value !== '') validarPass2(); // si ya habían escrito la confirmación, revisa si ahora sí coincide
  });
 
  pass2Input.addEventListener('blur', () => { if (pass2Input.value !== '') validarPass2(); });
  pass2Input.addEventListener('input', () => { if (pass2Field.classList.contains('invalid')) validarPass2(); });
 
  termsInput.addEventListener('change', () => {
    termsError.classList.toggle('show', !termsInput.checked);
  });
 
  // ---------- ENVÍO DEL FORMULARIO ----------
  form.addEventListener('submit', (e) => {
    console.log("✅ Entró al submit");
    e.preventDefault();
 
    const nombreOk = validarNombre();
    const emailOk = validarEmail();
    const passOk = validarPass();
    const pass2Ok = validarPass2();
    const termsOk = termsInput.checked;
    termsError.classList.toggle('show', !termsOk);
 
    if (!nombreOk || !emailOk || !passOk || !pass2Ok || !termsOk){
      const primerCampoInvalido = !nombreOk ? nombreInput
        : !emailOk ? emailInput
        : !passOk ? passInput
        : !pass2Ok ? pass2Input
        : null;
      if (primerCampoInvalido) primerCampoInvalido.focus();
      return;
    }
 console.log("✅ Voy a enviar los datos al servidor");
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
 
    // Usamos el mismo endpoint que ya tienes probado en el panel admin
    // (POST /api/usuarios), con rol "usuario" por defecto — el rol
    // "admin" solo se asigna manualmente desde el panel, no aquí.
    fetch(`${API_BASE}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombreInput.value.trim(),
        correo: emailInput.value.trim(),
        password: passInput.value,
        rol: 'usuario'
      })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.mensaje || data.message || 'No se pudo crear la cuenta');
        return data;
      })
      .then(() => {
        // Cuenta creada: mandamos a login.html para que inicie sesión con
        // sus nuevos datos (así confirmamos que el login también funciona)
        window.location.href = 'login.html?registrado=1';
      })
      .catch((err) => {
        console.error(err);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        setFieldState(emailField, emailError, false, err.message || 'Ese correo ya está registrado');
      });
  });
 
});