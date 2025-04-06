// Simple test script using fetch API
const apiKey = '14d0c8d9b0e3569e437c5d5083f706215fd5b71f283dca2e6186b5823d6d2b35';

async function testAPI() {
  try {
    console.log('Testing API with key:', apiKey);
    
    const response = await fetch('https://api.together.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
        messages: [
          { role: 'user', content: 'What are some fun things to do in New York?' }
        ]
      })
    });
    
    if (!response.ok) {
      console.error('Error status:', response.status);
      console.error('Error text:', await response.text());
      return;
    }
    
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    console.log('Message content:', data.choices[0].message.content);
  } catch (error) {
    console.error('API Error:', error);
  }
}

testAPI();
