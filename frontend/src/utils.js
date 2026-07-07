import { toast } from 'react-toastify'

const handleSuccess = (msg) => {
    toast.success(msg, { position: 'top-right' });
}

const handleError = (msg) => {
    toast.error(msg, { position: 'top-right' })
}

const songFromApi = async (query, limit) => {
    try {
        let cacheKey = `songs${query}_${limit}`;
        let cacheExpireTime = 1000 * 60 * 5;

        let cacheData = sessionStorage.getItem(cacheKey);

        //getting data from cache
        if (cacheData) {
            let currentTime = new Date().getTime();
            let parsedCache = JSON.parse(cacheData);

            if ((currentTime - parsedCache.timestamp) < cacheExpireTime) {
                console.log('data got from cache');
                return parsedCache.data;
            } else {
                console.log("item removed");
                sessionStorage.removeItem(cacheKey);
            }
        }


        let fetchData = await fetch(`https://saavn.sumit.co/api/search/songs?query=${query}&limit=${limit}`, { method: 'GET' });
        let result = await fetchData?.json();
        console.log(result?.data);

        let cachedDataToSave = {
            data: result.data.results,
            timestamp: new Date().getTime()
        }

        sessionStorage.setItem(cacheKey, JSON.stringify(cachedDataToSave));

        return result.data.results;
    } catch (err) {
        console.log("error", err);
        return;
    }
}

export { handleSuccess, handleError, songFromApi };