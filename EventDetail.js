import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function EventDetail({ username }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Expecting maSuKien as id from navigation
  const API_BASE = 'http://172.17.154.189:8084/api';

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewStars, setReviewStars] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/sukien/get/${id}`);
      setEvent(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Lỗi khi lấy chi tiết sự kiện:', err.response?.data || err.message);
      setError('Không thể tải chi tiết sự kiện.');
      setLoading(false);
      Alert.alert('Lỗi', 'Không thể tải chi tiết sự kiện. Vui lòng thử lại sau.');
    }
  }, [id, API_BASE]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleSelectStars = (stars) => {
    setReviewStars(stars);
  };

  const handleSubmitReview = () => {
    if (!reviewStars || !reviewContent) {
      Alert.alert('Vui lòng điền đầy đủ thông tin đánh giá.');
      return;
    }
    const newReview = {
      name: username || 'Người dùng ẩn danh',
      stars: reviewStars,
      content: reviewContent,
    };
    setReviews([...reviews, newReview]);
    setReviewStars(null);
    setReviewContent('');
  };

  const handleRegister = () => {
    if (!event) return;

    const now = new Date();
    const start = new Date(event.ngayBatDau);
    const end = new Date(event.ngayKetThuc);

    if (!username) {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để đăng ký sự kiện.');
      return;
    }

    if (now > end) {
      Alert.alert('Sự kiện đã kết thúc', 'Bạn không thể đăng ký.');
      return;
    }

    if (now >= start && now <= end) {
      Alert.alert('Sự kiện đang diễn ra', 'Không thể đăng ký vào lúc này.');
      return;
    }

    if (event.trangThaiSuKien === 'Hết chỗ' || event.trangThaiSuKien === 'Hết hạn đăng ký') {
      Alert.alert('Không thể đăng ký', `Sự kiện ${event.trangThaiSuKien.toLowerCase()}!`);
      return;
    }

    navigation.navigate('DKEvent', { id: event.maSuKien });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Đang tải...</Text>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 16, color: '#555' }}>
          {error || 'Không tìm thấy sự kiện.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Chi tiết sự kiện */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{ uri: `${API_BASE}/sukien/get/img/${event.anhSuKien}` }}
            style={styles.image}
            onError={() => Alert.alert('Lỗi', 'Không thể tải hình ảnh sự kiện.')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{event.tenSuKien}</Text>
       
        <Text style={styles.info}><Text style={styles.label}>BẮT ĐẦU:</Text> {new Date(event.ngayBatDau).toLocaleString('vi-VN')}</Text>
        <Text style={styles.info}><Text style={styles.label}>KẾT THÚC:</Text> {new Date(event.ngayKetThuc).toLocaleString('vi-VN')}</Text>
        <Text style={styles.info}><Text style={styles.label}>ĐỊA ĐIỂM:</Text> {event.diaDiem}</Text>
        <Text style={styles.info}><Text style={styles.label}>GIÁ VÉ:</Text> {parseInt(event.phiThamGia).toLocaleString()}₫</Text>
        <View style={styles.row}>
          <Text style={styles.label}>MÔ TẢ: </Text>
          <Text style={styles.description}>{event.moTa || 'Chưa có mô tả'}</Text>
        </View>
        <Text style={styles.info}>
          <Text style={styles.label}>GHẾ NGỒI:</Text> {event.luongChoNgoi}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>TRẠNG THÁI:</Text> {event.trangThaiSuKien || 'Chưa cập nhật'}
        </Text>
      

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      {/* Đánh giá sự kiện */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>ĐÁNH GIÁ SỰ KIỆN</Text>
        <Text style={styles.label}>CHỌN SỐ SAO:</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={[styles.starButton, reviewStars === star && styles.starSelected]}
              onPress={() => handleSelectStars(star)}
            >
              <Text style={styles.starText}>{star} ⭐</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>NỘI DUNG ĐÁNH GIÁ:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Nhập đánh giá chi tiết..."
          value={reviewContent}
          onChangeText={setReviewContent}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitReview}>
          <Text style={styles.submitText}>GỬI ĐÁNH GIÁ</Text>
        </TouchableOpacity>
      </View>

      {/* Đánh giá từ người khác */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>ĐÁNH GIÁ TỪ NGƯỜI KHÁC</Text>
        {reviews.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#555' }}>
            Chưa có đánh giá nào.
          </Text>
        ) : (
          reviews.map((r, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.reviewerName}>👤 {r.name}</Text>
              <Text style={styles.reviewStars}>⭐ {r.stars} sao</Text>
              <Text style={styles.reviewContent}>{r.content}</Text>
            </View>
          ))
        )}
      </View>

      {/* Modal ảnh */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Image
            source={{ uri: `${API_BASE}/sukien/get/img/${event.anhSuKien}` }}
            style={styles.fullImage}
            resizeMode="contain"
            onError={() => Alert.alert('Lỗi', 'Không thể tải hình ảnh sự kiện.')}
          />
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#007bff',
    textTransform: 'uppercase',
  },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  fullImage: { width: '100%', height: '100%' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  label: { fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', color: '#222' },
  info: { fontSize: 16, marginBottom: 10 },
  description: {
    fontSize: 16,
    color: '#444',
    flexShrink: 1,
    flex: 1,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  registerBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  registerText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
  },
  submitText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  reviewItem: {
    backgroundColor: '#eef1f7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewerName: { fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
  reviewStars: { color: '#e67e22', fontSize: 17, marginBottom: 6 },
  reviewContent: { color: '#333', fontSize: 16, lineHeight: 22 },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  starButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  starSelected: {
    backgroundColor: '#ffd700',
  },
  starText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});