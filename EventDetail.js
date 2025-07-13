import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventDetail({ route }) {
  const { event, username } = route.params;
  const [reviewStars, setReviewStars] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

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

  return (
    <ScrollView style={styles.container}>
      {/* Chi tiết sự kiện */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={event.image} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.info}><Text style={styles.label}>BẮT ĐẦU:</Text> {new Date(event.start).toLocaleString('vi-VN')}</Text>
        <Text style={styles.info}><Text style={styles.label}>KẾT THÚC:</Text> {new Date(event.end).toLocaleString('vi-VN')}</Text>
        <Text style={styles.info}><Text style={styles.label}>ĐỊA ĐIỂM:</Text> {event.location}</Text>
        <Text style={styles.info}><Text style={styles.label}>GIÁ VÉ:</Text> {parseInt(event.price).toLocaleString()}₫</Text>
        <View style={styles.row}>
          <Text style={styles.label}>MÔ TẢ: </Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
        <Text style={styles.info}><Text style={styles.label}>GHẾ NGỒI:</Text> {event.bookedSeats}/{event.totalSeats}</Text>
        <Text style={styles.info}><Text style={styles.label}>TRẠNG THÁI:</Text> {event.status || 'Chưa cập nhật'}</Text>
<TouchableOpacity
  style={styles.registerBtn}
  onPress={() => navigation.navigate('DKEvent', { id: event.id })}
>
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
        {reviews.map((r, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewerName}>👤 {r.name}</Text>
            <Text style={styles.reviewStars}>⭐ {r.stars} sao</Text>
            <Text style={styles.reviewContent}>{r.content}</Text>
          </View>
        ))}
      </View>

      {/* Modal ảnh */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Image source={event.image} style={styles.fullImage} resizeMode="contain" />
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