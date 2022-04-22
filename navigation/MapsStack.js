import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Maps from "./Maps";
import Filter from "./Filter";
import CourtData from "./CourtData";


const screens = {
    Map: {
        screen: Maps
    },
    Filters: {
        screen: Filter
    },
    Info: {
        screen: CourtData
    }
}

const MapsStack = createStackNavigator(screens);

export default createAppContainer(MapsStack);