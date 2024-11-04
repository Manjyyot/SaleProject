const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractAndParseJSON(content) {
    try {
      let match = content.match(/```json([\s\S]*?)```/);
      if (!match) {
        // Fallback: Try parsing the entire content if it is plain JSON
        match = [null, content];
      }
      if (match && match[1]) {
        return JSON.parse(match[1].trim());
      } else {
        throw new Error('No JSON found in the content');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw error;
    }
  }
    
  const sendToGPTAssistant = async (data) => {
      try {
          // Step 1: Create a thread with the initial message
          const thread = await openai.beta.threads.create({
              messages: [
                  {
                      role: "user",
                      content: data.message,
                  },
              ],
          });
  
          // Step 2: Create and poll the run
          const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
              assistant_id: 'asst_N73lfZ6Gyw84qtusRj5rmxvV',
          });
  
          // Step 3: Retrieve the messages
          const messages = await openai.beta.threads.messages.list(thread.id, {
              run_id: run.id,
          });
  
          const message = messages.data.pop();
          if (message && message.content[0].type === "text") {
              const { text } = message.content[0];
              console.log('Complete output:', text);
              
              // Call the extractAndParseJSON function
              try {
                  const jsonObject = extractAndParseJSON(text.value);
                  console.log('Parsed JSON object:', jsonObject);
                  return jsonObject;
              } catch (error) {
                  console.error('Error extracting and parsing JSON:', error);
              }
          } else {
              console.error('Message content is not in the expected format or is missing.');
          }
      } catch (error) {
          if (error.response) {
              console.error('Error response from the API:', error.response.data);
          } else {
              console.error('Error communicating with the GPT assistant:', error.message);
          }
          throw error;
      }
  };

module.exports = {
    sendToGPTAssistant
};


// Example usage
// let x = sendToGPTAssistant({
//     message: JSON.stringify({
//         name: "Ankan",
//         email: "ankan.chakrabarti@herovired.com",
//         phoneNo: "9205449484",
//         expInYears: 7,
//         currentSkill: "AI, ML, Python, excel, matplotlib, pandas",
//         currentCTC: "700000",
//         currentCompany: "HeroVired",
//         currentJobRole: "Sales SME",
//         targetRole: "DevOps Engineer"
//     })
// });

// console.log('x: ', x)
