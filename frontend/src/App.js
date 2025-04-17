import React from 'react';
import { View, StyleSheet } from 'react-native';
import CancelOrderButton from './components/CancelOrderButton';
import NotificationDisplay from './components/NotificationDisplay';

const App = () => {
  const userId = 'user123'; // In a real app, this would come from auth
  
  const sampleOrder = {
    foodName: 'Pizza Margherita',
    originalPrice: 12.99,
    restaurantLocation: { lat: 40.7128, lng: -74.0060 },
  };

  const handleCancelSuccess = (result) => {
    console.log('Order cancelled successfully:', result);
    // You might show a success message to the user
  };

  const handleCancelError = (error) => {
    console.error('Order cancellation failed:', error);
    // You might show an error message to the user
  };

  return (
    <View style={styles.container}>
      <CancelOrderButton
        foodName={sampleOrder.foodName}
        originalPrice={sampleOrder.originalPrice}
        restaurantLocation={sampleOrder.restaurantLocation}
        userId={userId}
        onSuccess={handleCancelSuccess}
        onError={handleCancelError}
      />
      <NotificationDisplay userId={userId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
});

export default App;
