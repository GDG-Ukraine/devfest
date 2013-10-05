$scope.signIn = function(authResult) {
  $scope.$apply(function() {
    $scope.processAuth(authResult);
  });
}

$scope.processAuth = function(authResult) {
  $scope.immediateFailed = true;
  if ($scope.isSignedIn) {
    return 0;
  }
  if (authResult['access_token']) {
    $scope.immediateFailed = false;
    // Successfully authorized, create session
    DevFest.signIn(authResult).then(function(response) {
      $scope.signedIn(response.data);
    });
  } else if (authResult['error']) {
    if (authResult['error'] == 'immediate_failed') {
      $scope.immediateFailed = true;
    } else {
      console.log('Error:' + authResult['error']);
    }
  }
}

$scope.renderSignIn = function() {
  gapi.signin.render('myGsignin', {
    'callback': $scope.signIn,
    'clientid': Conf.clientId,
    'requestvisibleactions': Conf.requestvisibleactions,
    'scope': Conf.scopes,    
    'theme': 'dark',
    'cookiepolicy': Conf.cookiepolicy,
    'accesstype': 'offline'
  });
}
