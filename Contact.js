import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ContactCC() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert('Cảm ơn bạn đã gửi liên hệ!');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Thông tin liên hệ */}
        <View style={styles.contactInfo}>
          <InfoItem icon="map-marker-alt" label="ĐỊA CHỈ" value="372B Xã Đàn, Nam Đồng, Đống Đa, Hà Nội" />
          <InfoItem icon="phone" label="ĐIỆN THOẠI" value="082 8061 555" onPress={() => Linking.openURL('tel:0828061555')} />
          <InfoItem icon="envelope" label="EMAIL" value="sukien@gmail.com" onPress={() => Linking.openURL('mailto:sukien@gmail.com')} />
          <InfoItem icon="globe" label="WEBSITE" value="event.com" onPress={() => Linking.openURL('https://event.com')} />
        </View>

        {/* Form liên hệ */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>GỬI THÔNG TIN LIÊN HỆ ĐẾN TRUNG TÂM SỰ KIỆN</Text>

          <InputField icon="user" placeholder="Họ tên (*)" value={name} onChangeText={setName} />
          <InputField icon="envelope" placeholder="Email (*)" value={email} onChangeText={setEmail} />
          <InputField icon="tag" placeholder="Tiêu đề liên hệ (*)" value={subject} onChangeText={setSubject} />
          <InputField
            icon="comment-alt"
            placeholder="Nội dung (*)"
            value={message}
            onChangeText={setMessage}
            multiline={true}
          />

          <Text style={styles.note}>
            (*): là các phần quý khách hàng bắt buộc phải điền. Xin cảm ơn!
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSend}>
              <Text style={styles.buttonText}>GỬI LIÊN HỆ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.buttonText}>XÓA NỘI DUNG</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>TRUNG TÂM SỰ KIỆN N3</Text>
          <Text style={styles.mapAddress}>
            372B P. Xã Đàn, Nam Đồng, Đống Đa, Hà Nội 100000
          </Text>
          <Text
            style={styles.mapLink}
            onPress={() =>
              Linking.openURL('https://www.google.com/maps?q=21.017346,105.829918&z=16')
            }
          >
            Xem bản đồ lớn hơn →
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ========== Sub-components ========== //

const InfoItem = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.infoItem} onPress={onPress}>
    <FontAwesome5 name={icon} size={20} style={styles.infoIcon} />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </TouchableOpacity>
);

const InputField = ({ icon, placeholder, value, onChangeText, multiline }) => (
  <View style={styles.inputGroup}>
    <FontAwesome5 name={icon} size={18} style={styles.inputIcon} />
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  </View>
);

// ========== Styles ========== //

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    padding: 16,
  },
  contactInfo: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  infoIcon: {
    marginRight: 12,
    color: '#333',
    width: 24,
    textAlign: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoValue: {
    color: '#555',
    fontSize: 14,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 1,
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
    color: '#555',
  },
  input: {
    flex: 1,
    height: 40,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  submitBtn: {
    backgroundColor: '#c49b33',
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetBtn: {
    backgroundColor: '#888',
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 1,
  },
  mapTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  mapAddress: {
    fontSize: 14,
    color: '#333',
  },
  mapLink: {
    color: '#1a73e8',
    marginTop: 8,
    fontSize: 14,
  },
});