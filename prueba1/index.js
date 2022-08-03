const axios = require('axios');

let consumirApi = async () => {
    try {
        const instance = axios.create({
            baseURL: `https://jsonplaceholder.typicode.com/`
        });

        const resp = await instance.get(`posts/1/comments`);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
}

consumirApi();