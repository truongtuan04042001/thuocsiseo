import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../css/Aboutus.css'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import banner2 from '../images/BANNER-2.jpg';
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
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
}
const Aboutus = () => {

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
        <div>
            <Header2 MaNVvalue={MaNVvalue} ></Header2>
            <div style={{ backgroundColor: '#fff' }}>
                <div className='vethuocsi'>
                    <div className='tagthuocsi'>
                        <div className='tagthuocsi1'>


                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/best-price1.png"></img>
                                    </div>
                                </div>
                                <h2>Giá bán</h2>
                            </div>
                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/badge1.png"></img>
                                    </div>
                                </div>
                                <h2>Chất lượng</h2>
                            </div>
                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/support1.png"></img>
                                    </div>
                                </div>
                                <h2>Thận thiện</h2>
                            </div>
                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/support1.png"></img>
                                    </div>
                                </div>
                                <h2>Uy tín</h2>
                            </div>
                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/best-price1.png"></img>
                                    </div>
                                </div>
                                <h2>Giao hàng nhanh</h2>
                            </div>
                            <div className='tungcai'>
                                <div className='hinhabout'>
                                    <div>
                                        <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/map1.png"></img>
                                    </div>
                                </div>
                                <h2>Phân phối rộng</h2>
                            </div>
                        </div>
                    </div>
                    <div className='tagthuocsi'>
                        <h2> VỀ CHÚNG TÔI</h2>
                        <p>
                            Thuốc sỉ Online là nơi cung cấp các mặt hàng thuốc tân dược, vật tư y tế và sản phẩm về đông y. Các sản phẩm tại đây có giá bán cạnh tranh, an toàn, nguồn gốc, xuất sứ rõ ràng và có hóa đơn kèm theo trên mổi đơn hàng, chúng tôi luôn ý thức và mang đến cho bạn sự trãi nghiệm tiện nghi khi đặt hàng tại đây.
                        </p>

                        <p>
                            Hiện nay chúng tôi đã kết nối với các đơn vị giao hàng uy tín và nhanh chóng đáp ứng mọi nhu cầu về vận chuyển hàng hóa trên toàn lãnh thổ Việt Nam
                        </p>
                        <p>
                            Với đội ngũ nhân viên nhiệt tình, chân thành và thân thiện, chúng tôi sẵn sàng tư vấn cho quý khách với bất kỳ vấn đề thắc mắc nào liên quan đến hàng hóa và vận chuyển.
                        </p>

                        <p>
                            Quý khách hàng có thể đặt hàng trực tiếp tại<Link style={{ color: 'red' }} to='https://thuocsionline.vn/'> TRANG WEB </Link>hoặc đặt hàng qua APP để nhận được các ưu đãi lớn.
                        </p>
                        <Link className="Quatrangsp" to='/Sanpham'>MUA HÀNG NGAY</Link>
                        
                    </div>
                </div>
                <div className='divlienhe'>
                    <div className='cangiuaaa'>
                        <div className='resp' style={{ width: '50%', color: '#fff', padding: 20, alignSelf: 'center' }}>
                            <h2>Bạn cần tư vấn dịch vụ cung cấp thuốc sỉ của chúng tôi?</h2>
                            <p>Cách nhanh nhất, vui lòng liên hệ trực tiếp với tư vấn viên qua một trong các kênh sau:</p>
                        </div>
                        <div className='lienhe'>
                            <div className="kct">
                                <div className='tungcai'>
                                    <div className='hinhabout'>
                                        <div>
                                            <img className="thumb4" src="https://img.icons8.com/ios-filled/2x/ffffff/zalo.png"></img>
                                        </div>
                                    </div>
                                    <h3>Zalo</h3>
                                </div>
                                <div className='tungcai'>
                                    <div className='hinhabout'>
                                        <div>
                                            <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/Untitlesdsadd-1.png"></img>
                                        </div>
                                    </div>
                                    <h3>Messenger</h3>
                                </div>
                                <div className='tungcai'>
                                    <div className='hinhabout'>
                                        <div>
                                            <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/Untitzdsadled-1.png"></img>
                                        </div>
                                    </div>
                                    <h3>0844 404047</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='doitra'>
                    <div className='repsi' style={{ width: '30%', alignSelf: 'center' }}>
                        <div className='tungcai1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/reputation1.png"></img>
                                </div>
                            </div>
                            <h2>CHẤT LƯỢNG</h2>
                            <p style={{ color: '#4b4d4c', fontSize: 18 }}>
                                Chúng tôi giữ cho sản phẩm của quý khách cẩn thận và không bị hư hỏng. Ngoài ra, chúng tôi cũng sẽ đảm bảo sản phẩm luôn được nhập mới.
                            </p>
                        </div>
                        <div className='tungcai1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/badge1.png"></img>
                                </div>
                            </div>
                            <h2>AN TOÀN</h2>
                            <p style={{ color: '#4b4d4c', fontSize: 18 }}>
                                Chúng tôi cam kết sẽ đổi hàng cho quý khách khi có sự cố. Chính sách đổi trả của chúng tôi luôn đảm bảo rõ ràng.
                            </p>
                        </div>
                    </div>
                    <div className='repsi' style={{ width: '40%' }}>
                        <div className='hinhabout1'>
                            <div  className='sss' style={{width:'95%'}}>
                                <img className="thumb5" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/710-7103770_pharmacist-516x1024.png"></img>
                            </div>
                        </div>
                    </div>

                    <div className='repsi' style={{ width: '30%', alignSelf: 'center' }}>
                        <div className='tungcai1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/fast1-1.png"></img>
                                </div>
                            </div>
                            <h2>ĐỔI TRẢ</h2>
                            <p style={{ color: '#4b4d4c', fontSize: 18 }}>
                                Chúng tôi sử dụng chất khử trùng an toàn ở bệnh viện, dịch lọc HEPA và khăn lau bằng sợi nhỏ để giảm lây nhiễm chéo.
                            </p>
                        </div>
                        <div className='tungcai1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/best-price1.png"></img>
                                </div>
                            </div>
                            <h2>CHUYÊN NGHIỆP, UY TÍN</h2>
                            <p style={{ color: '#4b4d4c', fontSize: 18 }}>
                                Đội ngũ đáng tin cậy và ổn định của chúng tôi hiểu nhu cầu dịch vụ cung cấp thuốc và vật tư y tế của Quý khách.
                            </p>
                        </div>
                    </div>

                </div>
                <div className='articles' style={{ marginTop: 20 }}>
                    <div className='articles_container1'>
                        <div className='articles_title'>Bài viết - Tin Tức</div>
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
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
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
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
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
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link to='/Article'><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
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
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link to='/Article'><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
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
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link to='/Article'><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div>

            </div>

            <Footer></Footer>
        </div>
    )
}
export default Aboutus;