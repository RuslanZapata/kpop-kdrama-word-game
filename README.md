# Juego de Palabras K-Pop & K-Drama 🎤📺

Un juego interactivo y divertido de adivinanza de palabras enfocado en la cultura pop coreana, desarrollado con React Native y Expo. ¡Pon a prueba tu conocimiento sobre ídolos de K-Pop, grupos, canciones, K-Dramas y más!

## 🌟 Características

### Modos de Juego
- **Un Jugador**: Juega solo y desafíate a ti mismo
- **Multijugador**: Toma turnos con amigos y familia
- **Selección de Categorías**: Elige entre 7 categorías diferentes o juega con todas las categorías mezcladas

### Categorías
- 🎤 **Ídolos K-Pop**: Artistas solistas famosos y miembros de grupos
- 👥 **Grupos K-Pop**: Grupos masculinos y femeninos populares
- 🎵 **Canciones Exitosas**: Tracks de K-Pop que encabezaron las listas
- 📺 **K-Dramas**: Series de drama coreanas populares
- 🎭 **Personajes de Dramas**: Personajes memorables de K-Dramas
- 💬 **Frases Famosas**: Líneas icónicas de canciones y dramas
- 🗼 **Lugares Icónicos**: Ubicaciones coreanas famosas y sitios culturales

### Configuraciones Personalizables
- **Temporizador de Ronda**: Elige entre 30, 45, 60 segundos o establece tiempo personalizado (10-300 segundos)
- **Cantidad de Tarjetas**: Selecciona 5, 10, 15, 20 tarjetas, tarjetas ilimitadas, o cantidad personalizada (3-50)
- **Efectos de Sonido**: Activa/desactiva efectos de sonido para respuestas correctas y saltos
- **Historial de Juegos**: Rastrea tus últimos 5 juegos con estadísticas detalladas

### Características del Juego
- Hermosas transiciones animadas de tarjetas
- Seguimiento de puntuación en tiempo real
- Análisis detallado de rendimiento
- Estadísticas de precisión y progreso
- Retroalimentación sonora para acciones
- Diseño responsivo para todos los tamaños de pantalla

## 🚀 Comenzando

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI

### Instalación

1. Clona el repositorio:
```bash
git clone git@github.com:RuslanZapata/kpop-kdrama-word-game.git
cd kpop-kdrama-word-game
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre la aplicación:
   - Escanea el código QR con la app Expo Go en tu dispositivo móvil
   - Presiona `w` para abrir en el navegador web
   - Presiona `i` para abrir el simulador de iOS
   - Presiona `a` para abrir el emulador de Android

## 📱 Cómo Jugar

1. **Selecciona Categoría**: Elige una categoría específica o juega con todas las categorías
2. **Agrega Jugadores**: Ingresa los nombres de los jugadores (individual o multijugador)
3. **Configura Ajustes**: Establece tu límite de tiempo preferido y cantidad de tarjetas
4. **Comienza a Jugar**: 
   - Muestra el teléfono a otros jugadores
   - Adivina la palabra en la tarjeta
   - Toca "¡Correcto!" para respuestas correctas
   - Toca "Pasar" para saltar palabras difíciles
5. **Ver Resultados**: Ve estadísticas detalladas y precisión después de cada ronda

## 🎯 Reglas del Juego

- Los jugadores se turnan para adivinar palabras dentro del límite de tiempo
- Gana puntos por cada respuesta correcta
- Las palabras saltadas no cuentan para tu puntuación pero se rastrean por separado
- El juego termina cuando se acaba el tiempo o se completan todas las tarjetas
- Ve estadísticas detalladas incluyendo porcentajes de precisión y progreso

## 🛠️ Stack Tecnológico

### Frontend
- **React Native**: Desarrollo móvil multiplataforma
- **Expo**: Plataforma de desarrollo y herramientas
- **Expo Router**: Sistema de enrutamiento basado en archivos
- **TypeScript**: JavaScript con tipado seguro

### UI/UX
- **Expo Linear Gradient**: Hermosos fondos degradados
- **Lucide React Native**: Biblioteca de iconos moderna
- **Animaciones Personalizadas**: Transiciones suaves y micro-interacciones
- **Diseño Responsivo**: Optimizado para todos los tamaños de pantalla

### Gestión de Datos
- **AsyncStorage**: Persistencia de datos local
- **Archivos de Datos JSON**: Almacenamiento de contenido del juego
- **Hooks Personalizados**: Gestión de estado reutilizable

### Audio
- **Expo AV**: Efectos de sonido y gestión de audio

## 📁 Estructura del Proyecto

```
├── app/                      # Rutas de la app (Expo Router)
│   ├── (tabs)/               # Navegación por pestañas
│   │   ├── index.tsx         # Pantalla de inicio
│   │   ├── history.tsx       # Historial de juegos
│   │   └── settings.tsx      # Pantalla de configuración
│   ├── _layout.tsx           # Layout raíz
│   ├── game.tsx              # Ruta del juego
│   └── players.tsx           # Configuración de jugadores
├── components/               # Componentes reutilizables
│   ├── Button.tsx            # Componente de botón personalizado
│   ├── CategoryCard.tsx      # Tarjeta de selección de categoría
│   ├── GameCard.tsx          # Tarjeta de visualización de palabras
│   ├── GameControls.tsx      # Botones de acción del juego
│   ├── ResultsSummary.tsx    # Visualización de resultados
│   ├── ScoreCounter.tsx      # Seguimiento de puntuación
│   └── Timer.tsx             # Temporizador del juego
├── constants/                # Constantes de la app
│   └── theme.ts              # Colores, fuentes, tamaños
├── data/                     # Datos del juego
│   ├── categories.ts         # Gestión de categorías
│   └── *.json                # Archivos de datos de palabras
├── hooks/                    # Hooks personalizados de React
│   ├── useFrameworkReady.ts
│   ├── useGameHistory.ts
│   └── useGameSettings.ts
└── screens/                  # Componentes de pantalla
    └── GameScreen.tsx        # Pantalla principal del juego
