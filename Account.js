import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountA() {
  const [activeTab, setActiveTab] = useState('login');
  const [agree, setAgree] = useState(false);
  const [gender, setGender] = useState('');
  const navigation = useNavigation();

  const RadioOption = ({ label, value }) => (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => setGender(value)}>
      <View style={[styles.radioCircle, gender === value && styles.radioChecked]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/img/banners/original.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Quay lại</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Tabs */}
<View style={styles.tabs}>
  <TouchableOpacity
    style={[
      styles.tab,
      activeTab === 'login' ? styles.tabActive : styles.tabInactive,
    ]}
    onPress={() => setActiveTab('login')}
  >
    <Text style={[
      styles.tabText,
      activeTab === 'login' && styles.tabTextActive
    ]}>Đăng nhập</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.tab,
      activeTab === 'register' ? styles.tabActive : styles.tabInactive,
    ]}
    onPress={() => setActiveTab('register')}
  >
    <Text style={[
      styles.tabText,
      activeTab === 'register' && styles.tabTextActive
    ]}>Đăng ký</Text>
  </TouchableOpacity>
</View>


        {/* Nội dung form */}
        {activeTab === 'login' ? (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Đăng nhập</Text>
            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput style={styles.input} placeholder="Tên đăng nhập" />
            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry />

            <TouchableOpacity style={styles.linkBtn}>
              <Text style={styles.link}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={() => Alert.alert('Đăng nhập', 'Thành công!')}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.formTitle}>Đăng ký</Text>

            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput style={styles.input} placeholder="Họ và tên" />

            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput style={styles.input} placeholder="Tên đăng nhập" />

            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry />

            <Text style={styles.label}>Xác nhận mật khẩu *</Text>
            <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" secureTextEntry />

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
              onPress={() => Alert.alert('Đăng ký', 'Đăng ký thành công!')}
            >
              <Text style={styles.btnText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f4f4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8ebad3',
    padding: 10,
  },
  logo: { width: 120, height: 50 },
  backBtn: {
    marginLeft: 'auto',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#005f8d',
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    gap: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
  },
  tabInactive: {
  backgroundColor: '#8ebad3', // Màu nền chung khi chưa chọn
},
  tabActive: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
  linkBtn: {
    alignItems: 'flex-end',
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
});
