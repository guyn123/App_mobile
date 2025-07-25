import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import API_BASE from './src/api';
export default function EventE({ isLoggedIn, username }) {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // maDanhMuc or null
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/danhmucsukien/get/all`, {
        params: { page: 0, size: 100 },
      });
      const fetchedCategories = response.data.content || [];
      setCategories([{ maDanhMuc: null, tenDanhMuc: 'Tất cả' }, ...fetchedCategories]);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Không thể tải danh mục sự kiện.');
    }
  }, [API_BASE]);

  const fetchStatuses = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/sukien/get/all`, {
        params: { page: 0, size: 100 },
      });
      const events = response.data.content || [];
      const uniqueStatuses = [...new Set(events.map(event => event.trangThaiSuKien))];
      const statusOptions = [
        { value: null, label: 'Tất cả' },
        ...uniqueStatuses.map(status => ({ value: status, label: status })),
      ];
      setStatuses(statusOptions);
      console.log('Fetched statuses:', statusOptions);
    } catch (error) {
      console.error('Lỗi khi lấy trạng thái:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Không thể tải danh sách trạng thái.');
      setStatuses([{ value: null, label: 'Tất cả' }]);
    }
  }, [API_BASE]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: 0,
        size: 20,
        maDanhMuc: selectedCategory || null,
        search: searchKeyword || null,
        trangThai: selectedStatus || null,
        costStart: minPrice,
        costEnd: maxPrice,
      };

      const response = await axios.get(`${API_BASE}/sukien/get/all`, {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (params[key] !== null) {
              searchParams.append(key, params[key]);
            }
          }
          return searchParams.toString();
        },
      });

      const fetchedEvents = response.data.content || [];
      console.log('Fetched events:', fetchedEvents.map(e => e.maSuKien));
      console.log('Applied filters:', { selectedCategory, searchKeyword, selectedStatus, minPrice, maxPrice });
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Lỗi khi lấy sự kiện:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Không thể tải danh sách sự kiện.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE, selectedCategory, searchKeyword, selectedStatus, minPrice, maxPrice]);

  useEffect(() => {
    fetchCategories();
    fetchStatuses();
  }, [fetchCategories, fetchStatuses]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useFocusEffect(
    useCallback(() => {
      setSearchKeyword('');
      setSelectedCategory(null);
      setMinPrice(0);
      setMaxPrice(2000000);
      setSelectedStatus(null);
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('./assets/img/banners/original.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sự kiện..."
            placeholderTextColor="#666"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            onSubmitEditing={fetchEvents}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchEvents}>
            <Text style={styles.searchButtonText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal pagingEnabled style={styles.slider}>
          <Image
            source={require('./assets/img/1-van-lang-17030396662872128757935.jpg')}
            style={styles.sliderImage}
          />
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.filterTitle}>Danh mục:</Text>
          <View style={styles.categoryList}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.maDanhMuc || 'all'}
                style={[styles.categoryButton, selectedCategory === cat.maDanhMuc && styles.categoryButtonActive]}
                onPress={() => setSelectedCategory(cat.maDanhMuc)}
              >
                <Text style={[styles.categoryText, selectedCategory === cat.maDanhMuc && styles.categoryTextActive]}>
                  {cat.tenDanhMuc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Lọc theo giá:</Text>
          <Text>Giá tối thiểu: {minPrice.toLocaleString()}₫</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={2000000}
            step={10000}
            value={minPrice}
            onValueChange={(value) => {
              if (value <= maxPrice) setMinPrice(value);
              else Alert.alert('Lỗi', 'Giá tối thiểu không thể lớn hơn giá tối đa.');
            }}
          />
          <Text>Giá tối đa: {maxPrice.toLocaleString()}₫</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={2000000}
            step={10000}
            value={maxPrice}
            onValueChange={(value) => {
              if (value >= minPrice) setMaxPrice(value);
              else Alert.alert('Lỗi', 'Giá tối đa không thể nhỏ hơn giá tối thiểu.');
            }}
          />

          <Text style={styles.filterTitle}>Lọc theo trạng thái:</Text>
          <View style={styles.categoryList}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status.value || 'all'}
                style={[styles.categoryButton, selectedStatus === status.value && styles.categoryButtonActive]}
                onPress={() => setSelectedStatus(status.value)}
              >
                <Text style={[styles.categoryText, selectedStatus === status.value && styles.categoryTextActive]}>
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          {loading ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' }}>
              Đang tải...
            </Text>
          ) : events.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' }}>
              Không có sự kiện nào để hiển thị.
            </Text>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.maSuKien.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.eventList}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => {
                const now = new Date();
                const start = new Date(item.ngayBatDau);
                const end = new Date(item.ngayKetThuc);
                const isEnded = now > end;
                const isHappening = now >= start && now <= end;

                return (
                  <View style={styles.card}>
                    <TouchableOpacity
                      onPress={() => setSelectedImage({ uri: `${API_BASE}/sukien/get/img/${item.anhSuKien}` })}
                    >
                      <Image
                        source={{ uri: `${API_BASE}/sukien/get/img/${item.anhSuKien}` }}
                        style={styles.eventImage}
                      />
                    </TouchableOpacity>
                    <View style={styles.cardContent}>
                      <Text style={styles.eventTime}>🕒 {new Date(item.ngayBatDau).toLocaleString('vi-VN')}</Text>
                      <Text style={styles.eventTime}>🕒 {new Date(item.ngayKetThuc).toLocaleString('vi-VN')}</Text>
                      <Text style={styles.eventTitle}>{item.tenSuKien}</Text>
                      <Text style={styles.eventLocation}>📍 {item.diaDiem}</Text>
                      <Text style={styles.eventPrice}>{parseInt(item.phiThamGia).toLocaleString()}₫</Text>
                      <View style={styles.eventButtons}>
                        <TouchableOpacity
                          style={styles.detailButton}
                          onPress={() => navigation.navigate('EventDetail', { id: item.maSuKien })}
                        >
                          <Text style={styles.buttonText}>Chi tiết</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.registerButton}
                          onPress={() => {
                            if (!isLoggedIn) {
                              Alert.alert('Thông báo', 'Bạn cần đăng nhập để đăng ký!');
                            } else if (isEnded) {
                              Alert.alert('Không thể đăng ký', 'Sự kiện đã kết thúc!');
                            } else if (isHappening) {
                              Alert.alert('Không thể đăng ký', 'Sự kiện đang diễn ra!');
                            } else if (item.trangThaiSuKien === 'Hết chỗ' || item.trangThaiSuKien === 'Hết hạn đăng ký') {
                              Alert.alert('Không thể đăng ký', `Sự kiện ${item.trangThaiSuKien.toLowerCase()}!`);
                            } else {
                              navigation.navigate('DKEvent', { id: item.maSuKien });
                            }
                          }}
                        >
                          <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <TouchableOpacity style={styles.imageModalOverlay} activeOpacity={1} onPressOut={() => setSelectedImage(null)}>
          <View style={styles.imageModalBox}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.imageModalImage} resizeMode="contain" />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8ebad3',
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#005f8d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  section: {
    padding: 16,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
  },
  eventList: {
    paddingBottom: 12,
  },
  card: {
    width: (Dimensions.get('window').width - 48) / 2,
    backgroundColor: '#e5edfb',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 12,
  },
  eventTime: {
    fontSize: 14,
    color: '#444',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#E91E63',
  },
  eventButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  registerButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalBox: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  imageModalImage: {
    width: '100%',
    height: '100%',
  },
});