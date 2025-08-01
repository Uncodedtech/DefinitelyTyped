/// <reference types="node" />
/// <reference types="nodemailer" />

import { EventEmitter } from "events";
import * as net from "net";
import * as shared from "nodemailer/lib/shared";
import { PassThrough } from "stream";
import * as tls from "tls";

export type ms = number;

export interface SMTPServerAddress {
    /**
     * the address provided with the MAIL FROM or RCPT TO command
     */
    address: string;
    /**
     * an object with additional arguments (all key names are uppercase)
     */
    args: object;
}

export interface SMTPServerAuthentication {
    /**
     * indicates the authentication method used, 'PLAIN', 'LOGIN' or 'XOAUTH2'
     */
    method: "PLAIN" | "LOGIN" | "XOAUTH2";
    /**
     * the username of the user
     */
    username?: string | undefined;
    /**
     * the password if LOGIN or PLAIN was used
     */
    password?: string | undefined;
    /**
     *  the OAuth2 bearer access token if 'XOAUTH2' was used as the authentication method
     */
    accessToken?: string | undefined;
    /**
     * a function for validating CRAM-MD5 challenge responses.
     * Takes the password of the user as an argument and returns true if the response matches the password
     */
    validatePassword(password: string): boolean;
}

export interface SMTPServerAuthenticationResponse {
    /**
     * can be any value - if this is set then the user is considered logged in
     * and this value is used later with the session data to identify the user.
     * If this value is empty, then the authentication is considered failed
     */
    user?: any;
    /**
     * an object to return if XOAUTH2 authentication failed (do not set the error object in this case).
     * This value is serialized to JSON and base64 encoded automatically, so you can just return the object
     */
    data?: object | undefined;
}

export interface SMTPServerSession {
    /**
     * random string identificator generated when the client connected
     */
    id: string;
    /**
     * local IP address for the connected client
     */
    localAddress: string;
    /**
     * local port number for the connected client
     */
    localPort: number;
    /**
     * remote IP address for the connected client
     */
    remoteAddress: string;
    /**
     * remote port number for the connected client
     */
    remotePort: number;
    /**
     * reverse resolved hostname for remoteAddress
     */
    clientHostname: string;
    /**
     * the opening SMTP command (HELO/EHLO/LHLO)
     */
    openingCommand: string;
    /**
     * hostname the client provided with HELO/EHLO call
     */
    hostNameAppearsAs: string;
    /**
     * Envelope Object
     */
    envelope: SMTPServerEnvelope;
    /**
     *  If true, then the connection is using TLS
     */
    secure: boolean;

    transmissionType: string;

    tlsOptions: tls.TlsOptions;

    /*
     * Optional parameter that is added to the session object if provided to the onAuth callback
     */
    user?: string | undefined;
}

export interface SMTPServerDataStream extends PassThrough {
    /**
     * number of bytes read from DATA stream
     */
    byteLength: number;
    /**
     * boolean, if set to true, the message was oversized.
     * When creating the server you can define maximum allowed message size with
     * the size option, see RFC1870 for details.
     */
    sizeExceeded: boolean;
}

export interface SMTPServerEnvelope {
    /**
     * includes an address object or is set to false
     */
    mailFrom: SMTPServerAddress | false;
    /**
     * includes an array of address objects
     */
    rcptTo: SMTPServerAddress[];
}

