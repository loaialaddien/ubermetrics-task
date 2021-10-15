import axios from 'axios'

export function search(query:string){
    return axios.get(`https://images-api.nasa.gov/search?q=${query}`);
}

export function getAssetMetadata(assetId:string){
    return axios.get(`https://images-api.nasa.gov/image/${assetId}/metadata.json`);
}