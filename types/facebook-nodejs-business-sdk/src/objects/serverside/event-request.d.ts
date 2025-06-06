import EventResponse from "./event-response";
import HttpServiceInterface from "./http-service-interface";
import ServerEvent from "./server-event";
/**
 * EventRequest
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters}
 */
export default class EventRequest {
    _access_token: string;
    _pixel_id: string;
    _events: ServerEvent[];
    _partner_agent?: string | null;
    _test_event_code?: string | null;
    _namespace_id?: string | null;
    _upload_id?: string | null;
    _upload_tag?: string | null;
    _upload_source?: string | null;
    _debug_mode: boolean;
    _api: Record<string, any>;
    _http_service?: HttpServiceInterface | null;
    _app_secret?: string | null;
    /**
     * @param {String} access_token Access Token for the user calling Graph API
     * @param {String} pixel_id Pixel Id to which you are sending the events
     * @param {ServerEvent[]} events Data for the request Payload for a Conversions API Event
     * @param {?String} partner_agent Platform from which the event is sent e.g. wordpress
     * @param {?String} test_event_code Test Event Code used to verify that your server events are received correctly by Facebook.
     * @param {?String} namespace_id Scope used to resolve extern_id or Third-party ID. Can be another data set or data partner ID.
     * @param {?String} upload_id Unique id used to denote the current set being uploaded.
     * @param {?String} upload_tag Tag string added to track your Offline event uploads.
     * @param {?String} upload_source The origin/source of data for the dataset to be uploaded.
     * @param {Boolean} debug_mode_flag Set to true if you want to enable more logging in SDK
     * @param {?HttpServiceInterface} http_service Override the default http request method by setting an object that implements HttpServiceInterface
     * @param {?String} app_secret App Secret for the user calling Graph API
     */
    constructor(access_token?: string, pixel_id?: string, events?: ServerEvent[], partner_agent?: string | null, test_event_code?: string | null, namespace_id?: string | null, upload_id?: string | null, upload_tag?: string | null, upload_source?: string | null, debug_mode_flag?: boolean, http_service?: HttpServiceInterface | null, app_secret?: string | null);
    /**
     * Gets the data for the request Payload for a Conversions API Event. events is represented by a list/array of ServerEvent objects.
     */
    get events(): ServerEvent[];
    /**
     * Sets the events for the request Payload for a Conversions API Event.
     * events is represented by a list/array of ServerEvent objects.
     * @param events for the current server event
     */
    set events(events: ServerEvent[]);
    /**
     * Sets the events for the request Payload for a Conversions API Event.
     * events is represented by a list/array of ServerEvent objects.
     * @param events for the current server event
     */
    setEvents(events: ServerEvent[]): EventRequest;
    /**
     * Gets the partner_agent for the request
     * Allows you to specify the platform from which the event is sent e.g. wordpress
     */
    get partner_agent(): string;
    /**
     * Sets the partner_agent for the request
     * Allows you to specify the platform from which the event is sent e.g. wordpress
     * @param {String} partner_agent String value for the partner agent
     */
    set partner_agent(partner_agent: string);
    /**
     * Sets the partner_agent for the request
     * Allows you to specify the platform from which the event is sent e.g. wordpress
     * @param {String} partner_agent String value for the partner agent
     */
    setPartnerAgent(partner_agent: string): EventRequest;
    /**
     * Gets the test_event_code for the request
     * Code used to verify that your server events are received correctly by Facebook.
     * Use this code to test your server events in the Test Events feature in Events Manager.
     * See Test Events Tool @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/main-body#test_event_code} for an example.
     */
    get test_event_code(): string;
    /**
     * Sets the test_event_code for the request
     * Code used to verify that your server events are received correctly by Facebook.
     * Use this code to test your server events in the Test Events feature in Events Manager.
     * See Test Events Tool @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/main-body#test_event_code} for an example.
     */
    set test_event_code(test_event_code: string);
    /**
     * Sets the test_event_code for the request
     * Code used to verify that your server events are received correctly by Facebook.
     * Use this code to test your server events in the Test Events feature in Events Manager.
     * See Test Events Tool @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/main-body#test_event_code} for an example.
     */
    setTestEventCode(test_event_code: string): EventRequest;
    /**
     * Gets the debug mode flag for the Graph API request
     */
    get debug_mode(): boolean;
    /**
     * Sets the debug mode flag for the Graph API request
     * @param debug_mode boolean value representing whether you want to send the request in debug mode to get detailed logging.
     */
    set debug_mode(debug_mode: boolean);
    /**
     * Sets the debug mode flag for the Graph API request
     * @param {Boolean} debug_mode boolean value representing whether you want to send the request in debug mode to get detailed logging.
     */
    setDebugMode(debug_mode: boolean): EventRequest;
    /**
     * Gets the access token for the Graph API request
     */
    get access_token(): string;
    /**
     * Sets the access token for the Graph API request
     * @param access_token string representing the access token that is used to make the Graph API.
     */
    set access_token(access_token: string);
    /**
     * Sets the access token for the Graph API request
     * @param {String} access_token string representing the access token that is used to make the Graph API.
     */
    setAccessToken(access_token: string): EventRequest;
    /**
     * Gets the app secret for the Graph API request
     */
    get app_secret(): string;
    /**
     * Sets the app secret for the Graph API request
     * @param app_secret string representing the app secret that is used to make the Graph API.
     */
    set app_secret(app_secret: string);
    /**
     * Sets the app secret for the Graph API request
     * @param {String} app_secret string representing the app secret that is used to make the Graph API.
     */
    setAppSecret(app_secret: string): EventRequest;
    /**
     * Gets the pixel against which we send the events
     */
    get pixel(): string;
    /**
     * Sets the pixel against which we send the events
     * @param {String} pixel_id string value representing the Pixel's Id to which you are sending the events.
     */
    set pixel_id(pixel_id: string);
    /**
     * Sets the pixel against which we send the events
     * @param {String} pixel_id String value for the pixel_id against which you want to send the events.
     */
    setPixelId(pixel_id: string): EventRequest;
    /**
     * Gets the NamespaceId for the events
     */
    get namespace_id(): string;
    /**
     * Sets the namespace_id for the events
     * @param {String} namespace_id Scope used to resolve extern_id or Third-party ID. Can be another data set or data partner ID.
     */
    set namespace_id(namespace_id: string);
    /**
     * Sets the namespace_id for the events
     * @param {String} namespace_id Scope used to resolve extern_id or Third-party ID. Can be another data set or data partner ID.
     */
    setNamespaceId(namespace_id: string): EventRequest;
    /**
     * Gets the Upload Tag for the current events upload
     */
    get upload_tag(): string;
    /**
     * Sets the upload_tag for the current events upload
     * @param {String} upload_tag Tag string added to Track your Offline event uploads
     */
    set upload_tag(upload_tag: string);
    /**
     * Sets the upload_tag for the current events upload
     * @param {String} upload_tag Tag string added to Track your Offline event uploads
     */
    setUploadTag(upload_tag: string): EventRequest;
    /**
     * Gets the Upload Tag for the current events upload
     */
    get upload_id(): string;
    /**
     * Sets the upload_id for the current events upload
     * @param {String} upload_id Unique id used to denote the current set being uploaded
     */
    set upload_id(upload_id: string);
    /**
     * Sets the upload_id for the current events upload
     * @param {String} upload_id Unique id used to denote the current set being uploaded
     */
    setUploadId(upload_id: string): EventRequest;
    /**
     * Gets the Upload Tag for the current events upload
     */
    get upload_source(): string;
    /**
     * Sets the upload_source for the current events upload
     * @param {String} upload_source origin/source of data for the dataset to be uploaded.
     */
    set upload_source(upload_source: string);
    /**
     * Sets the upload_source for the current events upload
     * @param {String} upload_source origin/source of data for the dataset to be uploaded.
     */
    setUploadSource(upload_source: string): EventRequest;
    /**
     * Gets the http_service object for making the events request
     */
    get http_service(): HttpServiceInterface;
    /**
     * Sets the http_service object for making the events request
     * @param {HttpServiceInterface} http_service
     */
    set http_service(http_service: HttpServiceInterface);
    /**
     * Sets the http_service object for making the events request
     * @param {HttpServiceInterface} http_service
     */
    setHttpService(http_service: HttpServiceInterface): EventRequest;
    /**
     * Executes the current event_request data by making a call to the Facebook Graph API.
     */
    execute(): Promise<EventResponse>;
    cloneWithoutEvents(): Promise<EventRequest>;
}
