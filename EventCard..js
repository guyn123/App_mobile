import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ title, image, start, end, location, price, description }) => {
  const navigation = useNavigation();

  const eventData = { title, image, start, end, location, price, description };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.meta}>📅 Bắt đầu: {new Date(start).toLocaleString('vi-VN')}</Text>
        <Text style={styles.meta}>📅 Kết thúc: {new Date(end).toLocaleString('vi-VN')}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>📍 {location}</Text>
        <Text style={styles.price}>
          {parseInt(price) > 0 ? `${parseInt(price).toLocaleString()}₫` : '0₫'}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('EventDetail', { event: eventData })}
          >
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#e5edfb',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#444',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: '#555',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
});
