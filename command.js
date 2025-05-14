import sharp from "sharp";
import axios from 'axios'

const compressImage = async (imageUrl, saveAs) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        await sharp(response.data)
            .jpeg({ quality: 60 })
            .toFile(saveAs);

        return saveAs;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default compressImage;
