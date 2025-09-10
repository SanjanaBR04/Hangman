# Use GCC image
FROM gcc:13

# Set working directory
WORKDIR /app

# Copy all files from current folder (backend/)
COPY . .

# Compile hangman.cpp (which has main())
RUN g++ -std=c++17 -pthread hangman.cpp -o server

# Expose port
EXPOSE 8080

# Run the server
CMD ["./server"]
