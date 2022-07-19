const chatbot = require('../chatbot/chatbot');

// 여기에 export 되는 module은 app이다.
// empty placeholder root
module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'there' })
    });

    app.post('/api/df_text_query', async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
        res.send(responses[0].queryResult)
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters)
        res.send(responses[0].queryResult)
    });
}