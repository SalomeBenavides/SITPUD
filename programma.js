var map = L.map('map').setView([4.6130845568829235, -74.15656299018546], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([4.6130845568829235, -74.15656299018546]).addTo(map);
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa Leaflet con Paraderos SITP</title>
    
    <!-- Incluir Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <!-- Estilos básicos para el mapa -->
    <style>
        #map {
            height: 500px;
            width: 100%;
            border: 2px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>Paraderos SITP</h1>
    <p>Mapa que muestra los paraderos del Sistema Integrado de Transporte Público</p>
    
    <!-- Contenedor para el mapa -->
    <div id="map"></div>

    <!-- Incluir Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <script>
        // Función para cargar y mostrar el archivo GeoJSON de paraderos SITP
        function cargarGeoJSONParaderos(urlArchivo, map) {
            /*
            PARÁMETROS:
            - urlArchivo: Ruta del archivo GeoJSON (paraderos-sitp.geojson)
            - map: El objeto del mapa Leaflet donde se mostrarán los datos
            
            FUNCIONAMIENTO:
            1. Busca el archivo GeoJSON usando fetch
            2. Convierte los datos a formato JSON
            3. Crea una capa en el mapa con los datos
            4. Ajusta el mapa para mostrar todos los paraderos
            */
            
            console.log('Cargando paraderos SITP...');
            
            // Hacer una solicitud para obtener el archivo
            fetch(urlArchivo)
                .then(response => {
                    // Verificar si la respuesta es exitosa
                    if (!response.ok) {
                        throw new Error('No se pudo cargar el archivo de paraderos');
                    }
                    return response.json(); // Convertir a JSON
                })
                .then(datosParaderos => {
                    // Crear una capa Leaflet con los datos GeoJSON
                    const capaParaderos = L.geoJSON(datosParaderos, {
                        // Estilo para los puntos de los paraderos
                        pointToLayer: function(feature, latlng) {
                            // Crear marcadores circulares para los paraderos
                            return L.circleMarker(latlng, {
                                radius: 6,               // Tamaño del círculo
                                fillColor: "#ff7800",    // Color naranja
                                color: "#000",           // Borde negro
                                weight: 1,               // Grosor del borde
                                opacity: 1,              // Transparencia del borde
                                fillOpacity: 0.8         // Transparencia del relleno
                            });
                        },
                        
                        // Función que se ejecuta para cada paradero
                        onEachFeature: function(feature, layer) {
                            // Mostrar información del paradero al hacer clic
                            if (feature.properties) {
                                // Crear texto con la información del paradero
                                let info = '<b>Paradero SITP</b><br>';
                                
                                // Mostrar todas las propiedades disponibles
                                for (let propiedad in feature.properties) {
                                    info += `<b>${propiedad}:</b> ${feature.properties[propiedad]}<br>`;
                                }
                                
                                // Asignar el texto al popup
                                layer.bindPopup(info);
                            }
                        }
                    });
                    
                    // Añadir la capa de paraderos al mapa
                    capaParaderos.addTo(map);
                    
                    // Ajustar el mapa para mostrar todos los paraderos
                    map.fitBounds(capaParaderos.getBounds());
                    
                    console.log('Paraderos SITP cargados exitosamente!');
                    console.log('Número de paraderos:', datosParaderos.features.length);
                })
                .catch(error => {
                    // Manejar errores
                    console.error('Error al cargar los paraderos:', error);
                    alert('Error: ' + error.message);
                });
        }

        // INSTRUCCIONES DE USO:
        
        // 1. Función para inicializar el mapa
        function inicializarMapa() {
            // Crear el mapa centrado en Bogotá (ajusta estas coordenadas si es necesario)
            const map = L.map('map').setView([4.7109, -74.0721], 12);
            
            // Añadir capa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            return map;
        }
        
        // 2. Cuando la página cargue, inicializar y cargar los datos
        document.addEventListener('DOMContentLoaded', function() {
            // Crear el mapa
            const map = inicializarMapa();
            
            // Cargar el archivo GeoJSON de paraderos SITP
            // IMPORTANTE: El archivo debe estar en la misma carpeta que este HTML
            // o debes especificar la ruta correcta
            cargarGeoJSONParaderos('paraderos-sitp.geojson', map);
        });

    </script>
</body>
</html>