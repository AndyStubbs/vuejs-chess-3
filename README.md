# VueJS Chess App

## Overview
The **VueJS Chess App** is a web-based chess platform written in VueJS and is really just something
I wrote to help me learn Vue.js. It's not complete but does have a working chess game and includes
a sandbox of UI components I built for practice.

## View it Online
You can visit the website by visiting the following link:
[VueJS Chess](https://vuejs-chess-6.vercel.app/)

### AI Bots
- **Randy**: A beginner-friendly bot that makes completely random moves, ideal for kids or absolute 
beginners.
- **Sandy**: A more challenging asynchronous bot based on Zhang Zeyu's chess engine, modified for 
seamless integration into this app. This AI is a lot better than Randy but there is a bug that the
AI does not calculate Checkmate. So it will capture all your pieces but not get Chekmate.

### Current Limitations
- **Time Mode**: While the timer functions, there are no consequences for running out of time.
- **Easy AI**: Both AI's are pretty easy and could be improved.

### Highlights
The application showcases custom Vue.js components for an engaging chess-playing experience:
- **Chessboard & Game Pieces**: Drag-and-drop functionality with animations, move highlighting, and 
seamless handling of edge cases like invalid moves.
- **Custom UI Components**:
  - **CustomInput**: A custom input component that makes it easy to implement input groups for text
and passwords.
  - **CustomButton**: A custom button component applies different styles of buttons including icon
buttons, text buttons, and different styled buttons.
  - **CustomModal**: For displaying key information and managing settings.
  - **CustomToast**: Elegant, non-intrusive messaging system for feedback and updates.
  - **ToggleGroup**: A component that allows a unique way of toggling options that looks nicer than
a radio group and uses buttons to toggle options. 

## Features
- **Game Modes**:
  - Play against various AI bots.
- **Real-Time Gameplay**: Chessboard with drag-and-drop piece movement.
- **Dark Mode**: Toggle between light and dark themes.

## Technologies Used
- **Frontend**: Vue.js with Vite for development and Pinia for state management.
- **Chess Engine**: Chess.js for game logic and a modified version of Zhang Zeyu's chess engine.
- **Vite**: Local development server using Vite.
