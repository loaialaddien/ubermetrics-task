import Asset,{ AssetType } from '../components/asset/asset';
import { Input, } from 'antd';
import useAssets from '../customHooks/useAssets';
const { Search } = Input;

// area for improvement, we can use a customhook here, useAssets
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
    const {assets,error,fetchAssets,loading} = useAssets()
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
