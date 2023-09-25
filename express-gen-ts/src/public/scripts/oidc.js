import {IdentityModel } from "oidc-client-ts";

const settings = {
  authority: "http://localhost:1234/oidc",
  client_id: "js.tokenmanager",
  redirect_uri: url + "/sample.html",
  post_logout_redirect_uri: url + "/sample.html",
  response_type: "code",
  scope: "openid email roles",

  response_mode: "fragment",

  filterProtocolClaims: true
};
var oidcClient = new IdentityModel.OidcClient(settings);

/**
 * Call api
 */
function displayDetials() {

  // Empty the anchor
  var displayAnchor = document.getElementById('display-anchor');
  displayAnchor.innerHTML = '';
  // Append users to anchor
  displayAnchor.innerHTML += displayOIDCDetails();
}

/**
 * Get user display element
 */
function displayOIDCDetails() {
  return (
    `<div class="user-display-ele">

      <div class="normal-view">
        <div>Authority: </div>
        <div>Client ID: </div>
        <div>Redirect URI: </div>
      </div>
      <button class="sign-in-btn" id="sign-in-btn">
        Sign In
      </button>
    </div>`
  );
}


// **** Add, Edit, and Delete Users **** //

// Setup event listener for button click
document.addEventListener('click', function (event) {
  event.preventDefault();
  var ele = event.target;
  if (ele.matches('#show-detail-btn')) {
    displayDetials();
  } else if (ele.matches('#logout-btn')) {
    logoutUser();
  }
}, false);

function oidcSignIn() {
  signin();
}

///////////////////////////////
// functions for UI elements
///////////////////////////////
function signin() {
  var optionalArgs = {
    state: { bar: 15 } // state is data that you want to roundtrip, it is not used by the protocol
  };
  client.createSigninRequest(optionalArgs).then(function (req) {
    log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
    if (followLinks()) {
      window.location = req.url;
    }
  }).catch(function (err) {
    console.error(err);
    log(err);
  });
}


// **** Logout **** //

function logoutUser() {
  Http
    .get('/api/auth/logout')
    .then(() => window.location.href = '/');
}
