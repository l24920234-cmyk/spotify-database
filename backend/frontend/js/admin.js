// ============================================================
// MusicIk — admin.js
// Panel de administración con modales (en vez de prompt/alert).
// Usa los mismos endpoints que ya tenías funcionando:
//   GET    /api/usuarios            -> listar
//   POST   /api/usuarios            -> crear (nombre, correo, password, rol)
//   PUT    /api/usuarios/:id        -> editar (nombre, correo, rol)
//   DELETE /api/usuarios/:id        -> borrar
// ============================================================
 
const API_BASE = `${window.location.protocol}//${window.location.hostname}:3001/api`;
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ---------- PROTECCIÓN: solo entra quien inició sesión ----------
  const usuarioActual = (() => {
    try { return JSON.parse(localStorage.getItem('musicik_usuario')); }
    catch (e) { return null; }
  })();
 
  if (!usuarioActual) {
    window.location.href = 'login.html';
    return;
  }
 
  document.getElementById('cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('musicik_usuario');
    window.location.href = 'login.html';
  });
 
  // ---------- REFERENCIAS ----------
  const tablaUsuarios = document.getElementById('tablaUsuarios');
  const estadoCarga = document.getElementById('estadoCarga');
  const estadoVacio = document.getElementById('estadoVacio');
  const estadoError = document.getElementById('estadoError');
  const mensajeError = document.getElementById('mensajeError');
  const totalUsuarios = document.getElementById('totalUsuarios');
  const tabla = document.querySelector('table');
 
  let listaUsuarios = [];
 
  // ============================================================
  // CARGAR USUARIOS
  // ============================================================
  async function cargarUsuarios(){
    estadoCarga.style.display = 'flex';
    estadoError.style.display = 'none';
    estadoVacio.style.display = 'none';
    tabla.style.display = 'none';
 
    try {
      const respuesta = await fetch(`${API_BASE}/usuarios`);
      const datos = await respuesta.json();
 
      if (!datos.success) throw new Error(datos.mensaje || 'Error al cargar usuarios');
 
      listaUsuarios = datos.usuarios;
      estadoCarga.style.display = 'none';
      renderTabla(listaUsuarios);
 
    } catch (error) {
      console.error(error);
      estadoCarga.style.display = 'none';
      estadoError.style.display = 'flex';
      mensajeError.textContent = 'No se pudo conectar con el servidor (¿está corriendo node server.js?)';
    }
  }
 
  function renderTabla(lista){
    if (lista.length === 0){
      tabla.style.display = 'none';
      estadoVacio.style.display = 'flex';
      tablaUsuarios.innerHTML = '';
    } else {
      tabla.style.display = 'table';
      estadoVacio.style.display = 'none';
      tablaUsuarios.innerHTML = lista.map(u => `
        <tr data-id="${u.id}">
          <td class="cell-id">#${u.id}</td>
          <td class="cell-nombre">${escapeHtml(u.nombre)}</td>
          <td>${escapeHtml(u.correo)}</td>
          <td><span class="rol-tag ${u.rol === 'admin' ? 'admin' : 'usuario'}">${escapeHtml(u.rol)}</span></td>
          <td>
            <div class="row-acciones">
              <button class="icon-btn editar" data-accion="editar" aria-label="Editar">
                <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
              </button>
              <button class="icon-btn eliminar" data-accion="eliminar" aria-label="Eliminar">
                <svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
              </button>
            </div>
          </td>
        </tr>`).join('');
    }
    totalUsuarios.textContent = `${listaUsuarios.length} usuario${listaUsuarios.length === 1 ? '' : 's'} en total`;
  }
 
  function escapeHtml(str){
    return String(str ?? '').replace(/[&<>"']/g, m => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[m]));
  }
 
  document.getElementById('btnReintentar').addEventListener('click', cargarUsuarios);
 
  // ============================================================
  // MODAL: Agregar / Editar
  // ============================================================
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const userForm = document.getElementById('userForm');
  const formId = document.getElementById('formId');
  const formNombre = document.getElementById('formNombre');
  const formCorreo = document.getElementById('formCorreo');
  const formPassword = document.getElementById('formPassword');
  const labelPassword = document.getElementById('labelPassword');
  const formError = document.getElementById('formError');
  const saveBtn = document.getElementById('saveBtn');
 
  function abrirModal(usuario){
    formError.textContent = '';
    userForm.reset();
 
    if (usuario){
      // ---- MODO EDITAR ----
      modalTitle.textContent = 'Editar usuario';
      formId.value = usuario.id;
      formNombre.value = usuario.nombre;
      formCorreo.value = usuario.correo;
      document.querySelector(`input[name="rol"][value="${usuario.rol}"]`).checked = true;
 
      // Tu backend NO acepta password al editar (solo nombre/correo/rol),
      // así que ocultamos ese campo por completo en modo edición
      formPassword.style.display = 'none';
      labelPassword.style.display = 'none';
      formPassword.required = false;
    } else {
      // ---- MODO AGREGAR ----
      modalTitle.textContent = 'Agregar usuario';
      formId.value = '';
      formPassword.style.display = '';
      labelPassword.style.display = '';
      formPassword.required = true;
    }
 
    modalOverlay.classList.add('open');
    setTimeout(() => formNombre.focus(), 100);
  }
  function cerrarModal(){
    modalOverlay.classList.remove('open');
  }
 
  document.getElementById('btnAgregar').addEventListener('click', () => abrirModal(null));
  document.getElementById('modalClose').addEventListener('click', cerrarModal);
  document.getElementById('cancelBtn').addEventListener('click', cerrarModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) cerrarModal(); });
 
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.textContent = '';
 
    const id = formId.value;
    const esEdicion = id !== '';
    const rol = document.querySelector('input[name="rol"]:checked').value;
 
    const payload = esEdicion
      ? { nombre: formNombre.value.trim(), correo: formCorreo.value.trim(), rol }
      : { nombre: formNombre.value.trim(), correo: formCorreo.value.trim(), password: formPassword.value, rol };
 
    const url = esEdicion ? `${API_BASE}/usuarios/${id}` : `${API_BASE}/usuarios`;
    const method = esEdicion ? 'PUT' : 'POST';
 
    saveBtn.classList.add('loading');
    saveBtn.disabled = true;
 
    try {
      const respuesta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const datos = await respuesta.json();
 
      saveBtn.classList.remove('loading');
      saveBtn.disabled = false;
 
      if (!respuesta.ok){
        formError.textContent = datos.mensaje || 'No se pudo guardar el usuario';
        return;
      }
 
      cerrarModal();
      mostrarToast(datos.mensaje || (esEdicion ? 'Usuario actualizado' : 'Usuario creado'), 'success');
      cargarUsuarios();
 
    } catch (error) {
      console.error(error);
      saveBtn.classList.remove('loading');
      saveBtn.disabled = false;
      formError.textContent = 'No se pudo conectar con el servidor';
    }
  });
 
  // ============================================================
  // MODAL: Confirmar borrado
  // ============================================================
  const deleteOverlay = document.getElementById('deleteOverlay');
  const deleteNombre = document.getElementById('deleteNombre');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  let idPendienteBorrar = null;
 
  function abrirModalBorrar(id, nombre){
    idPendienteBorrar = id;
    deleteNombre.textContent = `"${nombre}" se eliminará permanentemente.`;
    deleteOverlay.classList.add('open');
  }
  function cerrarModalBorrar(){
    deleteOverlay.classList.remove('open');
    idPendienteBorrar = null;
  }
  document.getElementById('cancelDeleteBtn').addEventListener('click', cerrarModalBorrar);
  deleteOverlay.addEventListener('click', (e) => { if (e.target === deleteOverlay) cerrarModalBorrar(); });
 
  confirmDeleteBtn.addEventListener('click', async () => {
    if (!idPendienteBorrar) return;
    confirmDeleteBtn.classList.add('loading');
    confirmDeleteBtn.disabled = true;
 
    try {
      const respuesta = await fetch(`${API_BASE}/usuarios/${idPendienteBorrar}`, { method: 'DELETE' });
      const datos = await respuesta.json();
 
      confirmDeleteBtn.classList.remove('loading');
      confirmDeleteBtn.disabled = false;
      cerrarModalBorrar();
 
      if (!respuesta.ok){
        mostrarToast(datos.mensaje || 'No se pudo eliminar el usuario', 'error');
        return;
      }
 
      mostrarToast(datos.mensaje || 'Usuario eliminado correctamente', 'success');
      cargarUsuarios();
 
    } catch (error) {
      console.error(error);
      confirmDeleteBtn.classList.remove('loading');
      confirmDeleteBtn.disabled = false;
      cerrarModalBorrar();
      mostrarToast('No se pudo conectar con el servidor', 'error');
    }
  });
 
  // ---------- Delegación: botones editar/eliminar dentro de la tabla ----------
  tablaUsuarios.addEventListener('click', (e) => {
    const btn = e.target.closest('.icon-btn');
    if (!btn) return;
    const fila = btn.closest('tr');
    const id = fila.dataset.id;
    const usuario = listaUsuarios.find(u => String(u.id) === String(id));
    if (!usuario) return;
 
    if (btn.dataset.accion === 'editar'){
      abrirModal(usuario);
    } else if (btn.dataset.accion === 'eliminar'){
      abrirModalBorrar(id, usuario.nombre);
    }
  });
 
  // ---------- TOAST ----------
  let toastTimer = null;
  function mostrarToast(mensaje, tipo){
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = `toast show ${tipo}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
  }
 
  // Cerrar modales con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){ cerrarModal(); cerrarModalBorrar(); }
  });
 
  // ---------- ARRANQUE ----------
  cargarUsuarios();
});