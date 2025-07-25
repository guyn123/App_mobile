// ✅ FILE: Profile.js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ThongtinProfile from './ProfileInformation';

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
});
