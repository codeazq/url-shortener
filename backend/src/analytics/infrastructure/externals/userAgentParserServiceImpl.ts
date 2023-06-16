import UserAgentParserService, {
  ParserOutputDto,
} from 'src/analytics/domain/repository/userAgentParserService';
import * as uaParser from 'ua-parser-js';

export default class userAgentParserServiceImpl
  implements UserAgentParserService
{
  parser(userAgent: string): ParserOutputDto {
    const parsedData = uaParser(userAgent);
    return {
      browser: parsedData.browser.name,
      device: parsedData.device?.model,
      os: parsedData.os.name,
    };
  }
}
