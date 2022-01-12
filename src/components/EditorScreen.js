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
import { Link } from 'react-router-dom';
import logoback from '../images/logoback.png';
const EditorScreen = (props) => {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    const EditorStateChange = (text) => {
        seteditorState(text);
    }
    useEffect(() => {
        LayMotTa();
    }, []);
    const LayMotTa = async () => {
        await fetch(API_URL + "/ChiTietSanPham/" + props.location.item.mahang, {
            headers: {

            }
        })
            .then(response => response.json())
            .then(data => {
                // let blocksFromHTML = convertFromHTML(data.MoTa);
                // const state = ContentState.createFromBlockArray(
                //     blocksFromHTML.contentBlocks,
                //     blocksFromHTML.entityMap,
                // );
                if (data.MoTa != null) {
                    const blocksFromHtml = htmlToDraft(data.MoTa);
                    const { contentBlocks, entityMap } = blocksFromHtml;
                    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                    let editorState1 = EditorState.createWithContent(contentState);
                    seteditorState(editorState1);
                }
            })
    };
    const CapNhatMoTa = () => {
        var CapNhat = { mota: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
        fetch(API_URL + '/suasanpham', {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sermangitem: CapNhat,
                sermahang: props.location.item.mahang
            })
        })
        alert("Cập nhật mô tả thành công !");
    }
    async function uploadImageCallBack(file) {
        const data = new FormData();
        var Name = Math.floor(Math.random() * 1000000000);
        var LinkImage ;
        data.append('imagehddevice', file);
        console.log(data)
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
            <Link to={{ pathname: '/ThongKe2' }}
                className="no-print" type="button" style={{ textTransform: 'capitalize', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, display: 'flex', fontSize: 21, alignSelf: 'center', position: 'fixed', top: 5 }}>
                <img className="no-print" src={logoback} style={{ width: 30, height: 30 }} />
                <div className="no-print">
                    <b className="no-print" style={{ marginBottom: 5 }} >Trở về</b>
                </div>
            </Link>
            <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>Mã hàng : <b style={{ color: 'red' }}>{props.location.item.mahang}</b></div>
                <div>Tên hàng : <b style={{ color: 'red' }}>{props.location.item.tenhang}</b></div>
            </div>

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
                {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}

                {/* DUNG` XOA' CAI NAY` */}
                {/* <div className="testeditor" style={{ width: '50%', backgroundColor: 'lightgrey' , padding:10 }}>
                <Markup content={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />

            </div> */}
            </div>
        </div>

    );
};
export default EditorScreen;