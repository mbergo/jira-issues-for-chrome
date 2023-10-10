chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getIssues") {
    fetch('https://revvy-modeln.atlassian.net/rest/api/2/search?jql=reporter=currentuser()', {
      headers: {
        'Authorization': 'Basic ' + btoa('email:api_token'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      var issues = data.issues.map(issue => {
        return {
          key: issue.key,
          summary: issue.fields.summary,
          url: 'https://revvy-modeln.atlassian.net/browse/' + issue.key
        };
      });
      sendResponse({issues: issues});
    });
    return true;  // Will respond asynchronously.
  }
});
