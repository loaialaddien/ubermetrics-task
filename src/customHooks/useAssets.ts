import {useEffect, useState,useCallback} from 'react'
import { AssetType } from '../components/asset/asset';
import { search } from '../apis/imagesApi'

function showImageType(e: AssetType){
    const { data } = e;
    const asset = data[0];
    return asset.media_type === "image";
}

export default function useAssets(){
    const [assets,setAssets] = useState<AssetType[]>([]);
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const fetchAssets = useCallback(async (query="milkyway")=>{
        if(error) setError(false);
        setLoading(true);
        search(query).then(({data}:any)=>{
            // no need for limiting the list  since I don't do any more requests
            const onlyDataWithImages = (data as any)?.collection?.items.filter(showImageType)
            setAssets(onlyDataWithImages);
        }).catch(err=>setError(true))
        .finally(()=>setLoading(false));
    
    },[error])
    useEffect(()=>{
        fetchAssets();
    },[fetchAssets])
    return {
        fetchAssets,
        loading,
        assets,
        error,
    }

}
