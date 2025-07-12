import { eventList } from './src/data/eventData';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventE() {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isCityModalVisible, setCityModalVisible] = useState(false);
    const [selectedCityLabel, setSelectedCityLabel] = useState('Tất cả');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [maxPrice, setMaxPrice] = useState(5000000);
    const [selectedCity, setSelectedCity] = useState('all');

    const filteredEvents = eventList.filter((event) => {
        const cityMatch = selectedCity === 'all' || event.location.includes(selectedCity);
        const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
        const priceMatch = parseInt(event.price) <= maxPrice;
        return cityMatch && categoryMatch && priceMatch;
    });

    const cityList = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Hà Nội', value: 'Hà Nội' },
        { label: 'TP.HCM', value: 'TP.HCM' },
        { label: 'Đà Nẵng', value: 'Đà Nẵng' },
        { label: 'Huế', value: 'Huế' },
    ];

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
                    />
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Tìm</Text>
                    </View>
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
                        {['all', 'music', 'tech', 'education', 'festival'].map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                                    {cat === 'all' ? 'Tất cả' :
                                        cat === 'music' ? 'Âm nhạc' :
                                        cat === 'tech' ? 'Công nghệ' :
                                        cat === 'education' ? 'Giáo dục' : 'Lễ hội'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.filterTitle}>Lọc theo giá:</Text>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={5000000}
                        step={50000}
                        value={maxPrice}
                        onValueChange={(value) => setMaxPrice(value)}
                    />
                    <Text>Giá tối đa: {maxPrice.toLocaleString()}₫</Text>

                    <Text style={styles.filterTitle}>Lọc theo thành phố:</Text>
                    <TouchableOpacity style={styles.dropdownButton} onPress={() => setCityModalVisible(true)}>
                        <Text style={styles.dropdownText}>{selectedCityLabel}</Text>
                    </TouchableOpacity>

                    <Modal visible={isCityModalVisible} transparent animationType="fade" onRequestClose={() => setCityModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                {cityList.map((city) => (
                                    <TouchableOpacity
                                        key={city.value}
                                        style={styles.modalItem}
                                        onPress={() => {
                                            setSelectedCity(city.value);
                                            setSelectedCityLabel(city.label);
                                            setCityModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.modalItemText}>{city.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        visible={!!selectedImage}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setSelectedImage(null)}
                    >
                        <TouchableOpacity style={styles.imageModalOverlay} activeOpacity={1} onPressOut={() => setSelectedImage(null)}>
                            <View style={styles.imageModalBox}>
                                {selectedImage && (
                                    <Image source={selectedImage} style={styles.imageModalImage} resizeMode="contain" />
                                )}
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>

                <View style={styles.section}>
                    <FlatList
                        data={filteredEvents}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                        contentContainerStyle={styles.eventList}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
                                    <Image source={item.image} style={styles.eventImage} />
                                </TouchableOpacity>
                                <View style={styles.cardContent}>
                                    <Text style={styles.eventTime}>🕒 {new Date(item.start).toLocaleString('vi-VN')}</Text>
                                    <Text style={styles.eventTime}>🕒 {new Date(item.end).toLocaleString('vi-VN')}</Text>
                                    <Text style={styles.eventTitle}>{item.title}</Text>
                                    <Text style={styles.eventLocation}>📍 {item.location}</Text>
                                    <Text style={styles.eventPrice}>
                                        {parseInt(item.price) > 0 ? parseInt(item.price).toLocaleString() + '₫' : '0₫'}
                                    </Text>
                                    <View style={styles.eventButtons}>
                                        <TouchableOpacity
                                            style={styles.detailButton}
                                            onPress={() => navigation.navigate('EventDetail', { event: item })}
                                        >
                                            <Text style={styles.buttonText}>Chi tiết</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.registerButton}>
                                            <Text style={styles.buttonText}>Đăng ký</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}




// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8ebad3',
  },
  logo: {
width: 120, height: 50, marginRight: 10
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
    backgroundColor: '#ccc'
  },
  sliderImage: {
width: 450, 
height: 200,
resizeMode: 'cover'
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
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
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



