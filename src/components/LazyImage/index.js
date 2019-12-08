import React from 'react';

import {Animated} from 'react-native'

import {Small, Original} from './styles'

const OriginalAnimated = Animated.createAnimatedComponent(Original);
const opacity = new Animated.Value(0);

export default function LazyImage({
    smallSource,
    source,
    aspectRatio,
    
}){

    function handleAnimate(){
        Animated.timing(opacity,{
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    return(
        <Small
            resizeMode="contain"
            source={smallSource}
            ratio={aspectRatio}
            blurRadius={1}
        >
            <OriginalAnimated
            style={{opacity}}
            resizeMode="contain"
            source = {source}
            ratio = {aspectRatio}
            onLoadEnd={handleAnimate}
            />
        </Small>
    );
}