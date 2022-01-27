# API Documentation
`Endpoints` : /login , /register, /getmeals , /addmeal , /deletemeal, /createday, /deleteday 

`/login` :
Method : POST
Example: `const  result  =  await  fetch({url}/login,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
email,
password
})
}).then((res) =>  res.json());
return  result;`
This result should contain the JWT token and the user id which are required to authenticate any other api requests.

`/register`:
Method : POST
Example: `const  result  =  await  fetch({url}/register,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
email,
password
})
}).then((res) =>  res.json());
return  result;`

`/getmeals`:
Method: GET
Example: `const  res  =  await  fetch({url}/getmeals?id=${id}token={token});`
res will contain the meal days created by the user.

`/addmeal`:
Method: POST
Example: `const  result  =  await  fetch(${url}/addmeal,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
date,
title :  title,
cal:  cal,
mealId:  mealId,
token,
id
})
}).then((res) =>  res.json());`
date should be a date string to which the user wants to add the meal, and meal-Id is a random generated string used to distinguish different meals.

`/deletemeal`
Method: POST
Example:`const  result  =  await  fetch({url}/deletemeal,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
date,
mealId,
token,
cal,
id
})
}).then((res) =>  res.json());`

`createday`
Method: POST
Example:`const  result  =  await  fetch({url}/createday,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
token,
id,
date
})
}).then((res) =>  res.json());
return  result;`

`deleteday`
Method: POST
Example: `const  result  =  await  fetch(${url}/deleteday,{
method:  'POST',
headers:{
'Content-Type'  :  'application/json'
},
body:  JSON.stringify({
dayId,
token,
id
})
}).then((res) =>  res.json());
return  result;`