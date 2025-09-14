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

##Install dependencies
```
npm install
# or
yarn install
```
##Install Expo CLI globally (if not already installed)

```
npm install -g expo-cli
```

##Start the development server

```
npm start
# or
yarn start
# or
expo start
```
##Run on specific platform

Press a for Android emulator

Press i for iOS simulator

Scan QR code with Expo Go app for physical device

##Project Structure
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
###Authentication Flow
Simulated login with Google or Phone options

Context-based authentication state management

Automatic redirect based on user profile completion
