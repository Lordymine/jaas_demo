var jsonwebtoken = require('jsonwebtoken');
var uuid = require('uuid-random');

/**
 * Function generates a JaaS JWT.
 */
const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date()
  const jwt = jsonwebtoken.sign({
    aud: 'jitsi',
    context: {
      user: {
        id,
        name,
        avatar,
        email: email,
        moderator: 'true'
      },
      features: {
        livestreaming: 'true',
        recording: 'true',
        transcription: 'false',
        "outbound-call": 'false'
      }
    },
    iss: 'chat',
    room: '*',
    sub: appId,
    exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
    nbf: (Math.round((new Date).getTime() / 1000) - 10)
  }, privateKey, { algorithm: 'RS256', header: { kid } })
  return jwt;
}

/**
 * Generate a new JWT.
 */
const token = generate('my private key', {
    id: uuid(),
    name: "rafael",
    email: "rafaelkefren@gmail.com",
    avatar: "*",
    appId: "vpaas-magic-cookie-ff7620b105dd4a44a38b71c62bb3c05a", // Your AppID ( previously tenant )
    kid: "vpaas-magic-cookie-ff7620b105dd4a44a38b71c62bb3c05a/866117-SAMPLE_APP"
});

console.log(token);
