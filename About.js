import React from 'react';
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

// Màn hình Giới thiệu
export default function AboutA() {
  const teamMembers = [
    {
      name: 'Lê Anh Quân',
      title: 'Giám đốc sáng tạo\n12 năm kinh nghiệm tổ chức sự kiện lớn',
      image: require('./assets/img/avt1.jpg'),
    },
    {
      name: 'Bùi Duy Anh',
      title: 'Trưởng phòng tổ chức\nChuyên gia logistics sự kiện',
      image: require('./assets/img/avt2.jpg'),
    },
    {
      name: 'Lê Quang Minh',
      title: 'Chuyên gia thiết kế\nThiết kế không gian sự kiện độc đáo',
      image: require('./assets/img/avt3.jpg'),
    },
    {
      name: 'Tạ Quang Minh',
      title: 'Quản lý khách hàng\nChăm sóc khách hàng tận tâm',
      image: require('./assets/img/avt4.jpg'),
    },
  ];

  const coreValues = [
    {
      icon: '💡',
      title: 'Sáng Tạo',
      desc: 'Luôn đổi mới và sáng tạo trong tổ chức sự kiện',
    },
    {
      icon: '🛡️',
      title: 'Chuyên Nghiệp',
      desc: 'Quy trình làm việc rõ ràng, hiệu quả và nghiêm túc',
    },
    {
      icon: '❤️',
      title: 'Tận Tâm',
      desc: 'Đặt khách hàng làm trọng tâm mọi quyết định',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>

        {/* Slider */}
        <ScrollView horizontal pagingEnabled style={styles.slider}>
          <Image
            source={require('./assets/img/nghien-cuu-khoa-hoc-sinh-vien-truong-dai-hoc-cmc-19.jpg')}
            style={styles.sliderImage}
          />
        </ScrollView>

        {/* Về Chúng Tôi */}
        <View style={styles.sectionRow}>
          <View style={styles.rowTop}>
            <View style={styles.textBlock}>
              <Text style={styles.title}>Về Chúng Tôi</Text>
              <Text style={styles.desc}>
                Với hơn 12 năm kinh nghiệm tổ chức sự kiện, chúng tôi tự hào đã thực hiện thành công hơn 500 sự kiện lớn nhỏ, từ hội nghị doanh nghiệp, tiệc cưới sang trọng đến các chương trình ra mắt sản phẩm.
              </Text>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaText}>Liên Hệ Ngay</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={require('./assets/img/about.jpg')}
              style={styles.aboutImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.stat}>500+ Sự kiện</Text>
            <Text style={styles.stat}>50+ Đối tác</Text>
            <Text style={styles.stat}>98% Hài lòng</Text>
          </View>
        </View>

        {/* Đội Ngũ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đội Ngũ Chuyên Gia</Text>
          <Text style={styles.sectionSubtitle}>
            Đội ngũ giàu kinh nghiệm với niềm đam mê tạo nên sự kiện hoàn hảo
          </Text>
          <View style={styles.cardList}>
            {teamMembers.map((member, idx) => (
              <View style={styles.card} key={idx}>
                <Image source={member.image} style={styles.avatar} />
                <Text style={styles.cardName}>{member.name}</Text>
                <Text style={styles.cardTitle}>{member.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Giá Trị */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giá Trị Cốt Lõi</Text>
          <Text style={styles.sectionSubtitle}>
            Những nguyên tắc làm nên thương hiệu QDM
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coreValueRow}>
            {coreValues.map((value, idx) => (
              <View style={styles.coreCard} key={idx}>
                <Text style={styles.valueIcon}>{value.icon}</Text>
                <Text style={styles.cardName}>{value.title}</Text>
                <Text style={styles.cardTitle}>{value.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

  slider: {
    height: 200,
    backgroundColor: '#ccc',
  },
  sliderImage: {
    width: 450,
    height: 200,
    resizeMode: 'cover',
  },
  sectionRow: {
    padding: 40,
    backgroundColor: '#f8f8f8',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textBlock: {
    flex: 1,
    maxWidth: '55%',
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056d2',
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  stat: {
    backgroundColor: '#e0ecff',
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 13,
    color: '#0056d2',
  },
  ctaButton: {
    backgroundColor: '#0056d2',
    padding: 10,
    marginTop: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  aboutImage: {
    width: 180,
    height: 270,
    borderRadius: 12,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0056d2',
    marginBottom: 6,
  },
  sectionSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 14,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  coreValueRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  coreCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
  },
  valueIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
});
