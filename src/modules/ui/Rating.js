import { View, Text } from 'react-native'
import React from 'react'
import { AirbnbRating } from 'react-native-ratings';
export const RatingUi = (props) => {
    const { input, titlerating } = props

    const ratingCompleted = (rating) => {
        input.onChange(rating * 20)
    }
    return (
        <View>
            <Text>{titlerating}</Text>
            <AirbnbRating
                count={5}
                reviews={["Bad", "Fair", "Good", "Very Good", "Excellent",]}
                defaultRating={0}
                size={40}
                onFinishRating={ratingCompleted}
            />
        </View>
    )
}
