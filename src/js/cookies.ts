import { Game } from "./game";

export class Cookies {
  static choices = ["paper", "stone", "scissors"]

  static current_cookie = "PaperCurrentCookie"
  static scores_cookie = "PaperScoreCookie"
  static cookie_suf = "path=/;Samesite=Lax;"

  static delete_cookie = function (name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;" + Cookies.cookie_suf;
    return true;
  }

  static delete_current_cookie = () => {
    Cookies.update_scores_cookie(Cookies.get_current_cookie());
    Cookies.delete_cookie(Cookies.current_cookie)
  }

  static get_cookies = () => {
    let cookies: any = {}
    for (let cook of document.cookie.split(";")) {
      const arr = cook.split("=");
      const name = arr[0].trim();
      if (name == Cookies.current_cookie || name == Cookies.scores_cookie) {
        let val = arr[1].trim();
        cookies[name] = val != '' ? JSON.parse(val) : {};
      }
    }
    return cookies;
  }

  static set_cookie = function (name: any, value: any, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 12 * 30 * 24 * 60 * 60 * 1000));

    const data = [
      name + "=" + JSON.stringify(value),
      "expires=" + d.toUTCString(),
      Cookies.cookie_suf,
    ];
    document.cookie = data.join(";");
    return true;
  }

  static get_current_basic = (name: string) => {
    let stats: any = {}
    for (const choice of Cookies.choices) { stats[choice] = 0; }
    let roboitems: any = {}
    for (const choice of Cookies.choices) { roboitems[choice] = false; }

    return {
      name: name,
      score: 0,
      roboscore: 0,
      stats: stats,
      roboitems: roboitems
    }
  }

  static get_current_cookie = () => {
    return Cookies.get_cookies()[Cookies.current_cookie];
  }

  static get_scores_cookie = () => {

    let scores = Cookies.get_cookies()[Cookies.scores_cookie];

    if (!scores) {
      scores = Cookies.set_scores_basic()
    }
    return scores;
    // return Cookies.get_cookies()[Cookies.scores_cookie];
  }

  static is_robo_player = () => {
    let autorized = true;
    const cur = Cookies.get_current_cookie()
    for (let item in cur.roboitems) {
      if (!cur.roboitems[item]) { autorized = false; }
    }

    return autorized && cur.score > 0;
  }

  static set_current_cookie = (name: string) => {
    let current = Cookies.get_current_cookie()

    if (!current || current.name != name) {
      current = Cookies.get_current_basic(name);
    }
    return Cookies.set_cookie(Cookies.current_cookie, current);
  }

  static set_scores_cookie = (scores: any) => {
    return Cookies.set_cookie(Cookies.scores_cookie, scores);
  }

  static set_scores_basic = () => {
    let scores = {
      admin: {
        name: "admin",
        score: 20, roboscore: 11,
        stats: { paper: 5, stone: 0, scissors: 2 },
        roboitems: { paper: true, stone: true, scissors: true }
      },
      sofia: {
        name: "sofia",
        score: 26, roboscore: 19,
        stats: { paper: 25, stone: 19, scissors: 32 },
        roboitems: { paper: true, stone: true, scissors: true }
      },
      jose: {
        name: "jose",
        score: 1, roboscore: 2,
        stats: { paper: 3, stone: 1, scissors: 2 },
        roboitems: { paper: true, stone: false, scissors: false }
      }
    }

    Cookies.set_scores_cookie(scores)

    return scores;
  }

  static update_current_cookie = (current: any) => {
    Cookies.set_cookie(Cookies.current_cookie, current)

    return Cookies.update_scores_cookie(current)
  }

  static update_scores_cookie = (current: any) => {
    let scores = (Cookies.get_cookies()[Cookies.scores_cookie] || {});

    scores[current.name] = current;

    Cookies.set_scores_cookie(scores);

    return true;
  }
}