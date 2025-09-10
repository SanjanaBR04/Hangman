FROM gcc:13

WORKDIR /app

# Copy backend folder
COPY backend/ ./backend/

# Compile hangman.cpp
RUN g++ -std=c++17 -pthread backend/hangman.cpp -o server

EXPOSE 8080
CMD ["./server"]
