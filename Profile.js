// ✅ FILE: Profile.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import ThongtinProfile from './Thongtinprofile';

export default function ProfilePP({ username = 'Người dùng', onLogout, externalOrders = [] }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
        <ThongtinProfile
          username={username}
          onLogout={onLogout}
          externalOrders={externalOrders}
        />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
});
