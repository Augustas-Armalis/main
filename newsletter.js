document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");

  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOWZjMjYxYmFjZmZjN2RjMzExNTkyZDM4OWRmMjQ1MGMyZGJjNTczOTJiNWIzY2RkMTk0ODA5YTJjOTA5MGUyNGM0ZDdkNDU1NzhiMTUxMzMiLCJpYXQiOjE3MjQ2ODEwNTQuMjg2MjI2LCJuYmYiOjE3MjQ2ODEwNTQuMjg2MjI5LCJleHAiOjQ4ODAzNTQ2NTQuMjgzMTEzLCJzdWIiOiIxMDU0MDMxIiwic2NvcGVzIjpbXX0.cnCv3cGgdbVP1R77wIkN3gVjkgdNSosoi3zEitmW5t18iL8rWFMQhcUAlxpd4QdSgxFYJcHfuoB2P32abwkCQ-wi75Xu4CclI03gypPxgzN4--6_XTtm5PCvMeDcE17ISbFpt71g7Kk3djpJtN5OI7GqmdBUgJr5d0WoBicYGLVcjdiBHHFdhZFPUYlkNLFdwXAQv-VnSUPWJAw6WVP1E2d7ITsZ42IAe3as81XKMpQL8NReHqdbnfsaMYkv6Wk877zTWd_eZ743ZXoclOKzTwGgnN_ypzrli_tlBFapZYBRAxvLA7-mE8HQxvFVYj9trRpIvZnE5CmlKUeMdycLELZCFk02neFxS4kxJGHCWEKpZaUjM8-4Pfs6jP35S2zhBleKQ3D-SY0OZxme6wsQXZv5JFvzQX_FUTOfxZa8EPyYRuWfxz_hdowHkfuB7CyoWPqE81bp7leJUABOIFQAKwDpQU7XJLqrm12HnfytQgNV8ChvDclnGafUG-eqreQEFdvnRMhHji5ThWF-ueDjhz4Ksa0EjbyTXXOhx-tVe-b8A0KZT1m_nm49j9IpCh2QVRcTRSDE9a_9S7_HZ3V57Ouwnu-XEE8R5MStWtLT2SliU5BJX0X3xY5-QuxveI-ohUfc3iq1W4PZXBX1ROo1mPbjfnr4ndYN7bt93o_DDrM";

  fetch('https://connect.mailerlite.com/api/groups?filter[name]=The Harvest', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve group information');
      }
      return response.json();
    })
    .then(data => {
      const groupId = data.data[0].id;

      fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: email.value,
          fields: {
            name: name.value
          },
          groups: [groupId]
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Subscription failed');
          }
          console.log('Subscription successful');
          alert('Thank you! Your subscription was successful.');
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Subscription failed');
        });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to retrieve group information');
    });
});

