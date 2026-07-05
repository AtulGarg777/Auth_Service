import { toast } from 'react-toastify'

const handleSuccess = (msg) => {
    toast.success(msg, { position: 'top-right' });
}

const handleError = (msg) => {
    toast.error(msg, { position: 'top-right' })
}

const songFromApi = async (query, limit) => {
    try {
        let fetchData = await fetch(`https://saavn.sumit.co/api/search/songs?query=${query}&limit=${limit}`, { method: 'GET' });
        let result = await fetchData?.json();
        console.log(result?.data);

        return result.data.results;
    } catch (err) {
        console.log("error", err);
        return;
    }
}

export { handleSuccess, handleError, songFromApi };