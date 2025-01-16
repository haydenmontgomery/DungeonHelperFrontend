import axios from "axios";
import { data } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
const DDURL = "https://www.dnd5eapi.co/api/";

//API Class for get/post/patch/delete to the API.

class DungeonHelperApi {
  // token for interacting with API
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DungeonHelperApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API routes

  /***************************      AUTH ROUTES             ***************************/
  /* User signup. Takes {username, password, firstName, lastName, email} */
  static async signUp(data) {
    let res = await this.request('auth/register', data, "post");
    return res.token;
  }

  /* User login. Takes {username, password} */
  static async loginUser(data) {
    let res = await this.request('auth/token', data, "post");
    return res.token;
  }

  /***************************      CAMPAIGN ROUTES             ***************************/
  /* Campaign creation. Takes {title, description, maxPlayers, publicView} */
  static async createCampaign(data, username) {
    data.username = username;
    let res = await this.request('campaigns/create', data, "post");
    return res.campaign;
  }

  /* Campaign details. Takes {title} */
  static async getCampaign(title) {
    let res = await this.request(`campaigns/${title}`);
    return res.campaign;
  }

  /* Campaigns user is admin. Takes {title} */
  static async getCampaigns(userId) {
    let res = await this.request(`campaigns/user/${userId}`);
    return res.campaigns;
  }

  /* Campaign search. Takes {title, maxPlayersSearch} */
  static async searchCampaign(titleSearch) {
    let res = await this.request('campaigns', {titleSearch}, "get");
    return res.campaigns;
  }

  /* Campaign update. Takes {title, description, max_players, publicView} */
  static async updateCampaign(title, data) {
    let res = await this.request(`campaigns/${title}`, data, "patch");
    return res.campaign;
  }

  /* Campaign post to add admins. Takes {title, username} */
  static async addAdminCampaign(title, username) {
    let res = await this.request(`campaigns/${title}/admins/${username}`, {}, "post");
    return res.campaign;
  }

  /* Campaign post to add users/characters. Takes {title, username, character_id} */
  static async addCharacterCampaign(title, username, character_id) {
    let res = await this.request(`campaigns/${title}/${username}/${character_id}`, {}, "post");
    return res.campaign;
  }

  /* Campaign deletion. Takes {title} */
  static async deleteCampaign(title) {
    let res = await this.request(`campaigns/${title}`, "delete");
    return res;
  }

  /***************************      CHARACTER ROUTES             ***************************/
  /* Character creation. Takes {name, className, bio, age, height, level, gold, hp, profileUrl} */
  static async createCharacter(data) {
    data.age = parseInt(data.age);
    data.gold = parseInt(data.gold);
    data.hp = parseInt(data.hp);
    data.level = parseInt(data.level);
    let res = await this.request('characters', data, "post");
    return res.character;
  }

  /* Character get. Takes {id} */
  static async getCharacter(id) {
    let res = await this.request(`characters/${id}`);
    return res.character;
  }

  /* Character get. Takes {userId} */
  static async getAllCharacters(userId) {
    let res = await this.request(`characters/user/${userId}`);
    return res.characters;
  }

  /* Character update. Takes {name, className, bio, age, height, level, gold, hp, profileUrl} */
  static async updateCharacter(data) {
    let res = await this.request(`characters/${id}`, data, "patch");
    return res.character;
  }

  /* Character update. Takes {inventory} */
  static async updateCharacterInventory(inventory, id) {
    let res = await this.request(`characters/${id}/inventory`, inventory, "patch");
    return res.character;
  }

  /* Character deletion. Takes {id} */
  static async deleteCharacter(id) {
    let res = await this.request(`characters/${id}`, data, "delete");
    return res;
  }

  /***************************      SESSION ROUTES             ***************************/
  /* Session creation. Takes {name, password, description, campaignId, deungeonMasterId} */
  static async createSession(data) {
    let res = await this.request('sessions', data, "post");
    return res.session;
  }

  /* Session get. Takes {name}. */
  static async getSession(name) {
    let res = await this.request(`sessions/${name}`);
    return res.session;
  }


  /* Session patch. Takes {password, description, expiresAt} */
  static async updateSession(name, data) {
    let res = await this.request(`sessions/${name}`, data, "patch");
    return res.session;
  }

  /* Session post. Adds to session_users table. Takes {password} */
  static async addUsersSession(name, id, data) {
    let res = await this.request(`sessions/${name}/${id}`, data, "post");
    return res.session;
  }

  /* Session remove users. Takes {} */
  static async removeUsersSession(name, id) {
    let res = await this.request(`sessions/${name}/${id}`, "delete");
    return res.session;
  }

  /* Session delete. Takes {} */
  static async deleteSession(name) {
    let res = await this.request(`sessions/${name}`, "delete");
    return res;
  }

  /***************************      USER ROUTES             ***************************/
  /* User create from an admin side. Takes {username, password, firstName, lastName, email} */
  static async createUser(data) {
    let res = await this.request('users', data, "post");
    return res.user;
  }

  /* User get all. Only Admin. Takes {} */
  static async getAllUsers() {
    let res = await this.request('users');
    return res.rows;
  }

  /* User get individual. Only Admin or actual user. Takes {} */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /* User get individual. Only Admin or actual user. Takes {} */
  static async getCurrentUserCharacters(username) {
    let res = await this.request(`users/${username}`);
    return res.user.characters;
  }

  /* User patch. Takes {firstName, lastName, password, email} */
  static async updateSession(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /* User delete. Takes {} */
  static async deleteSession(username) {
    let res = await this.request(`users/${username}`, "delete");
    return res;
  }
  
  /***************************      D&D 5e API ROUTES             ***************************/
  /* Get categories for listing */
  static async getEquipmentCategories() {
    let res = await axios.get(`${DDURL}equipment-categories`)
    return res;
  }

  /* Get Equipment in a category */
  static async getEquipmentFromCategory(category) {
    let res = await axios.get(`${DDURL}equipment-categories/${category}`)
    return res;
  }

  /* Get Equipment details */
  static async getEquipmentDetails(equipment) {
    const index = equipment?.index ? String(equipment.index) : String(equipment); // Handles both object and string inputs
    try {
      const res = await axios.get(`${DDURL}equipment/${index}`);
      return res.data.desc;
    } catch (err) {
      console.warn(`First endpoint failed: ${err.message}`);
      try {
        const res = await axios.get(`${DDURL}magic-items/${index}`);
        return res.data.desc;
      } catch (err) {
        console.error(`Both endpoints failed: ${err.message}`);
        throw new Error("Unable to fetch equipment details from both endpoints.");
      }
    }
  }
}

export default DungeonHelperApi;