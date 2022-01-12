import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../css/Introduce.css'
import { Link } from 'react-router-dom';
const Introduce = () => {
    const MaNVvalue = () => {
        // setmaNV(value)
        // setTimeout(() => {
        //     setmaNV(value)
        //     getGioHangRedis(value)
        // }, 10);
    }
    return (
        <div>
            <Header2 MaNVvalue={MaNVvalue} ></Header2>
            <div className='Introduce'>

                <Link class="thu-nghiem-zoom" to='/'>
                    <p><img title="" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/3-1024x512.png" alt="" /></p>
                </Link>
                <div className='tamnhin'>
                    <div className='sumenh'>
                        <div className='tnsm'>
                            <h2>TẦM NHÌN VÀ SỨ MỆNH</h2>
                            <h3>“Mang đến dịch vụ tốt nhất”</h3>
                        </div>
                        <div className='titlesm'>
                            <p>
                                <b>ETC Pharma</b> ra đời với mong muốn mang đến dịch vụ cung cấp thuốc và vật tư y tế tốt nhất cho các nhà thuốc, quầy thuốc, bệnh viện,… Không những thế, chúng tôi còn hướng đến giải pháp mua hàng trực tuyến hiệu quả nhằm tiết kiệm ngân sách cho khách hàng.</p>
                            <p>
                                <b>ETC Pharma</b> với sứ mệnh nỗ lực từng ngày trong việc trở thành đơn vị cung cấp dịch vụ thuốc và vật tư y tế sỉ hàng đầu trên thị trường cùng những giải pháp linh hoạt và toàn diện nhất.</p>
                        </div>
                    </div>
                </div>

                <div className='dvchinh'>
                    <div className="titledv">
                        <b className='gachtran'></b>
                        <span class="section-title-main">CÁC DỊCH VỤ CHÍNH</span>
                        <b className='gachtran'></b>
                    </div>
                    <div className='tagthuoc'>
                        <div className='tagt1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/pills.png"></img>
                                </div>
                            </div>
                            <h3>Thuốc kê đơn</h3>
                            <p>
                                Thuốc kê đơn là thuốc khi cấp phát, bán lẻ và sử dụng phải có đơn thuốc. Việc sử dụng không theo đúng chỉ định của người kê đơn thì có thể nguy hiểm tới sức khỏe của bệnh nhân.
                            </p>
                        </div>
                        <div className='tagt1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/pills-1.png"></img>
                                </div>
                            </div>
                            <h3>Thực phẩm chức năng</h3>
                            <p>
                                Thực phẩm chức năng không chỉ mang tới nhiều lợi ích tích cực đến sức khỏe và giảm nguy cơ mắc bệnh.
                            </p>
                        </div>
                        <div className='tagt1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/medical-assistance.png"></img>
                                </div>
                            </div>
                            <h3>Vật tư y tế</h3>
                            <p>
                                Tất cả các loại vật tư tiêu hao, vật liệu được sử dụng trong lĩnh vực y tế để chẩn đoán, theo dõi, điều trị và phòng ngừa chấn thương, thương tật hoặc bệnh tật,..
                            </p>
                        </div>
                        <div className='tagt1'>
                            <div className='hinhabout'>
                                <div>
                                    <img className="thumb4" src="https://etcpharma.thuocsionline.vn/wp-content/uploads/2021/12/safe.png"></img>
                                </div>
                            </div>
                            <h3>Chăm sóc cá nhân</h3>
                            <p>
                                Chăm sóc cá nhân là một hoạt động tự chăm sóc để mọi người bảo vệ và duy trì sức khỏe của họ. Đây là các hành vi được áp dụng theo cách có ảnh hưởng tích cực đến sức khỏe.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='camket'>
                    <h3>NHỮNG CAM KẾT CỦA ETC PHARMA DÀNH CHO KHÁCH HÀNG</h3>
                    <p>Luôn đặt sự hài lòng của khách hàng lên hàng đầu, chúng tôi cung cấp các dịch vụ với những cam kết sau:</p>
                    <div className='bdcamket'>
                        <div style={{ padding: 15 }}>
                            <p>
                                Nhân viên tại <b>ETC Pharma</b> đạt tiêu chuẩn, đáng tin cậy và có đầy đủ hồ sơ, thông tin cá nhân. Tất cả đều được đào tạo bài bản và được quản lý bởi đơn vị ETC Pharma, một trong những đơn vị tuyển chọn và đào tạo trình dược viên uy tín nhất hiện nay.
                            </p>
                        </div>
                    </div>
                    <div className='bdcamket'>
                        <div style={{ padding: 20 }}>
                            <p>
                                Đội ngũ nhân viên tư vấn và chăm sóc khách hàng giàu kinh nghiệm, chuyên nghiệp và tận tâm, hỗ trợ khách hàng tối đa trong việc lựa chọn dịch vụ, sản phẩm phù hợp cũng như giải đáp các vấn đề phát sinh trong quá trình sử dụng dịch vụ.
                            </p>
                            <p>
                            <b>ETC Pharma</b> xử lý đơn hàng nhanh chóng sau khi khách hàng đăng ký theo nhu cầu. Chúng tôi còn cung cấp ứng dụng đầy đủ thông tin về dịch vụ và sản phẩm, giúp cho khách hàng chủ động chọn lựa và đánh giá một cách tiện lợi.
                            </p>
                            <p>
                                Đảm bảo luôn giữ cho hàng hóa sạch sẽ và không có mầm bệnh với chế độ khử trùng giết chết 99% virus, vi khuẩn. Hơn nữa, chúng tôi còn sử dụng công nghệ hàng đầu với dịch lọc HEPA và khăn lau bằng sợi nhỏ để giảm tình trạng ô nhiễm chéo.
                            </p>
                            <p>
                                Bất cứ dịch vụ nào <b>ETC Pharma</b> cũng đều tiến hành theo quy trình khoa học, logic. Các dịch vụ cung cấp thuốc, vật tư y tế… đảm bảo thực hiện trong thời gian nhanh chóng mà vẫn hiệu quả cao, không làm ảnh hưởng nhiều đến công việc và thời gian của khách hàng.
                            </p>
                        </div>
                    </div>
                    <p><b>ETC Pharma</b> sẽ là lựa chọn lý tưởng cho các nhà thuốc, quầy thuốc, các bệnh viện, phòng khám,… mong muốn được cung cấp các sản phẩm y tế chất lượng nhất. Liên hệ ngay với chúng tôi qua số hotline <b>0844 404047</b> để được tư vấn nhanh chóng và chi tiết nhất.</p>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}
export default Introduce;