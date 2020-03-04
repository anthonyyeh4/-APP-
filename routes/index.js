var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
var async = require('async');


/* GET home page. */
router.get('/image_list', function(req, res, next) {
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
    });
  res.render('image_list', { title: 'Express',image_list:obj });
});

router.get('/getFace', function(req, res, next) {
    var obj = {};
    var image_url = "https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48356902_2435716533166179_6248959845521686528_o.jpg?_nc_cat=109&_nc_ht=scontent.ftpe5-1.fna&oh=06eae96b4b3007b9848cd915ff2e6384&oe=5CAFA17E"
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
    });
    var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect';
    fetch(queryURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
            },
            body: JSON.stringify({
                url: image_url,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData) {
                // 接到 Data
                console.log(responseData);
                if(responseData.length != 0){
                    obj[image_url] = responseData
                    res.json(responseData)
                } else {
                    console.error("Can not detect the face!")
                    res.json({
                        err:"Can not detect the face!"
                    })
                }
            }
        })
        .then(() => {
            for(let i in obj[image_url]){
                obj[image_url][i].title = "";
                obj[image_url][i].place = "";
            }
        })
        .then(() => {
            fs.writeFile('data.txt',JSON.stringify(obj),function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("write success!")
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
})
var name_list = {
    '孫桂芝':'1b413811-4200-4b6a-acea-2686cdfc5ebb',
    '尉天驄':'6564cc5b-2c8c-412f-bdc5-00e47d797983',
    '崔仁勳':'7570348b-6e09-4312-a8b7-5a1a25c8c167',
    'J. Thyagarajan AshokaMitran':'12539c71-7ee3-43f9-9476-754a925410f4',
    '安娜·布蘭迪亞娜':'a6006a12-5965-45c7-ac50-3f3ec1a65ee9',
    '聶華苓':'907967b3-39e7-40bf-88e8-248f526110f2',
    '西雅':'75b79917-b47d-403c-8c98-25fc28f23f38',

}
router.get('/createGroup',function(req,res,next){
    var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/persongroups/groupofgod/persons';
    fetch(queryURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
            },
            body: JSON.stringify({
                "name": "西雅",
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData) {
                // 接到 Data
                console.log(responseData);
                if(responseData.length != 0){
                    res.json(responseData)
                } else {
                    console.error("Can not!")
                    res.json({
                        err:"Can not detect the face!"
                    })
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
})
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));


router.get('/addFace',function(req,res,next){
    var img_list = [
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48192593_1324445851030849_8271729467290812416_n.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=dc725e2f7ec92596bd111542618f3948&oe=5C9362AF',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47682753_1324445864364181_3841861449001467904_n.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=3238a58a6045b8ac0d3038a0b30f47d1&oe=5C992E5A',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48024972_1324445901030844_1461482228713259008_o.jpg?_nc_cat=108&_nc_ht=scontent.ftpe5-1.fna&oh=aa39a6215520b18e074af38aefbba532&oe=5C670692',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48078890_1324447351030699_2367816982113288192_n.jpg?_nc_cat=111&_nc_ht=scontent.ftpe5-1.fna&oh=c5fddd44644690c6f5716acf35680968&oe=5C9299C7',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48134100_1324446787697422_5679620767470321664_o.jpg?_nc_cat=105&_nc_ht=scontent.ftpe5-1.fna&oh=aa4f228b480b0ff7defa3d9fb23cdd98&oe=5C9BE281',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47389922_1324450607697040_3361291034196705280_o.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=a4d10199ee6a584eecacb89233b7e7a2&oe=5CA84B16',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47580715_1324450631030371_4198534422527475712_n.jpg?_nc_cat=107&_nc_ht=scontent.ftpe5-1.fna&oh=25bd32d8c5d968fb4c0b7ad2cf6b8791&oe=5C99BFFB',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47792630_1324450707697030_8381017306729283584_n.jpg?_nc_cat=110&_nc_ht=scontent.ftpe5-1.fna&oh=59843095d285001d92702ff3c61336dc&oe=5C687542',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48358020_1324450757697025_3352197433084870656_n.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=50c4c52e75cf5eace7b96d0dfaad1bd3&oe=5CB08BCE',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47687904_1324450781030356_4864029898416586752_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe5-1.fna&oh=d660a944c1968f423d4735ae66025889&oe=5C9EBEA2',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47688291_1324450867697014_3962318385252925440_n.jpg?_nc_cat=106&_nc_ht=scontent.ftpe5-1.fna&oh=12dcff12b9b66210d478cec96f765a8b&oe=5CA6FCBB',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48360709_1324450884363679_3673293208223219712_n.jpg?_nc_cat=105&_nc_ht=scontent.ftpe5-1.fna&oh=e684af7d5947cffa19e6a97a13061675&oe=5CAFDC3A',
        // 'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48090094_1324450941030340_427731764329316352_n.jpg?_nc_cat=110&_nc_ht=scontent.ftpe5-1.fna&oh=6b3ca75bc037278a4fe7dfc461549857&oe=5C954E73',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48270489_1324451007697000_3855652674888269824_n.jpg?_nc_cat=109&_nc_ht=scontent.ftpe5-1.fna&oh=f5bf04df96d8a095a6b171adc40bbe28&oe=5C64B722',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48120756_1324451044363663_2929027662758281216_n.jpg?_nc_cat=107&_nc_ht=scontent.ftpe5-1.fna&oh=01f07cb2ec51ab7860d53cfa8dd856aa&oe=5CA61441',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48264361_1324457701029664_6000054524939599872_n.jpg?_nc_cat=103&_nc_ht=scontent.ftpe5-1.fna&oh=ab41b6312b02a0ae3fb0938efadbca99&oe=5CB1EE25',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47686591_1324457714362996_519909025291173888_n.jpg?_nc_cat=105&_nc_ht=scontent.ftpe5-1.fna&oh=5ea0cf7442c37153fc298a10228bff68&oe=5C9540AB',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47683102_1324457737696327_7490257650932776960_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpe5-1.fna&oh=937b3598510fe8037b859b1b7bb7def3&oe=5CA18C1D',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48212671_1324457784362989_2685744759309336576_n.jpg?_nc_cat=110&_nc_ht=scontent.ftpe5-1.fna&oh=424a4630f5f50ed9dbd69bffe269d691&oe=5C9D5945',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47578335_1324457851029649_3792652294999244800_n.jpg?_nc_cat=105&_nc_ht=scontent.ftpe5-1.fna&oh=e39c6f9be56c5fa15be8357bb558a09e&oe=5C9F673D',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48046390_1324457944362973_96117975060316160_n.jpg?_nc_cat=107&_nc_ht=scontent.ftpe5-1.fna&oh=ea20030567c4960fc9d1befe2b9c69fa&oe=5CB210B4',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48064159_1324457964362971_4407957337118081024_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe5-1.fna&oh=72ae86372520b6085a0d756b0307dbd9&oe=5C9DFC43',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47684929_1324458097696291_2419646272324501504_n.jpg?_nc_cat=111&_nc_ht=scontent.ftpe5-1.fna&oh=49c3b4c6a7bab6ea17c1c8346370aa22&oe=5CAA9A52',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47579037_1324458117696289_2165557110899736576_n.jpg?_nc_cat=106&_nc_ht=scontent.ftpe5-1.fna&oh=c84e0449e7783ea5c875f164bd73a52e&oe=5C98A167',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48340043_1324458171029617_6467620027880177664_n.jpg?_nc_cat=109&_nc_ht=scontent.ftpe5-1.fna&oh=abef2c4f72d70034f1d17d46b57dc483&oe=5CA33403',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48380865_1324458254362942_7348549538623258624_n.jpg?_nc_cat=111&_nc_ht=scontent.ftpe5-1.fna&oh=3549b84cc9836729de64bb6982c5a1db&oe=5C9CE544',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48359892_1324458324362935_5926608041557360640_n.jpg?_nc_cat=108&_nc_ht=scontent.ftpe5-1.fna&oh=1bc82d30d9c231e20f64f3709c9c5fe9&oe=5C92EF51',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48368407_1324458367696264_4118625937510105088_n.jpg?_nc_cat=103&_nc_ht=scontent.ftpe5-1.fna&oh=e7313a0f6160af338f7c6b6538c778b4&oe=5C9D02F7',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48369401_1324458434362924_3726049790463574016_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe5-1.fna&oh=0a4aebbc1125401ab6c3a903335791e6&oe=5CAEA0FD',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48362442_1324458494362918_3917388302872739840_n.jpg?_nc_cat=106&_nc_ht=scontent.ftpe5-1.fna&oh=8700eed910d2d56c0aaa8eb05a92f853&oe=5CAFD7DF',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47683136_1324458591029575_3067289497604456448_n.jpg?_nc_cat=102&_nc_ht=scontent.ftpe5-1.fna&oh=06a29309e3ef8c48153f4d1ef063a664&oe=5C9252B9',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47571505_1324458951029539_4509491970313289728_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpe5-1.fna&oh=5ad8e1c6f137aabcc2b191c52a209521&oe=5CA8E113',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47687308_1324459297696171_5019024122689093632_o.jpg?_nc_cat=102&_nc_ht=scontent.ftpe5-1.fna&oh=c2205f22ff4074bc75a6138bf74e8343&oe=5CA3A565',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48246069_1324459331029501_1855022033277026304_n.jpg?_nc_cat=103&_nc_ht=scontent.ftpe5-1.fna&oh=c88f9763a8dea3ce902397b1fd44d844&oe=5C944C0D',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48370653_1324459361029498_4506434365915398144_n.jpg?_nc_cat=101&_nc_ht=scontent.ftpe5-1.fna&oh=422f221541d77e6d117d02cc5bcf5dfc&oe=5C94A312',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48393468_1324459354362832_3649438594789015552_n.jpg?_nc_cat=103&_nc_ht=scontent.ftpe5-1.fna&oh=eb65733b21bcea81e1760e75f5413b16&oe=5C66B528',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47578721_1324459384362829_1158278076149268480_n.jpg?_nc_cat=101&_nc_ht=scontent.ftpe5-1.fna&oh=6ff4098cc5d8d1d68e2ea908e9ae67ed&oe=5CAE67B2',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47688178_1324459491029485_3956833381303451648_o.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=2ccc422c7b4fd5d799d9f567244f4735&oe=5C650AAC',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48053248_1324459481029486_9110217751892328448_o.jpg?_nc_cat=107&_nc_ht=scontent.ftpe5-1.fna&oh=032d257256651ed735731c4aa7fa76b6&oe=5C636F8F',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47271726_1324459564362811_7300459257961381888_n.jpg?_nc_cat=109&_nc_ht=scontent.ftpe5-1.fna&oh=e0d3d99769fc79055ae08f94be4033b9&oe=5CA2068D',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47685295_1324459551029479_6169362917431967744_n.jpg?_nc_cat=110&_nc_ht=scontent.ftpe5-1.fna&oh=fce8ba113804d8a77a1f1a7f16549d00&oe=5C936257',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/47684282_1324459617696139_5210172797543776256_n.jpg?_nc_cat=104&_nc_ht=scontent.ftpe5-1.fna&oh=9e32b65afbcc73907e9cc500b255c315&oe=5C94B285',
        'https://scontent.ftpe5-1.fna.fbcdn.net/v/t1.0-9/48312893_1324459814362786_3942485776763191296_n.jpg?_nc_cat=109&_nc_ht=scontent.ftpe5-1.fna&oh=ae77d21a628c7f2d3ff23606127e1c3f&oe=5CAF7B47'
    ]
    var rsp_list = []
    var i = 0;
    var image_url = ''
    async.forever(function(callback){
        if(i >= img_list.length){
            callback('over')
        } else {
            image_url = img_list[i++]
            var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/persongroups/groupofgod/persons/1b413811-4200-4b6a-acea-2686cdfc5ebb/persistedFaces';
            fetch(queryURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
                    },
                    body: JSON.stringify({
                        "url": image_url,
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData) {
                        // 接到 Data
                        console.log(i)
                        console.log(responseData);
                        if(responseData.length != 0){
                            rsp_list.push(responseData)
                        } else {
                            console.error("Can not!")
                            res.json({
                                err:"Can not detect the face! "+img_list[i]
                            })
                        }
                    }
                })
                .then(() => {
                    sleep(3000)
                })
                .then( ()=>{
                    callback()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },function(err){
        console.log("forever log: "+err);
    })
})

router.get('/goTrain',function(req,res,next){
    var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/persongroups/groupofgod/training';
    fetch(queryURL, {
            method: 'GET',
            headers: {
                //'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
            }
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((responseData) => {
            if (responseData) {
                // 接到 Data
                // console.log(i)
                // co/nsole.log(responseData);
                res.json(responseData)
            }
        })
        .catch((error) => {
            console.log(error);
        })
});

router.get('/goIdentify',function(req,res,next){
    var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/identify';
    fetch(queryURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
            },
            body: JSON.stringify({
                faceIds:['f5b1e4a1-242b-4d41-90ac-3a51514befa3'],
                personGroupId:'groupofgod'
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData) {
                // 接到 Data
                console.log(responseData);
                if(responseData.length != 0){
                    res.json(responseData.error)
                } else {
                    console.error("Can not!")
                    res.json({
                        err:"Can not detect the face!"
                    })
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

router.get('/getList', function(req, res, next) {
    var obj = {};
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.json(obj)
    });
});

router.post('/updateList', function(req, res, next) {
    var obj = {};
    console.log(req.body)
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      for(let i in obj[req.body.image_links]){
          obj[req.body.image_links][i].title = req.body.title[obj[req.body.image_links][i].faceId];
          obj[req.body.image_links][i].place = req.body.place;
          obj[req.body.image_links][i].time = req.body.time;
          obj[req.body.image_links][i].item = req.body.item;
          obj[req.body.image_links][i].description = req.body.description;
          if(i == obj[req.body.image_links].length - 1){
              fs.writeFile('data.txt',JSON.stringify(obj),function(err){
                  if(err){
                      console.log(err);
                  } else {
                      console.log("write success!")
                  }
              })
              res.json({msg:"success"})
          }
      }
    });
});

router.post('/appIdentify', function(req, res, next) {
    console.log(req.body)
    var faceId_list = []
    var obj = {};
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      //res.json(obj)
    });
    if(true){   //上傳連結
        var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect';
        var image_url = req.body.url;
        fetch(queryURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
                },
                body: JSON.stringify({
                    url: image_url,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    // 接到 Data
                    console.log(responseData);
                    if(responseData.length != 0){
                        obj[image_url] = responseData
                        for(let i in responseData){
                            faceId_list.push(responseData[i].faceId)
                        }
                        console.log(obj[image_url])
                        //res.json(responseData)
                    } else {
                        console.error("Can not detect the face!")
                        res.json({
                            err:"Can not detect the face!"
                        })
                    }
                }
            })
            .then(() => {
                console.log("faceId_list")
                console.log(faceId_list)
                var queryURL = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/identify';
                fetch(queryURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Ocp-Apim-Subscription-Key':'c6f2fa924a9c44b287bd112509ec6042'
                        },
                        body: JSON.stringify({
                            faceIds:[ '2bf79329-abab-4aba-96ff-b0d435bd0fc3' ],
                            personGroupId:'groupofgod'
                        })
                    })
                    .then((response) => {
                        // console.log(response)
                        return response.json()
                    })
                    .then((responseData) => {
                        if (responseData) {
                            // 接到 Data
                            console.log("responseData");
                            console.log(responseData);
                            if(!responseData.error){
                                var index = 0;
                                for(let j in responseData){
                                    console.log(j)
                                    console.log(obj[image_url][index])
                                    console.log(responseData[j])
                                    obj[image_url][index].candidates = responseData[j].candidates;
                                    if(j == responseData.length - 1){
                                        fs.writeFile('data.txt',JSON.stringify(obj),function(err){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                console.log("write success!")
                                            }
                                        })
                                        res.json({
                                            status:true,
                                            message:"Success",
                                            data:obj[image_url]
                                        })
                                    }
                                }
                            } else {
                                console.error("Can not!")
                                fs.writeFile('data.txt',JSON.stringify(obj),function(err){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log("write success!")
                                    }
                                })
                                res.json({
                                    status:true,
                                    message:"Success",
                                    data:obj[image_url]
                                })
                                // res.json({
                                //     status:false,
                                //     message:"Can not detect the face!"
                                // })
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .then(() => {
                for(let i in obj[image_url]){
                    obj[image_url][i].title = "";
                    obj[image_url][i].place = "";
                }
            })
            .then(() => {
                console.log(obj[image_url])
            })
            .catch((error) => {
                console.log(error);
            })
    } else {  // data:image base64

    }
});

router.post('/uploadImg', async function(req, res, next) {
    console.log(req.body.filename)
    if(req.body.base64){
        var imageBuffer =  await decodeBase64Image('data:image/jpeg;base64,'+req.body.base64);
        fs.writeFile('./public/images/'+req.body.filename,imageBuffer.data,function(err){
            if(err){
                console.log(err);
                res.json({err:err})
            } else {
                console.log("write success!")
                res.json({
                    msg:"success",
                    url:'http://nudb1.ddns.net:3000/images/'+req.body.filename
                })
            }
        })
    } else {
        console.log("is url")
        console.log(req.body)
        res.json({err:"err"})
    }
});

router.post('/searchData', async function(req, res, next) {
    var obj = {};
    var res_obj = {};
    console.log(req.body)
    fs.readFile('data.txt', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      for(let i in obj){
          for(let j in obj[i]){
              if(obj[i][j][req.body.category].match(req.body.keyword) != null){
                  res_obj[i] = obj[i]
              }
          }
      }
      res.json({data:res_obj})
    });
});

async function decodeBase64Image(dataString) {
  var matches = await dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};
    console.log(dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/))

  // if (matches.length !== 3) {
  //     console.log('Invalid input string')
  //   return new Error('Invalid input string');
  // }

  response.type = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[1];
  response.data = new Buffer(dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2], 'base64');
  console.log(response)
  return response;
}
module.exports = router;
