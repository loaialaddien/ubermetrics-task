import React,{useEffect, useState} from 'react'
import { search } from '../apis/imagesApi'
import Asset,{ AssetType } from '../components/asset/asset';
import { Input, } from 'antd';
const { Search } = Input;
const contentBasedOnState= ({error,loading,assets}:{error:Boolean,loading:Boolean,assets:Array<AssetType>})=>{
    if(error) return "error please try again";
    if(loading) return "loading";
    if(assets.length === 0) return "no data";
    return assets.map((asset:AssetType)=>{
        const id = asset.data[0].nasa_id;
        return <Asset key={id} asset={asset}></Asset>
    })
}
export default function Assets() {
    const [assets,setAssets] = useState<AssetType[]>([]);
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const fetchAssets = async (query="milkyway")=>{
        if(error) setError(false);
        setLoading(true);
        search(query).then(({data}:any)=>{
            // no need for limiting the list  since I don't do any more requests
            const onlyDataWithImages = (data as any)?.collection?.items.filter(showImageType)
            setAssets(onlyDataWithImages);
        }).catch(err=>setError(true))
        .finally(()=>setLoading(false));

    }
    useEffect(()=>{
        fetchAssets();
    },[])

    return (
        <div>
            <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100}}>
            <Search
            defaultValue="milkyway"
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={fetchAssets}
            />
            </div>
            <div style={{marginTop:50}}>
            {
                contentBasedOnState({error,assets,loading})
            }
            </div>
        </div>
    )
}
function showImageType(e: AssetType){
        const { data } = e;
        const asset = data[0];
        return asset.media_type === "image";
}

