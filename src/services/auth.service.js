import { configure } from "vee-validate";
import createApiClient from "./api.service";
class AuthorService {
    constructor(baseUrl = "http://localhost:5000/api/auths") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async signUp(data) {
        return (await this.api.post("/sign-up", data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new AuthorService();
