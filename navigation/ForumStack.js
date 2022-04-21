import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Forum from "./Forum";
import Answer from "./Answer";
import Post from "./Post";

const screens = {
    Questions: {
        screen: Forum
    },
    Answer: {
        screen: Answer
    },
    Post: {
        screen: Post
    }
}

const ForumStack = createStackNavigator(screens);

export default createAppContainer(ForumStack);