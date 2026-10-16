/*
 * DATOS DE EJEMPLO DE LA DEMOSTRACIÓN — TODOS INVENTADOS.
 *
 * Están todos acá, en un solo archivo, para que se puedan cambiar sin tocar el resto de la página.
 * Ninguna persona, empresa, cédula, RUT ni importe de este archivo es real.
 *
 * La idea es que la demostración se vea como una página QUE YA SE VIENE USANDO HACE MESES:
 * el año arranca en enero con todo hecho y enviado, y el mes en curso está a medio terminar.
 * Por eso casi todo se genera a partir del mes actual (`mm`): el demo no envejece solo.
 *
 * Las funciones `seed*` de cada sección (datos.js, sueldos.js, honorarios.js, gastos.js,
 * impuestos.js) llaman a las `ejemplo*` de acá.
 */

/* VERSIÓN DE LOS DATOS DE EJEMPLO.
 * Cada visitante se lleva su copia de los ejemplos al navegador. Si después cambiamos los ejemplos,
 * el que ya había abierto el demo se queda con la copia vieja PARA SIEMPRE y ve una página casi
 * vacía: no hay forma de que note que hay datos nuevos. Pasó el 09/10/2026 (y antes con el demo de
 * Laura Cabrera).
 * Por eso los datos llevan versión: al abrir, si la copia guardada es de una versión anterior, se
 * rehacen los ejemplos (ver Store.load() en datos.js). Solo pasa en MODO_DEMO.
 * ⚠ CADA VEZ QUE SE CAMBIEN LOS EJEMPLOS DE ESTE ARCHIVO, SUBIR ESTE NÚMERO. */
var EJ_VERSION = 2;  // 2 (16/10/2026): 12 clientes «solo IRPF» y la temporada de IRPF en la carpeta IASS / IRPF

