// ChatGPT 모델 설정
const MODEL_ID = "gpt-3.5-turbo"; // 원하는 모델 ID로 변경 가능

function ChatGPTTranslate(cell) {

  // OpenAI API Key 설정
  // const apiKey = PropertiesService.getScriptProperties().getProperty("OpenAI_API_Key");

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange('B3:D3');
  const apiKey = range.getValue();

  if (!apiKey) {
    return "Error: API 키를 설정해주세요."
  }

  if(cell == undefined) {
    return "A6 셀에 번역할 문장을 입력해해주세요.";
  }

  const apiUrl = "https://api.openai.com/v1/chat/completions";
  
  const data = {
    model: MODEL_ID,
    messages: [
      {
        role: "system",
        content: "You are a professional translator who translates sentences accurately. Please translate the entered sentence into Korean accurately without summarizing the sentence."
      },
      {
        role: "user",
        content: cell
      }
    ],
    max_tokens: 3000
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  };

  const options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };
  
  const response = UrlFetchApp.fetch(apiUrl, options);
  const result = JSON.parse(response.getContentText());
  
  return result.choices[0].message.content;
}
