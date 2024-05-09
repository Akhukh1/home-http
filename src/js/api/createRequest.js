const createRequest = async (options = {}) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      options.callback(xhr.status);
    } else if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        options.callback(response);
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhr.open(options.method, options.body);

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.send(options.data);
};

export default createRequest;

// export default function createRequest(method, body, callback) {

//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//         try {
//           const response = JSON.parse(xhr.responseText);
//           callback(response);
//           console.log('JSON = ');
//           console.log(response);
//           // return response;

//         } catch (e) {
//           console.error(e);
//         }
//     }
//   });

//   xhr.open(method, body);

//   xhr.send();
// }
