/**
 * @jest-environment jsdom
 */
import { Cookies } from "../../src/js/cookies"

/**
 * @group wip
 */
describe("Suite de Cookies", () => {
  beforeEach(() => {
    document.cookie = "uno=uno;expires=-1;path=/;Samesite=Lax;"
    document.cookie = Cookies.current_cookie + "=;expires=-1;path=/;Samesite=Lax;"
    document.cookie = Cookies.scores_cookie + "=;expires=-1;path=/;Samesite=Lax;"
  })

  describe("Get_cookies", () => {
    it("Ok", () => {
      const data = [
        Cookies.current_cookie + "=" + JSON.stringify({ name: "test", scores: 1 }),
        "expires=-1",
        "path=/;Samesite=Lax;",
      ];
      document.cookie = data.join(";");

      const res: any = Cookies.get_cookies();
      expect(res[Cookies.current_cookie].name).toBe("test")
    })

    it("Ko", () => {
      const res: any = Cookies.get_cookies();

      expect(res[Cookies.current_cookie].name).toBe(undefined)
    })
  })

  describe("get_current_basic", () => {
    test("Ok", () => {
      const res: any = Cookies.get_current_basic("test");
      expect(res.name).toBe("test")
    })
  })

  describe("add_to_scores_cookie", () => {
    test("Ok", () => {

      let test: any = Cookies.get_current_basic("test")
      
      Cookies.update_scores_cookie(test);

      const res = Cookies.get_cookies()[Cookies.scores_cookie]

      expect(res["test"].name).toBe("test")
    })
  })
})