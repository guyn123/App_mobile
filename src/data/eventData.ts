export interface EventItem {
  maSuKien: number;
  tenDanhMuc: string;
  tenSuKien: string;
  anhSuKien: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  diaDiem: string;
  phiThamGia: string;
  moTa: string;
  luongChoNgoi: number;
  soNguoiDaDangKy: number;
  trangThaiSuKien: string;
}

export const eventList: EventItem[] = [
  {
    maSuKien: 1,
    tenDanhMuc: "tech",
    tenSuKien: "Hội nghị Công nghệ 2025",
    anhSuKien: require('../../assets/img/products/hoinghicongnghe.jpg'),
    ngayBatDau: "2025-06-28T22:13",
    ngayKetThuc: "2025-06-28T22:30",
    diaDiem: "Hà Nội",
    phiThamGia: "500000",
    moTa: "Hội nghị về trí tuệ nhân tạo và công nghệ tương lai.",
    luongChoNgoi: 120,
    soNguoiDaDangKy: 10,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 2,
    tenDanhMuc: "music",
    tenSuKien: "Lễ hội Âm nhạc Mùa hè",
    anhSuKien: require('../../assets/img/products/amnhacmuahe.jpg'),
    ngayBatDau: "2025-08-10T18:00",
    ngayKetThuc: "2025-08-10T23:00",
    diaDiem: "TP.HCM",
    phiThamGia: "300000",
    moTa: "Sự kiện âm nhạc với các nghệ sĩ nổi tiếng.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 100,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 3,
    tenDanhMuc: "education",
    tenSuKien: "Hội thảo Du học Nhật Bản",
    anhSuKien: require('../../assets/img/products/duhoc.jpg'),
    ngayBatDau: "2025-08-15T09:00",
    ngayKetThuc: "2025-08-15T12:00",
    diaDiem: "Đà Nẵng",
    phiThamGia: "0",
    moTa: "Giới thiệu học bổng và chương trình du học.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 75,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 4,
    tenDanhMuc: "tech",
    tenSuKien: "Workshop Thiết kế UX/UI",
    anhSuKien: require('../../assets/img/products/uxui.jpg'),
    ngayBatDau: "2025-08-18T13:00",
    ngayKetThuc: "2025-08-18T17:00",
    diaDiem: "Hà Nội",
    phiThamGia: "200000",
    moTa: "Thực hành thiết kế giao diện người dùng chuyên nghiệp.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 65,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 5,
    tenDanhMuc: "education",
    tenSuKien: "Talkshow Kỹ năng mềm",
    anhSuKien: require('../../assets/img/products/kinangmem.jpg'),
    ngayBatDau: "2025-08-20T18:00",
    ngayKetThuc: "2025-08-20T20:00",
    diaDiem: "TP.HCM",
    phiThamGia: "50000",
    moTa: "Chia sẻ về kỹ năng giao tiếp, làm việc nhóm và thuyết trình.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 55,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 6,
    tenDanhMuc: "festival",
    tenSuKien: "Lễ hội Văn hóa Việt Nam",
    anhSuKien: require('../../assets/img/products/vanhoa.jpg'),
    ngayBatDau: "2025-08-25T10:00",
    ngayKetThuc: "2025-08-25T20:00",
    diaDiem: "Huế",
    phiThamGia: "100000",
    moTa: "Trưng bày di sản, ẩm thực và âm nhạc truyền thống.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 30,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 7,
    tenDanhMuc: "music",
    tenSuKien: "Đêm nhạc Acoustic",
    anhSuKien: require('../../assets/img/products/demamnhac.jpg'),
    ngayBatDau: "2025-08-28T19:00",
    ngayKetThuc: "2025-08-28T21:00",
    diaDiem: "Hà Nội",
    phiThamGia: "150000",
    moTa: "Trình diễn âm nhạc acoustic nhẹ nhàng tại không gian mở.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 80,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 8,
    tenDanhMuc: "festival",
    tenSuKien: "Lễ hội Trung thu",
    anhSuKien: require('../../assets/img/products/8.jpg'),
    ngayBatDau: "2025-09-15T17:00",
    ngayKetThuc: "2025-09-15T22:00",
    diaDiem: "TP.HCM",
    phiThamGia: "0",
    moTa: "Múa lân, rước đèn và các hoạt động dân gian.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 95,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 9,
    tenDanhMuc: "education",
    tenSuKien: "Khóa học Lập trình Web cơ bản",
    anhSuKien: require('../../assets/img/products/9.jpg'),
    ngayBatDau: "2025-09-05T09:00",
    ngayKetThuc: "2025-09-05T17:00",
    diaDiem: "Online",
    phiThamGia: "100000",
    moTa: "Học HTML, CSS và JavaScript cho người mới bắt đầu.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 60,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 10,
    tenDanhMuc: "tech",
    tenSuKien: "Hội thảo Blockchain 2025",
    anhSuKien: require('../../assets/img/products/10.jpg'),
    ngayBatDau: "2025-09-12T08:00",
    ngayKetThuc: "2025-09-12T16:00",
    diaDiem: "Đà Nẵng",
    phiThamGia: "400000",
    moTa: "Tìm hiểu công nghệ blockchain và các ứng dụng thực tế.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 100,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 11,
    tenDanhMuc: "tech",
    tenSuKien: "Seminar về Trí tuệ Nhân tạo",
    anhSuKien: require('../../assets/img/products/11.jpg'),
    ngayBatDau: "2025-09-20T09:00",
    ngayKetThuc: "2025-09-20T12:00",
    diaDiem: "Hà Nội",
    phiThamGia: "250000",
    moTa: "Thảo luận chuyên sâu về AI và học máy.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 85,
    trangThaiSuKien: ""
  },
  {
    maSuKien: 12,
    tenDanhMuc: "music",
    tenSuKien: "Live Concert Quốc tế",
    anhSuKien: require('../../assets/img/products/12.jpg'),
    ngayBatDau: "2025-09-22T18:00",
    ngayKetThuc: "2025-09-22T23:00",
    diaDiem: "TP.HCM",
    phiThamGia: "450000",
    moTa: "Chương trình ca nhạc với các nghệ sĩ quốc tế.",
    luongChoNgoi: 100,
    soNguoiDaDangKy: 100,
    trangThaiSuKien: ""
  }
];
