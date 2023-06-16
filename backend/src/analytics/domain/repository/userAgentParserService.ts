export default interface UserAgentParserService {
  parser(userAgent: string): ParserOutputDto;
}

export interface ParserOutputDto {
  browser: string;
  device: string;
  os: string;
}

export const UserAgentParserServiceName = 'UserAgentParserService';
