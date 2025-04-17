import React from 'react';
import { Button } from 'react-native';
import { registerDevice } from '../services/DeviceService';

const CancelOrderButton = ({ 
  foodName, 
  originalPrice,
  restaurantLocation,
  userId,
  onSuccess,
  onError 
}) => {
  const handleCancel = async () => {
    try {
      // Register device if not already done
      await registerDevice(userId);
      
      const response = await fetch('http://your-backend-url/api/cancel-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodName,
          originalPrice,
          restaurantLat: restaurantLocation.lat,
          restaurantLng: restaurantLocation.lng
        }),
      });

      const result = await response.json();
      onSuccess(result);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button
      title="Cancel Order"
      onPress={handleCancel}
    />
  );
};

export default CancelOrderButton;
