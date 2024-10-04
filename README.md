# Harry Potter AI Question Answering System

This project is an AI-powered question answering system based on the Harry Potter book series. It uses natural language processing and machine learning techniques to provide detailed answers to user queries about the Harry Potter universe.

## Project Structure

The project is divided into two main parts: a server-side application and a client-side web interface.

### Server

The server is built with Node.js and Express, utilizing the LangChain library for natural language processing tasks.

Key components:
- `server/build_db.js`: Builds and manages the vector store using the FAISS library and OpenAI embeddings.
- `server/api.js`: Implements the question-answering logic using a retrieval-augmented generation (RAG) approach.
- `server/index.js`: Sets up the Express server and defines the API endpoints.

### Client

The client is a React application that provides a user-friendly interface for interacting with the AI system.

Key components:
- `client/src/App.jsx`: The main React component that handles user input and displays results.
- `client/src/index.module.css`: Styles the application with a Harry Potter theme.

## Features

- Vector store creation and management for efficient information retrieval
- Natural language question answering using OpenAI's GPT model
- Retrieval-augmented generation for accurate and contextual responses
- Responsive and themed user interface

## Setup and Installation

1. Clone the repository
2. Install dependencies for both server and client:
   ```
   cd server && npm install
   cd ../client && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add your OpenAI API key: `OPENAI_API_KEY=your_api_key_here`
4. Build the vector store:
   ```
   cd server && node build_db.js
   ```
5. Start the server:
   ```
   node index.js
   ```
6. In a new terminal, start the client:
   ```
   cd client && npm run dev
   ```

## Usage

1. Open the web application in your browser (typically at `http://localhost:5173`)
2. Enter your Harry Potter-related question in the input field
3. Click "Generate Answer" or press Enter
4. View the AI-generated response below

## Technologies Used

- Node.js
- Express
- React
- LangChain
- OpenAI GPT
- FAISS Vector Store
- Vite (for client-side build)

## Future Improvements

- Expand the knowledge base to cover more Harry Potter content
- Implement user authentication and query history
- Optimize performance for faster response times
- Add support for multiple languages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

