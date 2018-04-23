const gcm = require('node-gcm');
const FirebaseController = require('../controllers/firebase.controller') 
const firebaseController = new FirebaseController();
const firebaseToken = 'AAAAHqRJ4Cw:APA91bHFV-fHw1ST4tEggO2J_I35HEIlQSAicBSnUyK41ke78ypZ5Ol5HhzuWJbKb78MqvQQjy1gu7xboQq-e16Lr6mIGk-rDIyDHYY1dQBqfCJukiF8FGSfDy6c_VsVwSUc8crc7wjO';

module.exports = {
  pushNotification: (req,res,next) => {
    firebaseController.getKeyByParameterValue('treki','device_id',req.params.device_id)
      .then((key) => {
        if(key !== null) {
          firebaseController.get(`treki/${key}`)
            .then( async ({ status, updatedAt, user_id, name }) => {
              if(status && (Date.now() - updatedAt)/60000 > 15) {
                let { tokenDevice } = await firebaseController.get(`users/${user_id}`)
                let sender = new gcm.Sender(firebaseToken);
                let message = new gcm.Message({
                  notification: {
                    title: "Your Device is tracked by someone near it !",
                    icon: "ic_launcher",
                    body: name
                  },
                  data: { deviceFound: 'Your Device is tracked by someone near it !' }
                });
                
                let regTokens = [tokenDevice];
    
                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if (err) console.error(err);
                    else console.log(response);
                });
              }
              next()
            })
            .catch((err) => {
              // res.status(500).json({
              //   message: "Error updating location",
              //   err
              // })
            })
        } 
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error verifying device",
          err
        })
      })
    // var sender = new gcm.Sender('AAAAHqRJ4Cw:APA91bHFV-fHw1ST4tEggO2J_I35HEIlQSAicBSnUyK41ke78ypZ5Ol5HhzuWJbKb78MqvQQjy1gu7xboQq-e16Lr6mIGk-rDIyDHYY1dQBqfCJukiF8FGSfDy6c_VsVwSUc8crc7wjO');
    // var message = new gcm.Message({
    //   notification: {
    //     title: "Pagi mz",
    //     icon: "ic_launcher",
    //     body: "Bagi duit dong !!!"
    //   },
    //   data: { deviceFound: 'Your Device is tracked by someone near it !' }
    // });
    
    // var regTokens = ['cPUvTBSxbHQ:APA91bF57iYReJ5_Uv_hBdwnavrLaYv2JxHZvoSHaVp7QOAbE_ApS5RswboKo6CKf7E8GCXeNc8gMj-XwpoEIQ-ZmlAJ2fjEregJt-6myAC9Zp1r363D049e42tyklsUabjXs8JwsVmB'];
    
    // sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    //     if (err) console.error(err);
    //     else console.log(response);
    // });
    
  }
}