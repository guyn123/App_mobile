import { eventList } from './src/data/eventData';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import EventCard from './EventCard.';

// Màn hình Trang chủ
export default function HomeS() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('./assets/img/banners/original.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sự kiện..."
            placeholderTextColor="#666"
          />
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Tìm</Text>
          </View>
        </View>

        {/* Slider */}
        <ScrollView horizontal pagingEnabled style={styles.slider}>
          <Image
            source={require('./assets/img/nghien-cuu-khoa-hoc-sinh-vien-truong-dai-hoc-cmc-19.jpg')}
            style={styles.sliderImage}
          />
        </ScrollView>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tại sao chọn chúng tôi?</Text>
          <View style={styles.featuresContainer}>
            <FeatureItem
              image={require('./assets/img/banners/su_kien_phong_phu.png')}
              title="SỰ KIỆN ĐA DẠNG"
              desc="Tổ chức nhiều loại sự kiện như hội thảo, workshop, triển lãm..."
            />
            <FeatureItem
              image={require('./assets/img/banners/service-promo-7.png')}
              title="ĐĂNG KÝ AN TOÀN"
              desc="Đăng ký sự kiện bảo mật, xác nhận nhanh qua email hoặc SMS."
            />
            <FeatureItem
              image={require('./assets/img/banners/thoi_gian_linh_hoat.png')}
              title="THỜI GIAN LINH HOẠT"
              desc="Lịch trình linh hoạt, phù hợp khung giờ của người tham gia."
            />
            <FeatureItem
              image={require('./assets/img/banners/service-promo-4.png')}
              title="QUÀ TẶNG HẤP DẪN"
              desc="Tặng voucher, tài liệu chuyên môn và quà lưu niệm."
            />
          </View>
        </View>

        {/* Speakers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MỘT SỐ DIỄN GIẢ ĐÁNG CHÚ Ý</Text>
          <ScrollView horizontal>
            <SpeakerCard
              image={require('./assets/img/timcook.jpg')}
              name="Tim Cook"
              title="CEO của Apple"
            />
            <SpeakerCard
              image={require('./assets/img/USAFA_Hosts_Elon_Musk.jpg')}
              name="Elon Musk"
              title="CEO Tesla & SpaceX"
            />
            <SpeakerCard
              image={require('./assets/img/putin.jpg')}
              name="Putin"
              title="Tổng thống Nga"
            />
            <SpeakerCard
              image={require('./assets/img/MTP.jpg')}
              name="Sơn Tùng M-TP"
              title="Ca sĩ & Nhà sáng tạo"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sự kiện nổi bật</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eventList.slice(0, 3).map(event => (
              <EventCard
                key={event.id}
                image={event.image}
                title={event.title}
                start={event.start}
                end={event.end}
                location={event.location}
                price={event.price}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

          <FaqItem
            question="Tôi có thể hủy đăng ký sự kiện nếu không tham gia được không?"
            answer="Bạn nên kiểm tra chính sách hủy đăng ký của sự kiện. Nhiều sự kiện cho phép hủy miễn phí trong một khoảng thời gian nhất định trước ngày diễn ra."
          />

          <FaqItem
            question="Sự kiện có yêu cầu đăng ký trước không?"
            answer="Thông thường, các sự kiện sẽ yêu cầu đăng ký trước để đảm bảo chỗ ngồi và chuẩn bị tài liệu cần thiết cho người tham dự."
          />

          <FaqItem
            question="Tôi có nhận được chứng nhận khi tham dự sự kiện không?"
            answer="Một số sự kiện (đặc biệt là hội thảo, khóa đào tạo) sẽ cấp chứng nhận tham dự, hãy hỏi rõ khi đăng ký."
          />

          <FaqItem
            question="Tham dự sự kiện có mất phí không?"
            answer="Tùy vào loại sự kiện. Có sự kiện hoàn toàn miễn phí, nhưng cũng có những sự kiện yêu cầu mua vé hoặc đóng phí đăng ký."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const FeatureItem = ({ image, title, desc }) => (
  <View style={styles.featureItem}>
    <Image source={image} style={styles.featureIcon} />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDesc}>{desc}</Text>
  </View>
);

const SpeakerCard = ({ image, name, title }) => (
  <View style={styles.speakerCard}>
    <Image source={image} style={styles.speakerImage} />
    <Text style={styles.speakerName}>{name}</Text>
    <Text style={styles.speakerTitle}>{title}</Text>
  </View>
);

const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqQuestion}>
        <Text style={styles.faqQuestionText}>❓ {question}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8ebad3',
  },
  logo: { width: 120, height: 50, marginRight: 10 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#005f8d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  slider: { height: 200, backgroundColor: '#ccc' },
  sliderImage: { width: 450, height: 200, resizeMode: 'cover' },
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIcon: { width: 80, height: 75, marginBottom: 8 },
  featureTitle: { fontWeight: 'bold', fontSize: 16 },
  featureDesc: { fontSize: 14, textAlign: 'center' },
  speakerCard: { width: 160, alignItems: 'center', marginRight: 16 },
  speakerImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 8 },
  speakerName: { fontWeight: 'bold', fontSize: 16 },
  speakerTitle: { fontSize: 14, color: '#777' },

 
  faqItem: {
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  faqQuestion: { backgroundColor: '#cde1f9', padding: 12 },
  faqQuestionText: { fontSize: 15, fontWeight: 'bold' },
  faqAnswer: {
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  faqAnswerText: { fontSize: 14, color: '#333' },
});