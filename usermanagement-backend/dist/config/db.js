"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: ".env.development" });
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Connection = yield mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log(`MONGO-DB Connected:${Connection.connection.name}`);
        console.log("✅ Connected DB URI:", process.env.MONGO_URI);
    }
    catch (error) {
        console.error(`ERROR:${error.message}`);
        process.exit(1);
    }
});
exports.connectDb = connectDb;
