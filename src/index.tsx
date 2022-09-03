/* TODO pomysły
- drzewo historii zamiast listy
- kliknięty ruch poza boldem ma *
- wybór imienia i symbolu dla obu
- wybór koloru? (jest np n i wybór jednego blokuje go dla drugiego live)


DONE
- Display the location for each move in the format (col, row) in the move history list.
- Bold the currently selected item in the move list.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.
- wydzielić pliki i ts

*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from "./components/Game";




// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game/>);