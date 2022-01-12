import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../css/Baiviet.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const DetailArticle = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    const MaNVvalue = () => {
        // setmaNV(value)
        // setTimeout(() => {
        //     setmaNV(value)
        //     getGioHangRedis(value)
        // }, 10);
    }
    return (

        <div style={{ justifyContent: 'center' }}>
            <Helmet>
                <title>Title CC</title>
                <meta name="description" content="DM" />
            </Helmet>
            <Header2 MaNVvalue={MaNVvalue}  ></Header2>
            {/* <div className='postArtile'>
                <div style={{ backgroundImage: `url("https://www.freecodecamp.org/news/content/images/2020/12/React-failed-to-compile-image.png")`, width: '100%', height: 300, textAlign:'center' }}>
                    <div>
                        Lợi ích và khó khăn khi mở (cửa hàng pharmacity) trực tuyến
                    </div>
                    <div>
                        POSTED ON 10 THÁNG MƯỜI HAI, 2021 BY ADMIN
                    </div>
                </div>

            </div> */}
            <div>

                <div id="main" style={{ backgroundImage: `url("https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/Pharmacity-truc-tuyen.jpg")`, width: '100%' }}>
                    <div>
                        <div>
                            <h1> Lợi ích và khó khăn khi mở (cửa hàng pharmacity) trực tuyến</h1>
                        </div>
                        <hr style={{ width: '10%', backgroundColor: '#027525' }}></hr>
                        <div style={{ fontWeight: 'bold' }}>
                            POSTED ON 10 THÁNG MƯỜI HAI, 2021 BY ADMIN
                        </div>
                    </div>

                </div>
                <div className='listbaiviet' style={{ marginTop: 20, backgroundColor: '#fff', marginBottom: 20 }}>
                    <div style={{ width: '65%', backgroundColor: '#fff' }}></div>
                    <div className='tieudebaiviet1' style={{ marginTop: 20 }}>
                        <div className='searcharticle'>
                            <TextField
                                id="outlined-textarea"
                                label="Tìm kiếm bài viết"
                                placeholder="Tìm kiếm"
                                multiline
                                variant="outlined"
                                style={{ width: '90%', backgroundColor: '#fff', marginBottom: 20 }}
                            />
                        </div>
                        <div className='titlebv'>
                            BÀI VIẾT MỚI
                        </div>
                        <div style={{ width: '80%', height: 3, backgroundColor: '#e5e5e5', marginTop: 20 }}>

                            {/* chitietbaoviet */}

                        </div>
                        <div className='titlenew' style={{ fontSize: 15, fontWeight: 'bold', justifyContent: 'center', marginTop: 10 }}>
                            Lợi ích và khó khăn khi mở (cửa hàng pharmacity) trực tuyến
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}
export default DetailArticle;