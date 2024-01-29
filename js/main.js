class Tarea {
    constructor(nombre, tiempo) {
        this.nombre = nombre;
        this.tiempo = tiempo;
    }

    pluralizarHoras() {
        return this.tiempo === 1 ? this.tiempo + " hora" : this.tiempo + " horas";
    }
}

class ListaTareas {
    constructor(nombreUsuario, nombreListaTareas) {
        this.nombreUsuario = nombreUsuario;
        this.nombreListaTareas = nombreListaTareas;
        this.tareas = [];
        this.tiempoTotalTareas = 0;
    }

    mostrarMenu() {
        let opcionMenu;
        do {
            opcionMenu = prompt("¡Hola " + this.nombreUsuario + "! Lista de Tareas: " + this.nombreListaTareas +
                "\n\n🌟 Menú Principal - Elije una opción del 1 al 5 🌟\n\n1️⃣ Agregar tareas ➕\n2️⃣ Ver tareas 👁️\n3️⃣ Eliminar tarea ➖\n4️⃣ Buscar tareas usando filtros 🔍\n5️⃣ Salir🚪");
            switch (opcionMenu) {
                case "1":
                    this.agregarTarea();
                    break;
                case "2":
                    this.verTareas();
                    break;
                case "3":
                    this.eliminarTarea();
                    break;
                case "4":
                    this.aplicarFiltrosAvanzados();
                    break;
                case "5":
                    alert("Muchas gracias por usar el simulador de gestión de tareas ¡Hasta luego! 👋");
                    break;
                default:
                    alert("Opción no válida. Por favor, selecciona una opción válida. 🤔");
            }
        } while (opcionMenu !== "5");
    }

    agregarTarea() {
        let agregarMasTareas = true;

        while (agregarMasTareas) {
            const numeroTareas = parseInt(prompt("Ingrese la cantidad de tareas que desea agregar:"));

            if (!isNaN(numeroTareas) && numeroTareas > 0) {
                for (let i = 0; i < numeroTareas; i++) {
                    const nombreTarea = prompt("Ingrese el nombre de la tarea:");
                    const tiempoTarea = parseFloat(prompt("Ingrese el tiempo estimado para la tarea (en horas):"));

                    if (nombreTarea && !isNaN(tiempoTarea)) {
                        const nuevaTarea = new Tarea(nombreTarea, tiempoTarea);
                        this.tareas.push(nuevaTarea);
                        this.tiempoTotalTareas += tiempoTarea;
                    } else {
                        alert("Por favor, ingrese información válida. 🚫");
                        i--;
                    }
                }
            } else {
                alert("Por favor, ingrese un número válido mayor que cero. 🚫");
            }
            agregarMasTareas = confirm("¿Desea agregar más tareas? 🤔");
        }
        this.mostrarTiempoTotal();
    }

    eliminarTarea() {
        if (this.tareas.length > 0) {
            alert("A continuación se muestran las tareas existentes para " + this.nombreListaTareas + ". Si el nombre se repite, se eliminarán todas sus ocurrencias:\n\n" + this.tareas.map(tarea => tarea.nombre + ": " + tarea.pluralizarHoras()).join("\n"));

            const tareaEliminar = prompt("Ingrese el nombre de la tarea que desea eliminar:");

            const tareasEliminadas = this.tareas.filter(tarea => tarea.nombre.toLowerCase() === tareaEliminar.trim().toLowerCase());

            if (tareasEliminadas.length > 0) {
                tareasEliminadas.forEach(tarea => this.tiempoTotalTareas -= tarea.tiempo);
                this.tareas = this.tareas.filter(tarea => tarea.nombre.toLowerCase() !== tareaEliminar.trim().toLowerCase());
                alert("Tarea eliminada con éxito. 👍");
                this.mostrarTiempoTotal();
            } else {
                alert("La tarea no existe en la lista. 🚫");
            }
        } else {
            alert("No hay tareas para eliminar en la lista de tareas: " + this.nombreListaTareas);
        }
    }

    mostrarTiempoTotal() {
        alert("Tiempo total para la lista de tareas " + this.nombreListaTareas + ": " + this.pluralizarHoras(this.tiempoTotalTareas.toFixed(2)));
    }
    pluralizarHoras(tiempo) {
        return tiempo === 1 ? tiempo + " hora" : tiempo + " horas";
    }

