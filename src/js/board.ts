import { BoardBackToHuman, BoardHtml, BoardPlay, BoardRoboItems, BoardRoboPlay, BoardRoboScore } from "./board.html.js";
import { Cookies } from "./cookies.js";
import { Game } from "./game.js";
import { Nav } from "./nav.js";
import { Scores } from "./scores.js";

export class Board {

  static add_penalty = (p_choice: string) => {
    if ($("#sel_league").val() == "robot") {
      let current = Cookies.get_current_cookie()
      current.score -= 1;
      current.roboitems[p_choice] = false;

      $("#btn_" + p_choice).remove();
      $("#div_resp").append("<h3>You lost a roboitem</h3>");

      Board.update_scores(current.score, current.roboscore)
      Cookies.update_current_cookie(current)
    }

    return true;
  }

  static add_reward = (p_choice: string) => {
    let dif = +($("#sel_dif").val() || 0);
    let current = Cookies.get_current_cookie()

    current.stats[p_choice] += 1;

    switch ($("#sel_league").val()) {
      case "robot":
        current.score += dif > 1 ? 4 : 3;
        current.roboscore += 1;
        break;
      default:
        current.score += dif > 1 ? 2 : 1;
    }

    Board.update_scores(current.score, current.roboscore);
    Cookies.update_current_cookie(current);

    return true
  }

  static buy_roboitems = (e: any) => {

    let cur = Cookies.get_current_cookie();
    for (let line of $(".roboitem")) {

      cur.score -= 2
      cur.roboitems[String($(line).attr("choice"))] = true;
    }

    Cookies.update_current_cookie(cur);
    Board.set_score(cur.score);
    Board.set_board_roboplay();
    Board.set_view_links();
  }

  static change_title = (e: any = null) => {
    let msg: string;

    switch ($("#sel_dif").val()) {
      case "1":
        msg = "I know you?<br>You gonna lose!"
        break;
      case "2":
        msg = "You´ll get an extra point,<br>if you win..."
        break;
      default:
        msg = "Are you ready?<br>Let´s play"
    }

    Board.set_title(msg);
  }

  static check_win = (player: string, machine: string) => {
    if (player == machine) {
      return 0;
    } else if (
      (player == "stone" && machine == "scissors") ||
      (player == "paper" && machine == "stone") ||
      (player == "scissors" && machine == "paper")
    ) {
      return 1;
    } else {
      return 2;
    }
  }

  static get_play_choice = async (e: any) => {
    Board.hide_last_choice()
    Board.set_resp("")

    let $boton = $(e.currentTarget)
    $boton.addClass("marked")
    let player = String($boton.attr("choice"))

    let dif = +($("#sel_dif").val() || 0)

    let choice: string = "";
    switch (dif) {
      case 2:
        if (Math.floor(Math.random() * 101) > 80) {
          choice = Board.get_winner_choice(player);
          break;
        }
      case 1:
        let current = Cookies.get_current_cookie();
        // console.log(current.stats)
        let max = 0
        for (let item in current.stats) {
          if (current.stats[item] >= max) {
            max = current.stats[item];
            choice = Board.get_winner_choice(item);
          }
        }
        break
      default:
        choice = Game.choices[Math.floor(Math.random() * (Game.choices.length - 1))]
    }

    await Board.sleep()

    $("#fondo_" + choice).addClass("show");

    switch (Board.check_win(player, choice)) {
      case 1:
        Board.set_resp("You win!");
        Board.add_reward(player);
        break;
      case 2:
        Board.set_resp("You lose!");
        Board.add_penalty(player);
        break;
      default:
        Board.set_resp("Draw");
    }

    await Board.sleep(1500);
    Board.hide_last_choice($boton);

    await Board.sleep();
    Board.set_resp("");
  }

  static get_winner_choice = (player: string) => {
    switch (player) {
      case "stone":
        return "paper";
      case "scissors":
        return "stone"
      default:
        return "scissors";
    }
  }

  static hide_last_choice = (one: any = false) => {
    one ? $(one).removeClass("marked") : $(".btn_choice").removeClass("marked");
    // $(".btn_choice").removeClass("marked");
    $(".bender_choice").removeClass("show");
  }

  static init_robo_league = (e: any) => {
    let league = $(e.currentTarget).val();
    if (league == "robot") {
      Board.set_board_roboplay();

    } else {
      Board.set_board_play(BoardPlay);
      Board.set_robo_score(false);
    }

    Board.set_view_links();
  }

  static sleep = async (ms: number = 1000) => new Promise((r) => setTimeout(r, ms));

  static set_board_play = (html: string) => {
    $("#board_play").html(html)
  }

  static set_board_roboitems = () => {
    const cur = Cookies.get_current_cookie()
    let items: string[] = []
    for (let item in cur.roboitems) {
      if (!cur.roboitems[item]) { items.push(item); }
    }

    if (cur.score == 0 || cur.score < items.length * 2) {
      let msg;
      if (items.length > 0) {
        msg = String(items.length * 2 - cur.score) + " more score to buy roboitems for"
      } else {
        msg = "1 more score to play in"
      }
      // let rest = items.length * 2 - cur.score;
      $("#board_play").html(BoardBackToHuman.replace("ReplaceBack", msg));
      // $("#board_play").html(BoardBackToHuman.replace("ReplaceBack", String(rest == 0 ? 1 : rest)));

    } else {
      $("#board_play").html(BoardRoboItems);
      for (let line of $(".roboitem")) {
        if (!items.includes(String($(line).attr("choice")))) {
          $(line).remove();
        }
      }
      $("#btn_buy_roboitems").append(" by " + items.length * 2 + " points")
      $("#btn_buy_roboitems").on("click", Board.buy_roboitems)
    }
  }

  static set_board_roboplay = () => {
    if (Cookies.is_robo_player()) {

      Board.set_board_play(BoardRoboPlay);
      Board.set_robo_score();
    } else {
      Board.set_board_roboitems();
    }
  }

  static set_resp = (msg: string) => {
    $("#div_resp").html(msg != "" ? "<h3>" + msg + "</h3>" : msg);
  }

  static set_robo_score = (on: boolean = true) => {
    if (on) {
      $("#roboscore_title").html(BoardRoboScore);
      $("#roboscore").html(Cookies.get_current_cookie().roboscore);
    } else {
      $("#roboscore_title").html("");
    }
  }

  static set_score = (score: any) => {
    $("#score").html(score)
  }

  static set_title = (msg: string) => {
    $("#board_title").html("<h3>" + msg + "</h3>");
  }

  static set_view = () => {

    Nav.set_view()
    $("#div_content").html(BoardHtml);

    const current = Cookies.get_current_cookie()
    Board.set_board_play(BoardPlay);
    Board.set_score(current.score);
    Board.change_title();
    Board.set_view_links();

    Cookies.update_scores_cookie(current)
  }

  static set_view_links = () => {
    $("#board_btn_scores").on("click", Scores.set_view)
    $(".play_part .btn_choice").on("click", Board.get_play_choice)
    $("#sel_league").on("change", Board.init_robo_league)
    $("#sel_dif").on("change", Board.change_title)
  }

  static update_scores(score: number, roboscore: number) {
    Board.set_score(score);
    $("#roboscore").html(String(roboscore));
  }



}