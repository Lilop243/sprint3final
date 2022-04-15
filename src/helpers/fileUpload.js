export const fileUpload = async (file) => {
    // Para saber como obtener esta direccion revisar el archivo README
    const cloudUrl = 'https://api.cloudinary.com/v1_1/lilopez7/upload'
    // El nombre del preset viene del que usted le puso en la configuracion de cloudinary
    const presetName = 'lopez0102'

    // Este crea un objeto que luego se le enviara como parametro en la peticion
    const formData = new FormData();
    formData.append('upload_preset', presetName);
    formData.append('file', file);

    // Se hace la peticion al servidor de cloudinary

    const resp = await fetch(cloudUrl, {
        method: 'POST',
        body: formData
    })
    const cloudResp = await resp.json();
    // Retorna la url que tendra la imagen en cloudinary
    return cloudResp.secure_url;
}
