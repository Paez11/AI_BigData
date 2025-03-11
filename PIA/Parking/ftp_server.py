from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import os
import shutil
from PIL import Image

# Carpeta donde se almacenarán las imágenes enviadas por la cámara
UPLOAD_FOLDER = 'capturas'
PROCESSED_FOLDER = 'procesadas'  # Carpeta para almacenar imágenes procesadas
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Configurar el autorizador para permitir un usuario con permisos completos
authorizer = DummyAuthorizer()
authorizer.add_user("admin", "IESgc14@", UPLOAD_FOLDER, perm="elradfmw")  # Permisos completos

# Configurar el manejador FTP
handler = FTPHandler
handler.authorizer = authorizer

# Función que se ejecuta cada vez que se recibe un archivo
def on_file_received(handler):
    print(f"Archivo recibido: {handler.filename}")
    
    # Procesamiento de la imagen
    filepath = handler.filename
    processed_filepath = os.path.join(PROCESSED_FOLDER, os.path.basename(filepath))
    
    try:
        # Abrir la imagen
        img = Image.open(filepath)
        
        # Aquí podrías realizar algún tipo de procesamiento sobre la imagen
        # Ejemplo: convertir la imagen a escala de grises
        img = img.convert("L")  # Convierte la imagen a blanco y negro (escala de grises)
        
        # Guardar la imagen procesada
        img.save(processed_filepath)
        print(f"Imagen procesada y guardada en: {processed_filepath}")
        
        # Mover la imagen original a la carpeta procesadas (si es necesario)
        shutil.move(filepath, processed_filepath)
        
    except Exception as e:
        print(f"Error procesando la imagen {handler.filename}: {e}")

handler.on_file_received = on_file_received

# Iniciar el servidor FTP en el puerto 2121 (puerto alto para no requerir permisos de administrador)
server = FTPServer(("0.0.0.0", 2121), handler)
print(f"Servidor FTP corriendo en el puerto 2121...")
server.serve_forever()