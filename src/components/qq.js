import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Slider from "react-slick";
import { blue } from '@material-ui/core/colors';
import { auto } from '@popperjs/core';
import { Link } from 'react-router-dom';
import '../css/qq.css';
import banner2 from '../images/BANNER-2.jpg';
import { useState, useEffect } from 'react';
import { API_URL } from '../constants/constants';

/* const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
} */


const QQ = () => {
    const [id, setId] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [title, setTitle] = useState('')
    const [postDate, setPostDate] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    //thêm bài viết
    const addArticle = () => {
        const article = {
            ThumbNail: thumbnail,
            Title: title,
            PostDate: postDate,
            Author: author,
            Content: content
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
        }).then(res => res.json)
    }

    //lấy bài viết hiển thị
    const [data, setData] = useState([])
    //tạo hàm thêm dữ liệu
    const listArticle = (data) => {
        setData(data)
    }
    //lấy dữ liệu từ db
    useEffect(() => {
        fetch(API_URL + '/article/')
            .then(res => res.json()).then(data => { listArticle(data) })
    }, [])

    //update bai viet
    const updateArticle = (id2) => {
        // setId(1)
        const article = {
            ThumbNail: thumbnail,
            Title: title,
            PostDate: postDate,
            Author: author,
            Content: content
        };
        fetch(API_URL + '/article2/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: article,
                id: id2
            })
        }).then(res => res.json)
    } 

    return (
        <div>
            <div>
                <label>thumbnail</label>
                <input type='text' onChange={value => setThumbnail(value.target.value)}></input>
                <label>title</label>
                <input type='text' onChange={value => setTitle(value.target.value)}></input>
                <label>postDate</label>
                <input type='text' onChange={value => setPostDate(value.target.value)}></input>
                <label>author</label>
                <input type='text' onChange={value => setAuthor(value.target.value)}></input>
                <label>content</label>
                <input type='text' onChange={value => setContent(value.target.value)}></input>
                <button onClick={addArticle}>Add</button>

                <hr></hr>
            </div>

            {
                data.length > 0 ? <div >
                    <p >{data[0].ThumbNail}</p>
                    <p >{data[0].Title}</p>
                    <p >{data[0].PostDate}</p>
                    <p >{data[0].Author}</p>
                    <p >{data[0].Content}</p>
                    <hr></hr>

                    <label>thumbnail</label>
                    <input type='text' 
                        value={thumbnail}
                        onChange={value => setThumbnail(value.target.value)}
                        placeholder='Nhap thumbnail'>
                    </input>
                    <label>title</label>
                    <input type='text' 
                        value={title}
                        onChange={value => setTitle(value.target.value)}
                        placeholder='Nhap title'>
                    </input>
                    <label>postDate</label>
                    <input type='text' 
                        value={postDate}
                        onChange={value => setPostDate(value.target.value)}
                        placeholder='Nhap ngay dang'>
                    </input>
                    <label>author</label>
                    <input type='text' 
                        value={author}
                        onChange={value => setAuthor(value.target.value)}
                        placeholder='Nhap nguoi dang'>
                    </input>
                    <label>content</label>
                    <input type='text' 
                        value={content}
                        onChange={value => setContent(value.target.value)}
                        placeholder='Nhap noi dung'>
                    </input>
                    {/* <button onClick={updateArticle(data[0].Id)}>Update</button> */}
                    <button onClick={()=>updateArticle(data[0].Id)}>Update</button>
                </div> : null
            }

        </div>


        /* <div className='articles'>
            <div className='articles_container'>
                <div className='articles_title'>Tin Tức</div>
                <Slider {...settings}>
                    <div className='art'>
                        <div className='sub_art'>
                            <img className='art_thumbnail' src={banner2}></img>
                            <h2 className='art_title'>Title</h2>
                            <p className='art_info'>Ngày đăng</p>
                            <p className='art_info'> - </p>
                            <p className='art_info'>Người đăng</p>
                            <br></br>
                            <div className='art_content'>
                                <p style={{ display: "inline" }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing?</p>
                                <Link><p className='art_detail' style={{ display: "inline" }}>...Xem thêm</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className='art'>
                        <div className='sub_art'>
                            <img className='art_thumbnail' src={banner2}></img>
                            <h2 className='art_title'>Title</h2>
                            <p className='art_info'>Ngày đăng</p>
                            <p className='art_info'> - </p>
                            <p className='art_info'>Người đăng</p>
                            <br></br>
                            <div className='art_content'>
                                <p style={{ display: "inline" }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing?</p>
                                <Link><p className='art_detail' style={{ display: "inline" }}>...Xem thêm</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className='art'>
                        <div className='sub_art'>
                            <img className='art_thumbnail' src={banner2}></img>
                            <h2 className='art_title'>Title</h2>
                            <p className='art_info'>Ngày đăng</p>
                            <p className='art_info'> - </p>
                            <p className='art_info'>Người đăng</p>
                            <br></br>
                            <div className='art_content'>
                                <p style={{ display: "inline" }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing?</p>
                                <Link><p className='art_detail' style={{ display: "inline" }}>...Xem thêm</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className='art'>
                        <div className='sub_art'>
                            <img className='art_thumbnail' src={banner2}></img>
                            <h2 className='art_title'>Title</h2>
                            <p className='art_info'>Ngày đăng</p>
                            <p className='art_info'> - </p>
                            <p className='art_info'>Người đăng</p>
                            <br></br>
                            <div className='art_content'>
                                <p style={{ display: "inline" }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing?</p>
                                <Link><p className='art_detail' style={{ display: "inline" }}>...Xem thêm</p></Link>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div> */
    )

}

export default QQ;