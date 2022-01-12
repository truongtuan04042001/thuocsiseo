import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../css/Baiviet.css'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const Article = () => {

    const MaNVvalue = () => {
        // setmaNV(value)
        // setTimeout(() => {
        //     setmaNV(value)
        //     getGioHangRedis(value)
        // }, 10);
    }
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <Header2 MaNVvalue={MaNVvalue} ></Header2>
            <div className='listbaiviet' style={{ marginTop: 20, backgroundColor: '#fff', marginBottom:20 }}>
                <div className='bordertong' style={{ width: '65%', backgroundColor: '#fff', borderColor:'' }}>
                    <Link to='/DetailArticle' className='listarticle' style={{ display: 'flex', width: '100%', backgroundColor: '#fff' }}>
                        <div className='hinhbaiviet'>
                            <div>
                                <img className="thumb3" src="https://hih.vn/wp-content/uploads/2018/09/%E1%BA%A3nh-6.jpg"></img>
                            </div>
                        </div>
                        <div className='tieudebaiviet' style={{ backgroundColor: '#fff', padding: 15 }}>
                            <div>
                                <p className='overfl5' style={{ fontWeight: 'bold', color: '#00ab55 ', textAlign: 'justify' }}>
                                    Nhà thuốc an khang nơi giải đáp thắc mắc khi mua thuốc sỉ
                                </p>
                            </div>
                            <div>
                                <p className='overfl4' style={{ fontSize: 16, textAlign: 'justify', color:'black' }}>
                                    Nhà thuốc an khang nhiều người trong chúng ta muốn lựa chọn mua thuốc theo toa của chúng tôi từ các nhà thuốc trực tuyến vì thực hành có vẻ thuận tiện và tiết kiệm tiền. Nhưng có hợp pháp và an toàn khi mua thuốc từ một trang web dược phẩm không?
                                </p>
                            </div>
                            <div>
                                <p style={{ fontStyle: 'italic', fontSize: 14, color: '#00ab55' }}>
                                    Ngày 10 Tháng 5
                                </p>
                            </div>

                        </div>
                    </Link>
                   
                    
                </div>
                <div className='tieudebaiviet1' style={{ marginTop: 20 }}>
                    <div className='searcharticle'>
                        <TextField
                            id="outlined-textarea"
                            label="Tìm kiếm bài viết"
                            placeholder="Tìm kiếm"
                            multiline
                            variant="outlined"
                            style={{ width: '90%', backgroundColor: '#fff', marginBottom:20 }}
                        />
                    </div>
                    <div className='titlebv'>
                        BÀI VIẾT MỚI
                    </div>
                    <div style={{width:'80%', height:3, backgroundColor:'#e5e5e5', marginTop:20}}></div>
                    <div className='titlenew' style={{fontSize:15, fontWeight:'bold', justifyContent:'center', marginTop:10}}>
                    Lợi ích và khó khăn khi mở (cửa hàng pharmacity) trực tuyến
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Article;