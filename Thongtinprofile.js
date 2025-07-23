import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ThongtinProfile({ onLogout, username = 'Lê Anh Quân', externalOrders = [] }) {
  const [gender, setGender] = useState('');
  const [activeSection, setActiveSection] = useState(null); // null | 'personal' | 'account' | 'orders'
  const [selectedOrder, setSelectedOrder] = useState(null); // null | order object
  const [cauHoiText, setCauHoiText] = useState('');
  const [cauHoiDaGui, setCauHoiDaGui] = useState({});

  const Input = ({ label, placeholder, keyboardType, secureTextEntry }) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  const RadioOption = ({ label, value }) => (
    <TouchableOpacity style={styles.radioOption} onPress={() => setGender(value)}>
      <View style={[styles.radioCircle, gender === value && styles.radioChecked]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const ProfileListItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileItemLeft}>
        <Ionicons name={icon} size={24} color="#007bff" style={styles.profileItemIcon} />
        <Text style={styles.profileItemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  const handleBack = () => {
    if (selectedOrder) {
      setSelectedOrder(null);
    } else {
      setActiveSection(null);
    }
  };

  const renderSectionWrapper = (title, children) => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Text style={styles.backText}>← Quay lại</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderOrders = () => {
    if (selectedOrder) {
      const now = new Date();
      const start = new Date(selectedOrder.start);
      const end = new Date(selectedOrder.end);
      const isOngoingOrEnded = now >= start;

      return renderSectionWrapper('CHI TIẾT GIAO DỊCH', (
        <>
          <View style={styles.orderDetailBox}>
            <Text style={styles.orderTitle}>{selectedOrder.title}</Text>
            <Text style={styles.orderSubInfo}>Mã giao dịch: {selectedOrder.id}</Text>
            <Text style={styles.orderSubInfo}>Đặt lúc: {selectedOrder.bookingTime}</Text>
            <Text style={styles.orderSubInfo}>Địa điểm: {selectedOrder.location}</Text>
            <Text style={styles.orderSubInfo}>Bắt đầu: {selectedOrder.start}</Text>
            <Text style={styles.orderSubInfo}>Kết thúc: {selectedOrder.end}</Text>
            <Text style={styles.orderSubInfo}>Mã Ghế: {selectedOrder.maGhe}</Text>
            <Text style={styles.orderSubInfo}>Mô tả: {selectedOrder.description}</Text>
            <Text style={[styles.ordermaVe, { marginTop: 12, textAlign: 'center', fontSize: 20 }]}>Mã Vé: {selectedOrder.maVe}</Text>
            <Text style={[styles.orderPrice, { marginTop: 12, textAlign: 'center' }]}>Tổng tiền: {selectedOrder.price}</Text>
          </View>

          {!isOngoingOrEnded && !cauHoiDaGui[selectedOrder.id] && (
            <View style={styles.questionContainer}>
<Text
  style={{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c0f13ff',
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 50,
  }}
>
  ❓ Gửi câu hỏi cho sự kiện này:
</Text>

              <TextInput
                style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }]}
                multiline
                placeholder="Nhập nội dung câu hỏi..."
                value={cauHoiText}
                onChangeText={setCauHoiText}
              />
              <TouchableOpacity
                style={[styles.saveBtn, { marginTop: 10 }]}
                onPress={() => {
                  if (!cauHoiText.trim()) {
                    Alert.alert('Lỗi', 'Vui lòng nhập nội dung câu hỏi.');
                    return;
                  }
                  setCauHoiDaGui({ ...cauHoiDaGui, [selectedOrder.id]: true });
                  setCauHoiText('');
                  Alert.alert('Thành công', 'Câu hỏi đã được gửi!');
                }}>
                <Text style={styles.btnText}>Gửi câu hỏi</Text>
              </TouchableOpacity>
            </View>
          )}

          {cauHoiDaGui[selectedOrder.id] && (
            <Text style={[styles.label, { textAlign: 'center', marginTop: 12, color: '#28a745' }]}>✅ Bạn đã gửi câu hỏi cho sự kiện này.</Text>
          )}
        </>
      ));
    }

    return renderSectionWrapper('LỊCH SỬ GIAO DỊCH', (
      <>
        {externalOrders.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 16, color: '#999' }}>Bạn chưa có giao dịch nào.</Text>
        ) : (
          externalOrders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => setSelectedOrder(order)}>
              <View style={styles.orderLeft}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <Text style={styles.orderSubInfo}>Đặt lúc: {order.bookingTime}</Text>
                <Text style={styles.orderSubInfo}>{order.location}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderPrice}>{order.price}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </>
    ));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderSectionWrapper('THÔNG TIN CÁ NHÂN', (
          <>
            <Input label="Họ và tên" placeholder="Nhập họ tên..." />
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderRow}>
              <RadioOption label="Nam" value="Nam" />
              <RadioOption label="Nữ" value="Nữ" />
            </View>
            <Input label="Tuổi" placeholder="VD: 22" keyboardType="numeric" />
            <Input label="Email" placeholder="email@example.com" keyboardType="email-address" />
            <Input label="Số điện thoại" placeholder="098xxxxxxx" keyboardType="phone-pad" />
            <Input label="Địa chỉ" placeholder="Số nhà, đường, phường..." />
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.btnText}>Lưu thông tin</Text>
            </TouchableOpacity>
          </>
        ));
      case 'account':
        return renderSectionWrapper('ĐỔI MẬT KHẨU', (
          <>
            <Input label="Mật khẩu hiện tại" secureTextEntry />
            <Input label="Mật khẩu mới" secureTextEntry />
            <Input label="Nhập lại mật khẩu mới" secureTextEntry />
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.btnText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </>
        ));
      case 'orders':
        return renderOrders();
      default:
        return (
          <View style={styles.defaultContentContainer}>
            <View style={styles.profileHeader}>
              <Image source={require('./assets/img/avt5.jpg')} style={styles.avatar} />
              <Text style={styles.profileName}>{username}</Text>
            </View>
            <ProfileListItem icon="person-circle-outline" label="Thông tin cá nhân" onPress={() => setActiveSection('personal')} />
            <ProfileListItem icon="key-outline" label="Đổi mật khẩu" onPress={() => setActiveSection('account')} />
            <ProfileListItem icon="receipt-outline" label="Lịch sử giao dịch" onPress={() => setActiveSection('orders')} />
            <TouchableOpacity style={styles.logoutBtn} onPress={() => {
              Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Đăng xuất', style: 'destructive', onPress: onLogout },
              ]);
            }}>
              <Text style={styles.logoutBtnText}>Đăng xuất</Text>
              <Ionicons name="log-out-outline" size={24} color="#dc3545" />
            </TouchableOpacity>
          </View>
        );
    }
  };

  return <ScrollView style={styles.container}>{renderContent()}</ScrollView>;
}

