import { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
    EditorState,
    convertToRaw,
    ContentState
} from 'draft-js';
import React from 'react'
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import '../css/App.css';
import { API_URL } from '../constants/constants'
import logoback from '../images/logoback.png';
import { Link } from 'react-router-dom';


const EditorQTang = () => {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    const EditorStateChange = (text) => {
        seteditorState(text);
    }
    useEffect(() => {
        LayTieuDe();
    }, []);
    const LayTieuDe = async () => {
        await fetch(API_URL + "/layTieuDe", {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data[0].title != null) {
                    const blocksFromHtml = htmlToDraft(data[0].title);
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    let editorState1 = EditorState.createWithContent(contentState);
                    seteditorState(editorState1);
                }

            })

    };
    const CapNhatMoTa = async () => {
        await fetch(API_URL + '/suaTieuDe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            })
        })
        alert("Cập nhật thành công !");
    }
    async function uploadImageCallBack(file) {
        const data = new FormData();
        var Name = Math.floor(Math.random() * 1000000000);
        var LinkImage;
        data.append('imagehddevice', file);
        
        await fetch(
            API_URL + "/uploadimghddevice/" + Name,
            {
                method: 'POST',
                body: data,
                headers: {

                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                // resolve(result)
                LinkImage = result;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        return new Promise(
            (resolve) => {
                resolve({ data: { link: LinkImage } });
            }
        );
    }
    
    return (
        <div>
            <Link to={{ pathname: '/ThongKe2', state: { type: 11 } }}
                className="no-print" type="button" style={{  textTransform: 'capitalize', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, display: 'flex', fontSize: 21, alignSelf: 'center', position: 'fixed', top: 5 }}>
                <img className="no-print" src={logoback} style={{ width: 30, height: 30 }} />
                <div className="no-print">
                    <b className="no-print" style={{ marginBottom: 5 }} >Trở về</b>
                </div>
            </Link>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '80%', margin: 'auto', backgroundColor: 'white' }}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={EditorStateChange}
                        toolbar={{
                            image: { previewImage: true, uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                        }}
                    />
                     <textarea
          disabled
          style={{ width: '100%',height: 500}}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
                    <button className="btn_edit_decription" onClick={() => { CapNhatMoTa() }}>Cập nhật mô tả</button>
                </div>
            </div>
           
            {/* <div>
                <label><b>Link hình Title</b></label><br></br>
                <input
                    className="ip_tenhang"
                    type="text"
                    value={url}
                    onChange={text => { setUrl(text.target.value) }}
                    placeholder="">
                </input>
            </div>
            <div >
                <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                <button className="btn-thongke1" onClick={handleSubmission}>Submit</button>
            </div> */}
        </div>

    );
};
export default EditorQTang;