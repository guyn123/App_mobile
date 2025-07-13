import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


// Import các màn hình
import HomeS from './Home';
import EventE from './Event';
import AboutA from './About';
import ContactCC from './Contact';
import ProfilePP from './Profile';
import AccountA from './Account'; // 👈 Màn hình đăng nhập
import EventDetail from './EventDetail'; // 👈 Thêm màn hình chi tiết sự kiện
import DKEvent from './DKEvent'; // 👈 Thêm màn hình đăng ký
import SplashScreen from './SplashScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tabs chính
function QuayLai() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Event':
              iconName = 'calendar';
              break;
            case 'About':
              iconName = 'information-circle';
              break;
            case 'Contact':
              iconName = 'call';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeS} options={{ title: 'Trang chủ' }} />
      <Tab.Screen name="Event" component={EventE} options={{ title: 'Sự kiện' }} />
      <Tab.Screen name="About" component={AboutA} options={{ title: 'Giới thiệu' }} />
      <Tab.Screen name="Contact" component={ContactCC} options={{ title: 'Liên hệ' }} />
      <Tab.Screen name="Profile" component={ProfilePP} options={{ title: 'Tôi' }} />
    </Tab.Navigator>
  );
}

// App chính với Stack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} /> 
        <Stack.Screen name="Quaylai" component={QuayLai} />
        <Stack.Screen name="Account" component={AccountA} />
        <Stack.Screen name="EventDetail" component={EventDetail}options={{ headerShown: true, title: 'Chi tiết sự kiện' }}/>
        <Stack.Screen name="DKEvent" component={DKEvent} options={{ headerShown: true, title: 'Đăng ký sự kiện' }} // 👈 Tiêu đề màn hình
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
