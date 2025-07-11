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

/**
 * Thông tin Profile – hiển thị
 * 1. Trang chính (avatar + các mục)
 * 2. Trang con: Thông tin cá nhân / Đổi mật khẩu / Lịch sử giao dịch
 *    – Lịch sử giao dịch có 2 tầng: danh sách & chi tiết giao dịch
 */
export default function ThongtinProfile({ onLogout, username = 'Lê Anh Quân' }) {
  const [gender, setGender] = useState('');
  const [activeSection, setActiveSection] = useState(null); // null | 'personal' | 'account' | 'orders'
  const [selectedOrder, setSelectedOrder] = useState(null); // null | order object

  // Dummy dữ liệu đơn hàng
  const orders = [
    {
      id: 'GD001',
      category: 'tech',
      title: 'Hội thảo AI',
      bookingTime: '14/04/2025 | 23:15',
      start: '15/04/2025 | 08:00',
      end: '15/04/2025 | 17:00',
      location: 'Hà Nội',
      price: '150.000₫',
      description: 'Sự kiện cập nhật xu hướng AI mới nhất.',
      totalSeats: 100,
      bookedSeats: 90,
      maGhe: 49,
      maVe: 'ABCXYZ',
    },
    {
      id: 'GD002',
      category: 'tech',
      title: 'Triển lãm CNTT',
      bookingTime: '10/07/2025 | 09:00',
      start: '20/07/2025 | 09:00',
      end: '22/07/2025 | 17:00',
      location: 'TP.HCM',
      price: '100.000₫',
      description: 'Trưng bày sản phẩm và giải pháp CNTT tiên tiến.',
      totalSeats: 200,
      bookedSeats: 145,
      maGhe: 46,
      maVe: 'ABCXYZ',

    },
  ];

  /* ---------------------------- COMPONENTS ---------------------------- */
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

  /** Back button xử lý hai trường hợp
   * 1. Đang ở trang chi tiết order -> quay về danh sách orders
   * 2. Đang ở trang con khác -> quay về trang chính
   */
  const handleBack = () => {
    if (selectedOrder) {
      setSelectedOrder(null); // quay lại danh sách
    } else {
      setActiveSection(null); // quay lại trang chính
    }
  };

  /* ---------------------------- RENDER ---------------------------- */
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
      // # Chi tiết giao dịch
      return renderSectionWrapper('CHI TIẾT GIAO DỊCH', (
        <View style={styles.orderDetailBox}>
          <Text style={styles.orderTitle}>{selectedOrder.title}</Text>
          <Text style={styles.orderSubInfo}>Mã giao dịch: {selectedOrder.id}</Text>
          <Text style={styles.orderSubInfo}>Đặt lúc: {selectedOrder.bookingTime}</Text>
          <Text style={styles.orderSubInfo}>Địa điểm: {selectedOrder.location}</Text>
          <Text style={styles.orderSubInfo}>Bắt đầu: {selectedOrder.start}</Text>
          <Text style={styles.orderSubInfo}>Kết thúc: {selectedOrder.end}</Text>
          <Text style={styles.orderSubInfo}>Mã Ghế: {selectedOrder.maGhe}</Text>
          <Text style={styles.orderSubInfo}>Mô tả: {selectedOrder.description}</Text>
          
          <Text style={[styles.ordermaVe, { marginTop: 12,textAlign: 'center',fontSize: 20, }]}>Mã Vé: {selectedOrder.maVe}</Text>
          <Text style={[styles.orderPrice, { marginTop: 12,textAlign: 'center' }]}>Tổng tiền: {selectedOrder.price}</Text>
          
        </View>
      ));
    }
    // # Danh sách giao dịch
    return renderSectionWrapper('LỊCH SỬ GIAO DỊCH', (
      <>
        {orders.map(order => (
          <TouchableOpacity key={order.id} style={styles.orderCard} onPress={() => setSelectedOrder(order)}>
            <View style={styles.orderLeft}>
              <Text style={styles.orderTitle}>{order.title}</Text>
              <Text style={styles.orderSubInfo}>Đặt lúc: {order.bookingTime}</Text>
              <Text style={styles.orderSubInfo}>{order.location}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderPrice}>{order.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
            <TouchableOpacity style={styles.saveBtn}><Text style={styles.btnText}>Lưu thông tin</Text></TouchableOpacity>
          </>
        ));
      case 'account':
        return renderSectionWrapper('ĐỔI MẬT KHẨU', (
          <>
            <Input label="Mật khẩu hiện tại" secureTextEntry />
            <Input label="Mật khẩu mới" secureTextEntry />
            <Input label="Nhập lại mật khẩu mới" secureTextEntry />
            <TouchableOpacity style={styles.saveBtn}><Text style={styles.btnText}>Đổi mật khẩu</Text></TouchableOpacity>
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
