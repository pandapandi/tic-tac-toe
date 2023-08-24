const toggle_btns = document.querySelectorAll(".toggle-btns");
const btn_container = document.querySelector(".btn-container");
const dark_clr = "rgb(26, 42, 50)";
const light_clr = "rgb(168, 191, 201)";
let curr_symbol = 'x';




const clickHandler = (e) => {
    let current_active = toggle_btns[0].style.backgroundColor === light_clr ? 'x' : 'o';

    if (current_active === 'x') {
        current_active = 'o';
        toggle_btns[0].style.backgroundColor = dark_clr;
        toggle_btns[1].style.backgroundColor = light_clr;

        toggle_btns[0].childNodes[1].style.fill = light_clr;
        toggle_btns[1].childNodes[1].style.fill = dark_clr;


    } else {
        current_active = 'x';
        toggle_btns[0].style.backgroundColor = light_clr;
        toggle_btns[1].style.backgroundColor = dark_clr;

        toggle_btns[0].childNodes[1].style.fill = dark_clr;
        toggle_btns[1].childNodes[1].style.fill = light_clr;

    }
}


btn_container.addEventListener("click", clickHandler)



// ------------restart functionality------------

const rest_btn = document.querySelector(".restart-btn");
const menu = document.querySelector(".menu-container")
const game = document.querySelector(".game-container")
const new_game_btn = document.querySelector(".new-game-btn")
const quit_btn = document.querySelector(".quit-btn")
const msg_box = document.querySelector(".msg-container")
const tiles = document.querySelectorAll(".tile")

rest_btn.addEventListener("click", (e) => {
    menu.style.display = "flex";
    game.style.display = "none";
})

new_game_btn.addEventListener("click", (e) => {
    game.style.display = "flex";
    menu.style.display = "none";
    tiles.forEach((tile) => {
        tile.innerHTML = "";
    })


    row_sum = [0, 0, 0];
    col_sum = [0, 0, 0];
    diag_sum = [0, 0];
    turn = 0;
    curr_symbol = 'x';
    cts = [0, 0, 0];
    scores[0].innerHTML = 0;
    scores[1].innerHTML = 0;
    scores[2].innerHTML = 0;
    turn_display_svg[1].style.display = "block";
    turn_display_svg[3].style.display = "none";

})

quit_btn.addEventListener("click", (e) => {
    menu.style.display = "flex";
    game.style.display = "none";
    msg_box.style.display = "none";
})










// --------------------game fucntionality----------------------------
let turn = 0;
let row_sum = [0, 0, 0];
let col_sum = [0, 0, 0];
let diag_sum = [0, 0];
let cts = [0, 0, 0];
const scores = document.querySelectorAll(".score");

const x_svg = '<svg fill="#31c3bd" id="icon-x" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>';

const o_svg = '<svg fill="#f2b137" id="icon-o" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" /></svg>'

const turn_display_svg = document.querySelector(".turn-display").childNodes;



const disp_msg = (msg) => {
    msg_box.style.display = "flex";
    msg_box.childNodes[1].innerHTML = msg;
    scores[0].innerHTML = cts[0];
    scores[1].innerHTML = cts[1];
    scores[2].innerHTML = cts[2];


}

tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
        if (tile.innerHTML === '') {
            tile.innerHTML = curr_symbol === 'x' ? x_svg : o_svg;
            turn++;
            console.log(tile.id.slice(-1));

            if (curr_symbol === 'x') {
                curr_symbol = 'o';
                turn_display_svg[1].style.display = "none";
                turn_display_svg[3].style.display = "block";

            }
            else {
                curr_symbol = 'x';
                turn_display_svg[1].style.display = "block";
                turn_display_svg[3].style.display = "none";
            }


            let tile_no = e.target.id.slice(-1);
            let col = tile_no % 3;
            let row = Math.floor(tile_no / 3);
            let delta = turn % 2 == 0 ? -1 : 1;

            col_sum[col] += delta; row_sum[row] += delta;

            if (col == row) { diag_sum[0] += delta; }
            if (2 - col == row) { diag_sum[1] += delta; }



            // ------------ x wins ----------------


            if (col_sum.findIndex((n) => n == 3) != -1 || row_sum.findIndex((n) => n == 3) != -1 || diag_sum.findIndex((n) => n == 3) != -1) {
                cts[0]++;
                disp_msg("X WINS");
            } else if (col_sum.findIndex((n) => n == -3) != -1 || row_sum.findIndex((n) => n == -3) != -1 || diag_sum.findIndex((n) => n == -3) != -1) {
                cts[2]++;
                disp_msg("O WINS");

            } else if (turn == 8) {

                tiles.forEach((tile) => {
                    if (tile.innerHTML == '') {
                        

                        let tile_no = tile.id.slice(-1);
                        let colno = tile_no % 3;
                        let rowno = Math.floor(tile_no / 3);
                        


                        col_sum[colno]++; row_sum[rowno]++;
                        if (rowno == colno) { diag_sum[0]++; }
                        if (2 - colno == rowno) { diag_sum[1]++; }


                        if (col_sum.findIndex((n) => n == 3) != -1 || row_sum.findIndex((n) => n == 3) != -1 || diag_sum.findIndex((n) => n == 3) != -1) {
                            cts[0]++;
                            disp_msg("X WINS");
                        }


                        else {

                            cts[1]++;
                            disp_msg("DRAW");
                        }



                    }





                })
            }

        }

        })

})



// -----------------------next round functionality-----------------------

document.querySelector(".next-rnd-btn").addEventListener("click", (e) => {
    tiles.forEach((tile) => {
        tile.innerHTML = ""
    })


    row_sum = [0, 0, 0];
    col_sum = [0, 0, 0];
    diag_sum = [0, 0];

    turn = 0;
    curr_symbol = 'x';

    msg_box.style.display = "none";
    turn_display_svg[1].style.display = "block";
    turn_display_svg[3].style.display = "none";

})






