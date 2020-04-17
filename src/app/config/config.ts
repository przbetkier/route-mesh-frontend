import {environment} from '../../environments/environment';

export class AppConfig {
  public static API_ENDPOINT = environment.APIEndpoint;
  public static GMAP_API_KEY = environment.GMAP_API_KEY;
  public static AUTH_TOKEN_EXPIRATION_TIME = environment.AUTH_TOKEN_EXPIRATION_TIME;
}
