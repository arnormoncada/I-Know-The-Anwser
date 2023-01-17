import{DEFAULT_URL} from "../constants"
import { io } from "socket.io-client";
export default io(DEFAULT_URL);