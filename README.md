  # LearnNow Mobile App

A React Native mobile application built with Expo, TypeScript, and NativeWind (Tailwind CSS for React Native) for educational purposes.

## App Overview

LearnNow is a mobile learning platform that allows users to:

Login with Google or Phone (simulated)

Complete their educational profile (class, board, stream)

Select subjects and topics from a curated curriculum

Access learning materials through a clean, intuitive interface

## 🛠️ Tech Stack

Framework: React Native with Expo

Language: TypeScript

Styling: NativeWind (Tailwind CSS for React Native)

Navigation: Expo Router (file-based routing)

State Management: React Context API

Storage: AsyncStorage for local data persistence

Icons: @expo/vector-icons

## 📋 Prerequisites

Before running this project, make sure you have:

Node.js (v16 or higher)

npm or yarn package manager

Expo CLI installed globally (npm install -g expo-cli)

iOS Simulator (for Mac users) or Android Studio (for Android emulator)

Expo Go app on your physical device (for testing on real device)

## Installation & Setup

Clone the repository
```
git clone <repository-url>
cd LearnNow
```

## Install dependencies
```
npm install
# or
yarn install
```
## Install Expo CLI globally (if not already installed)

```
npm install -g expo-cli
```

## Start the development server

```
npm start
# or
yarn start
# or
expo start
```
## Run on specific platform

Press a for Android emulator

Press i for iOS simulator

Scan QR code with Expo Go app for physical device

## Project Structure
```
LearnNow/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Login screen
│   ├── signup.tsx         # Education profile setup
│   ├── subject-selection.tsx # Subject & topic selection
│   └── questions.tsx      # Dummy questions screen
├── assets/                # Static assets
│   ├── curriculum.json    # Curriculum data
│   └── companyLogo.png    # App logo
├── components/            # Reusable components
├── context/               # React Context providers
│   └── AuthContext.tsx    # Authentication context
├── types/                 # TypeScript type definitions
├── constants/             # App constants
│   └── colors.ts          # Color palette
```

##Features
Authentication Flow
Simulated login with Google or Phone options

Context-based authentication state management

Automatic redirect based on user profile completion

User Profile
Class selection (1-12)

Board selection (CBSE, ICSE, State)

Stream selection (Science, Commerce, Arts) for classes > 10

Local persistence using AsyncStorage

Curriculum Navigation
Subject selection from JSON data

Topic filtering based on selected subject

Clean, responsive UI with brand colors

UI/UX
Responsive design that works on various screen sizes

Consistent branding with AbhyasilT colors:

Primary: #FE904B (orange)

Secondary: #FCB627 (yellow)

Accent: #B06D2A (amber)

Text/Dark: #2A262B

Background: #FFFFFF / Off-white

Rounded buttons and consistent styling

## Data Structure
The app uses a local JSON file (assets/curriculum.json) with the following structure:

```
{
  "boards": ["CBSE", "ICSE", "State"],
  "classes": [8, 9, 10, 11, 12],
  "streams": ["Science", "Commerce", "Arts"],
  "subjects": [
    {"id": "math", "name": "Mathematics"},
    {"id": "sci", "name": "Science"},
    {"id": "eng", "name": "English"}
  ],
  "topics": [
    {"subjectId": "math", "title": "Calculus", "description": "Intro to Calculus"},
    {"subjectId": "sci", "title": "Photosynthesis", "description": "Process in plants"},
    {"subjectId": "eng", "title": "Grammar", "description": "Basic parts of speech"}
  ]
}
```
## Build for Production
To build for production:

```
expo build:ios
```
Build for Android
```
expo build:android
```
Create standalone builds

```
# For iOS
expo build:ios -t archive

# For Android
expo build:android -t app-bundle
```

## NativeWind Configuration

The project uses NativeWind for styling. Configuration files:

tailwind.config.js - Tailwind configuration

babel.config.js - Babel plugin configuration

## Development Time: 24 hours
## Developer: Vasu Sharma  
## Date: 9/14/2025
##
##
