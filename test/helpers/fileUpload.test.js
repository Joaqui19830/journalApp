import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";


cloudinary.config({
    cloud_name: 'dyecmnmdg',
    api_key: '777922534634597',
    api_secret: 'EizGGpOKWy0nnuG8_F6TpgRI2Ec',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://acdn.mitiendanube.com/stores/001/880/465/products/joystick-ps5-sony-dualsense-galactic-purple-21-55ce47a76836cf69df16905693197984-640-0.jpg'
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        // console.log(url);
        expect(typeof url).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        // console.log(segments);
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        // console.log({imageId});
        const cloudResp = await cloudinary.api.delete_resources('journal/' + [imageId], {
            resource_type: 'image'
        });
        // console.log({cloudResp}); 
    });

    test('debe de retorar null', async () => {

        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        // console.log(url);
        expect(url).toBe(null);

    })

})  