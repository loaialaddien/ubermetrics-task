import React,{useEffect, useState} from 'react'
import { search } from '../apis/imagesApi'
import Asset,{ AssetType } from '../components/asset/asset';
import { Input, } from 'antd';
const { Search } = Input;
export default function Assets() {
    const [assets,setAssets] = useState<AssetType[]>([]);
    const fetchAssets = async (query="milkyway")=>{
        const {data} = await search(query);
        const onlyDataWithImages = (data as any)?.collection?.items.filter(showImageType)
        setAssets(onlyDataWithImages);

    }
    useEffect(()=>{
        fetchAssets();
    },[])
    return (
        <div>
            <Search
            defaultValue="milkyway"
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={fetchAssets}
            />
            {assets.map((asset:AssetType)=>{
                const id = asset.data[0].nasa_id;
                return <Asset key={id} asset={asset}></Asset>
            })}
        </div>
    )
}
function showImageType(e: AssetType){
        const { data } = e;
        const asset = data[0];
        return asset.media_type === "image";
}

