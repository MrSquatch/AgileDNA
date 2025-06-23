## ⚙️ Requisitos previos

### 🧠 TL;DR (configuración recomendada y probada)

La configuración que estamos usando y ha funcionado correctamente en **Windows 10** es:

- **Editor**: Visual Studio Code
- **Distribución LaTeX**: MiKTeX
- **Extensión**: LaTeX Workshop para VSCode
- **Compilador**: `latexmk` + `biber`
- **Complemento necesario**: Strawberry Perl (solo si usas `latexmk` y tu sistema no incluye Perl)

Puedes usar otras configuraciones si lo deseas, pero esta es la que hemos probado y documentado.

---

### 🛠️ ¿Qué necesitas tener instalado?

Antes de compilar este documento, asegúrate de contar con las siguientes herramientas instaladas en tu sistema:

---

### 1. ✅ **Compilador LaTeX**

Necesitas tener instalado un sistema de compilación de LaTeX. Las opciones más comunes son:

- **Windows:** [MiKTeX](https://miktex.org/)
- **Linux:** [TeX Live](https://tug.org/texlive/) (se recomienda instalar con el gestor de paquetes o instalador oficial)
- **macOS:** [MacTeX](https://tug.org/mactex/)

🔸 *En MiKTeX, los paquetes se instalan automáticamente al compilar, pero es posible que se te pida permiso la primera vez.*

---

### 2. ✅ **Biber** (para bibliografía APA 7)

El proyecto usa `biblatex` con `biber` como backend. En algunos casos, **Biber debe instalarse manualmente**:

- **MiKTeX:** normalmente viene preinstalado, pero si no, puedes instalarlo desde el "MiKTeX Console".
- **TeX Live:** se instala por defecto si instalaste el paquete completo (`texlive-full`). Si no lo tienes, instálalo con tu gestor de paquetes:

  ```bash
  sudo apt install biber
  ```

- **Verifica que está instalado** ejecutando en terminal:

  ```bash
  biber --version
  ```

---

### 3. ⚠️ **Perl**

Si decides usar `latexmk`, necesitas tener **Perl** instalado en tu sistema, ya que `latexmk` está escrito en Perl.

- En Windows (especialmente con MiKTeX), Perl **no viene incluido**, por lo que debes instalarlo manualmente.
- Se recomienda [Strawberry Perl](https://strawberryperl.com/) para usuarios de Windows.
- En sistemas Linux y macOS, Perl suele estar preinstalado, pero puedes verificarlo con:

  ```bash
  perl -v
  ```

Si no ves una versión, probablemente necesitas instalarlo manualmente.

📌 **Nota:** Si usas otro método de compilación distinto a `latexmk`, puede que Perl no sea necesario.

---

### 4. ✅ **Editor de texto recomendado**

Puedes usar cualquier editor, pero recomendamos:

- **VSCode** con la extensión **LaTeX Workshop**
  - Permite compilar fácilmente con `Ctrl + Alt + B`
  - Muestra errores y previsualiza el PDF

Alternativas: TeXstudio, Texmaker, Sublime Text + plugin LaTeXTools, entre otros.

---

## 📦 Cómo compilar el proyecto

Este proyecto usa `biblatex` con estilo APA 7 y backend `biber`. Se recomienda compilar con `latexmk`.

---

### Opción 1: Usando línea de comandos

```bash
latexmk -pdf -bibtex main.tex
```

⚠️ *Si usas `biblatex`, es necesario que `biber` esté correctamente instalado.*

---

### Opción 2: Usando VSCode

1. Instala la extensión **LaTeX Workshop**
2. Abre el archivo `main.tex`
3. Usa `Ctrl + Alt + B` o selecciona la receta `latexmk` desde la paleta de comandos (`Ctrl + Shift + P` → "Run Build Recipe")

Verifica en tu configuración de VSCode que se esté usando `biber` como backend si trabajas con `biblatex`.

---

📁 Recuerda mantener la estructura de carpetas organizada:
- `secciones/`: contiene cada parte del informe (`.tex`)
- `imagenes/`: recursos gráficos
- `referencias/`: archivo `.bib` con la bibliografía
- `styles/`: archivos de configuración personalizados (`.sty`)
