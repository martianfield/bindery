* Bitbucket Cloud and OAuth2: https://developer.atlassian.com/static/bitbucket/concepts/oauth2.html
* OAuth on BitBucket: https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html
* BitBucket Cloud REST API: https://confluence.atlassian.com/bitbucket/use-the-bitbucket-cloud-rest-apis-222724129.html

* Making REST calls
    * http://stackoverflow.com/questions/16148403/using-node-js-to-connect-to-a-rest-api/16155551#16155551
    * http://rapiddg.com/blog/calling-rest-api-nodejs-script
    * https://isolasoftware.it/2012/05/28/call-rest-api-with-node-js/
    
    
* Talk to private repos: `curl --user buserbb:2934dfad https://api.bitbucket.org/1.0/user/repositories`
* Node https: https://nodejs.org/api/https.html

* Node https with basic auth: https://dzone.com/articles/nodejs-call-https-basic


Using of OAuth token for BitBucket:

    Once you have an access token, as per RFC-6750, you can use it in a request in any of the following ways (in decreasing order of desirability):
     Send it in a request header: Authorization: Bearer {access_token}
     Include it in a (application/x-www-form-urlencoded) POST body as access_token={access_token}
     Put in the query string of a non-POST: ?access_token={access_token}
     



