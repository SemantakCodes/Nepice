document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const webhookURL = 'https://discord.com/api/webhooks/1393217337058136166/RTUtQJYFuR37mCCby0XD29vAmRpLpLEazqXEqK2uFsZhWq6nf95F_KdWzAZyDFJnno8U'; // Replace this!

  const payload = {
    content: `📨 **New Contact Message**\n**Name:** ${name}\n**Email:** ${email}\n**Subject:** ${subject}\n**Message:**\n${message}`
  };

  document.querySelector('.loading').style.display = 'block';
  document.querySelector('.error-message').style.display = 'none';
  document.querySelector('.sent-message').style.display = 'none';

  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => {
    document.querySelector('.loading').style.display = 'none';
    if (response.ok) {
      document.querySelector('.sent-message').style.display = 'block';
      document.getElementById('contactForm').reset();
    } else {
      document.querySelector('.error-message').textContent = 'Failed to send message.';
      document.querySelector('.error-message').style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.error-message').textContent = 'An error occurred.';
    document.querySelector('.error-message').style.display = 'block';
  });
});
