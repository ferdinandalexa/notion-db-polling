import axios from 'axios';

async function dispatchAction (webhook, token, eventType) {
  await axios.post(`${webhook}`,
    { event_type: eventType },
    {
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
        Authorization: `token ${token}`
      }
    }
  );
}

export default dispatchAction;
