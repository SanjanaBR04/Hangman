# Use GCC image
FROM gcc:13

# Set working directory inside container
WORKDIR /app

# Copy everything from backend/ into container
COPY . .

# Debug step: show files (to confirm hangman.cpp exists inside container)
RUN ls -l

# Compile all cpp files (safe even if you add more later)
RUN g++ -std=c++17 -pthread *.cpp -o server

# Expose server port
EXPOSE 8080

# Run the server
CMD ["./server"]
