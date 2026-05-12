const OpenAI = require('openai');
const sentiment = require('sentiment');
const SentimentAnalyzer = new sentiment();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAISummary = async (req, res) => {
  try {
    const { data } = req.body; // Election data to summarize

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
       return res.json({ 
         summary: "AI Summary (Mock): Party A has shown a significant growth of 15% in rural areas, while Party B maintains its stronghold in urban centers. Voter turnout increased by 5% compared to the previous election, indicating high civic engagement.",
         isMock: true 
       });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert political analyst. Summarize election data in simple natural language." },
        { role: "user", content: `Analyze this election data and provide a concise summary: ${JSON.stringify(data)}` }
      ],
    });

    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSentimentAnalysis = async (req, res) => {
  try {
    const { text } = req.body; // News or social media text
    const result = SentimentAnalyzer.analyze(text);
    
    res.json({
      score: result.score,
      comparative: result.comparative,
      calculation: result.calculation,
      sentiment: result.score > 0 ? 'Positive' : (result.score < 0 ? 'Negative' : 'Neutral')
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPredictiveInsights = async (req, res) => {
    // Mock predictive engine
    res.json({
        forecast: [
            { party: 'Party A', predictedSeats: 210, confidence: 85 },
            { party: 'Party B', predictedSeats: 180, confidence: 78 },
            { party: 'Others', predictedSeats: 50, confidence: 65 },
        ],
        trend: 'Upward trend for Party A in northern regions.'
    });
};
