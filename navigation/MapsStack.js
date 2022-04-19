import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Maps from "./Maps";
import Filter from "./Filter";

const screens = {
    Map: {
        screen: Maps
    },
    Filters: {
        screen: Filter
    }
}

const MapsStack = createStackNavigator(screens);

export default createAppContainer(MapsStack);