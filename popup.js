document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getIssues"}, function(response) {
      var issueList = document.getElementById('issueList');
      response.issues.forEach(function(issue) {
        var a = document.createElement('a');
        a.href = issue.url;
        a.textContent = issue.key + ': ' + issue.summary;
        issueList.appendChild(a);
        issueList.appendChild(document.createElement('br'));
      });
    });
  });
});
