import { useEffect, useState, useRef } from 'react';
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
import Resizer from "react-image-file-resizer"
import { Grid, Box, TextField } from "@mui/material";

//let count =Math.floor(Math.random() * 1000000000);
//let count=1;
let Name = ""
const EditorArticles = () => {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const [altThumbnail, setAltThumbnail] = useState('')
    const [canonicalTag, setCanonicalTag] = useState('')
    const [metaDescription, setMetaDescription] = useState('')

    const EditorStateChange = (text) => {
        seteditorState(text);
    }
    useEffect(() => {
        Name = title
    }, [title]);
    // const LayTieuDe = async () => {
    //     await fetch(API_URL + "/layTieuDe", {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',

    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data[0].title != null) {
    //                 const blocksFromHtml = htmlToDraft(data[0].title);
    //                 const { contentBlocks, entityMap } = blocksFromHtml;
    //                 const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //                 let editorState1 = EditorState.createWithContent(contentState);
    //                 seteditorState(editorState1);
    //             }

    //         })

    // };

    //////////code thêm hình trường

    const [chooseImageOne, setChooseImageOne] = useState()
    const [previewImageOne, setPreviewImageOne] = useState()
    const imageRefOne = useRef(null)
    const [imageTempOne, setImageTempOne] = useState()

    const funcChooseFileOne = (event) => {
        const file = event.target.files[0]
        if (file != undefined) {
            if (file.size > 5242880) { // file lớn hơn 5MB
                // alert(`File phải nhỏ hơn 5MB`)
                alert('File phải nhỏ hơn 5MB.')
                // setBoolDialogWarning(true)
                setImageTempOne(null)
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                reader.addEventListener('load', () => setImageTempOne(reader.result))
                setTimeout(() => {
                    // reader.readAsDataURL(event.target.files[0])
                    // reader.addEventListener('load', () => setImageTempOne(reader.result))
                    setImageTempOne(reader.result)
                    resizeFileOne(event.target.files[0])
                }, 40);
            }
        }
    }

    const uploadImageOne = async () => {
        if (chooseImageOne != undefined) {
            const formData = new FormData()
            formData.append('imagethumbnail', chooseImageOne);

            await fetch(
                API_URL + "/uploadimgthumbnail/" + title + "/" + author,
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    alert(result)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }

    const resizeFileOne = (file) =>
        new Promise((resolve) => {
            const width = imageRefOne.current.width
            const height = imageRefOne.current.height
            const val = 1280
            let widthLow = 0
            let heightLow = 0
            if (width >= height) {
                if (width > val) {
                    widthLow = val
                    heightLow = parseInt(val * height / width)
                } else {
                    widthLow = width
                    heightLow = height
                }
            } else {
                if (height > val) {
                    heightLow = val
                    widthLow = parseInt(val * width / height)
                } else {
                    widthLow = width
                    heightLow = height
                }
            }
            if (widthLow != 0 && heightLow != 0) {
                Resizer.imageFileResizer(
                    file,
                    widthLow,
                    heightLow,
                    "JPEG",
                    90,
                    0,
                    (file) => {
                        resolve(file)
                        setChooseImageOne(file)
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.addEventListener('load', () => setPreviewImageOne(reader.result))
                    },
                    "file"
                )
            } else {
                alert(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)

                setImageTempOne(null)
            }
        })

    /////////////
    const addArticle = () => {
        var targetDate = new Date();

        var dd = targetDate.getDate();
        var mm = targetDate.getMonth() + 1;
        var yyyy = targetDate.getFullYear();
        var date = yyyy + '-' + mm + '-' + dd;

        const article = {
            ThumbNail: "",
            Title: title,
            PostDate: date,
            Author: author,
            Content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            AltThumbnail: altThumbnail,
            CanonicalTag: canonicalTag,
            MetaDescription: metaDescription
        };
        fetch(API_URL + '/article/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: article
            })
        }).then(res => res.json())
            .then(data => {
                //   console.log(data)
                if (data == "OK") {
                    uploadImageOne()
                    alert("Thêm thành công !");
                    setAuthor("")
                    setTitle("")
                    seteditorState(EditorState.createEmpty());
                }
            })
    }

    const uploadImageCallBack = async (file) => {
        const data = new FormData();
        const count = Math.floor(Math.random() * 1000000000);
        let LinkImage;
        let atcName = Name + "_" + count;
        data.append('imagearticles', file);
        await fetch(
            API_URL + "/uploadimagearticles/" + atcName,
            {
                method: 'POST',
                body: data,
                headers: {

                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
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

    // async function uploadImageCallBack(file) {
    //     const data = new FormData();
    //     const count = Math.floor(Math.random() * 1000000000);
    //     let LinkImage;
    //     let atcName = Name + "_" + count;
    //     data.append('imagearticles', file);
    //     await fetch(
    //         API_URL + "/uploadimagearticles/" + atcName,
    //         {
    //             method: 'POST',
    //             body: data,
    //             headers: {

    //             }
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             // resolve(result)
    //             LinkImage = result;
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    //     return new Promise(
    //         (resolve) => {
    //             resolve({ data: { link: LinkImage } });
    //         }
    //     );
    // }


    return (
        <div style={{ backgroundImage: 'linear-gradient(90deg,#00b46e,#17a2b8)' }}>
            <div>
                <div style={{ width: '80%', margin: "auto", color: "white", fontSize: "20px" }}>
                    <label><b>Hình Thumbnail</b></label><br></br>
                    <input
                        style={{ fontSize: '1.2em', marginTop: '15px', marginBottom: '20px' }}
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(event) => funcChooseFileOne(event)}
                    >
                    </input><br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div style={{ width: '100%' }}>
                                <img src={previewImageOne} style={{ height: '100%', width: '100%' }} ></img>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    width: '100%',
                                    "& > :not(style)": { m: 1, width: "31%", background: "white" }
                                }}>
                                <TextField id="outlined-basic"
                                    label="Tiêu Đề"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                    onChange={value => setTitle(value.target.value)}
                                />
                                <TextField id="outlined-basic"
                                    label="Tác Giả"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                    onChange={value => setAuthor(value.target.value)}
                                />
                                <TextField id="outlined-basic"
                                    label="ALT Thumbnail"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                    onChange={val => setAltThumbnail(val.target.value)}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    "& > :not(style)": { m: 1, width: "31%", background: "white" }
                                }}>
                                <TextField id="outlined-basic"
                                    label="Canonical Tag"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                    onChange={val => setCanonicalTag(val.target.value)}
                                />
                                <TextField id="outlined-basic"
                                    label="Text 3"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                />
                                <TextField id="outlined-basic"
                                    label="Text 4"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    "& > :not(style)": { m: 1, width: "96.5%", background: "white" }
                                }}>
                                <TextField id="outlined-basic"
                                    label="Meta Description"
                                    variant="outlined"
                                    size='small'
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={val => setMetaDescription(val.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <img ref={imageRefOne} src={imageTempOne} style={{ display: 'none' }} ></img>
                </div>
                <hr></hr>
            </div>

            <Link to={{ pathname: '/ThongKe2', state: { type: 11 } }}
                className="no-print" type="button" style={{ textTransform: 'capitalize', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, display: 'flex', fontSize: 21, alignSelf: 'center', top: 5 }}>
                <img className="no-print" src={logoback} style={{ width: 30, height: 30 }} />
                <div className="no-print">
                    <b className="no-print" style={{ marginBottom: 5, color: "white" }} >Trở về</b>
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
                        style={{ width: '100%', height: 500 }}
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                    <button className="btn_edit_decription" onClick={() => { addArticle() }}>Thêm Bài Viết Mới</button>
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
export default EditorArticles;