```

## 🎨 Sistema de Diseño

### Colores
- **Primario**: Rosa Neón (#FF0099)
- **Secundario**: Púrpura Brillante (#8A2BE2)
- **Acento**: Azul Eléctrico (#00BFFF)
- **Éxito**: Verde (#4CD964)
- **Advertencia**: Amarillo (#FFCC00)
- **Error**: Rojo (#FF3B30)

### Tipografía
- **Familia de Fuente**: Poppins (Regular, Medium, Bold)
- **Tamaño Responsivo**: Escala de 10px - 30px

### Espaciado
- **Sistema de Cuadrícula de 8px**: Espaciado consistente en toda la aplicación
- **Radio de Borde**: Opciones de 4px, 8px, 16px, 24px

## 🔧 Configuración

### Configuraciones del Juego
Todas las configuraciones del juego se persisten localmente e incluyen:

- **Tiempo de Ronda**: 30-300 segundos
- **Cantidad de Tarjetas**: 3-50 tarjetas o ilimitadas
- **Efectos de Sonido**: Habilitar/deshabilitar retroalimentación de audio

### Estructura de Datos
Los datos del juego están organizados en archivos JSON con niveles de dificultad:
- `easy`: Elementos bien conocidos
- `medium`: Elementos moderadamente conocidos  
- `hard`: Elementos desafiantes o de nicho

## 📊 Análisis e Historial

La aplicación rastrea:
- Resultados y puntuaciones de juegos
- Estadísticas de rendimiento de jugadores
- Porcentajes de precisión
- Palabras intentadas vs. completadas
- Preferencias de modo de juego

## 🌐 Soporte de Plataformas

- **iOS**: Soporte nativo completo
- **Android**: Soporte nativo completo
- **Web**: Compatibilidad web completa
- **Responsivo**: Se adapta a todos los tamaños de pantalla

## 🔄 Gestión de Estado

### Hooks Personalizados
- `useGameSettings`: Gestiona la configuración del juego
- `useGameHistory`: Maneja la persistencia de resultados del juego
- `useFrameworkReady`: Inicialización del framework

### Almacenamiento Local
- Persistencia de configuraciones del juego
- Seguimiento de historial (últimos 50 juegos)
- Preferencias del usuario

## 🎵 Sistema de Audio

- Efectos de sonido para respuestas correctas
- Retroalimentación de audio para tarjetas saltadas
- Control de volumen a través de configuraciones
- Implementación de audio compatible con web

## 🚀 Despliegue

### Despliegue Web
```bash
npm run build:web
```

### Tienda de Aplicaciones Móviles
1. Crear build de producción con EAS Build
2. Enviar a App Store/Play Store
3. Configurar firma de aplicación y metadatos

## 🤝 Contribuyendo

1. Haz fork del repositorio
2. Crea una rama de característica
3. Realiza tus cambios
4. Agrega pruebas si es aplicable
5. Envía un pull request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## 🙏 Reconocimientos

- Comunidades de K-Pop y K-Drama por la inspiración
- Equipo de Expo por la increíble plataforma de desarrollo
- Comunidad de React Native por la innovación continua

## 📞 Soporte

Para soporte, preguntas o solicitudes de características:
- Crea un issue en GitHub
- Contacta al equipo de desarrollo
- Consulta la documentación

---

**¡Hecho con ❤️ para fanáticos de K-Pop y K-Drama en todo el mundo!**