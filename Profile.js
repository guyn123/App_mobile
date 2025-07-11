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
import ThongtinProfile from './Thongtinprofile';

export default function ProfilePP() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([{ username: 'admin', password: '123456' }]);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setIsLoggedIn(true);
      Alert.alert('Đăng nhập thành công!');
    } else {
      Alert.alert('Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    const exists = users.some((u) => u.username === username);
    if (exists) {
      Alert.alert('Tên đăng nhập đã tồn tại!');
    } else {
      setUsers([...users, { username, password }]);
      Alert.alert('Đăng ký thành công!');
      setActiveTab('login');
    }
  };

  const RadioOption = ({ label, value }) => (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => setGender(value)}>
      <View style={[styles.radioCircle, gender === value && styles.radioChecked]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderForgotPasswordForm = () => (
    <View style={styles.centeredContainer}>
      <View style={styles.formBox}>
        <Text style={styles.sectionTitle}>Quên mật khẩu</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email đã đăng ký"
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => setShowResetForm(true)}
        >
          <Text style={styles.btnText}>Gửi yêu cầu đặt lại mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setForgotPassword(false); setShowResetForm(false); }}>
          <Text style={styles.backText}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResetPasswordForm = () => (
    <View style={styles.centeredContainer}>
      <View style={styles.formBox}>
        <Text style={styles.sectionTitle}>Đặt lại mật khẩu</Text>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry
        />
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            Alert.alert("Thành công", "Mật khẩu đã được đặt lại!");
            setForgotPassword(false);
            setShowResetForm(false);
          }}
        >
          <Text style={styles.btnText}>Đặt lại mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setForgotPassword(false); setShowResetForm(false); }}>
          <Text style={styles.backText}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLoginOrRegister = () => (
    <View style={styles.centeredContainer}>
      <Image
        source={require('./assets/img/banners/original.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.formBox}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'login' && styles.tabActive]}
            onPress={() => setActiveTab('login')}>
            <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'register' && styles.tabActive]}
            onPress={() => setActiveTab('register')}>
            <Text style={[styles.tabText, activeTab === 'register' && styles.tabTextActive]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'login' ? (
          <>
            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForgotPassword(true)}>
              <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput style={styles.input} placeholder="Họ và tên" />

            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Xác nhận mật khẩu *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
            />

            <Text style={styles.label}>Giới tính *</Text>
            <View style={styles.radioGroup}>
              <RadioOption label="Nam" value="Nam" />
              <RadioOption label="Nữ" value="Nữ" />
            </View>

            <Text style={styles.label}>Tuổi *</Text>
            <TextInput style={styles.input} placeholder="Tuổi" keyboardType="numeric" />

            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

            <Text style={styles.label}>Số điện thoại *</Text>
            <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" />

            <Text style={styles.label}>Địa chỉ *</Text>
            <TextInput style={styles.input} placeholder="Địa chỉ" />

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: '#007bff' }]}
              onPress={handleRegister}
            >
              <Text style={styles.btnText}>Đăng ký</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {!isLoggedIn ? (
          forgotPassword ? (
            showResetForm ? renderResetPasswordForm() : renderForgotPasswordForm()
          ) : (
            renderLoginOrRegister()
          )
        ) : (
          <ThongtinProfile username={username} onLogout={() => setIsLoggedIn(false)} />
        )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  tabActive: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
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
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
  forgotLink: {
    color: '#007bff',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 12,
  },
  backText: {
    marginTop: 16,
    color: '#007bff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
});