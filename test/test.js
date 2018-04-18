const fs = require("mz/fs");
const js3dlook = require("..");

jest.setTimeout(30000);

const js3DLOOK = js3dlook("iechiem9eeChaiyahf1oHie1jae5ahth8eoCiu8i");
const front_image = fs.createReadStream(__dirname + "/front.jpg");
const side_image = fs.createReadStream(__dirname + "/side.png");
let store = {};

describe("run function", () => {
  it("should fail upload image", () => {
    js3DLOOK.upload().catch(err => {
      expect(err).toBeDefined();
    });
  });

  it("should upload front image jpg", async () => {
    await js3DLOOK
      .upload(front_image)
      .then(body => {
        expect(body.name).toBeDefined();
        expect(body.status).toBeDefined();
        store.front = body.name;
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("should step for front image", async () => {
    await js3DLOOK
      .step({
        step: 1,
        angle: 0,
        image: store.front,
        gender: "male",
        height: 180
      })
      .then(body => {
        expect(body.status).toBeTruthy();
        store.step1key = body.key;
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("should upload side image png", async () => {
    await js3DLOOK
      .upload(side_image)
      .then(body => {
        expect(body.name).toBeDefined();
        expect(body.status).toBeDefined();
        store.side = body.name;
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("should step for side image", async () => {
    await js3DLOOK
      .step({
        step: 2,
        angle: 0,
        image: store.side,
        gender: "male",
        height: 180,
        key: store.step1key
      })
      .then(body => {
        expect(body.status).toBeTruthy();
        store.step2key = body.key;
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("should complete", async () => {
    await js3DLOOK
      .complete({
        angle: 0,
        height: 180,
        gender: "male",
        image_1: store.front,
        image_2: store.side,
        key: store.step1key
      })
      .then(body => {
        expect(body).toBeDefined();
      })
      .catch(err => {
        console.log(err);
      });
  });
});
