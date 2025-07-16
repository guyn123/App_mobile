// ✅ FILE: App.js
import React, { useState } from 'react';
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
import AccountA from './Account';
import EventDetail from './EventDetail';
import DKEvent from './DKEvent';
import SplashScreen from './SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([{ username: 'admin', password: '123456' }]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const QuayLai = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Event': iconName = 'calendar'; break;
            case 'About': iconName = 'information-circle'; break;
            case 'Contact': iconName = 'call'; break;
            case 'Profile': iconName = 'person'; break;
            default: iconName = 'help';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
<Tab.Screen
  name="Home"
  children={() => (
    <HomeS isLoggedIn={isLoggedIn} username={username} />
  )}
  options={{ title: 'Trang chủ' }}
/>
      <Tab.Screen
        name="Event"
        children={() => (
          <EventE isLoggedIn={isLoggedIn} username={username} />
        )}
        options={{ title: 'Sự kiện' }}
      />
      <Tab.Screen name="About" component={AboutA} options={{ title: 'Giới thiệu' }} />
      <Tab.Screen name="Contact" component={ContactCC} options={{ title: 'Liên hệ' }} />
      <Tab.Screen
        name="Profile"
        children={() =>
          isLoggedIn ? (
            <ProfilePP
              username={username}
              onLogout={() => {
                setIsLoggedIn(false);
                setUsername('');
              }}
              externalOrders={orders}
            />
          ) : (
            <AccountA
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              users={users}
              setUsers={setUsers}
            />
          )
        }
        options={{ title: 'Tôi' }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Quaylai" component={QuayLai} />
        <Stack.Screen name="Account">
          {() => (
            <AccountA
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              users={users}
              setUsers={setUsers}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="EventDetail"
          children={({ route }) => (
            <EventDetail route={route} username={username} />
          )}
          options={{ headerShown: true, title: 'Chi tiết sự kiện' }}
        />
        <Stack.Screen
          name="DKEvent"
          children={({ route }) => (
            <DKEvent
              route={route}
              username={username}
              isLoggedIn={isLoggedIn}
              addOrder={addOrder}
            />
          )}
          options={{ headerShown: true, title: 'Đăng ký sự kiện' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
