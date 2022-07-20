'use strict';

const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config/keys');
const structjson = require('./structjson');

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);


module.exports = {
    textQuery: async function (text, parameters = {}) {

        let self = module.exports;

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            }, 

            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function (event, parameters = {}) {

        let self = module.exports;

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: languageCode,
                },
            },
        };

        let responses = await sessionClient
            .detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },




    // expexts response and will for now
    handleAction: function (responses) {
        return responses;
    }

};