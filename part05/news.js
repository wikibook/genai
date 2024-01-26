function fetchNewsAndAddToSheet() {
  var apiKey = "YOUR_NEWSAPI_KEY"; // NewsAPI 키 입력
  var endpoint = "https://newsapi.org/v2/everything";
  var parameters = {
    apiKey: apiKey,
    q: "chatGPT OR openAI OR south korea",
    from: new Date(
      new Date().getTime() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    sortBy: "publishedAt",
    language: "en",
  };

  var response = UrlFetchApp.fetch(
    endpoint + "?" + encodeParameters(parameters)
  );
  var data = JSON.parse(response);
  var articles = data.articles;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  for (var i = 0; i < articles.length; i++) {
    sheet.appendRow([
      articles[i].title,
      articles[i].description,
      articles[i].url,
    ]);
  }
}

function encodeParameters(params) {
  var encodedParams = [];
  for (var p in params) {
    encodedParams.push(
      encodeURIComponent(p) + "=" + encodeURIComponent(params[p])
    );
  }
  return encodedParams.join("&");
}
