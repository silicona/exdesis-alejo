export const BoardHtml: string= `
<section id="board">
  <article id="board_form" class="board_part">
    <form>
      <div class="board_sel">
        <select id="sel_league">
          <option value="human">Human League</option>
          <option value="robot">Robot League</option>
        </select>
      </div>
      <div class="board_sel">
        <select id="sel_dif">
          <option value="0">Basic</option>
          <option value="1">Evolutive</option>
          <option value="2">Maverick</option>
        </select>
      </div>
    </form>
  </article>
  <article id="board_title" class="board_part title_part"></article>
  <article id="board_play" class="board_part"></article>
  <article id="board_score" class="board_part">
    <h4 id="score_title">Score: <span id="score"></span></h4><span id="roboscore_title"></span>
  </article>
  <article id="board_resp" class="board_part">
    <div id="div_resp"></div>
  </article>
  <article id="board_footer" class="board_part footer_part">
    <button id="board_btn_scores">Scores</button>
  </article>
</section>
`;

export const BoardPlayOld: string=`
<div id="div_player" class="play_part">
  <h4 class="play_label">Your choice</h4>
  <div class="play_part_int">
    <button id="btn_stone" class="btn_board btn_choice" choice="stone"><img src="assets/img/stone.png"></button>
    <button id="btn_paper" class="btn_board btn_choice" choice="paper"><img src="assets/img/paper.png"></button>
    <button id="btn_scissors" class="btn_board btn_choice" choice="scissors"><img src="assets/img/scissors.png"></button>
  </div>
</div>
<div id="div_machine" class="play_part">
  <h4 class="play_label">My choice</h4>
  <div class="play_part_int">
    <div id="fondo_stone" class="bender_choice"><img src="assets/img/stone.png"></div>
    <div id="fondo_paper" class="bender_choice"><img src="assets/img/paper.png"></div>
    <div id="fondo_scissors" class="bender_choice"><img src="assets/img/scissors.png"></div>
  </div>
</div>
`;
export const BoardPlay: string=`
<div id="div_player" class="play_part">
  <h4 class="play_label">Your choice</h4>
  <div class="play_part_int">
    <button id="btn_stone" class="btn_choice" choice="stone"><img src="assets/img/stone.png"></button>
    <button id="btn_paper" class="btn_choice" choice="paper"><img src="assets/img/paper.png"></button>
    <button id="btn_scissors" class="btn_choice" choice="scissors"><img src="assets/img/scissors.png"></button>
  </div>
</div>
<div id="div_machine" class="play_part">
  <h4 class="play_label">My choice</h4>
  <div class="play_part_int">
    <div id="fondo_stone" class="bender_choice"><img src="assets/img/stone.png"></div>
    <div id="fondo_paper" class="bender_choice"><img src="assets/img/paper.png"></div>
    <div id="fondo_scissors" class="bender_choice"><img src="assets/img/scissors.png"></div>
  </div>
</div>
`;

export const BoardRoboPlay: string=`
<div id="div_player" class="play_part">
  <h4 class="play_label">Your choice</h4>
  <div class="play_part_int">
    <button id="btn_stone" class="btn_choice" choice="stone"><img src="assets/img/blob.jpg"></button>
    <button id="btn_paper" class="btn_choice" choice="paper"><img src="assets/img/field.png"></button>
    <button id="btn_scissors" class="btn_choice" choice="scissors"><img src="assets/img/laser.jpg"></button>
  </div>
</div>
<div id="div_machine" class="play_part">
  <h4 class="play_label">Your choice</h4>
  <div class="play_part_int">
    <div id="fondo_stone" class="bender_choice"><img src="assets/img/blob.jpg"></div>
    <div id="fondo_paper" class="bender_choice"><img src="assets/img/field.png"></div>
    <div id="fondo_scissors" class="bender_choice"><img src="assets/img/laser.jpg"></div>
  </div>
</div>
`;

export const BoardRoboItems: string=`
<div id="board_roboitems">
  <ul>
    <li class="roboitem" choice="stone">
      <img src="assets/img/blob.jpg"><span>You need a blob to defeat the laser</span><img src="assets/img/laser.jpg">
    </li>
    <li class="roboitem" choice="paper">
      <img src="assets/img/field.png"><span>You need a force field to defeat the blob</span><img src="assets/img/blob.jpg">
    </li>
    <li class="roboitem" choice="scissors">
      <img src="assets/img/laser.jpg"><span>You need a laser to defeat the force field</span><img src="assets/img/field.png">
    </li>
  </ul>
  <div id="div_btn_roboitems">
    <button id="btn_buy_roboitems">Buy all</button>
  </div>
</div>
`;

export const BoardBackToHuman: string=`
<div id="board_back">
  <h4>You need ReplaceBack greater leagues</h4>
  <h4>Get back to Human League</h4>
</div>
`;

export const BoardRoboScore: string=`
- <h4>RoboScore: <span id="roboscore"></span></h4>
`;