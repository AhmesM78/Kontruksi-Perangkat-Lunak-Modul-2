const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definisikan state yang ada
const State = {
    START: "START",
    PLAYING: "PLAYING",
    GAME_OVER: "GAME_OVER",
    EXIT: "EXIT" // State untuk keluar dari program
};

// State awal
let currentState = State.START;

function runGameStateMachine() {
    // Tampilkan state saat ini
    console.log(`\n--- You are in: ${currentState} ---`);

    // Jika state adalah EXIT, tampilkan pesan dan tutup readline
    if (currentState === State.EXIT) {
        console.log("Exiting game. Thanks for playing!");
        rl.close();
        return; // Hentikan fungsi
    }

    // Minta input dari pengguna
    rl.question("Enter command (PLAY, LOSE, RESTART, EXIT): ", (command) => {
        const upperCommand = command.toUpperCase(); // Ubah input ke huruf besar untuk case-insensitivity

        // Logika transisi state berdasarkan state saat ini dan input
        switch (currentState) {
            case State.START:
                if (upperCommand === "PLAY") {
                    currentState = State.PLAYING;
                } else if (upperCommand === "EXIT") {
                    currentState = State.EXIT;
                } else {
                    console.log("Invalid command for START state. Try 'PLAY' or 'EXIT'.");
                }
                break;

            case State.PLAYING:
                if (upperCommand === "LOSE") {
                    currentState = State.GAME_OVER;
                } else if (upperCommand === "EXIT") {
                    currentState = State.EXIT;
                } else {
                    console.log("Invalid command for PLAYING state. Try 'LOSE' or 'EXIT'.");
                }
                break;

            case State.GAME_OVER:
                if (upperCommand === "RESTART") {
                    currentState = State.START;
                } else if (upperCommand === "EXIT") {
                    currentState = State.EXIT;
                } else {
                    console.log("Invalid command for GAME_OVER state. Try 'RESTART' or 'EXIT'.");
                }
                break;
        }

        // Lanjutkan ke iterasi state machine berikutnya
        runGameStateMachine();
    });
}

// Mulai state machine
runGameStateMachine();