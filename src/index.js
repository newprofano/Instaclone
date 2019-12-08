import React from 'react';
import {StatusBar, YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Each child in a list'])

import Routes from './routes'

export default function App(){
    return (
        <>
        <StatusBar barStyle ="dark-content" backgroundColor='#f5f5f5'></StatusBar>
        <Routes/>
        </>
    );
}