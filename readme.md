Disease Finder Machine Learning API | Facebook AI Hackathon - PyTorch & React Native
-----------------------------------

![Build Status](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiUDQ5ZnlQYm1QUlNNdURURlVkY0lobDR4Q0w4eitzcjNUTTRFRit5bUZjYTRkZWhieERvU1lHcHY0T1ZuVE9GWnNmcTQ3aWhadVJybGlEQndCZWNENHU0PSIsIml2UGFyYW1ldGVyU3BlYyI6ImFWYXhYeXpHd0huZkNvZkUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)


### Description
This repository contains source code for mobile app we built for this hackathon.  If you're looking for the backend source code, please [go here](https://github.com/OElesin/disease-finder-api). 

### Built With
- **Infrastructure**: [Amazon Web Services SageMaker](https://aws.amazon.com/sagemaker/)
- **Deep Learning Library**: [PyTorch](https://pytorch.org/), transfer learning with pretrained [ResNet18](https://download.pytorch.org/models/resnet18-5c106cde.pth)
- **Training Dataset**: [PlantVillage Disease Classification Challenge - Color Images](https://zenodo.org/record/1204914#.Xk93uBNKjPB)
- **React Native**[React Native]()

![Image](https://res.cloudinary.com/samueljames/image/upload/v1582483840/Untitled_Diagram_7.png)

### Team Members:
- [Samuel James](https://www.linkedin.com/in/samuel-james-abiodun/?originalSubdomain=de)
- [Emmanuel Adigun](https://www.linkedin.com/in/emmanuel-adigun-20202b70/?originalSubdomain=ng)
- [Olalekan Elesin](https://www.linkedin.com/in/elesinolalekan/)


### Challenges:
- Currently, we had access to dataset containing images of leaves. This alone limits the performance of the model as it would not be able to classify the fruits. We hope to collect data on the fruits and improve on the performance of the model.
- Expensive but affordable to train on GPU due to infrastructure cost. This is because GPU even though on the cloud do not come cheap.
- Deployment might also be expensive. However, we hosted the model for free on [Heroku](https://www.heroku.com/). If the project at some point starts generating revenue, we will move to scale the deployment on [AWS SageMaker](https://aws.amazon.com/sagemaker/).
- React Native does not support capturing frames from a live camera. We used `Accelerometer` as a workaround for this.  [Accelerometer](https://docs.expo.io/versions/latest/sdk/accelerometer/) provides access to the device accelerometer sensor(s) and associated listeners to respond to changes in acceleration in 3d space, meaning any movement or vibration.  Once we detect a change, we automatically take a picture for analysis.
- To not incur costs, we hosted the trained model on a free service provided by [Heroku](https://heroku.com). This service has a high latency. There is usually a huge delay in response time.


### How to run

* Clone the code repository

```
git clone git@github.com:abiodunjames/DiseaseFinderApp.git
```
* Install npm packages

```
yarn install
```
* Install [expo client](https://expo.io/tools#client)
Run `expo start` and scan the bardcode to run.

### Unsigned prebuilt app

* [android](https://expo.io/dashboard/abiodunjames/builds/a1f794ba-9e37-423d-90ce-9b7a632600b9)