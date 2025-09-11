#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <string>
#include <unordered_set>
#include "httplib.h"  // single-header library
#include "json.hpp"   // single-header nlohmann JSON

using namespace std;
using json = nlohmann::json;

struct Game {
    string word;
    string display;
    int lives;
    unordered_set<char> guessed;
};

vector<string> words = {"pthinks", "computer", "science", "hangman", "programming"};
Game game;

void startGame() {
    srand(time(0));
    game.word = words[rand() % words.size()];
    game.display = string(game.word.size(), '_');
    game.lives = 5;
    game.guessed.clear();

    int lettersToReveal = 2 + rand() % 2;
    for(int i=0; i<lettersToReveal; i++) {
        int pos = rand() % game.word.size();
        game.display[pos] = game.word[pos];
        game.guessed.insert(game.word[pos]);
    }
}

json guessLetter(char guess) {
    guess = tolower(guess);
    json response;

    if(game.guessed.count(guess)) {
        response["message"] = "Already guessed";
        response["display"] = game.display;
        response["lives"] = game.lives;
        return response;
    }

    game.guessed.insert(guess);
    bool correct = false;
    for(int i=0; i<game.word.size(); i++) {
        if(game.word[i] == guess) {
            game.display[i] = guess;
            correct = true;
        }
    }

    if(correct) {
        response["message"] = "Correct guess!";
    } else {
        game.lives--;
        response["message"] = "Wrong guess!";
    }

    response["display"] = game.display;
    response["lives"] = game.lives;
    response["gameOver"] = (game.lives <= 0 || game.display == game.word);
    response["word"] = (game.lives <= 0) ? game.word : "";

    return response;
}

int main() {
    httplib::Server svr;

    // ✅ Handle OPTIONS preflight for all routes
    svr.Options(".*", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.status = 200;
    });

    // ✅ GET /start
    svr.Get("/start", [](const httplib::Request&, httplib::Response& res) {
        startGame();
        json j;
        j["display"] = game.display;
        j["lives"] = game.lives;
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(j.dump(), "application/json");
    });

    // ✅ POST /guess
    svr.Post("/guess", [](const httplib::Request& req, httplib::Response& res) {
        auto j = json::parse(req.body);
        char g = j["letter"].get<string>()[0];
        json response = guessLetter(g);
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(response.dump(), "application/json");
    });

    // ✅ Dynamic port for Render
    const char* port_str = std::getenv("PORT");
    int port = port_str ? std::stoi(port_str) : 8080;

    cout << "Server running on http://0.0.0.0:" << port << "\n";
    svr.listen("0.0.0.0", port);
}


