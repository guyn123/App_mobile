// ✅ FILE: Account.js (đã hoàn chỉnh và lưu đầy đủ thông tin đăng ký)
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountA({ setIsLoggedIn, setUsername, users, setUsers }) {
  const [activeTab, setActiveTab] = useState('login');
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [soTuoi, setSoTuoi] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    const found = users.find(
      (u) => u.username === tenDangNhap && u.password === matKhau
    );
    if (found) {
      setIsLoggedIn(true);
      setUsername(tenDangNhap);
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      navigation.navigate('Quaylai');
    } else {
      Alert.alert('Thất bại', 'Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  const handleRegister = () => {
    if (!tenDangNhap || !matKhau || !xacNhanMatKhau || !hoTen || !gioiTinh || !soTuoi || !email || !phone || !diaChi) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (matKhau !== xacNhanMatKhau) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    const exists = users.some(u => u.username === tenDangNhap);
    if (exists) {
      Alert.alert('Lỗi', 'Tên đăng nhập đã tồn tại');
      return;
    }
    setUsers([
      ...users,
      { username: tenDangNhap, password: matKhau, hoTen, gioiTinh, soTuoi, email, phone, diaChi }
    ]);
    Alert.alert('Thành công', 'Đăng ký thành công!');
    setActiveTab('login');
  };

  const RadioOption = ({ label, value }) => (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => setGioiTinh(value)}>
      <View style={[styles.radioCircle, gioiTinh === value && styles.radioChecked]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.centeredContainer}>
          <Image
            source={require('./assets/img/banners/original.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.formBox}>
            {forgotPassword ? (
              showResetForm ? (
                <>
                  <Text style={styles.sectionTitle}>Đặt lại mật khẩu</Text>
                  <Text style={styles.label}>Mật khẩu mới</Text>
                  <TextInput style={styles.input} placeholder="Nhập mật khẩu mới" secureTextEntry />
                  <Text style={styles.label}>Xác nhận mật khẩu</Text>
                  <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" secureTextEntry />
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => {
                      Alert.alert('Thành công', 'Mật khẩu đã được đặt lại!');
                      setForgotPassword(false);
                      setShowResetForm(false);
                    }}>
                    <Text style={styles.btnText}>Đặt lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setForgotPassword(false); setShowResetForm(false); }}>
                    <Text style={styles.forgotLink}>← Quay trở lại </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.sectionTitle}>Quên mật khẩu</Text>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập email đã đăng ký"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => setShowResetForm(true)}>
                    <Text style={styles.btnText}>Gửi yêu cầu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setForgotPassword(false)}>
                    <Text style={styles.forgotLink}>← Quay trở lại </Text>
                  </TouchableOpacity>
                </>
              )
            ) : (
              <>
                <View style={styles.tabs}>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'login' && styles.tabActive]}
                    onPress={() => setActiveTab('login')}>
                    <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'register' && styles.tabActive]}
                    onPress={() => setActiveTab('register')}>
                    <Text style={[styles.tabText, activeTab === 'register' && styles.tabTextActive]}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>

                {activeTab === 'login' ? (
                  <>
                    <Text style={styles.label}>Tên đăng nhập</Text>
                    <TextInput style={styles.input} value={tenDangNhap} onChangeText={setTenDangNhap} />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput style={styles.input} value={matKhau} onChangeText={setMatKhau} secureTextEntry />
                    <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
                      <Text style={styles.btnText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setForgotPassword(true)}>
                      <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.label}>Họ và tên</Text>
                    <TextInput style={styles.input} value={hoTen} onChangeText={setHoTen} />
                    <Text style={styles.label}>Tên đăng nhập</Text>
                    <TextInput style={styles.input} value={tenDangNhap} onChangeText={setTenDangNhap} />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput style={styles.input} value={matKhau} onChangeText={setMatKhau} secureTextEntry />
                    <Text style={styles.label}>Xác nhận mật khẩu</Text>
                    <TextInput style={styles.input} value={xacNhanMatKhau} onChangeText={setXacNhanMatKhau} secureTextEntry />
                    <Text style={styles.label}>Giới tính</Text>
                    <View style={styles.radioGroup}>
                      <RadioOption label="Nam" value="Nam" />
                      <RadioOption label="Nữ" value="Nữ" />
                    </View>
                    <Text style={styles.label}>Tuổi</Text>
                    <TextInput style={styles.input} value={soTuoi} onChangeText={setSoTuoi} keyboardType="numeric" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <Text style={styles.label}>Số điện thoại</Text>
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <Text style={styles.label}>Địa chỉ</Text>
                    <TextInput style={styles.input} value={diaChi} onChangeText={setDiaChi} />
                    <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#007bff' }]} onPress={handleRegister}>
                      <Text style={styles.btnText}>Đăng ký</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f4f4' },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 160,
    height: 60,
    marginBottom: 20,
  },
  formBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  tabActive: { backgroundColor: '#007bff' },
  tabText: { fontWeight: 'bold', color: '#333' },
  tabTextActive: { color: '#fff' },
  label: { marginTop: 10, marginBottom: 4, fontSize: 14, fontWeight: '500' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  forgotLink: { color: '#007bff', fontSize: 14, marginTop: 10, marginLeft:240 },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 6,
  },
  radioChecked: {
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 14,
  },
  sectionTitle: {
  fontSize: 20,              // hoặc lớn hơn tùy ý
  fontWeight: '800',         // mạnh hơn 'bold', gần như in đậm tuyệt đối
  color: '#0c0f11ff',
  marginBottom: 10,
  textAlign: 'center',
},

});