// ✅ Giữ nguyên toàn bộ phần styles như trước (không thay đổi)

/* ---------------------------- STYLES ---------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  /* ====== SECTION WRAPPER ====== */
  sectionContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
    textAlign: 'center',
  },
  backBtn: { marginBottom: 12 },
  backText: { color: '#007bff', fontWeight: 'bold', fontSize: 16 },

  /* ====== INPUT ====== */
  formGroup: { marginBottom: 12 },
  label: { fontWeight: '600', fontSize: 17, marginBottom: 6 },
  input: {
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginTop: 14,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },

  /* ====== RADIO ====== */
  radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  radioCircle: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#007bff', marginRight: 6 },
  radioChecked: { backgroundColor: '#007bff' },
  radioLabel: { fontSize: 14 },
  genderRow: { flexDirection: 'row', marginBottom: 10 },

  /* ====== ORDERS LIST & DETAIL ====== */
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderLeft: { flex: 2 },
  orderRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  orderTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  orderSubInfo: { fontSize: 16, color: '#888', marginTop: 2 },
  orderPrice: { fontSize: 20, fontWeight: 'bold', color: '#007bff' },

  orderDetailBox: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /* ====== PROFILE HOME ====== */
  defaultContentContainer: { paddingTop: 0 },
  profileHeader: {
    backgroundColor: '#8ebad3',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 3, borderColor: '#fff', marginBottom: 10,
  },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 10, backgroundColor: '#fff', elevation: 2,
  },
  profileItemLeft: { flexDirection: 'row', alignItems: 'center' },
  profileItemIcon: { marginRight: 10 },
  profileItemText: { fontSize: 16, color: '#333' },

  /* ====== LOGOUT ====== */
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    margin: 16, padding: 16, borderRadius: 10,
    backgroundColor: '#fff', borderColor: '#dc3545', borderWidth: 1,
  },
  logoutBtnText: { color: '#dc3545', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
});