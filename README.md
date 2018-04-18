# js3dlook

3DLOOK JavaScript Library

## Usage

Install with npm: `npm install --save js3dlook`.

Check the 3DLOOK documentation for the api-flow sequence.

**Create an instance of the library:**

```js
import js3DLOOK from "js3dlook";

const js3DLOOK = js3dlook("iechiem9eeChaiyahf1oHie1jae5ahth8eoCiu8i"); //SAMPLE KEY -- replace with your own api key

const store = {}; //object to store needed data
```

**Upload a front image:**

```js
const front_image; //Reference to File

js3DLOOK
  .upload(front_image)
  .then(body => {
    //store the name of the file (body.name)
    store.front = body.name;
  })
  .catch(err => {
    console.log(err);
  });
```

**Step 1 - Check the downloaded image to the requirements:**

```js
js3DLOOK
  .step({
    step: 1,
    angle: 0,
    image: store.front, //name of file from upload above
    gender: "male",
    height: 180
  })
  .then(body => {
    //store the key for future calls
    store.step1key = body.key;
  })
  .catch(err => {
    console.log(err);
  });
```

**Upload a side image:**

```js
const side_image; //Reference to File

js3DLOOK
  .upload(side_image)
  .then(body => {
    //store the name of the file (body.name)
    store.side = body.name;
  })
  .catch(err => {
    console.log(err);
  });
```

**Step 2 - Check the downloaded image to the requirements:**

```js
js3DLOOK
  .step({
    step: 2,
    angle: 0,
    image: store.side, //name of file from upload above
    gender: "male",
    height: 180,
    key: store.step1key
  })
  .then(body => {
    //store the key for future calls
    store.step2key = body.key;
  })
  .catch(err => {
    console.log(err);
  });
```

**Complete**

```js
js3DLOOK
  .complete({
    angle: 0,
    height: 180,
    gender: "male",
    image_1: store.front, //name of file from upload above
    image_2: store.side, //name of file from upload above
    key: store.step1key //name of file from step 1
  })
  .then(body => {
    //body now holds all of the params you need
  })
  .catch(err => {
    console.log(err);
  });
```

## License

ISC.
