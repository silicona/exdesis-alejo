import { Board } from "./board.js";
import { Cookies } from "./cookies.js";
import { LoginHtml } from "./login.html.js"

export class Login {

  static set_resp = (mensaje: string) => {
    $("#login_resp").html(mensaje)
  }

  static set_view = () => {
    if (Cookies.get_current_cookie()) {
      Board.set_view();
    } else {
      $("#div_nav").html('');
      $("#div_content").html(LoginHtml);

      Login.set_view_links();
    }
  }

  static set_view_links = () => {
    $("#login_name").on("blur", Login.check_admin)
    $("#login_btn").on("click", Login.check_login)
  }

  static check_admin = (e: any) => {
    e.preventDefault()
    Login.set_resp("");
    if (e.currentTarget.value.toLowerCase() == "admin") {
      $("#div_pass").show(400)
    } else {
      $("#div_pass").hide()
    }
  }
  
  static check_login = (e: any) => {
    e.preventDefault()
    const user = String($("#login_name").val()).toLowerCase();
    const pass = String($("#login_pass").val()).toLowerCase();


    if (user == "") {
      Login.set_resp("Only humans with name admit");
      return false;
    }

    if (user == "admin" && pass!= "admin") {
      Login.set_resp("Admin only can be admin");
      return false;
    }

    if (/[\W\d]/.test(user)) {
      Login.set_resp("Only humans admit");
      return false;
    }

    let current = Cookies.get_scores_cookie()[user]
    if(current) {
      Cookies.update_current_cookie(current);
    } else {
      Cookies.set_current_cookie(user);
    }

    Board.set_view()
  }
}