# 🌍 CountryApp

## ✨ Explora el mundo, un país a la vez

**CountryApp** es una aplicación web interactiva y educativa que te permite descubrir información detallada de todos los países del mundo. Busca por nombre, capital o región y accede a datos actualizados sobre población, área, banderas, capitales y mucho más.

Además, para cada país puedes consultar un **resumen de Wikipedia** integrado, lo que enriquece la experiencia de aprendizaje y exploración.

---

## 🚀 Características principales

- 🔎 **Búsqueda avanzada:** Encuentra países por nombre, capital o región.
- 🗺️ **Información completa:** Visualiza datos clave como población, área, bandera, continente y capital.
- 📚 **Resumen de Wikipedia:** Consulta una breve descripción de cada país extraída directamente de Wikipedia.
- ⚡ **Interfaz moderna:** Diseño responsivo, atractivo y fácil de usar (Tailwind CSS + DaisyUI).
- 🧭 **Navegación intuitiva:** Acceso rápido a todas las secciones desde el menú principal.
- 🏆 **Aprendizaje interactivo:** Ideal para estudiantes, docentes y curiosos de la geografía.

---

## 📸 Vista previa

<div align="center">
  <img src="public/aplciacion ciberseguridad.png" alt="Vista previa CountryApp" width="600" style="border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.15);" />
</div>

---

## 🛠️ Tecnologías utilizadas

- [Angular 19+ Standalone](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- [REST Countries API](https://restcountries.com/)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)

---

## ⚙️ Instalación y ejecución

```bash
# Clona el repositorio
git clone
cd country-app

# Instala las dependencias
npm install

# Ejecuta la aplicación en modo desarrollo
npm start
```

Abre [http://localhost:4200](http://localhost:4200) en tu navegador para ver la app.

---

## 📁 Estructura del proyecto

```
country-app/
│
├── public/                        # Imágenes y archivos estáticos
│     ├── Fondo Country_app.jpg
│     ├── aplciacion ciberseguridad.png
│     └── ...
│
└── src/
    ├── app/
    │   ├── country/               # Funcionalidad principal de países
    │   │   ├── components/
    │   │   ├── interfaces/
    │   │   ├── layouts/
    │   │   ├── mappers/
    │   │   ├── pages/
    │   │   └── services/
    │   └── shared/
    │       ├── components/
    │       ├── pages/
    │       ├── simpleWiki.ts
    │       ├── Wiki-pedia.service.ts
    │       └── wikiResponse.ts
    ├── styles.css
    └── main.ts
```

---

## 🧩 Arquitectura y conceptos destacados

- **Angular Standalone Components:** Sin NgModules, componentes importados directamente.
- **Signals y RxJS:** Reactividad moderna y manejo eficiente de datos asíncronos.
- **Inyección de dependencias con `inject()`:** Código más limpio y flexible.
- **Routing avanzado:** Lazy loading, rutas anidadas y navegación programática.
- **Consumo de APIs externas:** REST Countries y Wikipedia.
- **Caché en memoria:** Para búsquedas rápidas y menor consumo de red.
- **Estilos modernos:** Tailwind CSS y DaisyUI para una UI atractiva y responsiva.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!  
Si tienes ideas, mejoras o encuentras bugs, abre un issue o haz un pull request.

---

## 📝 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

<div align="center">
  <b>Hecho con ❤️ por entusiastas de la geografía y la tecnología.</b>
</div>
