# 🧱 Estructura del informe

Este documento explica cómo está organizada la carpeta `informe/` y cómo colaborar sin romper el flujo de trabajo.

---

## 📂 Organización del directorio

```
informe/
├── main.tex
├── secciones/
├── imagenes/
├── referencias/
├── styles/
└── documentacion/
```
---

## ✍️ Archivos editables

### 📄 Secciones (`secciones/`)

Cada sección del informe está separada en un archivo `.tex`, siguiendo una numeración lógica para el orden de compilación. Por ejemplo:

- `1_caratula.tex`: Portada
- `2_resumen.tex`: Resumen y abstract
- `3_justificacion.tex` ... `10_conclusiones.tex`: Desarrollo principal
- `11_recomendaciones.tex`: Recomendaciones finales
- `12_bibliografia.tex`: Se incluye la impresión automática de la bibliografía (no modificar).
- `13_autores.tex`: Lista de autores del equipo

🔸 **Modifica únicamente los archivos de esta carpeta**, a menos que se indique lo contrario.

---

## 🎨 Estilos y plantilla (`styles/`)

- `plantilla-profesor.sty`: Archivo original proporcionado por el profesor.
- `configuracion.sty`: Archivo personalizado donde se definen estilos propios del equipo como:
  - Espaciado entre párrafos
  - Formato de títulos y subtítulos
  - Configuración del idioma
  - Carga de paquetes como `biblatex`, `csquotes`, etc.

🔸 **Si necesitas modificar el diseño del informe (márgenes, tipografía, etc.), hazlo aquí.**

---

## 📚 Bibliografía (`referencias/`)

- `referencias.bib`: Contiene todas las fuentes bibliográficas en formato BibTeX (estilo APA 7).

Para citar una fuente, usa los comandos:

```latex
\textcite{clave}   % cita narrativa
\parencite{clave}  % cita entre paréntesis
```

🔹 La bibliografía se imprime automáticamente con `\printbibliography` desde `main.tex`.  
🔸 **No es necesario incluir un `thebibliography` manual.**

---

## 💡 Buenas prácticas

- 🧩 **No edites archivos fuera de `secciones/` salvo que sea absolutamente necesario.**
- 🧠 **Antes de modificar `styles/` o `referencias/`, consulta con el equipo.**
- 📌 Usa siempre **rutas relativas** para imágenes (`../imagenes/nombre.png`).
- 🛡️ No cambies la estructura de carpetas sin revisar que la compilación siga funcionando.
- ✅ Usa `tcolorbox` para sugerencias o notas visuales.

---

## 👥 Autores

Grupo 2 — Curso de Automatización y Control de Software

- Diego Salazar García  
- Giovanni Arias Chumpitaz  
- Luis Arroyo Vásquez  
- Jean Lavaud Guevara

---

## 📅 Año

Lima, Perú — 2025
