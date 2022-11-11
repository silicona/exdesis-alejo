import { World } from "@cucumber/cucumber";
import { binding, given, ScenarioInfo, then, when } from "cucumber-tsflow/dist";



@binding()
export class AviratoHomeSteps {

    constructor(){
    }

    // @given('que estoy en la web de avirato')
    // public estoyEnLaWebAvirato() {
        
    //     //console.log(this)
    //     let world = (<any> this)._worldObj
    //     let scenarioContext = world.__SCENARIO_CONTEXT;
    //     let activeObjects = scenarioContext._activeObjects
    //     let scenarioInfo = <ScenarioInfo> scenarioContext._scenarioInfo;
    //     //console.log(world.jarjar())
    //     //console.log(activeObjects)
    //     //console.log(scenarioInfo)

    //     console.log("Este paso está trampeado, no has ido a ningún sitio: Falso Verde!!!")
    //     //return 'pending';
    // };

    // @when(/pulso el bot(?:o|ó)n de ([a-zA-ZñÑáéíóúÁÉÍÓÚ]+)/)
    // public pulsoElBoton (boton: string) {
    //     // Write code here that turns the phrase above into concrete actions
    //     console.log("El botón pulsado es " + boton + ", bípedo dominante!!")
    //     console.log("Si no se devuelve 'pending', puedes hacer otro falso Verde, especie superior!!")
    //     //return 'pending';
    // };

    // @then(/la web se traduce a (\w+)/)
    // public laWebSeTraduce(idioma: string) {
    //     // Write code here that turns the phrase above into concrete actions
    //     console.log("El idioma para traducir es " + idioma + ", chapa blanda!!")
    //     return 'pending';
    // };
}