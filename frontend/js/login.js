// ============================================================
// MusicIk — login.js
// Ecualizador ambiental, notas musicales flotantes, efecto tilt
// del vinilo, validación de formulario y conexión al backend.
// ============================================================
 
// 'DOMContentLoaded' es un evento que el navegador dispara cuando ya 
// terminó de construir todo el HTML de la página (todo lo que está en 
// login.html ya existe en memoria). Envolvemos TODO nuestro código dentro 
// de este evento para asegurarnos de que document.getElementById(...) 
// nunca falle buscando un elemento que "todavía no existe" porque el 
// script se ejecutó demasiado pronto.
document.addEventListener('DOMContentLoaded', () => {
 
  // ============================================================
  // ECUALIZADOR AMBIENTE
  // ============================================================
  // En el HTML, <div class="waveform" id="waveform"></div> está vacío a 
  // propósito. Aquí generamos, con JavaScript, un montón de <span> (las 
  // barritas) con valores ALEATORIOS de altura y velocidad, para que cada 
  // vez que se recargue la página el ecualizador se vea distinto (más 
  // orgánico, menos "de plantilla").
 const waveform = document.getElementById('waveform');

// Verifico que el contenedor exista antes de agregar las barras del ecualizador.
if (waveform) {

    const BAR_COUNT = 36; // Cantidad de barras que tendrá el ecualizador.

    let bars = '';

    // Repito este bloque 36 veces para crear cada barra automáticamente.
    for (let i = 0; i < BAR_COUNT; i++) {

        // Genero una altura aleatoria para cada barra.
        const height = 8 + Math.round(Math.random() * 26);

        // Asigno una duración aleatoria a la animación.
        const duration = (0.6 + Math.random() * 0.9).toFixed(2);

        // Asigno un retraso aleatorio para que las barras no se muevan al mismo tiempo.
        const delay = (Math.random() * 1.2).toFixed(2);

        // Agrego la barra al contenido del ecualizador.
        bars += `<span style="height:${height}px; animation-duration:${duration}s; animation-delay:-${delay}s;"></span>`;
    }
 
    // Metemos todo el HTML generado de una sola vez dentro del contenedor. 
    // Es más eficiente hacerlo una vez al final que ir agregando barrita 
    // por barrita al DOM.
    waveform.innerHTML = bars;
  }
 
  // ============================================================
  // NOTAS MUSICALES FLOTANDO
  // ============================================================
  // Misma idea que el ecualizador: <div id="notes"></div> está vacío en el 
  // HTML, y aquí generamos varias notitas (♪ ♫ ♬ ♩) con posición, tamaño y 
  // velocidad aleatorios para que floten de fondo por toda la pantalla.
  const notesContainer = document.getElementById('notes');

// Verifico que exista el contenedor donde se agregarán las notas musicales.
if (notesContainer) {

    const symbols = ['♪', '♫', '♬', '♩'];
    const NOTE_COUNT = 14; // Cantidad de notas musicales que se crearán.

    let notesHtml = '';

    // Repito este bloque 14 veces para generar cada nota musical.
    for (let i = 0; i < NOTE_COUNT; i++) {

        // Genero una posición horizontal aleatoria.
        const left = Math.round(Math.random() * 100);

        // Asigno un tamaño aleatorio a la nota.
        const size = 12 + Math.round(Math.random() * 14);

        // Asigno una duración aleatoria para la animación.
        const duration = (10 + Math.random() * 10).toFixed(1);

        // Asigno un retraso aleatorio para que las notas no aparezcan al mismo tiempo.
        const delay = (Math.random() * 14).toFixed(1);

        // Genero un desplazamiento lateral aleatorio durante la animación.
        const drift = Math.round((Math.random() - 0.5) * 120);

        // Selecciono un símbolo musical de forma aleatoria.
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        // Agrego la nota musical al contenido que se mostrará en la página.
        notesHtml += `<span style="left:${left}%; font-size:${size}px; animation-duration:${duration}s; animation-delay:-${delay}s; --drift:${drift}px;">${symbol}</span>`;
    }

    // Inserto todas las notas musicales generadas dentro del contenedor.
    notesContainer.innerHTML = notesHtml;
}
 
  // ============================================================
  // TILT 3D DEL VINILO CON EL MOUSE
  // ============================================================
  const turntable = document.querySelector('.turntable');
 
  // window.matchMedia('(hover: hover)').matches comprueba si el 
  // dispositivo actual SÍ tiene una forma de "hover" real (como un mouse). 
  // En celulares/tablets (solo touch) esto da false, y así evitamos 
  // agregar un efecto de mousemove que ahí no tendría sentido (no hay 
  // cursor que se mueva sin tocar la pantalla).
 // Verifico que exista el disco y que el dispositivo tenga soporte para pasar el mouse.
if (turntable && window.matchMedia('(hover: hover)').matches) {

    const stage = document.querySelector('.turntable-stage');

    // Detecto el movimiento del mouse sobre el área del disco.
    stage.addEventListener('mousemove', (e) => {

        // Obtengo la posición y el tamaño actual del disco.
        const rect = turntable.getBoundingClientRect();

        // Calculo la posición horizontal y vertical del mouse respecto al centro del disco.
        const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;

        // Aplico una inclinación 3D al disco según la posición del mouse.
        turntable.style.transform = `perspective(600px) rotateY(${relX * 10}deg) rotateX(${-relY * 10}deg)`;
    });

    // Cuando el mouse sale del área, el disco vuelve a su posición original.
    stage.addEventListener('mouseleave', () => {
        turntable.style.transform = '';
    });
}
 
  // ============================================================
  // FORMULARIO — referencias a los elementos que vamos a usar
  // ============================================================
  // Guardamos en variables cada elemento del HTML que necesitamos tocar 
  // más adelante, para no tener que buscar (getElementById) una y otra vez
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const emailField = document.getElementById('emailField');   // el <div class="field"> que envuelve el input de correo (a este le agregamos las clases "valid"/"invalid")
  const passField = document.getElementById('passField');     // lo mismo pero para contraseña
  const emailError = document.getElementById('emailError');   // el <p> de mensaje de error del correo
  const passError = document.getElementById('passError');     // el <p> de mensaje de error de la contraseña
  const submitBtn = document.getElementById('submitBtn');
  const togglePass = document.getElementById('togglePass');   // el botoncito del ojo
  const eyeOpen = togglePass.querySelector('.eye-open');       // el ícono de ojo abierto, DENTRO del botón
  const eyeClosed = togglePass.querySelector('.eye-closed');   // el ícono de ojo tachado, DENTRO del botón
 
  // ============================================================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // ============================================================
  togglePass.addEventListener('click', () => {
    // Si el input ACTUALMENTE es de tipo "password" (texto oculto con 
    // puntitos), isPassword = true, y vamos a cambiarlo a texto visible
    const isPassword = passInput.type === 'password';
 
    // El operador ternario "condición ? valorSiTrue : valorSiFalse" es un 
    // if/else compacto en una sola línea:
    // - si isPassword es true → cambia el input a type="text" (visible)
    // - si isPassword es false (ya estaba visible) → regresa a type="password" (oculto)
    passInput.type = isPassword ? 'text' : 'password';
 
    // Alternamos cuál de los dos íconos de ojo se muestra, usando el mismo 
    // booleano isPassword para decidir
    eyeOpen.style.display = isPassword ? 'none' : '';
    eyeClosed.style.display = isPassword ? '' : 'none';
  });
 
  // ============================================================
  // VALIDACIÓN
  // ============================================================
 
  // Una expresión regular (regex) que verifica el patrón básico de un 
  // correo: "algo" + "@" + "algo" + "." + "algo", sin espacios de por 
  // medio. No es 100% perfecta (ningún regex de email lo es), pero cubre 
  // el 99% de los casos reales y evita errores obvios de tipeo.
  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
 
 // Función que cambia el estado visual de un campo (válido, inválido o neutro).
function setFieldState(field, errorEl, valid){

    // Limpio los estilos anteriores antes de aplicar uno nuevo.
    field.classList.remove('invalid', 'valid');
    errorEl.classList.remove('show');

    // Si el campo es válido, agrego el estilo de validación.
    if (valid === true){
        field.classList.add('valid');

    // Si el campo es inválido, muestro el error.
    } else if (valid === false){
        field.classList.add('invalid');
        errorEl.classList.add('show');
    }
}

// Cuando el usuario sale del campo de correo, verifico si escribió un valor.
emailInput.addEventListener('blur', () => {

    // Si el campo está vacío, finalizo la función.
    if (emailInput.value.trim() === '') return;

    // Valido el correo y actualizo su estado.
    setFieldState(emailField, emailError, isValidEmail(emailInput.value.trim()));
});

// Mientras el usuario escribe, verifico si el correo ya es válido.
emailInput.addEventListener('input', () => {

    // Si antes era inválido y ahora es válido, cambio su estado.
    if (emailField.classList.contains('invalid') && isValidEmail(emailInput.value.trim())){
        setFieldState(emailField, emailError, true);
    }
});

// Cuando el usuario sale del campo de contraseña, verifico si escribió algo.
passInput.addEventListener('blur', () => {

    // Si el campo está vacío, finalizo la función.
    if (passInput.value === '') return;

    // Compruebo que la contraseña tenga al menos 4 caracteres.
    setFieldState(passField, passError, passInput.value.length >= 4);
});

// Mientras el usuario escribe la contraseña, verifico si ya cumple la longitud mínima.
passInput.addEventListener('input', () => {

    // Si antes era inválida y ahora cumple la condición, la marco como válida.
    if (passField.classList.contains('invalid') && passInput.value.length >= 4){
        setFieldState(passField, passError, true);
    }
});
 
  // ============================================================
  // ENVÍO DEL FORMULARIO
  // ============================================================
  form.addEventListener('submit', (e) => {
    // Sin esto, el navegador recargaría la página al enviar el form (el 
    // comportamiento clásico de HTML de toda la vida). Como nosotros 
    // queremos manejar el envío con JavaScript (fetch), SIEMPRE hay que 
    // cancelar ese comportamiento por defecto primero.
    e.preventDefault();
 
    // Leemos los valores actuales de los campos en el momento del envío
    const emailValue = emailInput.value.trim();
    const passValue = passInput.value;
    const emailOk = isValidEmail(emailValue);
    const passOk = passValue.length >= 4;
 
    // Revalidamos AMBOS campos de una vez (por si el usuario nunca hizo 
    // "blur" en alguno y le dio "Enter" directo, por ejemplo)
    setFieldState(emailField, emailError, emailOk);
    setFieldState(passField, passError, passOk);
 
    // Si cualquiera de los dos es inválido, NO seguimos (no llamamos al 
    // backend con datos que sabemos que están mal). Además, movemos el 
    // foco al primer campo con problema, para que el usuario sepa 
    // exactamente dónde corregir.
    if (!emailOk || !passOk){
      const firstInvalid = !emailOk ? emailInput : passInput;
      firstInvalid.focus();
      return; // corta la función aquí, no llega al fetch de abajo
    }
 
    // Si todo está bien, mostramos el estado de "cargando": la clase 
    // "loading" hace que el CSS oculte el texto/flecha y muestre el 
    // spinner girando (ver .btn-submit.loading en login.css). También 
    // deshabilitamos el botón para que no puedan hacer doble-click y 
    // mandar la petición dos veces mientras se espera la respuesta.
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
 
    // 🔑 AQUÍ ES DONDE SE CONECTA CON TU BACKEND 
    //Lo estoy utilizando para enviar el correo y la contraseña al servidor Node.js cuando el usuario inicia sesión.
    //La función fetch() manda una petición POST a la ruta /api/login, que es atendida por mi servidor hecho con Node.js y Express. 
    fetch(`${window.location.protocol}//${window.location.hostname}:3001/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // le avisamos al servidor "lo que te mando viene en formato JSON"
      body: JSON.stringify({ correo: emailValue, password: passValue })
      // JSON.stringify convierte nuestro objeto de JavaScript 
      // { correo: ..., password: ... } en un texto plano tipo 
      // '{"correo":"...","password":"..."}', que es el formato en el que 
      // viaja por la red. Del otro lado (en tu authRoutes.js / db.js), 
      // Express con express.json() lo vuelve a convertir en un objeto 
      // usable con req.body.correo y req.body.password.
    })
      // La respuesta del servidor llega primero como una "promesa" cruda; 
      // .json() la convierte de texto a un objeto de JavaScript usable
      .then(res => res.json())
      .then(data => {
        // "data" es exactamente el objeto que tu backend mandó con 
        // res.json({...}) — por ejemplo: {success:true, usuario:{...}} 
        // o {success:false, message:"..."}
        if (data.success) {

    // Guarda la información del usuario que inició sesión
    localStorage.setItem(
        'musicik_usuario',
        JSON.stringify(data.usuario)
    );

    // Verifica el rol del usuario
    if (data.usuario.rol === "admin") {

        // Si es administrador entra al panel de administrador
        window.location.href = "admin.html";

    } else {

        // Si es un usuario normal entra al inicio
        window.location.href = "home.html";

    }

} else {
          // El servidor respondió, pero con success:false (por ejemplo, 
          // contraseña incorrecta). Quitamos el estado de "cargando" y 
          // reactivamos el botón para que puedan intentar de nuevo...
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
 
          // ...y marcamos el campo de contraseña en rojo con el mensaje 
          // que vino del servidor (data.message), o un texto genérico si 
          // por algún motivo no vino ningún mensaje
          setFieldState(passField, passError, false);
          passError.textContent = data.message || 'Credenciales incorrectas';
          passError.classList.add('show');
        }
      })
      // .catch() atrapa errores de RED (no de credenciales) — por 
      // ejemplo, si el servidor (node server.js) no está corriendo, si 
      // hay un problema de CORS, o si no hay internet/conexión al backend
      .catch(err => {
        console.error('Error al conectar con el servidor:', err); // esto se ve en la consola del navegador (F12), útil para depurar
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        setFieldState(passField, passError, false);
        passError.textContent = 'No se pudo conectar con el servidor';
        passError.classList.add('show');
      });
  });
 
});