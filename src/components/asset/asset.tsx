import React,{useState} from 'react';
import { Card,Modal,Button} from 'antd';

interface Link {
    rel:string
    href:string
    render:string
}
interface MetaData{
    title:string
    description:string
    nasa_id:string
    keywords:Array<string>
    media_type:string
}
export interface AssetType {
    links:Array<Link>
    data:Array<MetaData>
    href:string
}

export default function Asset({asset}:{asset:AssetType}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {data=[],links=[]} = asset;
    const {description,title,keywords} = data[0] || {};
    const {href} = links[0] || {};
    const trimmedTitle = title.length > 40 ? title.slice(0,40).concat(" ..."): title;

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <>
            <Card hoverable title={trimmedTitle}>
                <div>
                <img style={{borderRadius:10}} alt={trimmedTitle} src={href}></img>
                </div>
                <Button style={{marginTop:10}} type="primary" onClick={showModal}>
                     More Info
                </Button>
            </Card>
            <Modal 
            title={trimmedTitle} 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}>
                <h1>{title}</h1>
                <p dangerouslySetInnerHTML={{__html:description}}></p>
                <p>keywords: {(keywords || []).join(", ")}</p>
            </Modal>
        </>
    )
}
