import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import styles from './styles';

export default ({captures=[]}) => (
    <ScrollView 
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]} 
    >
        {captures.map(({data:{uri}, status }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} borderColor= {status? 'green': 'red'} />
            </View>
        ))}
    </ScrollView>
);