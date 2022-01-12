import { useState, useCallback, useRef, useEffect, createRef } from 'react'
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
// import Resizer from "react-image-file-resizer"
// import { API_URL } from '../constants/constants';

const QQ2 = () => {

    // const imageRef = useRef(null)
    // const [imageTemp, setImageTemp] = useState()
    // const [imgAfterCut, setImgAfterCut] = useState()
    // const [fileImg, setFileImg] = useState()

    // const resizeFile = (file) =>
    //     new Promise((resolve) => {
    //         const width = imageRef.current.width
    //         const height = imageRef.current.height
    //         const val = 1280
    //         let widthLow = 0
    //         let heightLow = 0
    //         if (width > height) {
    //             if (width > val) {
    //                 widthLow = val
    //                 heightLow = parseInt(val * height / width)
    //             } else {
    //                 widthLow = width
    //                 heightLow = height
    //             }
    //         } else {
    //             if (height > val) {
    //                 heightLow = val
    //                 widthLow = parseInt(val * width / height)
    //             } else {
    //                 widthLow = width
    //                 heightLow = height
    //             }
    //         }
    //         if (width != 0 && height != 0) {
    //             Resizer.imageFileResizer(
    //                 file,
    //                 widthLow,
    //                 heightLow,
    //                 "JPEG",
    //                 90,
    //                 0,
    //                 (file) => {
    //                     resolve(file)
    //                     setFileImg(file)
    //                     const reader = new FileReader()
    //                     reader.readAsDataURL(file)
    //                     reader.addEventListener('load', () => setImgAfterCut(reader.result))
    //                 },
    //                 "file"
    //             )
    //         } else {
    //             alert(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
    //             setImageTemp(null)
    //         }
    //     })

    // const dataURItoBlob = (dataURI) => {
    //     var byteString;
    //     if (dataURI.split(',')[0].indexOf('base64') >= 0)
    //         byteString = atob(dataURI.split(',')[1]);
    //     else
    //         byteString = unescape(dataURI.split(',')[1]);
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //     var ia = new Uint8Array(byteString.length);
    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ia], { type: mimeString });
    // }

    // const blobToImage = (blob) => {
    //     return new Promise(resolve => {
    //         const url = URL.createObjectURL(blob)
    //         let img = new Image()
    //         img.onload = () => {
    //             URL.revokeObjectURL(url)
    //             resolve(img)
    //         }
    //         img.src = url
    //     })
    // }

    // const generateDownload = async (canvas, crop) => {
    //     if (!crop || !canvas) {
    //         return
    //     }

    //     const dataURI = canvas.toDataURL('image/jpeg')
    //     const blob = dataURItoBlob(dataURI)
    //     const file = blobToImage(blob)
    //     canvas.toBlob(
    //         (blob) => {
    //             const previewUrl = window.URL.createObjectURL(blob)
    //             const anchor = document.createElement('a')
    //             anchor.download = 'cropPreview.png'
    //             anchor.href = URL.createObjectURL(blob)
    //             anchor.click()
    //             window.URL.revokeObjectURL(previewUrl)
    //         },
    //         'image/png',
    //         1
    //     )
    //     console.log(`${new Date().getTime()} typeof=`, typeof dataURI)
    //     console.log(`${new Date().getTime()} dataURI=`, dataURI)
    // }

    // const [upImg, setUpImg] = useState()
    // const imgRef = useRef(null)
    // const previewCanvasRef = useRef(null)
    // const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 16 / 9 })
    // const [completedCrop, setCompletedCrop] = useState(null)

    // const onSelectFile = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const reader = new FileReader()
    //         reader.readAsDataURL(e.target.files[0])
    //         reader.addEventListener('load', () => setImageTemp(reader.result))
    //         resizeFile(e.target.files[0])
    //     }
    // }

    // const onLoad = useCallback((img) => {
    //     imgRef.current = img
    // }, [])

    // useEffect(() => {
    //     if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
    //         return
    //     }
    //     const image = imgRef.current
    //     const canvas = previewCanvasRef.current
    //     const crop = completedCrop
    //     const scaleX = image.naturalWidth / image.width
    //     const scaleY = image.naturalHeight / image.height
    //     const ctx = canvas.getContext('2d')
    //     const pixelRatio = window.devicePixelRatio
    //     canvas.width = crop.width * pixelRatio * scaleX
    //     canvas.height = crop.height * pixelRatio * scaleY
    //     ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    //     ctx.imageSmoothingQuality = 'high'
    //     ctx.drawImage(
    //         image,
    //         crop.x * scaleX,
    //         crop.y * scaleY,
    //         crop.width * scaleX,
    //         crop.height * scaleY,
    //         0,
    //         0,
    //         crop.width * scaleX,
    //         crop.height * scaleY
    //     )
    // }, [completedCrop])

    return (
        <div>
            {/* <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="..." alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Third slide">
                    </div>
                </div>
            </div> */}
            {/* <div>
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div> */}
            {/* <img ref={imageRef} src={imageTemp} style={{ display: 'none' }} ></img> */}
            {/* <img src={imgAfterCut} ></img> */}

            {/* <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                keepSelection
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0),
                        display: 'none'
                    }}
                />
            </div>
            <button
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                    generateDownload(previewCanvasRef.current, completedCrop)
                }
            >
                Download cropped image
            </button> */}
        </div>
    )
}

export default QQ2
