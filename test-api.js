import Together from 'together-ai';

const apiKey = '14d0c8d9b0e3569e437c5d5083f706215fd5b71f283dca2e6186b5823d6d2b35';
const together = new Together({ apiKey: apiKey });

async function testAPI() {
  try {
    console.log('Testing API with key:', apiKey);
    const response = await together.chat.completions.create({
      messages: [{"role": "user", "content": "What are some fun things to do in New York?"}],
      model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
    });

    console.log('API Response:', response);
    console.log('Message content:', response.choices[0].message.content);
  } catch (error) {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      console.error('Error response:', await error.response.text());
    }
  }
}

testAPI();
