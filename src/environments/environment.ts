// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:8070/api/',
  authorizationServerUrl : 'http://localhost:8070/api/oauth/token',
  userOffersResourceUrl : 'userOffers',
  userExchangesResourceUrl : 'userExchanges',
  findBookByNameUrl : 'public/findBooks',
  sendBookRequestUrl : 'requestABook',
  booksResourceUrl : 'books',
  acceptRequestUrl : 'acceptRequest',
  recievedRequestsResourceUrl : 'recievedRequests',
  sendedRequestsResourceUrl : 'sendedRequests',

  contentTypes : {
    json : 'application/json; charset=utf-8',
    XwwwFormUrlencoded : 'application/x-www-form-urlencoded; charset=utf-8'
  }
};
