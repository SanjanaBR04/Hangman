# Use GCC image
FROM gcc:13

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the C++ server
RUN g++ -std=c++17 -pthread hangman.cpp -o server

# Run the server
CMD ["./server"]


