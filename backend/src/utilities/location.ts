import axios from 'axios';

// @Injectable()
export default class IpLocationService {
  constructor() {}

  async getLocation(ipAddress: string) {
    const IPLOCATIONCHECKERURL = `https://ipapi.co/${ipAddress}/json/`;
    const { data } = await axios.get(IPLOCATIONCHECKERURL);
    return data;
  }
}