    verTareas() {
        if (this.tareas.length > 0) {
            const cadenaListaTareas = this.tareas.map(tarea => tarea.nombre + ": " + tarea.pluralizarHoras()).join("\n");
            console.log(cadenaListaTareas);
            alert("Lista de tareas de " + this.nombreListaTareas + ":\n" + cadenaListaTareas);
            this.mostrarTiempoTotal();
        } else {
            alert("No hay tareas definidas para la lista de tareas: " + this.nombreListaTareas);
        }
    }

    aplicarFiltrosAvanzados() {
        let opcionFiltro;
        do {
            opcionFiltro = prompt("🔍 Filtros Avanzados\n\n1️⃣ Filtrar por tiempo mínimo\n2️⃣ Filtrar por tiempo máximo\n3️⃣ Filtrar por palabra clave\n4️⃣ Volver al menú principal\n\nPor favor, elige una opción del 1 al 4");

            switch (opcionFiltro) {
                case "1":
                    this.filtrarPorTiempoMinimo();
                    break;
                case "2":
                    this.filtrarPorTiempoMaximo();
                    break;
                case "3":
                    this.filtrarPorPalabraClave();
                    break;
                case "4":
                    alert("Volviendo al menú principal. 🔙");
                    break;
                default:
                    alert("Opción no válida. Por favor, selecciona una opción válida. 🤔");
            }
        } while (opcionFiltro !== "4");
    }

    filtrarPorTiempoMinimo() {
        const tiempoMinimo = parseFloat(prompt("Ingrese el tiempo mínimo (en horas):"));

        if (!isNaN(tiempoMinimo)) {
            const tareasFiltradas = this.tareas.filter(tarea => tarea.tiempo >= tiempoMinimo);

            this.mostrarTareasFiltradas(tareasFiltradas);
        } else {
            alert("Por favor, ingrese un número válido para el tiempo mínimo. 🚫");
        }
    }

    filtrarPorTiempoMaximo() {
        const tiempoMaximo = parseFloat(prompt("Ingrese el tiempo máximo (en horas):"));

        if (!isNaN(tiempoMaximo)) {
            const tareasFiltradas = this.tareas.filter(tarea => tarea.tiempo <= tiempoMaximo);

            this.mostrarTareasFiltradas(tareasFiltradas);
        } else {
            alert("Por favor, ingrese un número válido para el tiempo máximo. 🚫");
        }
    }

    filtrarPorPalabraClave() {
        const palabraClave = prompt("Ingrese la palabra clave para filtrar:");

        if (palabraClave) {
            const tareasFiltradas = this.tareas.filter(tarea => tarea.nombre.toLowerCase().includes(palabraClave.toLowerCase()));

            this.mostrarTareasFiltradas(tareasFiltradas);
        } else {
            alert("Por favor, ingrese una palabra clave válida. 🚫");
        }
    }

    mostrarTareasFiltradas(tareasFiltradas) {
        if (tareasFiltradas.length > 0) {
            const cadenaTareasFiltradas = tareasFiltradas.map(tarea => tarea.nombre + ": " + tarea.pluralizarHoras()).join("\n");
            alert("Tareas Filtradas:\n" + cadenaTareasFiltradas);
        } else {
            alert("No hay tareas que coincidan con los criterios de filtrado. 🚫");
        }
    }

    mostrarPrioridades() {
        alert("Funcionalidad de prioridades aún no implementada. 🚧");
    }

    establecerRecordatorio() {
        alert("Funcionalidad de recordatorios aún no implementada. 🚧");
    }

    agregarSubtarea() {
        alert("Funcionalidad de subtareas aún no implementada. 🚧");
    }

    exportarImportarDatos() {
        alert("Funcionalidad de exportar/Importar aún no implementada. 🚧");
    }

    mostrarEstadisticas() {
        alert("Funcionalidad de estadísticas aún no implementada. 🚧");
    }

    mostrarHistorialCambios() {
        alert("Funcionalidad de historial de cambios aún no implementada. 🚧");
    }

}

// Comienzo

let listaTareasApp;

function iniciarGestorTareas() {
    nombreUsuario = prompt("¡Hola! 😊 Ingresa tu nombre:");

    nombreListaTareas = prompt("Ingresa un nombre para tu lista de tareas 📋:");

    if (nombreUsuario && nombreListaTareas) {
        listaTareasApp = new ListaTareas(nombreUsuario, nombreListaTareas);
        listaTareasApp.mostrarMenu();
    } else {
        alert("Por favor, ingresa información válida. 🚫");
    }
}