export interface SMTPServerOptions extends tls.TlsOptions {
    /**
     * if true, the connection will use TLS. The default is false.
     * If the server doesn't start in TLS mode,
     * it is still possible to upgrade clear text socket to
     * TLS socket with the STARTTLS command (unless you disable support for it).
     * If secure is true, additional tls options for tls.
     * createServer can be added directly onto this options object.
     */
    secure?: boolean | undefined;
    /** indicate an TLS server where TLS is handled upstream */
    secured?: boolean | undefined;
    /**
     * optional hostname of the server,
     * used for identifying to the client (defaults to os.hostname())
     */
    name?: string | undefined;
    /**
     * optional greeting message.
     * This message is appended to the default ESMTP response.
     */
    banner?: string | undefined;
    /**
     * optional maximum allowed message size in bytes
     * ([see details](https://nodemailer.com/extras/smtp-server#using-the-size-extension))
     */
    size?: number | undefined;
    /**
     * optional array of allowed authentication methods, defaults to ['PLAIN', 'LOGIN'].
     * Only the methods listed in this array are allowed,
     * so if you set it to ['XOAUTH2'] then PLAIN and LOGIN are not available.
     * Use ['PLAIN', 'LOGIN', 'XOAUTH2'] to allow all three.
     * Authentication is only allowed in secure mode
     * (either the server is started with secure: true option or STARTTLS command is used)
     */
    authMethods?: string[] | undefined;
    /**
     * allow authentication, but do not require it
     */
    authOptional?: boolean | undefined;
    /**
     * optional array of disabled commands (see all supported commands here).
     * For example if you want to disable authentication,
     * use ['AUTH'] as this value.
     * If you want to allow authentication in clear text, set it to ['STARTTLS'].
     */
    disabledCommands?: string[] | undefined; // TODO: ('AUTH' | 'STARTTLS' | 'XCLIENT' | 'XFORWARD')[];
    /**
     * optional boolean, if set to true then allow using STARTTLS
     * but do not advertise or require it. It only makes sense
     * when creating integration test servers for testing the scenario
     * where you want to try STARTTLS even when it is not advertised
     */
    hideSTARTTLS?: boolean | undefined;
    /**
     * optional boolean, if set to true then does not show PIPELINING in feature list
     */
    hidePIPELINING?: boolean | undefined;
    /**
     * optional boolean, if set to true then does not show 8BITMIME in features list
     */
    hide8BITMIME?: boolean | undefined;
    /**
     * optional boolean, if set to true then does not show SMTPUTF8 in features list
     */
    hideSMTPUTF8?: boolean | undefined;
    /**
     * optional boolean, if set to true allows authentication even if connection is not secured first
     */
    allowInsecureAuth?: boolean | undefined;
    /**
     * optional boolean, if set to true then does not try to reverse resolve client hostname
     */
    disableReverseLookup?: boolean | undefined;
    /**
     * optional Map or an object of TLS options for SNI where servername is the key. Overrided by SNICallback.
     */
    sniOptions?: { [servername: string]: tls.TlsOptions } | Map<string, tls.TlsOptions> | undefined;
    /**
     * optional boolean, if set to true then upgrade sockets to TLS immediately after connection is established. Works with secure: true
     */
    needsUpgrade?: boolean | undefined;
    /**
     * optional bunyan compatible logger instance.
     * If set to true then logs to console.
     * If value is not set or is false then nothing is logged
     */
    logger?: shared.Logger | boolean | undefined;
    /**
     * sets the maximum number of concurrently connected clients, defaults to Infinity
     */
    maxClients?: number | undefined;
    /**
     * boolean, if set to true expects to be behind a proxy that emits a
     * [PROXY](http://www.haproxy.org/download/1.5/doc/proxy-protocol.txt) header (version 1 only)
     */
    useProxy?: boolean | undefined;
    /**
     * boolean, if set to true, enables usage of
     * [XCLIENT](http://www.postfix.org/XCLIENT_README.html) extension to override connection properties.
     * See session.xClient (Map object) for the details provided by the client
     */
    useXClient?: boolean | undefined;
    /**
     * boolean, if set to true, enables usage of [XFORWARD](http://www.postfix.org/XFORWARD_README.html) extension.
     * See session.xForward (Map object) for the details provided by the client
     */
    useXForward?: boolean | undefined;
    /**
     * boolean, if set to true use LMTP protocol instead of SMTP
     */
    lmtp?: boolean | undefined;
    /**
     * How many milliseconds of inactivity to allow before disconnecting the client (defaults to 1 minute)
     */
    socketTimeout?: ms | undefined;
    /**
     * How many millisceonds to wait before disconnecting pending
     * connections once `server.close()` has been called (defaults to 30 seconds)
     */
    closeTimeout?: ms | undefined;
    /**
     * The callback to handle authentications ([see details](https://nodemailer.com/extras/smtp-server#handling-authentication-onauth))
     */
    onAuth?(
        auth: SMTPServerAuthentication,
        session: SMTPServerSession,
        callback: (err: Error | null | undefined, response?: SMTPServerAuthenticationResponse) => void,
    ): void;
    /**
     * The callback to handle the client connection. ([see details](https://nodemailer.com/extras/smtp-server#validating-client-connection-onconnect--onclose))
     */
    onConnect?(session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /**
     * the callback to validate MAIL FROM commands ([see details](https://nodemailer.com/extras/smtp-server#validating-sender-onmailfrom))
     */
    onMailFrom?(address: SMTPServerAddress, session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /**
     * The callback to validate RCPT TO commands ([see details](https://nodemailer.com/extras/smtp-server#validating-recipients-onrcptto))
     */
    onRcptTo?(address: SMTPServerAddress, session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /**
     * the callback to handle incoming messages ([see details](https://nodemailer.com/extras/smtp-server#processing-incoming-messages-ondata))
     */
    onData?(stream: SMTPServerDataStream, session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /**
     * the callback that informs about closed client connection
     */
    onClose?(session: SMTPServerSession, callback: (err?: Error | null) => void): void;
}

/** Creates a SMTP server instance */
export class SMTPServer extends EventEmitter {
    options: SMTPServerOptions;
    logger: shared.Logger;
    secureContext: Map<string, tls.SecureContext>;
    connections: Set<any>;
    server: net.Server;

    constructor(options?: SMTPServerOptions);

    /** Start listening on selected port and interface */
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): net.Server;
    listen(port?: number, hostname?: string, listeningListener?: () => void): net.Server;
    listen(port?: number, backlog?: number, listeningListener?: () => void): net.Server; // tslint:disable-line unified-signatures
    listen(port?: number, listeningListener?: () => void): net.Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): net.Server;
    listen(path: string, listeningListener?: () => void): void;
    listen(options: net.ListenOptions, listeningListener?: () => void): net.Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): net.Server; // tslint:disable-line unified-signatures
    listen(handle: any, listeningListener?: () => void): net.Server; // tslint:disable-line unified-signatures

    /** Closes the server */
    close(callback?: () => void): void;

    updateSecureContext(options: tls.TlsOptions): void;

    /** Authentication handler. Override this */
    onAuth(
        auth: SMTPServerAuthentication,
        session: SMTPServerSession,
        callback: (err: Error | null | undefined, response?: SMTPServerAuthenticationResponse) => void,
    ): void;
    /** Override this */
    onClose(session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /** Override this */
    onConnect(session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /** Override this */
    onData(stream: SMTPServerDataStream, session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /** Override this */
    onMailFrom(address: SMTPServerAddress, session: SMTPServerSession, callback: (err?: Error | null) => void): void;
    /** Override this */
    onRcptTo(address: SMTPServerAddress, session: SMTPServerSession, callback: (err?: Error | null) => void): void;

    addListener(event: "close", listener: () => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;

    emit(event: "close"): boolean;
    emit(event: "error", err: Error): boolean;

    listenerCount(event: "close" | "error"): number;

    listeners(event: "close"): Array<() => void>;
    listeners(event: "error"): Array<(err: Error) => void>;

    off(event: "close", listener: () => void): this;
    off(event: "error", listener: (err: Error) => void): this;

    on(event: "close", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;

    once(event: "close", listener: () => void): this;
    once(event: "error", listener: (err: Error) => void): this;

    prependListener(event: "close", listener: () => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;

    prependOnceListener(event: "close", listener: () => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;

    rawListeners(event: "close"): Array<() => void>;
    rawListeners(event: "error"): Array<(err: Error) => void>;

    removeAllListener(event: "close" | "error"): this;

    removeListener(event: "close", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
}
