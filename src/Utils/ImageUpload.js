import axios from 'axios';

// Image upload
export const imageUpload = async image => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${'56fbae49c7a4e3f19f41a70f70380727'}`,
        formData
    );
    return data.data.display_url;
};