/* ===== Ayudas de fechas ===== */
function ejHoy(){ return new Date(); }
function ejAnio(){ return ejHoy().getFullYear(); }
function ejMes(){ return ejHoy().getMonth(); }        // 0 = enero
function ejDia(){ return ejHoy().getDate(); }
// Fecha "aaaa-mm-dd" a partir del mes (0-11) y el día.
function ejF(m, d){
  var y = ejAnio() + Math.floor(m / 12), mm = ((m % 12) + 12) % 12;
  return y + '-' + String(mm + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}
// Número estable (siempre el mismo) para variar los ejemplos sin que parezcan hechos con molde.
// 17 y 29 son primos y no comparten divisor con los topes que usamos (2,3,4,7,10,12):
// con otros multiplicadores el resto daba siempre lo mismo y las fechas salían todas iguales.
function ejVar(a, b, tope){ return (a * 17 + b * 29) % tope; }

/* ===== Info. Clientes ===== */
/* 32 clientes inventados, de los rubros típicos de un estudio del interior.
   Del c21 al c32 son personas que el estudio atiende solo en la temporada de IRPF. */
function ejemploClientes(){
  return [
    {id:'c1', nombre:'Silveira, Valentina', tipo:'Persona física', rut:'', ci:'4.987.321-5', bps:'', fnac:'1988-07-04', whatsapp:'099 445 566', correo:'valentina@ejemplo.com', direccion:'Agraciada 1123', fosmetal:'', otros:'', notas:'Paga siempre los primeros días del mes.'},
    {id:'c2', nombre:'Panadería La Espiga SRL', tipo:'Empresa', rut:'21 777888 0013', ci:'', bps:'8451207', fnac:'', whatsapp:'092 334 455', correo:'laespiga@ejemplo.com', direccion:'Sarandí 742', fosmetal:'', otros:'', notas:'Manda la planilla de sueldos por WhatsApp los días 25.'},
    {id:'c3', nombre:'Transportes del Norte SA', tipo:'Empresa', rut:'21 334455 0017', ci:'', bps:'7719044', fnac:'', whatsapp:'094 112 233', correo:'administracion@tdnorte.ejemplo', direccion:'Ruta 5 km 498', fosmetal:'', otros:'', notas:''},
    {id:'c4', nombre:'Estancia Los Ceibos', tipo:'Empresa', rut:'21 556677 0019', ci:'', bps:'6620381', fnac:'', whatsapp:'099 870 112', correo:'', direccion:'Paraje Cerro Pelado', fosmetal:'', otros:'', notas:'Declaración rural. Contacto: el capataz.'},
    {id:'c5', nombre:'Almacén Doña Nelly', tipo:'Empresa', rut:'21 998877 0012', ci:'', bps:'8102955', fnac:'', whatsapp:'098 223 114', correo:'', direccion:'Bvar. Artigas 2210', fosmetal:'', otros:'', notas:'Pequeña empresa, monotributo.'},
    {id:'c6', nombre:'Techera, Rodrigo', tipo:'Persona física', rut:'', ci:'3.112.998-0', bps:'', fnac:'1965-02-19', whatsapp:'099 556 770', correo:'rtechera@ejemplo.com', direccion:'', fosmetal:'', otros:'', notas:''},
    {id:'c7', nombre:'Ferretería El Clavo SRL', tipo:'Empresa', rut:'21 445566 0014', ci:'', bps:'7845120', fnac:'', whatsapp:'092 667 889', correo:'elclavo@ejemplo.com', direccion:'Gral. Flores 905', fosmetal:'', otros:'', notas:''},
    {id:'c8', nombre:'Olivera, Mariana', tipo:'Persona física', rut:'', ci:'4.221.776-3', bps:'', fnac:'1983-11-28', whatsapp:'094 330 221', correo:'mariana.olivera@ejemplo.com', direccion:'Ituzaingó 448', fosmetal:'', otros:'', notas:'Odontóloga. Aporta a la Caja de Profesionales.'},
    {id:'c9', nombre:'Rivera Textil SA', tipo:'Empresa', rut:'21 220099 0011', ci:'', bps:'7301488', fnac:'', whatsapp:'099 014 778', correo:'contable@riveratextil.ejemplo', direccion:'Parque Industrial, Padrón 4420', fosmetal:'', otros:'', notas:'La más grande de la cartera. Cierre de balance en junio.'},
    {id:'c10', nombre:'Farmacia San Antonio', tipo:'Empresa', rut:'21 667788 0015', ci:'', bps:'8220174', fnac:'', whatsapp:'098 441 002', correo:'farmaciasanantonio@ejemplo.com', direccion:'Sarandí 318', fosmetal:'', otros:'', notas:''},
    {id:'c11', nombre:'Barrios, Gustavo', tipo:'Persona física', rut:'', ci:'3.880.455-7', bps:'', fnac:'1976-05-09', whatsapp:'099 112 889', correo:'gbarrios@ejemplo.com', direccion:'', fosmetal:'', otros:'', notas:'Arquitecto. Factura por obra, los importes cambian mes a mes.'},
    {id:'c12', nombre:'Cabaña El Rincón', tipo:'Empresa', rut:'21 110022 0018', ci:'', bps:'6711230', fnac:'', whatsapp:'094 775 330', correo:'', direccion:'Ruta 27 km 42', fosmetal:'', otros:'', notas:'DICOSA y declaración rural.'},
    {id:'c13', nombre:'Supermercado Dos Hermanos SRL', tipo:'Empresa', rut:'21 889900 0016', ci:'', bps:'8455003', fnac:'', whatsapp:'092 008 446', correo:'doshermanos@ejemplo.com', direccion:'Bvar. Pres. Viera 1180', fosmetal:'', otros:'', notas:'14 empleados. Sueldos todos los meses.'},
    {id:'c14', nombre:'Da Rosa, Lucía', tipo:'Persona física', rut:'', ci:'5.102.447-9', bps:'', fnac:'1994-03-15', whatsapp:'099 663 008', correo:'luciadarosa@ejemplo.com', direccion:'', fosmetal:'', otros:'', notas:''},
    {id:'c15', nombre:'Taller Mecánico Pereira', tipo:'Empresa', rut:'21 330011 0010', ci:'', bps:'7990621', fnac:'', whatsapp:'098 774 115', correo:'', direccion:'Juan A. Lavalleja 77', fosmetal:'', otros:'', notas:'Viene atrasado con los honorarios.'},
    {id:'c16', nombre:'Clínica Veterinaria Patitas', tipo:'Empresa', rut:'21 775533 0013', ci:'', bps:'8330912', fnac:'', whatsapp:'094 229 667', correo:'patitas@ejemplo.com', direccion:'Agraciada 560', fosmetal:'', otros:'', notas:''},
    {id:'c17', nombre:'Nuñez, Alberto', tipo:'Persona física', rut:'', ci:'1.774.330-2', bps:'', fnac:'1951-09-23', whatsapp:'099 330 774', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Jubilado. Solo el IASS una vez al año.'},
    {id:'c18', nombre:'Cerrajería Rivera SRL', tipo:'Empresa', rut:'21 002244 0017', ci:'', bps:'8011776', fnac:'', whatsapp:'092 115 004', correo:'', direccion:'Ceballos 1402', fosmetal:'', otros:'', notas:''},
    {id:'c19', nombre:'Sosa, Fernanda', tipo:'Persona física', rut:'', ci:'4.556.112-8', bps:'', fnac:'1986-12-02', whatsapp:'099 887 221', correo:'fsosa@ejemplo.com', direccion:'', fosmetal:'', otros:'', notas:'Escribana.'},
    {id:'c20', nombre:'Agropecuaria del Tacuarembó SA', tipo:'Empresa', rut:'21 445511 0019', ci:'', bps:'6509873', fnac:'', whatsapp:'094 006 331', correo:'agro.tbo@ejemplo.com', direccion:'Ruta 26 km 12', fosmetal:'', otros:'', notas:'Ejercicio cerrado en abril.'},
    {id:'c21', nombre:'Acosta, Martín', tipo:'Persona física', rut:'', ci:'3.904.217-6', bps:'', fnac:'1979-04-11', whatsapp:'099 201 554', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Docente. Solo IRPF anual.'},
    {id:'c22', nombre:'Bentancor, Sofía', tipo:'Persona física', rut:'', ci:'4.613.882-1', bps:'', fnac:'1990-08-30', whatsapp:'098 552 013', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Enfermera. Solo IRPF anual.'},
    {id:'c23', nombre:'Cardozo, Diego', tipo:'Persona física', rut:'', ci:'4.027.551-9', bps:'', fnac:'1984-01-17', whatsapp:'094 880 216', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Empleado bancario. Solo IRPF anual.'},
    {id:'c24', nombre:'De León, Carolina', tipo:'Persona física', rut:'', ci:'5.230.664-4', bps:'', fnac:'1996-06-05', whatsapp:'099 741 302', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Solo IRPF anual. Pide devolución todos los años.'},
    {id:'c25', nombre:'Fernández, Pablo', tipo:'Persona física', rut:'', ci:'3.551.098-2', bps:'', fnac:'1972-10-22', whatsapp:'092 336 905', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Alquila dos apartamentos. IRPF por arrendamientos.'},
    {id:'c26', nombre:'Gómez, Ana Laura', tipo:'Persona física', rut:'', ci:'4.448.120-7', bps:'', fnac:'1987-03-09', whatsapp:'099 118 447', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Solo IRPF anual.'},
    {id:'c27', nombre:'Moreira, Cecilia', tipo:'Persona física', rut:'', ci:'3.775.402-5', bps:'', fnac:'1969-12-14', whatsapp:'098 007 661', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Jubilada con rentas de capital.'},
    {id:'c28', nombre:'Píriz, Andrea', tipo:'Persona física', rut:'', ci:'5.004.389-8', bps:'', fnac:'1993-09-27', whatsapp:'094 552 870', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Solo IRPF anual.'},
    {id:'c29', nombre:'Rodríguez, Natalia', tipo:'Persona física', rut:'', ci:'4.390.776-0', bps:'', fnac:'1985-05-02', whatsapp:'099 664 125', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Trabaja en dos empresas. Solo IRPF anual.'},
    {id:'c30', nombre:'Silva, Bruno', tipo:'Persona física', rut:'', ci:'4.812.553-3', bps:'', fnac:'1991-11-19', whatsapp:'092 771 048', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Solo IRPF anual.'},
    {id:'c31', nombre:'Suárez, Federico', tipo:'Persona física', rut:'', ci:'3.661.209-4', bps:'', fnac:'1975-07-08', whatsapp:'099 305 992', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Rentas de capital (plazo fijo). Solo IRPF anual.'},
    {id:'c32', nombre:'Viera, Gonzalo', tipo:'Persona física', rut:'', ci:'4.155.830-6', bps:'', fnac:'1982-02-24', whatsapp:'098 420 336', correo:'', direccion:'', fosmetal:'', otros:'', notas:'Solo IRPF anual. Mandó los papeles tarde.'},
  ];
}

/* ===== Declaraciones ===== */
/* Las carpetas vienen de FOLDERS (constantes.js): sp · iyc_cede · iyc_nocede · rural · iass.
   Las de principio de año están presentadas y pagas; las del mes en curso, a medio hacer. */
function ejemploDeclaraciones(){
  var yy = ejAnio(), mm = ejMes(), out = [];
  var n = 0;
  var add = function(folder, cli, tipo, mesVenc, dia, estado, importe, medio){
    n++;
    var hecho = estado === 'Presentada';
    out.push({id:'d'+n, folder:folder, anio:yy, tipoDj:tipo, clienteId:cli, hecho:hecho,
      presentada: hecho ? ejF(mesVenc, Math.max(1, dia - 2 - ejVar(n, 3, 4))) : '',
      importe: hecho ? String(importe) : '',
      medio: hecho ? medio : '',
      fechaPago: hecho ? ejF(mesVenc, dia) : '',
      estado: estado, venc: ejF(mesVenc, dia), notas:''});
  };

  // Servicios Personales — IVA bimestral de los profesionales de la cartera.
  add('sp', 'c8',  'IVA Servicios Personales · Jul-Ago', mm - 1, 26, 'Presentada', 18400, 'Transferencia');
  add('sp', 'c11', 'IVA Servicios Personales · Jul-Ago', mm - 1, 26, 'Presentada', 24900, 'Transferencia');
  add('sp', 'c19', 'IVA Servicios Personales · Jul-Ago', mm - 1, 26, 'Presentada', 15200, 'BROU');
  add('sp', 'c8',  'IVA Servicios Personales · Set-Oct', mm + 1, 26, 'Pendiente', 0, '');
  add('sp', 'c11', 'IVA Servicios Personales · Set-Oct', mm + 1, 26, 'Pendiente', 0, '');
  add('sp', 'c19', 'IVA Servicios Personales · Set-Oct', mm + 1, 26, 'En proceso', 0, '');
  add('sp', 'c1',  'Anticipo IRPF Servicios Personales', mm, 26, 'En proceso', 0, '');

  // Industria y Comercio · CEDE
  add('iyc_cede', 'c9',  'IVA mínimo mensual', mm - 1, 20, 'Presentada', 52800, 'Transferencia');
  add('iyc_cede', 'c13', 'IVA mínimo mensual', mm - 1, 20, 'Presentada', 41300, 'Transferencia');
  add('iyc_cede', 'c2',  'IVA mínimo mensual', mm - 1, 20, 'Presentada', 19700, 'Itaú');
  add('iyc_cede', 'c9',  'IVA mínimo mensual', mm, 20, 'En proceso', 0, '');
  add('iyc_cede', 'c13', 'IVA mínimo mensual', mm, 20, 'Pendiente', 0, '');
  add('iyc_cede', 'c2',  'IVA mínimo mensual', mm, 20, 'Presentada', 20450, 'Itaú');
  add('iyc_cede', 'c9',  'IRAE anual · ejercicio cerrado 06/' + yy, 7, 20, 'Presentada', 186500, 'Transferencia');

  // Industria y Comercio · No CEDE
  add('iyc_nocede', 'c7',  'IVA mínimo mensual', mm - 1, 15, 'Presentada', 11900, 'BROU');
  add('iyc_nocede', 'c10', 'IVA mínimo mensual', mm - 1, 15, 'Presentada', 14200, 'BROU');
  add('iyc_nocede', 'c18', 'IVA mínimo mensual', mm - 1, 15, 'Presentada', 8600, 'Efectivo');
  add('iyc_nocede', 'c3',  'IVA mínimo mensual', mm - 1, 15, 'Presentada', 22400, 'Transferencia');
  add('iyc_nocede', 'c7',  'IVA mínimo mensual', mm, 15, 'Presentada', 12050, 'BROU');
  add('iyc_nocede', 'c10', 'IVA mínimo mensual', mm, 15, 'Pendiente', 0, '');
  add('iyc_nocede', 'c18', 'IVA mínimo mensual', mm, 15, 'Pendiente', 0, '');
  add('iyc_nocede', 'c3',  'IVA mínimo mensual', mm, 15, 'En proceso', 0, '');
  add('iyc_nocede', 'c5',  'Monotributo · recibo mensual', mm, 15, 'Presentada', 3120, 'Efectivo');

  // Primaria Rural
  add('rural', 'c4',  'DJ Primaria Rural', mm - 1, 10, 'Presentada', 34800, 'Transferencia');
  add('rural', 'c12', 'DJ Primaria Rural', mm - 1, 10, 'Presentada', 27600, 'Transferencia');
  add('rural', 'c20', 'DJ Primaria Rural', mm - 1, 10, 'Presentada', 61200, 'Transferencia');
  add('rural', 'c12', 'DJ DICOSA', mm, 10, 'En proceso', 0, '');
  add('rural', 'c20', 'IRAE anual · ejercicio cerrado 04/' + yy, 6, 10, 'Presentada', 143900, 'Transferencia');

  // IASS / IRPF
  add('iass', 'c17', 'IASS anual', 5, 5, 'Presentada', 9400, 'BROU');
  add('iass', 'c6',  'IRPF anual · rentas de trabajo', 5, 5, 'Presentada', 12800, 'BROU');
  add('iass', 'c14', 'IRPF anual · rentas de trabajo', 5, 5, 'Presentada', 4100, 'Transferencia');
  add('iass', 'c1',  'IRPF anual · rentas de trabajo', 5, 5, 'Presentada', 7300, 'BROU');
  add('iass', 'c6',  'Devolución IRPF · trámite', mm + 1, 5, 'Pendiente', 0, '');
  // Temporada de IRPF: los clientes «solo IRPF» (c21 a c32). Julio = 6, agosto = 7.
  add('iass', 'c21', 'IRPF anual · rentas de trabajo', 6, 28, 'Presentada', 6200, 'BROU');
  add('iass', 'c22', 'IRPF anual · rentas de trabajo', 6, 28, 'Presentada', 3900, 'Transferencia');
  add('iass', 'c23', 'IRPF anual · rentas de trabajo', 6, 28, 'Presentada', 15400, 'Transferencia');
  add('iass', 'c24', 'IRPF anual · rentas de trabajo', 6, 28, 'Presentada', 0, 'Devolución');
  add('iass', 'c25', 'IRPF anual · arrendamientos', 7, 21, 'Presentada', 22800, 'BROU');
  add('iass', 'c26', 'IRPF anual · rentas de trabajo', 7, 21, 'Presentada', 5100, 'Itaú');
  add('iass', 'c27', 'IRPF anual · rentas de capital', 7, 21, 'Presentada', 8750, 'BROU');
  add('iass', 'c28', 'IRPF anual · rentas de trabajo', 7, 21, 'Presentada', 2600, 'Transferencia');
  add('iass', 'c29', 'IRPF anual · rentas de trabajo', 7, 21, 'Presentada', 11300, 'Transferencia');
  add('iass', 'c30', 'IRPF anual · rentas de trabajo', 7, 21, 'Presentada', 4450, 'Efectivo');
  add('iass', 'c31', 'IRPF anual · rentas de capital', 7, 21, 'Presentada', 9900, 'BROU');
  add('iass', 'c32', 'IRPF anual · fuera de plazo', mm, 30, 'En proceso', 0, '');
  add('iass', 'c24', 'Devolución IRPF · trámite', mm + 1, 5, 'Pendiente', 0, '');
  add('iass', 'c29', 'IRPF anual · rectificativa', mm, 24, 'Pendiente', 0, '');
  return out;
}

/* ===== Tareas extras ===== */
/* Lo que se le va pidiendo al estudio fuera de la rutina mensual. */
function ejemploTareas(){
  var mm = ejMes();
  return [
    {id:'t1', tarea:'Certificado único DGI', clienteId:'c2', etiqueta:'DGI', urgencia:'Alta', plazo:ejF(mm, 12), estado:'Pendiente', info:'Lo piden para una licitación.', hecho:false},
    {id:'t2', tarea:'Flujo de fondos', clienteId:'c1', etiqueta:'Banco', urgencia:'Media', plazo:ejF(mm, 18), estado:'En proceso', info:'Para el préstamo del BROU.', hecho:false},
    {id:'t3', tarea:'Certificado común BPS', clienteId:'c13', etiqueta:'BPS', urgencia:'Alta', plazo:ejF(mm, 6), estado:'Pendiente', info:'Se venció el anterior. Reclamado dos veces.', hecho:false},
    {id:'t4', tarea:'Alta de empresa en DGI', clienteId:'c16', etiqueta:'DGI', urgencia:'Media', plazo:ejF(mm, 23), estado:'En proceso', info:'Falta que firmen el formulario 0351.', hecho:false},
    {id:'t5', tarea:'Armar balance para el banco', clienteId:'c9', etiqueta:'Balance', urgencia:'Alta', plazo:ejF(mm, 29), estado:'En proceso', info:'Piden los dos últimos ejercicios.', hecho:false},
    {id:'t6', tarea:'Inscripción en RUPE', clienteId:'c3', etiqueta:'Trámite', urgencia:'Baja', plazo:ejF(mm + 1, 14), estado:'Pendiente', info:'', hecho:false},
    {id:'t7', tarea:'Baja de un empleado', clienteId:'c7', etiqueta:'BPS', urgencia:'Media', plazo:ejF(mm - 1, 22), estado:'Hecha', info:'Renunció el 15. Hecha la baja y la liquidación final.', hecho:true},
    {id:'t8', tarea:'Certificado de ingresos', clienteId:'c8', etiqueta:'Varios', urgencia:'Baja', plazo:ejF(mm - 1, 9), estado:'Hecha', info:'Para el alquiler.', hecho:true},
    {id:'t9', tarea:'Convenio de pago con DGI', clienteId:'c15', etiqueta:'DGI', urgencia:'Alta', plazo:ejF(mm - 1, 28), estado:'Hecha', info:'Quedó en 12 cuotas.', hecho:true},
    {id:'t10', tarea:'Cambio de domicilio fiscal', clienteId:'c10', etiqueta:'DGI', urgencia:'Baja', plazo:ejF(mm - 2, 17), estado:'Hecha', info:'', hecho:true},
    {id:'t11', tarea:'Constitución de SAS', clienteId:'c19', etiqueta:'Trámite', urgencia:'Media', plazo:ejF(mm - 2, 5), estado:'Hecha', info:'Inscripta en el Registro.', hecho:true},
    {id:'t12', tarea:'Rectificativa de abril', clienteId:'c18', etiqueta:'DGI', urgencia:'Media', plazo:ejF(mm - 3, 30), estado:'Hecha', info:'', hecho:true},
  ];
}

/* ===== Grillas mensuales (Empresas y Serv. Profesionales) =====
 * Acá es donde más se nota que la página se viene usando: los meses que ya pasaron están
 * marcados como hechos y enviados al cliente, y el mes en curso recién empieza.
 * Cada celda se guarda en cells["<año>-<mes 0-11>"].
 */
function ejCeldasDelAnio(semilla, saltar){
  var mm = ejMes(), hoy = ejDia(), cells = {}, y = ejAnio();
  for (var m = 0; m <= mm; m++) {
    if (saltar && saltar.indexOf(m) >= 0) { cells[y + '-' + m] = {estado:'na'}; continue; }
    if (m < mm) {
      var dia = 8 + ejVar(semilla, m, 10);                    // entre el 8 y el 17
      cells[y + '-' + m] = {estado:'done', fecha:ejF(m, dia), enviado:true, fechaEnvio:ejF(m, dia + 1), etiqueta:'', comentario:''};
    } else {
      // El mes en curso: algunas ya están, otras en proceso y otras sin empezar.
      var caso = ejVar(semilla, m, 3);
      if (caso === 0 && hoy >= 4) {
        var d1 = Math.min(hoy, 2 + ejVar(semilla, 5, Math.max(1, hoy - 2)));
        cells[y + '-' + m] = {estado:'done', fecha:ejF(m, d1), enviado:true,
          fechaEnvio:ejF(m, Math.min(hoy, d1 + 1)), etiqueta:'', comentario:''};
      }
      else if (caso === 1) cells[y + '-' + m] = {estado:'pend'};
    }
  }
  return cells;
}
function ejemploGrillas(){
  var emp = [
    {id:'e1',  nombre:'Panadería La Espiga SRL',        clienteId:'c2',  tipo:'CEDE'},
    {id:'e2',  nombre:'Almacén Doña Nelly',             clienteId:'c5',  tipo:'No CEDE'},
    {id:'e3',  nombre:'Rivera Textil SA',               clienteId:'c9',  tipo:'CEDE'},
    {id:'e4',  nombre:'Supermercado Dos Hermanos SRL',  clienteId:'c13', tipo:'CEDE'},
    {id:'e5',  nombre:'Ferretería El Clavo SRL',        clienteId:'c7',  tipo:'No CEDE'},
    {id:'e6',  nombre:'Farmacia San Antonio',           clienteId:'c10', tipo:'No CEDE'},
    {id:'e7',  nombre:'Transportes del Norte SA',       clienteId:'c3',  tipo:'CEDE'},
    {id:'e8',  nombre:'Cerrajería Rivera SRL',          clienteId:'c18', tipo:'No CEDE'},
    {id:'e9',  nombre:'Clínica Veterinaria Patitas',    clienteId:'c16', tipo:'No CEDE'},
    {id:'e10', nombre:'Taller Mecánico Pereira',        clienteId:'c15', tipo:'Unipersonal'},
    {id:'e11', nombre:'Agropecuaria del Tacuarembó SA', clienteId:'c20', tipo:'CEDE'},
    {id:'e12', nombre:'Cabaña El Rincón',               clienteId:'c12', tipo:'No CEDE'},
  ];
  var sp = [
    {id:'s1', nombre:'Techera, Rodrigo',   clienteId:'c6'},
    {id:'s2', nombre:'Olivera, Mariana',   clienteId:'c8'},
    {id:'s3', nombre:'Barrios, Gustavo',   clienteId:'c11'},
    {id:'s4', nombre:'Sosa, Fernanda',     clienteId:'c19'},
    {id:'s5', nombre:'Silveira, Valentina',clienteId:'c1'},
    {id:'s6', nombre:'Da Rosa, Lucía',     clienteId:'c14'},
  ];
  // Un par de meses "no corresponde", para que se vea que la grilla contempla ese caso.
  var saltos = {e10:[0,1], e12:[6,7], s6:[0,1,2]};
  var fila = function(r, i, tieneTipo){
    return {id:r.id, nombre:r.nombre, clienteId:r.clienteId, tipo:tieneTipo ? r.tipo : '',
      cells: ejCeldasDelAnio(i + 1, saltos[r.id])};
  };
  return {
    empresas:{rows: emp.map(function(r, i){ return fila(r, i, true); })},
    sprof:   {rows: sp.map(function(r, i){ return fila(r, i + 20, false); })},
    sueldos: {rows: []},
  };
}

/* ===== Notas adhesivas del Panel ===== */
function ejemploNotas(){
  var mm = ejMes();
  return [
    {id:'n1', text:NOTA_BIENVENIDA, color:'#fff3bf', date:''},
    {id:'n2', text:'Llamar a Rivera Textil por el balance.\nPiden los dos últimos ejercicios para el banco.', color:'#d3f9d8', date:ejF(mm, Math.max(1, ejDia() - 2))},
    {id:'n3', text:'Pedir la factura de Antel que falta de agosto.', color:'#d0ebff', date:ejF(mm - 1, 27)},
    {id:'n4', text:'El 26 vence el IVA de Servicios Personales.\nRevisar antes los gastos del bimestre.', color:'#ffe3e3', date:ejF(mm, 1)},
  ];
}

/* ===== Calendario ===== */
function ejemploCalendario(){
  var mm = ejMes();
  return [
    {id:'ev1', fecha:ejF(mm, Math.min(28, ejDia() + 5)), titulo:'Reunión con Rivera Textil · balance'},
    {id:'ev2', fecha:ejF(mm, Math.min(28, ejDia() + 12)), titulo:'Cierre de sueldos del mes'},
    {id:'ev3', fecha:ejF(mm + 1, 4), titulo:'Curso de actualización tributaria'},
  ];
}

/* ===== Sueldos =====
 * Tres meses cargados: los dos anteriores cerrados y enviados, y el mes en curso en marcha.
 */
function ejemploSueldos(){
  var mm = ejMes(), yy = ejAnio(), out = [], n = 0;
  var empresas = [
    {emp:'Supermercado Dos Hermanos SRL', grupo:'Grupo 10', nota:'14 empleados. Mandan la planilla el 25.'},
    {emp:'Rivera Textil SA',              grupo:'Grupo 6',  nota:''},
    {emp:'Panadería La Espiga SRL',       grupo:'Grupo 24', nota:'manda la planilla por WhatsApp'},
    {emp:'Transportes del Norte SA',      grupo:'Grupo 13', nota:''},
    {emp:'Ferretería El Clavo SRL',       grupo:'Grupo 10', nota:''},
    {emp:'Farmacia San Antonio',          grupo:'Grupo 19', nota:''},
    {emp:'Almacén Doña Nelly',            grupo:'Grupo 10', nota:''},
    {emp:'Clínica Veterinaria Patitas',   grupo:'Grupo 19', nota:''},
  ];
  var domesticos = ['Rosana Píriz', 'Miriam Acosta', 'Elbio Fernández'];

  // Los dos meses anteriores: todo cerrado, enviado y controlado.
  [mm - 2, mm - 1].forEach(function(m){
    if (m < 0) return;
    empresas.forEach(function(e, i){
      n++;
      out.push({id:'sl' + n, sub:'sueldos', mes:m, anio:yy, empresa:e.emp, estado:'Enviado',
        prontos:true, avisado:true, avisadoFecha:ejF(m, 2 + ejVar(i, m, 4)),
        fosmetal:i === 1, bps:true, contab:true, control:true, audit:true,
        grupo:e.grupo, obs:'', nota:e.nota});
    });
    domesticos.forEach(function(d, i){
      n++;
      out.push({id:'sd' + n, sub:'domesticos', mes:m, anio:yy, empresa:d, estado:'Enviado',
        prontos:true, avisado:true, avisadoFecha:ejF(m, 1 + i), fosmetal:false, bps:true,
        grupo:'Grupo 21', obs:'', nota:''});
    });
  });

  // El mes en curso: a medio hacer, que es lo que se ve cualquier día del mes.
  var estados = ['Enviado', 'Enviado', 'Enviado', 'Pronto', 'Pronto', 'En proceso', 'Pendiente', 'Pendiente'];
  empresas.forEach(function(e, i){
    n++;
    var est = estados[i], listo = est === 'Enviado', casi = listo || est === 'Pronto';
    out.push({id:'sl' + n, sub:'sueldos', mes:mm, anio:yy, empresa:e.emp, estado:est,
      prontos:casi, avisado:listo, avisadoFecha:listo ? ejF(mm, 2 + i) : '',
      fosmetal:i === 1 && casi, bps:listo, contab:listo, control:listo && i < 2, audit:false,
      grupo:e.grupo, obs:est === 'Pendiente' ? 'Falta que manden la planilla' : '', nota:e.nota});
  });
  domesticos.forEach(function(d, i){
    n++;
    var listo = i < 2;
    out.push({id:'sd' + n, sub:'domesticos', mes:mm, anio:yy, empresa:d, estado:listo ? 'Enviado' : 'Pendiente',
      prontos:listo, avisado:listo, avisadoFecha:listo ? ejF(mm, 1 + i) : '', fosmetal:false, bps:listo,
      grupo:'Grupo 21', obs:'', nota:''});
  });

  // Reliquidaciones sueltas.
  out.push({id:'sr1', sub:'reliq', mes:mm, anio:yy, empresa:'Estancia Los Ceibos', estado:'Pronto',
    empleado:'Pereyra, Juan', importe:'18400', grupo:'Grupo 9', obs:'Licencia no gozada', nota:''});
  out.push({id:'sr2', sub:'reliq', mes:mm, anio:yy, empresa:'Ferretería El Clavo SRL', estado:'Enviado',
    empleado:'Méndez, Carolina', importe:'32750', grupo:'Grupo 10', obs:'Egreso por renuncia', nota:''});
  if (mm - 1 >= 0) out.push({id:'sr3', sub:'reliq', mes:mm - 1, anio:yy, empresa:'Rivera Textil SA', estado:'Enviado',
    empleado:'Da Silva, Marcos', importe:'27100', grupo:'Grupo 6', obs:'', nota:''});
  return out;
}

/* ===== Honorarios =====
 * Catorce clientes con su honorario mensual y el año cobrado mes a mes.
 * A propósito quedan algunos sin cobrar: dos meses atrasados de un cliente y el mes en curso
 * a mitad de camino. Un demo donde está todo pago no muestra para qué sirve la sección.
 */
function ejemploHonorarios(){
  var yy = ejAnio(), mm = ejMes();
  var cli = [
    {id:'h1',  clienteId:'c13', importe:9700,  medio:'Transferencia', factura:true},
    {id:'h2',  clienteId:'c9',  importe:11500, medio:'Itaú',          factura:true},
    {id:'h3',  clienteId:'c2',  importe:8900,  medio:'Itaú',          factura:true},
    {id:'h4',  clienteId:'c10', importe:6800,  medio:'BROU',          factura:true},
    {id:'h5',  clienteId:'c7',  importe:5400,  medio:'Transferencia', factura:true},
    {id:'h6',  clienteId:'c3',  importe:4000,  medio:'Transferencia', factura:true},
    {id:'h7',  clienteId:'c12', importe:5200,  medio:'Transferencia', factura:false},
    {id:'h8',  clienteId:'c15', importe:4600,  medio:'Efectivo',      factura:false},
    {id:'h9',  clienteId:'c16', importe:3900,  medio:'BROU',          factura:false},
    {id:'h10', clienteId:'c5',  importe:3200,  medio:'Efectivo',      factura:false},
    {id:'h11', clienteId:'c11', importe:3100,  medio:'Transferencia', factura:false},
    {id:'h12', clienteId:'c8',  importe:2800,  medio:'BROU',          factura:false},
    {id:'h13', clienteId:'c1',  importe:2500,  medio:'BROU',          factura:false},
    {id:'h14', clienteId:'c6',  importe:1500,  medio:'Efectivo',      factura:false},
  ];
  // Quién queda sin cobrar: [id del cliente, meses sin pagar contados hacia atrás desde el actual].
  var deudas = {h8:[1, 2], h14:[1]};              // el taller debe dos meses; Techera, uno
  var cobradoEsteMes = ['h1','h2','h3','h4','h5','h6','h9','h13'];  // 8 de 14 al día de hoy

  // Una sola numeración para todo el año, como la lleva de verdad un estudio:
  // las facturas van corridas mes a mes, y los recibos aparte.
  var mov = [], nFactura = 100, nRecibo = 2140;

  for (var m = 0; m <= mm; m++) {
    cli.forEach(function(r){
      var debe = (deudas[r.id] || []).some(function(k){ return m === mm - k; });
      if (debe) return;                                    // sin registro = atrasado
      var esteMes = (m === mm);
      if (esteMes && cobradoEsteMes.indexOf(r.id) < 0) return;  // todavía no cobró
      var dia = Math.min(esteMes ? ejDia() : 28, 4 + ejVar(+r.id.slice(1), m, 12));
      if (esteMes && dia > ejDia()) dia = ejDia();
      mov.push({id:'hm' + r.id + '-' + m, rowId:r.id, anio:yy, mes:m,
        factura: r.factura ? String(++nFactura) : '',
        recibo:  r.factura ? '' : String(++nRecibo),
        fecha:ejF(m, dia), medio:r.medio});
    });
  }
  return {cli: cli.map(function(r){ return {id:r.id, clienteId:r.clienteId, importe:r.importe, medio:r.medio}; }), mov: mov,
    // Se usa para calcular el IVA de ejemplo de la pestaña Impuestos.
    conFactura: cli.filter(function(r){ return r.factura; }).map(function(r){ return r.id; })};
}

/* ===== Gastos del estudio ===== */
/* Los fijos desde enero (para que haya historia) y algunos sueltos del mes en curso. */
function ejemploGastos(){
  var mm = ejMes(), hoy = ejDia();
  var fijos = [
    {concepto:'Alquiler de la oficina',    cat:'Alquiler',             importe:28000, proveedor:'Inmobiliaria del Centro', medio:'Transferencia', dia:5},
    {concepto:'UTE',                       cat:'Luz',                  importe:3450,  proveedor:'UTE',                     medio:'BROU',          dia:12},
    {concepto:'OSE',                       cat:'Agua',                 importe:980,   proveedor:'OSE',                     medio:'BROU',          dia:12},
    {concepto:'Antel fibra y teléfono',    cat:'Internet y teléfono',  importe:2190,  proveedor:'Antel',                   medio:'BROU',          dia:15},
    {concepto:'Sistema de contabilidad',   cat:'Software y sistemas',  importe:4200,  proveedor:'Sistemas del Sur',        medio:'Transferencia', dia:3},
    {concepto:'Servicio de limpieza',      cat:'Limpieza',             importe:2800,  proveedor:'Marta Do Santos',         medio:'Efectivo',      dia:28},
  ];
  var out = [];
  for (var m = 0; m <= mm; m++) {
    fijos.forEach(function(g, i){
      // Los meses que pasaron están todos pagos; el actual, solo lo que ya venció.
      var pago = (m < mm) || (g.dia <= hoy);
      // El alquiler subió a mitad de año, como pasa de verdad.
      var imp = (g.cat === 'Alquiler' && m >= 6) ? 31000 : g.importe;
      out.push({id:'g' + m + '-' + i, fecha:ejF(m, g.dia), concepto:g.concepto, cat:g.cat, importe:imp,
        proveedor:g.proveedor, medio:g.medio, pagado:pago, fechaPago:pago ? ejF(m, g.dia) : '',
        factura:'', fijo:true, forma:'contado', conIva:false, iva:0, notas:''});
    });
  }
  // Gastos sueltos, con IVA, para que se vea cómo se computa.
  out.push({id:'gx1', fecha:ejF(mm, Math.min(8, hoy)), concepto:'Resma de hojas y tóner', cat:'Papelería y librería', importe:1870,
    proveedor:'Librería Central', medio:'Efectivo', pagado:true, fechaPago:ejF(mm, Math.min(8, hoy)), factura:'A 4821',
    fijo:false, forma:'contado', conIva:true, iva:337, ivaModo:'incluido', ivaDed:100, notas:''});
  out.push({id:'gx5', fecha:ejF(mm, Math.min(hoy, 22)), concepto:'Combustible y peajes', cat:'Movilidad', importe:3200,
    proveedor:'Ancap', medio:'Visa', pagado:true, fechaPago:ejF(mm, Math.min(hoy, 22)), factura:'B 9134',
    fijo:false, forma:'contado', conIva:true, iva:577, ivaModo:'incluido', ivaDed:50, notas:'El IVA del combustible se computa al 50%'});
  if (mm - 2 >= 0) out.push({id:'gx6', fecha:ejF(mm - 2, 19), concepto:'Honorarios del contador de la página', cat:'Otros', importe:5600,
    proveedor:'Wydan Solutions', medio:'Transferencia', pagado:true, fechaPago:ejF(mm - 2, 19), factura:'A 2207',
    fijo:false, forma:'contado', conIva:true, iva:1010, ivaModo:'incluido', ivaDed:100, notas:''});
  if (mm - 8 >= 0) out.push({id:'gx8', fecha:ejF(mm - 8, 14), concepto:'Impresora multifunción', cat:'Muebles y útiles', importe:24500,
    proveedor:'Electro Rivera', medio:'Visa', pagado:true, fechaPago:ejF(mm - 8, 14), factura:'A 6602',
    fijo:false, forma:'contado', conIva:true, iva:4418, ivaModo:'incluido', ivaDed:100, notas:''});
  if (mm - 6 >= 0) out.push({id:'gx9', fecha:ejF(mm - 6, 23), concepto:'Libros y suscripción tributaria', cat:'Otros', importe:9800,
    proveedor:'Editorial FCU', medio:'Transferencia', pagado:true, fechaPago:ejF(mm - 6, 23), factura:'A 3318',
    fijo:false, forma:'contado', conIva:true, iva:1767, ivaModo:'incluido', ivaDed:100, notas:''});
  if (mm - 4 >= 0) out.push({id:'gx7', fecha:ejF(mm - 4, 11), concepto:'Aire acondicionado de la oficina', cat:'Muebles y útiles', importe:38900,
    proveedor:'Electro Rivera', medio:'Visa', pagado:true, fechaPago:ejF(mm - 4, 11), factura:'A 7715',
    fijo:false, forma:'contado', conIva:true, iva:7014, ivaModo:'incluido', ivaDed:100, notas:''});
  // Una compra a crédito, para que se vea cómo funcionan las cuotas.
  out.push({id:'gx2', fecha:ejF(mm, Math.min(hoy, 17)), concepto:'Escritorio y silla', cat:'Muebles y útiles', importe:12600,
    proveedor:'Mueblería Rivera', medio:'Visa', pagado:false, fechaPago:'', factura:'A 1207', fijo:false,
    forma:'credito', cuotas:6, primera:gstSumarMeses(ejF(mm, Math.min(hoy, 17)), 1),
    conIva:true, iva:2272, ivaModo:'incluido', ivaDed:50, notas:'6 cuotas sin interés · el IVA de muebles se computa al 50%'});
  return out;
}

/* ===== Impuestos del estudio (IVA Servicios Personales) =====
 * Los importes salen de los mismos honorarios y gastos de ejemplo, así el número que quedó
 * escrito coincide con el que la página sugiere. Si se cambian los honorarios, esto se acomoda solo.
 */
function ejemploImpuestos(hon, gastos){
  var y = ejAnio(), mm = ejMes(), out = [];
  if (typeof VENC_TABLA === 'undefined' || !VENC_TABLA[y]) return out;
  var conFactura = (hon && hon.conFactura) || [];
  // IVA facturado de cada mes.
  var ventas = {};
  (hon && hon.mov || []).forEach(function(mv){
    if (!mv.factura || conFactura.indexOf(mv.rowId) < 0) return;
    var r = (hon.cli || []).find(function(x){ return x.id === mv.rowId; });
    if (!r) return;
    ventas[mv.mes] = (ventas[mv.mes] || 0) + (r.importe * 0.22);
  });
  // IVA deducible de los gastos de cada mes.
  var compras = {};
  (gastos || []).forEach(function(g){
    if (!g.iva) return;
    var m = +String(g.fecha).slice(5, 7) - 1;
    compras[m] = (compras[m] || 0) + g.iva * ((g.ivaDed || 100) / 100);
  });
  for (var i = 0; i < 6; i++) {
    var m1 = i * 2, m2 = i * 2 + 1;
    if (m1 > mm) break;                               // los bimestres que todavía no empezaron, no van
    var v = (ventas[m1] || 0) + (ventas[m2] || 0);
    var c = (compras[m1] || 0) + (compras[m2] || 0);
    var iva = Math.round((v - c) * 100) / 100;
    var vMes = (i * 2 + 2) % 12, venc = vencFecha('dgi_sp', y, vMes) || '';
    // Ya pagos todos menos el último vencido, que es el que muestra el aviso.
    var pagado = (m2 < mm - 1);
    out.push({id:'ip' + i, tipo:'periodo', anio:y, pi:i, iva:iva,
      irpf: Math.round((v * 0.58) / 100) * 100,       // un IRPF plausible, redondeado
      venc:venc, pagado:pagado, fechaPago:pagado ? venc : '',
      comprobante:pagado ? 'B-' + (4100 + i) : '', notas:''});
  }
  return out;
}
