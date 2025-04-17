import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import NotificationService from '../services/NotificationService';

const NotificationDisplay = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = NotificationService.addListener(setNotifications);
    NotificationService.init();
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.foodName}>{item.foodName}</Text>
      <Text>Original: ${item.originalPrice.toFixed(2)}</Text>
      <Text style={styles.discountPrice}>
        Discounted: ${item.discountedPrice.toFixed(2)}
      </Text>
      <Text>Location: {item.restaurantLocation.lat}, {item.restaurantLocation.lng}</Text>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discountPrice: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default NotificationDisplay;
