# customAxios
Custom authentication axios for React Developers

This tool will help you in your projects to easily do an HTTP request to an API with a Bearer Token.

It uses redux to retrieve the Token from the User state, but you can modify the code to fit your project needs (you can even use Zustand).

The function algorithm does the following actions:

1. It creates an Axios instance with default options.
2. It uses an Axios interceptor REQUEST to insert the Bearer Token before the request is sent (if it exists, of course)
3. It uses an Axios interceptor RESPONSE to easily return the response data if successful, or an error if failed.

Example:

Let's say that you have a component that requires to do an HTTP request to an API in order to gather data that your component needs.
If you import this function, you can use it like the following:

```javascript
import {customAxios} from './fileLocation';
import {useState, useEffect} from 'react';
export default function CompaniesComponent(){
  const [companies, setCompanies] = useState([]);
  
  //Fetch only when the component renders once
  useEffect(_ => {
    customAxios.get('companies')
      .then(data => {
        setCompanies(data);
      })
      .catch(error => {
        console.log(`There was an error fetching the companies: ${error}`);
      });
  }, []);
  
  
  return <div>
    <select>
      {companies.map(company => (<option value={company.id}>{company.name}</option>))}
    </select>
  </div>
}
```
