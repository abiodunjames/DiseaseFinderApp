import React from 'react';
import CameraPage from './src/camera.page';
import Amplify from 'aws-amplify';
import awsconfig from './aws.config';
Amplify.configure(awsconfig);
export default class App extends React.Component {
    render() {
        return (
            <CameraPage />
        );
    };
};