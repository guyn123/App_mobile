export interface EventItem {
  id: number;
  category: string;
  title: string;
  image: string;
  start: string;
  end: string;
  location: string;
  price: string;
  description: string;
  totalSeats: number;
  bookedSeats: number;
  status: string;
}

export const eventList = [
    { id: 1,
    category: "tech",
    title: "Hội nghị Công nghệ 2025",
    image: require('../../assets/img/products/hoinghicongnghe.jpg'),
    start: "2025-06-28T22:13",
    end: "2025-06-28T22:30",
    location: "Hà Nội",
    price: "500000",
    description: "Hội nghị về trí tuệ nhân tạo và công nghệ tương lai.",
    totalSeats: 100,
    bookedSeats: 10,
    status: ""
  },
  {
    id: 2,
    category: "music",
    title: "Lễ hội Âm nhạc Mùa hè",
    image: require('../../assets/img/products/amnhacmuahe.jpg'),
    start: "2025-08-10T18:00",
    end: "2025-08-10T23:00",
    location: "TP.HCM",
    price: "300000",
    description: "Sự kiện âm nhạc với các nghệ sĩ nổi tiếng.",
    totalSeats: 100,
    bookedSeats: 100,
    status: ""
  },
  {
    id: 3,
    category: "education",
    title: "Hội thảo Du học Nhật Bản",
    image: require('../../assets/img/products/duhoc.jpg'),
    start: "2025-08-15T09:00",
    end: "2025-08-15T12:00",
    location: "Đà Nẵng",
    price: "0",
    description: "Giới thiệu học bổng và chương trình du học.",
    totalSeats: 100,
    bookedSeats: 75,
    status: ""
  },
  {
    id: 4,
    category: "tech",
    title: "Workshop Thiết kế UX/UI",
    image: require('../../assets/img/products/uxui.jpg'),
    start: "2025-08-18T13:00",
    end: "2025-08-18T17:00",
    location: "Hà Nội",
    price: "200000",
    description: "Thực hành thiết kế giao diện người dùng chuyên nghiệp.",
    totalSeats: 100,
    bookedSeats: 65,
    status: ""
  },
  {
    id: 5,
    category: "education",
    title: "Talkshow Kỹ năng mềm",
    image: require('../../assets/img/products/kinangmem.jpg'),
    start: "2025-08-20T18:00",
    end: "2025-08-20T20:00",
    location: "TP.HCM",
    price: "50000",
    description: "Chia sẻ về kỹ năng giao tiếp, làm việc nhóm và thuyết trình.",
    totalSeats: 100,
    bookedSeats: 55,
    status: ""
  },
  {
    id: 6,
    category: "festival",
    title: "Lễ hội Văn hóa Việt Nam",
    image: require('../../assets/img/products/vanhoa.jpg'),
    start: "2025-08-25T10:00",
    end: "2025-08-25T20:00",
    location: "Huế",
    price: "100000",
    description: "Trưng bày di sản, ẩm thực và âm nhạc truyền thống.",
    totalSeats: 100,
    bookedSeats: 30,
    status: ""
  },
  {
    id: 7,
    category: "music",
    title: "Đêm nhạc Acoustic",
    image: require('../../assets/img/products/demamnhac.jpg'),
    start: "2025-08-28T19:00",
    end: "2025-08-28T21:00",
    location: "Hà Nội",
    price: "150000",
    description: "Trình diễn âm nhạc acoustic nhẹ nhàng tại không gian mở.",
    totalSeats: 100,
    bookedSeats: 80,
    status: ""
  },
  {
    id: 8,
    category: "festival",
    title: "Lễ hội Trung thu",
    image: require('../../assets/img/products/8.jpg'),
    start: "2025-09-15T17:00",
    end: "2025-09-15T22:00",
    location: "TP.HCM",
    price: "0",
    description: "Múa lân, rước đèn và các hoạt động dân gian.",
    totalSeats: 100,
    bookedSeats: 95,
    status: ""
  },
  {
    id: 9,
    category: "education",
    title: "Khóa học Lập trình Web cơ bản",
    image: require('../../assets/img/products/9.jpg'),
    start: "2025-09-05T09:00",
    end: "2025-09-05T17:00",
    location: "Online",
    price: "100000",
    description: "Học HTML, CSS và JavaScript cho người mới bắt đầu.",
    totalSeats: 100,
    bookedSeats: 60,
    status: ""
  },
  {
    id: 10,
    category: "tech",
    title: "Hội thảo Blockchain 2025",
    image: require('../../assets/img/products/10.jpg'),
    start: "2025-09-12T08:00",
    end: "2025-09-12T16:00",
    location: "Đà Nẵng",
    price: "400000",
    description: "Tìm hiểu công nghệ blockchain và các ứng dụng thực tế.",
    totalSeats: 100,
    bookedSeats: 100,
    status: ""
  },
  {
    id: 11,
    category: "tech",
    title: "Seminar về Trí tuệ Nhân tạo",
    image: require('../../assets/img/products/11.jpg'),
    start: "2025-09-20T09:00",
    end: "2025-09-20T12:00",
    location: "Hà Nội",
    price: "250000",
    description: "Thảo luận chuyên sâu về AI và học máy.",
    totalSeats: 100,
    bookedSeats: 85,
    status: ""
  },
  {
    id: 12,
    category: "music",
    title: "Live Concert Quốc tế",
    image: require('../../assets/img/products/12.jpg'),
    start: "2025-09-22T18:00",
    end: "2025-09-22T23:00",
    location: "TP.HCM",
    price: "450000",
    description: "Chương trình ca nhạc với các nghệ sĩ quốc tế.",
    totalSeats: 100,
    bookedSeats: 100,
    status: ""
  }
  // ... thêm các sự kiện khác
];
