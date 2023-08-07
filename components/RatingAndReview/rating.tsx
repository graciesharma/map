import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const RatingAndReviewModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const handleRateAndReview = () => {
    setModalVisible(true);
  };

  const handleRatingComplete = (rating) => {
    // You can use the 'rating' value to submit the user's review/rating to your backend or handle it as needed.
    setRating(rating);
    setModalVisible(false);
    // You can also trigger any additional actions or display a thank-you message after the user submits their rating.
  };

  return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <TouchableOpacity onPress={handleRateAndReview}>
    //       <Text>Rate and Review</Text>
    //     </TouchableOpacity>

    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => setModalVisible(false)}
    // >
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Rate and Review</Text>
        <AirbnbRating
          count={5}
          defaultRating={rating}
          showRating={false}
          onFinishRating={handleRatingComplete}
        />
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={{ color: "blue", marginTop: 20 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </Modal>
    //   </View>
  );
};

export default RatingAndReviewModal;
