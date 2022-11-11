import { Login } from "./login.js"

export class Game {
  
  static choices = ["paper", "stone", "scissors"]

  static init_game = () => {
    Login.set_view();
  }

}